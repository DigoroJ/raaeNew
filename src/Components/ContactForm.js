import { useState } from "react"
import { supabase } from "../supabaseClient"

export default function ContactForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from("contact_messages")
      .insert([form])

    if (error) {
      alert("Error: " + error.message)
    } else {
      alert("Message sent!")
      setForm({ name: "", email: "", phone: "", message: "" })
    }
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <textarea
        name="message"
        placeholder="Message"
        value={form.message}
        onChange={handleChange}
        required
      ></textarea>

      <button className="btn">Send Message</button>

    </form>
  )
}