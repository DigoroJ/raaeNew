import { useState } from "react"
import { supabase } from "../supabaseClient"

export default function FundingForm() {

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

    const { error } = await supabase
      .from("applyFunding")
      .insert([form])

    if (error) {
      alert(error.message)
    } else {
      alert("Application submitted!")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="business_name" placeholder="Business Name" onChange={handleChange} />
      <input name="registration_number" placeholder="Registration Number" onChange={handleChange} />
      <input name="email" placeholder="Email"  type="email" onChange={handleChange} />
      <input name="contact_number" placeholder="Contact Number" onChange={handleChange} />

      <select name="sector" onChange={handleChange}>
        <option value="">Select Sector</option>
        <option>Agriculture</option>
        <option>Manufacturing</option>
        <option>Technology</option>
        <option>Retail</option>
      </select>

      <input name="required_funding" placeholder="Funding" onChange={handleChange} />

      <button className="btn">Submit Application</button>
    </form>
  )
}