import React, { useMemo, useState, ChangeEvent, FormEvent } from 'react'

type FamilyMember = { name: string; relation: string; age: string }
type EmergencyContact = { name: string; relation: string; phone: string }

type FormState = {
  membershipType: 'new' | 'renew'
  fullName: string
  bloodGroup: string
  civilId: string
  mobile: string
  mobile2: string
  whatsappnumber: string
  email: string
  branch: string
  addressinKuwait: string
  proffession: string
  qualification: string
  addressinIndia: string
  contactnumberinIndia: string
  contactnumberiindia2: string
  emergencyContacts: EmergencyContact[]
  acknowledge: boolean
  photo: File | null
}

export default function Register(): React.JSX.Element {
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])

  const [form, setForm] = useState<FormState>({
    membershipType: 'new',
    fullName: '',
    bloodGroup: '',
    civilId: '',
    mobile: '',
    mobile2: '',
    whatsappnumber: '',
    email: '',
    branch: '',
    addressinKuwait: '',
    proffession: '',
    qualification: '',
    addressinIndia: '',
    contactnumberinIndia: '',
    contactnumberiindia2: '',
    emergencyContacts: [
      { name: '', relation: '', phone: '' },
      { name: '', relation: '', phone: '' },
    ],
    acknowledge: false,
    photo: null,
  })
  const [family, setFamily] = useState<FamilyMember[]>([{ name: '', relation: '', age: '' }])
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showRulesModal, setShowRulesModal] = useState(false)
  const [accepted, setAccepted] = useState(false)

  const inputBoxStyle: React.CSSProperties = {
    width: '100%',
    border: '1px solid #e5e7eb',
    borderRadius: 6,
    padding: '8px 10px',
    background: '#fff',
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement
    const { name, value, files } = target
    if (files && files[0]) {
      setForm((s) => ({ ...s, [name]: files[0] }))
      const url = URL.createObjectURL(files[0])
      setPreviewUrl((prev) => {
        if (prev) URL.revokeObjectURL(prev)
        return url
      })
    } else {
      setForm((s) => ({ ...s, [name]: value }))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      const fd = new FormData()
      fd.append('applicationType', form.membershipType)
      fd.append('fullName', form.fullName)
      fd.append('phone', form.mobile)
      fd.append('email', form.email)
      fd.append('branch', form.branch)
      fd.append('address', form.addressinKuwait)
      if (form.photo) fd.append('photo', form.photo)

      const extra = {
        bloodGroup: form.bloodGroup,
        civilId: form.civilId,
        mobile2: form.mobile2,
        whatsappnumber: form.whatsappnumber,
        addressinKuwait: form.addressinKuwait,
        proffession: form.proffession,
        qualification: form.qualification,
        addressinIndia: form.addressinIndia,
        contactnumberinIndia: form.contactnumberinIndia,
        contactnumberiindia2: form.contactnumberiindia2,
        emergencyContacts: form.emergencyContacts,
        acknowledge: accepted,
        family,
      }
      fd.append('extra', JSON.stringify(extra))

      const res = await fetch(`${baseUrl}/api/membership/applications`, { method: 'POST', body: fd })
      const data = await res.json()
      if (res.ok && data?.ok) {
        setMessage('Application submitted successfully.')
        setForm({
          membershipType: 'new', fullName: '', bloodGroup: '', civilId: '', mobile: '', mobile2: '', whatsappnumber: '', email: '', branch: '',
          addressinKuwait: '', proffession: '', qualification: '', addressinIndia: '', contactnumberinIndia: '', contactnumberiindia2: '',
          emergencyContacts: [ { name: '', relation: '', phone: '' }, { name: '', relation: '', phone: '' } ], acknowledge: false, photo: null,
        })
        setFamily([{ name: '', relation: '', age: '' }])
        if (previewUrl) URL.revokeObjectURL(previewUrl)
        setPreviewUrl('')
        setAccepted(false)
      } else {
        setMessage(data?.error || 'Submission failed')
      }
    } catch (err) {
      setMessage('Network error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>KKMA Membership Form</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li>KKMA Membership Form</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="contact-section sec-pad-2">
        <div className="auto-container">
          {message && (
            <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e3a8a', padding: 12, borderRadius: 8, marginBottom: 16 }}>{message}</div>
          )}
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <form className="default-form" onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Basic Information */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 16 }}>Basic Information</h4>
                  <div className="row clearfix">
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>Membership Type*</label>
                      <select name="membershipType" value={form.membershipType} onChange={handleChange} required className="nice-select">
                        <option value="new">New</option>
                        <option value="renew">Renew</option>
                      </select>
                    </div>
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>Full Name*</label>
                      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required placeholder="Full name" style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>Branch</label>
                      <input type="text" name="branch" value={form.branch} onChange={handleChange} placeholder="Branch" style={inputBoxStyle} />
                    </div>
             
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>Blood Group</label>
                      <input type="text" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} placeholder="e.g. O+" style={inputBoxStyle} />
                    </div>
                    
                  </div>
                </div>

                {/* Contact & IDs */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 16 }}>Contact &amp; Identification</h4>
                  <div className="row clearfix">
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>Civil ID / Passport*</label>
                      <input type="text" name="civilId" value={form.civilId} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>Email*</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>Mobile*</label>
                      <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>Alt. Mobile</label>
                      <input type="tel" name="mobile2" value={form.mobile2} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>WhatsApp</label>
                      <input type="tel" name="whatsappnumber" value={form.whatsappnumber} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                  </div>
                </div>

                {/* Address & Profession */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 16 }}>Address &amp; Profession</h4>
                  <div className="row clearfix">
                    <div className="col-md-12 col-sm-12 form-group">
                      <label>Address in Kuwait*</label>
                      <textarea name="addressinKuwait" value={form.addressinKuwait} onChange={handleChange} required rows={2} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>Profession</label>
                      <input type="text" name="proffession" value={form.proffession} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>Qualification</label>
                      <input type="text" name="qualification" value={form.qualification} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-12 col-sm-12 form-group">
                      <label>Address in India</label>
                      <textarea name="addressinIndia" value={form.addressinIndia} onChange={handleChange} rows={2} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>Contact in India</label>
                      <input type="tel" name="contactnumberinIndia" value={form.contactnumberinIndia} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>Contact in India (Alt)</label>
                      <input type="tel" name="contactnumberiindia2" value={form.contactnumberiindia2} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <div className="row clearfix" style={{ alignItems: 'center' }}>
                    <div className="col-md-8 col-sm-12">
                      <h4 style={{ marginBottom: 16 }}>Emergency Contacts</h4>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-12 col-sm-12">
                      <div style={{ overflowX: 'auto' }}>
                        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>Name</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>Relation</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            {form.emergencyContacts.map((row, idx) => (
                              <tr key={idx}>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <input
                                    type="text"
                                    value={row.name}
                                    onChange={(e) => setForm((s) => ({
                                      ...s,
                                      emergencyContacts: s.emergencyContacts.map((r, i) => i === idx ? { ...r, name: e.target.value } : r)
                                    }))}
                                    placeholder="Name"
                                    style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }}
                                  />
                                </td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <input
                                    type="text"
                                    value={row.relation}
                                    onChange={(e) => setForm((s) => ({
                                      ...s,
                                      emergencyContacts: s.emergencyContacts.map((r, i) => i === idx ? { ...r, relation: e.target.value } : r)
                                    }))}
                                    placeholder="Relation"
                                    style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }}
                                  />
                                </td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <input
                                    type="tel"
                                    value={row.phone}
                                    onChange={(e) => setForm((s) => ({
                                      ...s,
                                      emergencyContacts: s.emergencyContacts.map((r, i) => i === idx ? { ...r, phone: e.target.value } : r)
                                    }))}
                                    placeholder="Phone"
                                    style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 16 }}>Photo</h4>
                  <div className="row clearfix">
                    <div className="col-md-8 col-sm-12 form-group">
                      <label>Upload Photo</label>
                      <input type="file" name="photo" accept="image/*" onChange={handleChange} />
                      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>Upload a clear, recent passport-size photo (JPG/PNG).</p>
                    </div>
                    <div className="col-md-4 col-sm-12 form-group" style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-block', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
                        <img src={previewUrl || 'https://via.placeholder.com/120x120?text=Preview'} alt="Preview" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 6 }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Family Members */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <div className="row clearfix" style={{ alignItems: 'center' }}>
                    <div className="col-md-8 col-sm-12">
                      <h4 style={{ marginBottom: 16 }}>Family Members</h4>
                    </div>
                    <div className="col-md-4 col-sm-12" style={{ textAlign: 'right' }}>
                      <span
                        onClick={() => setFamily((f) => [...f, { name: '', relation: '', age: '' }])}
                        style={{ color: '#16a34a', fontWeight: 600, cursor: 'pointer' }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#000' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#16a34a' }}
                      >
                        + Add Member
                      </span>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-12 col-sm-12">
                      <div style={{ overflowX: 'auto' }}>
                        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>Name</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>Relation</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>Age</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {family.map((row, idx) => (
                              <tr key={idx}>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <input type="text" value={row.name} onChange={(e) => setFamily((arr) => arr.map((r, i) => i === idx ? { ...r, name: e.target.value } : r))} placeholder="Name" />
                                </td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <input type="text" value={row.relation} onChange={(e) => setFamily((arr) => arr.map((r, i) => i === idx ? { ...r, relation: e.target.value } : r))} placeholder="Relation" />
                                </td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <input type="text" value={row.age} onChange={(e) => setFamily((arr) => arr.map((r, i) => i === idx ? { ...r, age: e.target.value } : r))} placeholder="Age" />
                                </td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  {family.length > 1 ? (
                                    <span
                                      onClick={() => setFamily((arr) => arr.filter((_, i) => i !== idx))}
                                      style={{ color: '#ef4444', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                                      onMouseEnter={(e) => { e.currentTarget.style.color = '#000' }}
                                      onMouseLeave={(e) => { e.currentTarget.style.color = '#ef4444' }}
                                    >
                                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="8" y1="12" x2="16" y2="12"></line>
                                      </svg>
                                      Remove
                                    </span>
                                  ) : (
                                    <span style={{ color: '#9ca3af' }}>—</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rules & Regulations (Modal Trigger) */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <h4 style={{ marginBottom: 6 }}>Rules &amp; Regulations</h4>
                    <p style={{ margin: 0, color: '#6b7280', fontSize: 14 }}>Please review and accept to continue.</p>
                  </div>
                  <span
                    onClick={() => setShowRulesModal(true)}
                    style={{ color: '#16a34a', fontWeight: 600, cursor: 'pointer' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#000' }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#16a34a' }}
                  >
                    View &amp; Accept
                  </span>
                </div>

                {/* Submit */}
                <div className="form-group">
                  <button
                    type="submit"
                    className="theme-btn"
                    disabled={submitting || !accepted}
                    style={{ cursor: (submitting || !accepted) ? 'not-allowed' : 'pointer', opacity: (submitting || !accepted) ? 0.6 : 1 }}
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>


          </div>
        </div>
      </section>

      {/* Rules Modal */}
      {showRulesModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ width: '100%', maxWidth: 800, background: '#fff', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ padding: 16, borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <h4 style={{ margin: 0 }}>Rules &amp; Regulations</h4>
            </div>
            <div style={{ padding: 16, maxHeight: '60vh', overflowY: 'auto' }}>
              <ul className="list" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>The Kuwait Kerala Muslim Association (KKMA) is a well-established organization operating in Kuwait.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>It is an organization that maintains structured connections with expatriates in both Kuwait and India.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>Members are expected to lead lives based on Islamic values and to actively contribute to society.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>Welfare programs such as Family Welfare Scheme, Membership Welfare Scheme, etc., initiated by KKMA are social welfare initiatives aimed at supporting members.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>Members are expected to support these schemes with full trust and commitment, as they are designed to assist expatriates in situations like financial emergencies or family support needs.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>The use of funds received from schemes like the Family Support Scheme or Final Rites Scheme must be transparently communicated to the branch officials by the members.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>New members become eligible for welfare schemes only after three months from the date of application and official membership confirmation. Hence, branch officials must be informed of any such final rites in advance.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>Members should maintain regular communication with branch officials — at least once a month. If there are changes in the member’s address or phone number, these updates must be informed promptly.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>For other social engagements, such as funerals, events, or community support activities, members should be active participants and adhere to the principles and decisions laid out by KKMA.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>Families of deceased members will not be eligible for welfare schemes if the member was not compliant with the organizational rules at the time of death.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>All members shall fall under the authority of the KKMA Central Committee, and only the Central Committee has the authority to finalize any dues or settlements related to members. Any exceptions or variations, whether it be store club members or other individual members, will not be accepted as valid unless officially approved.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>If a member leaves Kuwait and does not return for more than 6 months, it will be assumed that their membership has automatically lapsed.</span>
                </li>
              </ul>
              <div style={{ marginTop: 16 }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.acknowledge}
                    onChange={(e) => setForm((s) => ({ ...s, acknowledge: (e.target as HTMLInputElement).checked }))}
                    style={{ marginTop: 4 }}
                  />
                  <span style={{ lineHeight: 1.6 }}>
                    I hereby acknowledge that I have carefully read and understood the rules and regulations stated above, and I commit to adhering to them fully.
                  </span>
                </label>
              </div>
            </div>
            <div style={{ padding: 16, borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 12 }}>
              <span
                onClick={() => setShowRulesModal(false)}
                style={{ color: '#6b7280', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#000' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Cancel
              </span>
              <button
                type="button"
                className="theme-btn"
                onClick={() => { if (form.acknowledge) { setAccepted(true); setShowRulesModal(false) } }}
                disabled={!form.acknowledge}
                style={{ cursor: (!form.acknowledge) ? 'not-allowed' : 'pointer', opacity: (!form.acknowledge) ? 0.6 : 1 }}
              >
                Accept &amp; Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
