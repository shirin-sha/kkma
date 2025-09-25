import React, { useMemo, useState, ChangeEvent, FormEvent } from 'react'

type FamilyMember = { name: string; relation: string; age: string; education: string; occupation: string; phone: string; place: 'കുവൈത്ത്' | 'നാട്ടിൽ' | '' }
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
  oathName: string
  oathDate: string
  recommenderName: string
  recommenderKkmaId: string
}

export default function Register(): React.JSX.Element {
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])

  const getTodayDdMmYy = (): string => {
    const now = new Date()
    const dd = String(now.getDate()).padStart(2, '0')
    const mm = String(now.getMonth() + 1).padStart(2, '0')
    const yy = String(now.getFullYear()).slice(-2)
    return `${dd}/${mm}/${yy}`
  }

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
    oathName: '',
    oathDate: getTodayDdMmYy(),
    recommenderName: '',
    recommenderKkmaId: '',
  })
  const defaultRelations = ['പിതാവ്', 'മാതാവ്', 'ഭാര്യ', 'ഭാര്യാ പിതാവ്', 'ഭാര്യാ മാതാവ്']
  const makeDefaultFamily = (): FamilyMember[] => [
    { name: '', relation: 'പിതാവ്', age: '', education: '', occupation: '', phone: '', place: '' },
    { name: '', relation: 'മാതാവ്', age: '', education: '', occupation: '', phone: '', place: '' },
    { name: '', relation: 'ഭാര്യ', age: '', education: '', occupation: '', phone: '', place: '' },
    { name: '', relation: 'ഭാര്യാ പിതാവ്', age: '', education: '', occupation: '', phone: '', place: '' },
    { name: '', relation: 'ഭാര്യാ മാതാവ്', age: '', education: '', occupation: '', phone: '', place: '' },
    // One child row to start with (relation selectable below)
    { name: '', relation: '', age: '', education: '', occupation: '', phone: '', place: '' },
  ]
  const [family, setFamily] = useState<FamilyMember[]>(makeDefaultFamily())
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  

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
        acknowledge: true,
        family,
        oathName: form.oathName,
        oathDate: form.oathDate,
        recommenderName: form.recommenderName,
        recommenderKkmaId: form.recommenderKkmaId,
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
          oathName: '',
          oathDate: getTodayDdMmYy(),
          recommenderName: '',
          recommenderKkmaId: '',
          })
        setFamily(makeDefaultFamily())
        if (previewUrl) URL.revokeObjectURL(previewUrl)
        setPreviewUrl('')
        
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
              <h2 style={{color:'white'}}>അംഗത്തിനുള്ള അപേക്ഷ ഫോറം</h2>
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
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                <h4 style={{ marginBottom: 16, color: '#16a34a', }}>പ്രാഥമിക വിവരങ്ങൾ</h4>
                  <div className="row clearfix">
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>പേര്*</label>
                      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                 
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>ബ്ലഡ് ഗ്രൂപ്പ്</label>
                      <input type="text" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>അംഗത്വ തരം*</label>
                      <select name="membershipType" value={form.membershipType} onChange={handleChange} required style={inputBoxStyle}>
                        <option value="new">New</option>
                        <option value="renew">Renew</option>
                      </select>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-8 col-sm-12 form-group">
                      <label>Photo*</label>
                      <input type="file" name="photo" accept="image/*" onChange={handleChange} required />
                      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 6 }}>Upload a clear, recent passport-size photo (JPG/PNG).</p>
                    </div>
                  {previewUrl && <div className="col-md-4 col-sm-12 form-group" style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-block', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
                        <img src={previewUrl || 'https://via.placeholder.com/120x120?text=Preview'} alt="Preview" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 6 }} />
                      </div>
                    </div>}
                  </div>
                </div>

                {/* Contact & IDs */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 16, color: '#16a34a', }}>കോൺടാക്ട് ഐഡന്റിഫിക്കേഷൻ വിവരങ്ങൾ</h4>
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
                      <label>മൊബൈൽ നമ്പര്‍ 2</label>
                      <input type="tel" name="mobile2" value={form.mobile2} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group">
                      <label>വാട്സ്ആപ് നമ്പര്‍</label>
                      <input type="tel" name="whatsappnumber" value={form.whatsappnumber} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                  </div>
                </div>

                {/* Address & Profession */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 16, color: '#16a34a', }}>കോണ്ടാക്ട് വിവരങ്ങൾ</h4>
                  <div className="row clearfix">
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>കുവൈത്തില്‍ താമസിക്കുന്ന സ്ഥലം</label>
                      <input name="addressinKuwait" value={form.addressinKuwait} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group">
                      <label>തൊഴില്‍</label>
                      <input type="text" name="proffession" value={form.proffession} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group">
                      <label>വിദ്യാഭ്യാസ യോഗ്യത </label>
                      <input type="text" name="qualification" value={form.qualification} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>ഇന്ത്യയിലെ വീട്ടു പേര്*</label>
                      <input type="text" name="addressinIndia" value={form.addressinIndia} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group">
                      <label>സ്ഥലം*</label>
                      <input type="text" name="locationinIndia" value={form.locationinIndia} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group">
                      <label>സംസ്ഥാനം*</label>
                      <input type="text" name="stateinIndia" value={form.stateinIndia} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group">
                      <label>ജില്ലാം*</label>
                      <input type="text" name="districtinIndia" value={form.districtinIndia} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>പഞ്ചായത്ത്/മുനിസിപ്പാലിറ്റി/കോര്‍പറേഷന്‍*</label>
                      <input type="text" name="panchayath" value={form.panchayath} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group">
                      <label>പോസ്റ്റ് ഓഫീസ്*</label>
                      <input type="text" name="postoffice" value={form.postoffice} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    
                    <div className="col-md-2 col-sm-12 form-group">
                      <label>പിന്കോഡ്</label>
                      <input type="tel" name="pincode" value={form.pincode} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-5 col-sm-12 form-group">
                      <label>ഇന്ത്യയില്‍ ബന്ധപ്പെടാനുള്ള നമ്പര്‍*</label>
                      <input type="tel" name="contactnumberinIndia" value={form.contactnumberinIndia} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-5 col-sm-12 form-group">
                      <label>ഇന്ത്യന്‍ നമ്പര്‍ 2</label>
                      <input type="tel" name="contactnumberiindia2" value={form.contactnumberiindia2} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                  </div>
                </div>

                {/* Family Members */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <div className="row clearfix" style={{ alignItems: 'center' }}>
                    <div className="col-md-8 col-sm-12">
                      <h5 style={{ marginBottom: 16, color: '#16a34a',}}>കുടുംബ വിവരങ്ങള്‍ (നിലവില്‍ ജീവിച്ചിരിക്കുന്നവര്‍ മാത്രം) </h5>
                    </div>
                    
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-12 col-sm-12">
                      <div style={{ overflowX: 'auto' }}>
                        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead style={{ background: '#fafafa' }}>
                            <tr>
                            <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>ബന്ധം</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>പേര്*</th>
 
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>വയസ്സ്</th>
   
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>സ്ഥലം</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>ആക്ഷന്‍സ്</th>
                            </tr>
                          </thead>
                          <tbody>
                            {family.map((row, idx) => (
                              <tr key={idx}>
                                   <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  {defaultRelations.includes(row.relation) ? (
                                    <input type="text" value={row.relation} readOnly style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }} />
                                  ) : (
                                    <select value={row.relation} onChange={(e) => setFamily((arr) => arr.map((r, i) => i === idx ? { ...r, relation: e.target.value } : r))} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }}>
                                      <option value="">തിരഞ്ഞെടുക്കുക</option>
                                      <option value="മകന്‍">മകന്‍</option>
                                      <option value="മകള്‍">മകള്‍</option>
                                    </select>
                                  )}
                                </td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <input type="text" value={row.name} onChange={(e) => setFamily((arr) => arr.map((r, i) => i === idx ? { ...r, name: e.target.value } : r))} required style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }} />
                                </td>
                             
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <input type="text" value={row.age} onChange={(e) => setFamily((arr) => arr.map((r, i) => i === idx ? { ...r, age: e.target.value } : r))} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }} />
                                </td>
                              
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <select value={row.place} onChange={(e) => setFamily((arr) => arr.map((r, i) => i === idx ? { ...r, place: e.target.value as FamilyMember['place'] } : r))} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }}>
                                    <option value="">തിരഞ്ഞെടുക്കുക</option>
                                    <option value="കുവൈത്തില്‍">കുവൈത്തില്‍</option>
                                    <option value="നാട്ടിൽ">നാട്ടിൽ</option>
                                  </select>
                                </td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  {idx >= defaultRelations.length ? (
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
                            {/* Bottom add control under Relation column */}
                            <tr>
                            <td colSpan={1}>
                                <span
                                  onClick={() => setFamily((f) => [...f, { name: '', relation: '', age: '', education: '', occupation: '', phone: '', place: '' }])}
                                  style={{ color: '#16a34a', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                                  onMouseEnter={(e) => { e.currentTarget.style.color = '#000' }}
                                  onMouseLeave={(e) => { e.currentTarget.style.color = '#16a34a' }}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                  </svg>
                                  മക്കൾ
                                </span>
                            
                             
                              </td>
                             
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Contacts */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <div className="row clearfix" style={{ alignItems: 'center' }}>
                    <div className="col-md-12 col-sm-12">
                      <h5 style={{ marginBottom: 16, color: '#16a34a',}}> അടിയന്തിര ഘട്ടങ്ങളില്‍ ബന്ധപ്പെടാനുള്ള ബന്ധുവിന്‍റെയോ, സുഹൃത്തിന്‍റെയോ നമ്പര്‍ </h5>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-12 col-sm-12">
                      <div style={{ overflowX: 'auto' }}>
                        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>പേര്*</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>ഫോൺ*</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>ബന്ധു/സുഹൃത്ത്</th>
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
                                    
                                    required style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }}
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
                                    
                                    required style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }}
                                  />
                                </td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <select
                                    value={row.relation}
                                    onChange={(e) => setForm((s) => ({
                                      ...s,
                                      emergencyContacts: s.emergencyContacts.map((r, i) => i === idx ? { ...r, relation: e.target.value } : r)
                                    }))}
                                    style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }}
                                  >
                                    <option value="">തിരഞ്ഞെടുക്കുക</option>
                                    <option value="ബന്ധു">ബന്ധു</option>
                                    <option value="സുഹൃത്ത്">സുഹൃത്ത്</option>
                                  </select>
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
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 16, color: '#16a34a', }}>അംഗങ്ങൾ അറിഞ്ഞിരിക്കേണ്ട , പാലിച്ചിരിക്കേണ്ടതായ  നിയമാവലികൾ</h4>
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
                      <span>കുടുംബ സഹായ പദ്ധതി/അംഗത്വ ക്ഷേമ പദ്ധതി പോലുള്ള അംഗത്വപരമായ നിര്‍ബന്ധ ബാധ്യതകള്‍ നല്‍കുവാനുള്ള സര്‍ക്കുലര്‍ കിട്ടിക്കഴിഞ്ഞാല്‍ വിഹിതം, നിശ്ചയിച്ച തിയ്യതിക്കകം ബ്രാഞ്ച് ഭാരവാഹികളെ ഏല്പിക്കണം. അത് മെമ്പര്‍മാരുടെ ഉത്തരവാദിത്വമാണ്.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span>പുതിയ മെമ്പര്‍മാര്‍ക്ക് അവരുടെ അംഗത്വ അപേക്ഷ,രസീതി തിയ്യതി മുതല്‍ 3 മാസങ്ങള്‍ക്ക് ശേഷം മാത്രമേ കെ.കെ.എം.എ.യുടെ ക്ഷേമ പദ്ധതികള്‍ക്ക് അര്‍ഹരാവുകയുള്ളൂ. എന്നാല്‍ അംഗത്വം എടുത്തതിന് ശേഷം പ്രാബല്യത്തില്‍ വരുന്ന എല്ലാ സ്കീമുകളും അടക്കുവാന്‍ ഈ മെമ്പര്‍മാര്‍ ബാധ്യസ്ഥരായിരിക്കും.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span>മെമ്പര്‍മാര്‍ ചുരുങ്ങിയത് മാസത്തില്‍ ഒരിക്കലെങ്കിലും ബ്രാഞ്ച് ഭാരവാഹികളുമായി ബന്ധപ്പെടുകയും,സംഘടനാ കാര്യങ്ങള്‍ അറിഞ്ഞിരിക്കുകയും വേണം. അംഗങ്ങളുടെ വിലാസമോ, ഫോണ്‍ നമ്പറോ മാറുകയാണെങ്കില്‍,വിവരങ്ങള്‍ യഥാസമയം ബ്രാഞ്ച് ഭാരവാഹികളെ അറിയിക്കേണ്ടതാണ്.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span>ദേശ വിരുദ്ധ പ്രവര്‍ത്തനങ്ങളിലും,മദ്യം,മയക്ക് മരുന്ന്,ചൂതാട്ടം തുടങ്ങിയ സാമൂഹ്യ തിന്മകളിലും,അധാര്‍മിക പ്രവര്‍ത്തനങ്ങളിലും ഏര്‍പ്പെടുന്നവരുടെ അംഗത്വം മുന്‍കാല പ്രാബല്യത്തോടെ തനിയെ നഷ്ട്ടപ്പെടുന്നതായിരിക്കും. അംഗത്വത്തിനുള്ള അപേക്ഷകള്‍ സ്വീകരിക്കുവാനും, കാരണം കാണിക്കാതെ തിരസ്കരിക്കുവാനും,മെമ്പര്‍മാരുടെ അംഗത്വം റദ്ദാക്കാനും അധികാരം കെ.കെ.എം.എയുടെ കേന്ദ്ര കമ്മിറ്റിയില്‍ നിക്ഷിപ്തമാണ്.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span>ആത്മഹത്യ ചെയ്യുന്ന അംഗങ്ങളുടെ കുടുംബങ്ങള്‍ കെ.കെ.എം.എ നല്‍കുന്ന യാതൊരു അനുകൂല്യങ്ങള്‍ക്കോ, ക്ഷേമ പദ്ധതികള്‍ക്കോ അര്‍ഹരായിരിക്കുകയില്ല.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span>എല്ലാ മെമ്പര്‍മാരും കെ.കെ.എം.എ കേന്ദ്ര കമ്മിറ്റിയുടെ അധികാര പരിധിയില്‍ ഉള്ളവരും, മെമ്പര്‍മാരെ സംബന്ധിച്ചുള്ള അവസാന തീരുമാനം എടുക്കാനുള്ള അധികാരം കെ.കെ.എം.എ കേന്ദ്ര കമ്മിറ്റിയില്‍ നിക്ഷിപ്തമായിരിക്കുകയും ചെയ്യും. ഏതെങ്കിലും വ്യക്തികള്‍ക്കോ,സ്റ്റാര്‍ ക്ലബ് മെമ്പര്‍മാര്‍ക്കോ മെമ്പര്‍മാരുടെ ഉത്തരവാദിത്തം ഏറ്റെടുക്കാന്‍ സാധിക്കില്ല.</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                      <span aria-hidden="true" style={{ color: '#16a34a', marginTop: 2 }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </span>
                      <span>അംഗങ്ങള്‍ കുവൈത്തില്‍ നിന്നും യാത്ര പുറപ്പെട്ട്  6 മാസം കഴിയുകയും,തിരിച്ചെത്താതിരിക്കുകയും ചെയ്താല്‍  അംഗത്വം സ്വമേധയാ നഷ്ട്ടപ്പെടുന്നതായിരിക്കും.</span>
                    </li>
                  </ul>
                 </div>

                {/* Oath / Affidavit */}
                <div className="sidebar-widget" style={{ padding: 20, border: '1px solid #eee', borderRadius: 12, marginBottom: 20 }}>
                  <h4 style={{ marginBottom: 16, color: '#16a34a', }}>സത്യവാചകം</h4>
                  <p style={{ marginBottom: 16, color: '#374151' }}>മുകളില്‍ കൊടുത്ത എല്ലാ നിബന്ധനകളും , മറ്റ് നിയമാവലികളും ഞാന്‍ വായിച്ച് മനസ്സിലാക്കി എന്നും, ഇവയെല്ലാം പാലിച്ച് കൊള്ളെന്നും ഇതിനാല്‍ ഉറപ്പ് നല്‍കുന്നു.  
                  </p>
                  <div className="row clearfix">
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>പേര്*</label>
                      <input type="text" name="oathName" value={form.oathName} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>തീയ്യതി*</label>
                      <input
                        type="text"
                        name="oathDate"
                        value={form.oathDate}
                        onChange={handleChange}
                        placeholder="dd/mm/yy"
                        pattern="^\d{2}\/\d{2}\/\d{2}$"
                        title="Format: dd/mm/yy"
                        required style={inputBoxStyle}
                      />
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>നിര്‍ദ്ദേശിച്ച മെമ്പറുടെ പേര്*</label>
                      <input type="text" name="recommenderName" value={form.recommenderName} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group">
                      <label>കെ.കെ.എം.എ ഐഡി*</label>
                      <input type="text" name="recommenderKkmaId" value={form.recommenderKkmaId} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="form-group">
                  <button
                    type="submit"
                    className="theme-btn"
                    disabled={submitting}
                    style={{ cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.6 : 1 }}
                  >
                    {submitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>


          </div>
        </div>
      </section>

      {/* Rules Modal removed; rules are displayed inline above */}
    </div>
  )
}

