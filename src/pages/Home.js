import Header from "../Components/Header"
import Hero from "../Components/Hero"
import FundingDistribution from "../Components/FundingDistribution"
import FundingForm from "../Components/FundingForm"
import ContactForm from "../Components/ContactForm"
import { useState, useEffect } from "react"

export default function Home() {

  // 💬 MESSAGE
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")

  // ⏳ LOADING
  const [loading, setLoading] = useState(false)

  // 📊 Eligibility
  const [result, setResult] = useState("")

  const calculateFunding = () => {
    let revenue = document.getElementById("revenue").value
    let expenses = document.getElementById("expenses").value
    let years = document.getElementById("years").value

    let profit = revenue - expenses
    let funding = profit * 6

    if (years < 1) {
      setResult("Business must operate for at least 1 year")
      return
    }

    setResult("Estimated Funding Eligibility: R " + funding)
  }

  // ⏱ AUTO HIDE MESSAGE
  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 3000)
    }
  }, [message])

  return (
    <div>

      {/* LOADER */}
      {loading && <div className="loader"></div>}

      {/* MESSAGE */}
      {message && <div className={`message ${type}`}>{message}</div>}

      <Header />
      <Hero />

      {/* ABOUT */}
      <section id="about">
        <h2>About RAAE</h2>
        <p>
          RAAE is a South African incorporated BEE compliant financial services provider offering collateral backed business loans to SMMEs.
        </p>
      </section>

      {/* FUNDING DISTRIBUTION */}
      <FundingDistribution />

      {/* FUNDING */}
      <section id="funding-section">
        <h2>Enterprise Funding</h2>

        <div className="funding-layout">

          {/* APPLY */}
          <div className="funding-box">
            <h3>Apply For Funding</h3>

            <FundingForm 
              setLoading={setLoading}
              setMessage={setMessage}
              setType={setType}
            />
          </div>

          {/* ELIGIBILITY */}
          <div className="funding-box">
            <h3>Funding Eligibility</h3>

            <input id="revenue" placeholder="Monthly Revenue" />
            <input id="expenses" placeholder="Monthly Expenses" />
            <input id="years" placeholder="Years in Business" />

            <button className="btn" onClick={calculateFunding}>
              Check Eligibility
            </button>

            <h3>{result}</h3>
          </div>

        </div>
      </section>

      {/* CONTACT */}
      <section id="contact">
        <h2>Contact Us</h2>

        <ContactForm 
          setLoading={setLoading}
          setMessage={setMessage}
          setType={setType}
        />
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2026 RAAE Financial Services</p>
      </footer>

    </div>
  )
}