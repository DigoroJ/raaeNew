import { useState } from "react"
import { supabase } from "../supabaseClient"

export default function ContactForm({ setLoading, setMessage, setType }) {

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

    setLoading(true)

    const { error } = await supabase
      .from("contact_message")
      .insert([form])

    if (error) {
      setMessage(error.message)
      setType("error")
    } else {
      setMessage("Message sent successfully!")
      setType("success")

      // reset form
      setForm({
        name: "",
        email: "",
        phone: "",
        message: ""
      })
    }

    setLoading(false)
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
        type="email"
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