import { useEffect, useState } from "react"

export default function Hero() {

  const slides = [
    {
      img: "https://picsum.photos/1600/600?1",
      title: "Flexible Business Loans",
      text: "Helping South African SMMEs grow with confidence."
    },
    {
      img: "https://picsum.photos/1600/600?2",
      title: "Fast Approvals",
      text: "Tailored repayment plans for your business."
    }
  ]

  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero">
      <div className="hero-slide active">
        <img src={slides[index].img} alt="" />

        <div className="hero-text">
          <h2>{slides[index].title}</h2>
          <p>{slides[index].text}</p>

          <a href="#funding-section" className="btn">
            Apply For Funding
          </a>
        </div>
      </div>
    </section>
  )
}