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
  addressinKuwait: string
  proffession: string
  qualification: string
  addressinIndia: string
  contactnumberinIndia: string
  contactnumberiindia2: string
  emergencyContacts: EmergencyContact[]
  acknowledge: boolean
  photo: File | null
  passport: string
  locationinIndia: string
  stateinIndia: string
  districtinIndia: string
  panchayath: string
  postoffice: string
  pincode: string
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
    passport: '',
    locationinIndia: '',
    stateinIndia: '',
    districtinIndia: '',
    panchayath: '',
    postoffice: '',
    pincode: '',
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
          membershipType: 'new', fullName: '', bloodGroup: '', civilId: '', mobile: '', mobile2: '', whatsappnumber: '',
          addressinKuwait: '', proffession: '', qualification: '', addressinIndia: '', contactnumberinIndia: '', contactnumberiindia2: '',
          emergencyContacts: [ { name: '', relation: '', phone: '' }, { name: '', relation: '', phone: '' } ], acknowledge: false, photo: null,
          passport: '',
          locationinIndia: '',
          stateinIndia: '',
          districtinIndia: '',
          panchayath: '',
          postoffice: '',
          pincode: '',
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

              <h2 style={{color:'white'}}>കുവൈറ്റ് കേരള മുസ്ലിം അസോസിയേഷന്‍</h2>
              <h2 style={{color:'white'}}>അംഗത്വത്തിനുള്ള അപേക്ഷ ഫോറം</h2>
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
                      <label>പേര്*</label>
                      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                 
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>ബ്ലഡ് ഗ്രൂപ്പ്*</label>
                      <input type="text" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} placeholder="e.g. O+" style={inputBoxStyle} />
                    </div>
                    
                  </div>
                </div>

                {/* Contact & IDs */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 16 }}>Contact &amp; Identification</h4>
                  <div className="row clearfix">
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>സിവില്‍ ഐഡി നമ്പര്‍*</label>
                      <input type="text" name="civilId" value={form.civilId} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>പാസ്പോർട്ട് നമ്പര്‍*</label>
                      <input type="text" name="passport" value={form.passport} onChange={handleChange} required style={inputBoxStyle} />
                    </div>  
                 
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>മൊബൈൽ നമ്പര്‍*</label>
                      <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>മൊബൈൽ നമ്പര്‍ 2*</label>
                      <input type="tel" name="mobile2" value={form.mobile2} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>വാട്സ്ആപ് നമ്പര്‍*</label>
                      <input type="tel" name="whatsappnumber" value={form.whatsappnumber} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                  </div>
                </div>

                {/* Address & Profession */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 16 }}>Address &amp; Profession</h4>
                  <div className="row clearfix">
                    <div className="col-md-12 col-sm-12 form-group">
                      <label>കുവൈത്തില്‍ താമസിക്കുന്ന സ്ഥലം*</label>
                      <textarea name="addressinKuwait" value={form.addressinKuwait} onChange={handleChange} required rows={2} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>തൊഴില്‍</label>
                      <input type="text" name="proffession" value={form.proffession} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>വിദ്യാഭ്യാസ യോഗ്യത </label>
                      <input type="text" name="qualification" value={form.qualification} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-12 col-sm-12 form-group">
                      <label>ഇന്ത്യയിലെ വീട്ടു പേര്*</label>
                      <textarea name="addressinIndia" value={form.addressinIndia} onChange={handleChange} rows={2} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-12 col-sm-12 form-group">
                      <label>സ്ഥലം*</label>
                      <textarea name="addressinIndia" value={form.locationinIndia} onChange={handleChange} rows={2} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-12 col-sm-12 form-group">
                      <label>സംസ്ഥാനം*</label>
                      <textarea name="stateinIndia" value={form.stateinIndia} onChange={handleChange} rows={2} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-12 col-sm-12 form-group">
                      <label>ജില്ലാം*</label>
                      <textarea name="districtinIndia" value={form.districtinIndia} onChange={handleChange} rows={2} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>പഞ്ചായത്ത്/മുനിസിപ്പാലിറ്റി/കോര്‍പറേഷന്‍*</label>
                      <input type="tel" name="panchayath" value={form.panchayath} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>പോസ്റ്റ് ഓഫീസ്*</label>
                      <input type="tel" name="postoffice" value={form.postoffice} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>പിന്കോഡ്*</label>
                      <input type="tel" name="pincode" value={form.pincode} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>ഇന്ത്യയില്‍ ബന്ധപ്പെടാനുള്ള നമ്പര്‍*</label>
                      <input type="tel" name="contactnumberinIndia" value={form.contactnumberinIndia} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>ഇന്ത്യന്‍ നമ്പര്‍ 2*</label>
                      <input type="tel" name="contactnumberiindia2" value={form.contactnumberiindia2} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <div className="row clearfix" style={{ alignItems: 'center' }}>
                    <div className="col-md-12 col-sm-12">
                      <h5 style={{ marginBottom: 16 }}> അടിയന്തിര ഘട്ടങ്ങളില്‍ ബന്ധപ്പെടാനുള്ള ബന്ധുവിന്‍റെയോ, സുഹൃത്തിന്‍റെയോ നമ്പര്‍ </h5>
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
                      <h5 style={{ marginBottom: 16 }}>കുടുംബ വിവരങ്ങള്‍ (നിലവില്‍ ജീവിച്ചിരിക്കുന്നവര്‍ മാത്രം) </h5>
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
              <h4 style={{ margin: 0 }}>  അംഗങ്ങൾ അറി ിരിേ ണ്ട, പാലി ിരിേ ണ്ടതായ നിയമാവലികൾ</h4>
            </div>
            <div style={{ padding: 16, maxHeight: '60vh', overflowY: 'auto' }}>
              <ul className="list" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>കുവൈത്ത് കേരള മുസ്ലിം അസോസിയേഷന്‍ (കെ.കെ.എം.എ) കുവൈത്തില്‍ പ്രവര്‍ത്തിക്കുന്ന ഒരു സ്വതന്ത്ര സംഘടനയാണ്.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>കുവൈത്തിലോ,ഇന്ത്യയിലോ പ്രവര്‍ത്തിക്കുന്ന ഒരു സംഘടനയുടെയും പോഷക സംഘടന അല്ല.</span>
                 
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  
                  <span>അംഗങ്ങള്‍ ഇസ്ലാമിക ചര്യ അനുസരിച്ച് ജീവിക്കുന്നവരും,സ്വഭാവത്തില്‍ വിശുദ്ധി കാത്ത് സൂക്ഷിക്കുന്നവരും ആയിരിക്കണം.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
  
                  <span>കെ.കെ.എം.എ നടപ്പിലാക്കുന്ന കുടുംബ ക്ഷേമ പദ്ധതി,അംഗത്വ ക്ഷേമ പദ്ധതി തുടങ്ങിയ സാമൂഹിക ക്ഷേമ പദ്ധതികളുമായി സഹകരിക്കാന്‍ അംഗങ്ങള്‍ ബാധ്യസ്ഥരാണ്.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>കുടുംബ സഹായ പദ്ധതി/അംഗത്വ ക്ഷേമ പദ്ധതി പോലുള്ള അംഗത്വപരമായ നിര്‍ബന്ധ ബാധ്യതകള്‍ നല്‍കുവാനുള്ള സര്‍ക്കുലര്‍
 കിട്ടിക്കഴിഞ്ഞാല്‍ വിഹിതം, നിശ്ചയിച്ച തിയ്യതിക്കകം ബ്രാഞ്ച് ഭാരവാഹികളെ ഏല്പിക്കണം. അത് മെമ്പര്‍മാരുടെ
 ഉത്തരവാദിത്വമാണ്.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span> പുതിയ മെമ്പര്‍മാര്‍ക്ക്  അവരുടെ അംഗത്വ അപേക്ഷ,രസീതി തിയ്യതി മുതല്‍ 3 മാസങ്ങള്‍ക്ക് ശേഷം മാത്രമേ കെ.കെ.എം.എ.യുടെ
 ക്ഷേമ പദ്ധതികള്‍ക്ക് അര്‍ഹരാവുകയുള്ളൂ. എന്നാല്‍ അംഗത്വം എടുത്തതിന് ശേഷം പ്രാബല്യത്തില്‍ വരുന്ന എല്ലാ സ്കീമുകളും
 അടക്കുവാന്‍ ഈ മെമ്പര്‍മാര്‍ ബാധ്യസ്ഥരായിരിക്കും .</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span> മെമ്പര്‍മാര്‍ ചുരുങ്ങിയത് മാസത്തില്‍ ഒരിക്കലെങ്കിലും ബ്രാഞ്ച് ഭാരവാഹികളുമായി ബന്ധപ്പെടുകയും,സംഘടനാ കാര്യങ്ങള്‍
 അറിഞ്ഞിരിക്കുകയും വേണം.അംഗങ്ങളുടെ വിലാസമോ, ഫോണ്‍ നമ്പറോ മാറുകയാണെങ്കില്‍,വിവരങ്ങള്‍ യഥാസമയം ബ്രാഞ്ച്
 ഭാരവാഹികളെ അറിയിക്കേ താണ്.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>ദേശ വിരുദ്ധ പ്രവര്‍ത്തനങ്ങളിലും,മദ്യം,മയക്ക് മരുന്ന്,ചൂതാട്ടം തുടങ്ങിയ സാമൂഹ്യ തിന്മകളിലും,അധാര്‍മിക പ്രവര്‍ത്തനങ്ങളിലും  
ഏര്‍പ്പെടുന്നവരുടെ അംഗത്വം മുന്‍കാല പ്രാബല്യത്തോടെ തനിയെ നഷ്ട്ടപ്പെടുന്നതായിരിക്കും. അംഗത്വത്തിനുള്ള അപേക്ഷകള്‍
 സ്വീകരിക്കുവാനും,കാരണം കാണിക്കാതെ തിരസ്കരിക്കുവാനും,മെമ്പര്‍മാരുടെ അംഗത്വം റദ്ദാക്കാനുമുള്ള അധികാരം
 കെ.കെ.എം.എയുടെ കേന്ദ്ര കമ്മിറ്റിയില്‍ നിക്ഷിപ്തമാണ്.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span> ആത്മഹത്യ ചെയ്യുന്ന അംഗങ്ങളുടെ കുടുംബങ്ങള്‍ കെ.കെ.എം.എ നല്‍കുന്ന യാതൊരു അനുകൂല്യങ്ങള്‍ക്കോ, ക്ഷേമ
                  പദ്ധതികള്‍ക്കോ അര്‍ഹരായിരിക്കുകയില്ല  </span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>എല്ലാ മെമ്പര്‍മാരും കെ.കെ.എം.എ കേന്ദ്ര കമ്മിറ്റിയുടെ അധികാര പരിധിയില്‍ ഉള്ളവരും, മെമ്പര്‍മാരെ സംബന്ധിച്ചുള്ള അവസാന
 തീരുമാനം എടുക്കാനുള്ള അധികാരം കെ.കെ.എം.എ കേന്ദ്ര കമ്മിറ്റിയില്‍ നിക്ഷിപ്തമായിരിക്കുകയും ചെയ്യും. ഏതെങ്കിലും
 വ്യക്തികള്‍ക്കോ,സ്റ്റാര്‍ ക്ലബ് മെമ്പര്‍മാര്‍ക്കോ മെമ്പര്‍മാരുടെ ഉത്തരവാദിത്തം ഏറ്റെടുക്കാന്‍ സാധിക്കില്ല.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>അംഗങ്ങള്‍ കുവൈത്തില്‍ നിന്നും യാത്ര പുറപ്പെട്ട്  6 മാസം കഴിയുകയും,തിരിച്ചെത്താതിരിക്കുകയും ചെയ്താല്‍  അംഗത്വം
                  സ്വമേധയാ നഷ്ട്ടപ്പെടുന്നതായിരിക്കും </span>
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
                  മുകളില്‍ കൊടുത്ത എല്ലാ നിബന്ധനകളും , മറ്റ് നിയമാവലികളും ഞാന്‍ വായിച്ച് മനസ്സിലാക്കി എന്നും, ഇവയെല്ലാം പാലിച്ച്
                  കൊള്ളുമെന്നും ഇതിനാല്‍ ഉറപ്പ് നല്‍കുന്നു.  
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
