import { useState } from "react"

export default function Header() {

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header>
      <h1>RAAE</h1>

      <div
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </div>

      <nav className={menuOpen ? "active" : ""}>
        <ul>
          <li><a href="#about">About</a></li>
          <li><a href="#funding-section">Funding</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  )
}