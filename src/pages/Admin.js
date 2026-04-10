import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"

export default function Admin() {

  const [applications, setApplications] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    const { data: apps } = await supabase
      .from("applyFunding")
      .select("*")
      .order("created_at", { ascending: false })

    const { data: msgs } = await supabase
      .from("contact_message")
      .select("*")
      .order("created_at", { ascending: false })

    setApplications(apps || [])
    setMessages(msgs || [])
  }

  return (
    <div className="admin-container">

      {/* HEADER */}
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
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.business_name}</td>
                <td>{app.email}</td>
                <td>{app.sector}</td>
                <td>R {app.required_funding}</td>
                <td>{app.Status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MESSAGES */}
      <div className="admin-card">
        <h2>Contact Messages</h2>

        <table className="raae-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>

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