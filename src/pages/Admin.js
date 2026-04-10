import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function Admin() {

  // 🔐 AUTH
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // 📊 DATA
  const [applications, setApplications] = useState([])
  const [messagesData, setMessagesData] = useState([])

  // ➕ CREATE ADMIN
  const [showCreateAdmin, setShowCreateAdmin] = useState(false)
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")

  // 💬 MESSAGE
  const [message, setMessage] = useState("")
  const [type, setType] = useState("")

  // ⏳ LOADING
  const [loading, setLoading] = useState(false)

  // 🔐 SESSION
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  // 🔐 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setMessage("Login failed")
      setType("error")
    }

    setLoading(false)
  }

  // 🚪 LOGOUT
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  // 📊 LOAD DATA
  useEffect(() => {
    if (session) {
      loadData()
    }
  }, [session])

  const loadData = async () => {
    setLoading(true)

    const { data: apps } = await supabase.from("applyFunding").select("*")
    const { data: msgs } = await supabase.from("contact_message").select("*")

    setApplications(apps || [])
    setMessagesData(msgs || [])

    setLoading(false)
  }

  // ➕ CREATE ADMIN
  const createAdmin = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email: newEmail,
      password: newPassword
    })

    if (error) {
      setMessage(error.message)
      setType("error")
    } else {
      setMessage("Admin created successfully!")
      setType("success")
      setNewEmail("")
      setNewPassword("")
      setShowCreateAdmin(false)
    }

    setLoading(false)
  }

  // ⏱ AUTO HIDE MESSAGE
  useEffect(() => {
    if (message) {
      setTimeout(() => setMessage(""), 3000)
    }
  }, [message])

  // 🔒 LOGIN SCREEN
  if (!session) {
    return (
      <div className="login-container">

        {loading && <div className="loader"></div>}

        <form className="login-box" onSubmit={handleLogin}>
          <h2>Admin Login</h2>

          <input placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

          <button className="btn">Login</button>
        </form>

        {message && <div className={`message ${type}`}>{message}</div>}
      </div>
    )
  }

  // ✅ DASHBOARD
  return (
    <div className="admin-container">

      {loading && <div className="loader"></div>}

      {/* MESSAGE */}
      {message && <div className={`message ${type}`}>{message}</div>}

      <div className="admin-header">
        <h1>RAAE Admin Dashboard</h1>
        <button className="btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* CREATE ADMIN */}
      <div style={{ margin: "20px" }}>
        <button className="btn" onClick={() => setShowCreateAdmin(!showCreateAdmin)}>
          {showCreateAdmin ? "Close" : "Create Admin"}
        </button>

        {showCreateAdmin && (
          <form className="admin-card" onSubmit={createAdmin}>
            <h3>Create New Admin</h3>

            <input
              placeholder="Email"
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <button className="btn">Create</button>
          </form>
        )}
      </div>

      {/* APPLICATIONS */}
      <div className="admin-card">
        <h2>Funding Applications</h2>

        <table className="raae-table">
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
        <h2>Messages</h2>

        <table className="raae-table">
          <tbody>
            {messagesData.map(msg => (
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