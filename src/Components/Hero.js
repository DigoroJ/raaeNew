import { useEffect, useState } from "react"

export default function Hero() {

  // 🎞 Slides data
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

  // ✅ FIXED useEffect (no Netlify error)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length]) // 👈 FIXED dependency

  return (
    <section className="hero">

      {slides.map((slide, i) => (
        <div
          key={i}
          className={`hero-slide ${i === index ? "active" : ""}`}
        >
          <img src={slide.img} alt="slide" />

          <div className="hero-text">
            <h2>{slide.title}</h2>
            <p>{slide.text}</p>

            <a href="#funding-section" className="btn">
              Apply For Funding
            </a>
          </div>
        </div>
      ))}

    </section>
  )
}