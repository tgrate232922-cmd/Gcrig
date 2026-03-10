import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Valid email is required'
    if (!form.subject.trim()) errs.subject = 'Subject is required'
    if (!form.message.trim()) errs.message = 'Message is required'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setSubmitted(true)
  }

  const inputClass = (field) => `w-full bg-navy-700/50 border ${
    errors[field] ? 'border-red-500/50' : 'border-white/10'
  } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors text-sm`

  if (submitted) {
    return (
      <div className="card-glow text-center py-12">
        <CheckCircle className="w-16 h-16 text-teal-400 mx-auto mb-4" />
        <h3 className="text-white font-semibold text-xl mb-2">Message Sent</h3>
        <p className="text-gray-400 text-sm">Thank you for reaching out. We will get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card-glow space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="Full Name"
            className={inputClass('name')}
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            className={inputClass('email')}
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
      </div>
      <div>
        <input
          type="text"
          placeholder="Subject"
          className={inputClass('subject')}
          value={form.subject}
          onChange={e => setForm({ ...form, subject: e.target.value })}
        />
        {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject}</p>}
      </div>
      <div>
        <textarea
          rows={5}
          placeholder="Your message..."
          className={inputClass('message')}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
      </div>
      <button type="submit" className="btn-primary flex items-center gap-2 w-full justify-center">
        <Send className="w-4 h-4" />
        Send Message
      </button>
    </form>
  )
}
