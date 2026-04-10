import { useState } from "react"
import { supabase } from "../supabaseClient"

export default function FundingForm({ setLoading, setMessage, setType }) {

  const [form, setForm] = useState({
    business_name: "",
    registration_number: "",
    email: "",
    contact_number: "",
    sector: "",
    required_funding: ""
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    const { error } = await supabase
      .from("applyFunding")
      .insert([form])

    if (error) {
      setMessage(error.message)
      setType("error")
    } else {
      setMessage("Application submitted successfully!")
      setType("success")

      // reset form
      setForm({
        business_name: "",
        registration_number: "",
        email: "",
        contact_number: "",
        sector: "",
        required_funding: ""
      })
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit}>

      <input
        name="business_name"
        placeholder="Business Name"
        value={form.business_name}
        onChange={handleChange}
        required
      />

      <input
        name="registration_number"
        placeholder="Registration Number"
        value={form.registration_number}
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
        name="contact_number"
        placeholder="Contact Number"
        value={form.contact_number}
        onChange={handleChange}
        required
      />

      <select
        name="sector"
        value={form.sector}
        onChange={handleChange}
        required
      >
        <option value="">Select Sector</option>
        <option>Agriculture</option>
        <option>Manufacturing</option>
        <option>Technology</option>
        <option>Retail</option>
      </select>

      <input
        name="required_funding"
        type="number"
        placeholder="Required Funding"
        value={form.required_funding}
        onChange={handleChange}
        required
      />

      <button className="btn">Submit Application</button>

    </form>
  )
}