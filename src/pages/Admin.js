import { useState, useEffect } from "react"
import { supabase } from "../supabaseClient"

export default function Admin() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [applications, setApplications] = useState([])
  const [messages, setMessages] = useState([])

  // 🔐 Simple login check
  const handleLogin = (e) => {
    e.preventDefault()

    if (username === "admin" && password === "test") {
      setIsLoggedIn(true)
    } else {
      alert("Invalid credentials")
    }
  }

  // 📊 Load data after login
  useEffect(() => {
    if (isLoggedIn) {
      loadData()
    }
  }, [isLoggedIn])

  const loadData = async () => {
    const { data: apps } = await supabase.from("applyFunding").select("*")
    const { data: msgs } = await supabase.from("contact_message").select("*")

    setApplications(apps || [])
    setMessages(msgs || [])
  }

  // 🔒 LOGIN SCREEN
  if (!isLoggedIn) {
    return (
      <div className="login-container">

        <form className="login-box" onSubmit={handleLogin}>
          <h2>Admin Login</h2>

          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn">Login</button>
        </form>

      </div>
    )
  }

  // ✅ DASHBOARD (only shows after login)
  return (
    <div className="admin-container">

      <div className="admin-header">
        <h1>RAAE Admin Dashboard</h1>
      </div>

      {/* APPLICATIONS */}
      <div className="admin-card">
        <h2>Funding Applications</h2>

        <table className="raae-table">
          <thead>
            <tr>
              <th>Business</th>
              <th>Email</th>
              <th>Sector</th>
              <th>Funding</th>
            </tr>
          </thead>

          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.business_name}</td>
                <td>{app.email}</td>
                <td>{app.sector}</td>
                <td>R {app.required_funding}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MESSAGES */}
      <div className="admin-card">
        <h2>Contact Messages</h2>

        <table className="raae-table">
          <tbody>
            {messages.map(msg => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}