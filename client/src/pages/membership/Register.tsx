import React, { useMemo, useState, ChangeEvent, FormEvent } from 'react'

type FamilyMember = { name: string; relation: string; age: string; education: string; occupation: string; phone: string; place: 'കുവൈത്ത്' | 'നാട്ടിൽ' | '' }
type EmergencyContact = { name: string; relation: string; phone: string }

type FormState = {
  membershipType: 'new' | 'renew'
  branch: string
  kkmaId: string
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
    branch: '',
    kkmaId: '',
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
  const defaultRelations = ['പിതാവ് (Father)', 'മാതാവ് (Mother)', 'ഭാര്യ (Wife)', 'ഭാര്യാ പിതാവ് (Father-in-law)', 'ഭാര്യാ മാതാവ് (Mother-in-law)']
  const makeDefaultFamily = (): FamilyMember[] => [
    { name: '', relation: 'പിതാവ് (Father)', age: '', education: '', occupation: '', phone: '', place: '' },
    { name: '', relation: 'മാതാവ് (Mother)', age: '', education: '', occupation: '', phone: '', place: '' },
    { name: '', relation: 'ഭാര്യ (Wife)', age: '', education: '', occupation: '', phone: '', place: '' },
    { name: '', relation: 'ഭാര്യാ പിതാവ് (Father-in-law)', age: '', education: '', occupation: '', phone: '', place: '' },
    { name: '', relation: 'ഭാര്യാ മാതാവ് (Mother-in-law)', age: '', education: '', occupation: '', phone: '', place: '' },
    // One child row to start with (relation selectable below)
    { name: '', relation: '', age: '', education: '', occupation: '', phone: '', place: '' },
  ]
  const [family, setFamily] = useState<FamilyMember[]>(makeDefaultFamily())
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  

  const inputBoxStyle: React.CSSProperties = {
    width: '100%',
    border: '2px solid #d1d5db',
    borderRadius: 6,
    padding: '12px 14px',
    background: '#fff',
    fontSize: '16px',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  }

  const inputFocusStyle: React.CSSProperties = {
    borderColor: '#83b253',
    boxShadow: '0 0 0 3px rgba(131, 178, 83, 0.1)',
    outline: 'none',
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
      fd.append('branch', form.branch)
      fd.append('fullName', form.fullName)
      fd.append('phone', form.mobile)
      fd.append('address', form.addressinKuwait)
      if (form.photo) fd.append('photo', form.photo)

      const extra = {
        kkmaId: form.kkmaId,
        bloodGroup: form.bloodGroup,
        civilId: form.civilId,
        passport: form.passport,
        mobile2: form.mobile2,
        whatsappnumber: form.whatsappnumber,
        addressinKuwait: form.addressinKuwait,
        proffession: form.proffession,
        qualification: form.qualification,
        addressinIndia: form.addressinIndia,
        locationinIndia: form.locationinIndia,
        stateinIndia: form.stateinIndia,
        districtinIndia: form.districtinIndia,
        panchayath: form.panchayath,
        postoffice: form.postoffice,
        pincode: form.pincode,
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
          membershipType: 'new', branch: '', kkmaId: '', fullName: '', bloodGroup: '', civilId: '', mobile: '', mobile2: '', whatsappnumber: '',
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
            <h1>KKMA Membership Form (അംഗത്വ ഫോറം)</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li>KKMA Membership Form (അംഗത്വ ഫോറം)</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="contact-section" style={{ paddingTop: 0, paddingBottom: '60px' }}>
        <div className="auto-container">
          <div style={{
            borderRadius: '12px',
            padding: '32px',
            background: '#fefefe',
            boxShadow: '0 8px 24px rgba(131, 178, 83, 0.15)'
          }}>
            {/* Header Section */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: 16,
              background: 'linear-gradient(135deg, #83b253 0%, #6b9142 100%)',
              color: '#fff',
              padding: '24px',
              borderRadius: '12px',
              marginBottom: '32px',
              boxShadow: '0 10px 25px rgba(131, 178, 83, 0.2)',
              border: '2px solid #9bc46a'
            }}>
              <img src="/logo/KKMA-LOGO.png" alt="KKMA" style={{ width: 96, height: 96, objectFit: 'contain' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>KUWAIT KERALA MUSLIM ASSOCIATION [KKMA]</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>കുവൈറ്റ് കേരള മുസ്ലിം അസോസിയേഷൻ</div>
                <div style={{ fontWeight: 700, fontSize: 16, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>അംഗത്വത്തിനുള്ള അപേക്ഷ ഫോറം</div>
              </div>
            </div>

            {message && (
              <div style={{ 
                background: message.includes('successfully') ? '#f0fdf4' : '#fef2f2', 
                border: `2px solid ${message.includes('successfully') ? '#bbf7d0' : '#fecaca'}`, 
                color: message.includes('successfully') ? '#15803d' : '#dc2626', 
                padding: 16, 
                borderRadius: 8, 
                marginBottom: 20,
                fontWeight: 600,
                textAlign: 'center'
              }}>{message}</div>
            )}
            <div className="row clearfix">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <form className="default-form form-lite" onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="sidebar-widget" style={{ 
                  padding: 24, 
                  border: '2px solid #e5e7eb', 
                  borderRadius: 12, 
                  marginBottom: 24,
                  background: '#fefefe',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                                 <h4 style={{ 
                   marginBottom: 20, 
                   color: '#83b253', 
                   fontSize: 18,
                   fontWeight: 700,
                   borderBottom: '2px solid #83b253',
                   paddingBottom: 8
                 }}>പ്രാഥമിക വിവരങ്ങൾ (Primary Details)</h4>
                  <div className="row clearfix">
                    <div className="col-md-4 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>പേര് (Name)*</label>
                      <input type="text" name="fullName" value={form.fullName} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                 
                    <div className="col-md-4 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>ബ്ലഡ് ഗ്രൂപ്പ് (Blood Group)</label>
                      <input type="text" name="bloodGroup" value={form.bloodGroup} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>അംഗത്വ തരം (Membership Type)*</label>
                      <select name="membershipType" value={form.membershipType} onChange={handleChange} required style={inputBoxStyle}>
                        <option value="new">New (പുതിയത്)</option>
                        <option value="renew">Renew (പുതുക്കൽ)</option>
                      </select>
                    </div>
                  </div>
                  <div className="row clearfix">
                  <div className="col-md-4 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>നിങ്ങൾ ചേരാൻ ആഗ്രഹിക്കുന്ന ബ്രാഞ്ച് (The branch you want to join)*</label>
                      <select name="branch" value={form.branch} onChange={handleChange} required style={inputBoxStyle}>
                        <option value="">തിരഞ്ഞെടുക്കുക (Select Branch)</option>
                        <option value="ABBASIYA">ABBASIYA</option>
                        <option value="ABU HALEEFA">ABU HALEEFA</option>
                        <option value="CITY">CITY</option>
                        <option value="FAHAHEEL">FAHAHEEL</option>
                        <option value="FARWANIYA">FARWANIYA</option>
                        <option value="FINTHAS">FINTHAS</option>
                        <option value="HAWALLY">HAWALLY</option>
                        <option value="JAHARA">JAHARA</option>
                        <option value="JLEEB">JLEEB</option>
                        <option value="KARNATAKA">KARNATAKA</option>
                        <option value="KHAITHAN">KHAITHAN</option>
                        <option value="MAHABOULA">MAHABOULA</option>
                        <option value="MANGAF">MANGAF</option>
                        <option value="SABHAN">SABHAN</option>
                        <option value="SALMIYA">SALMIYA</option>
                      </select>
                      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 8, fontStyle: 'italic' }}>പുതുക്കുന്നവർ അവരുടെ നിലവിലുള്ള ബ്രാഞ്ച് സെലക്ട് ചെയ്യുക (Renewals should select their current branch)</p>
                    </div>
                    
                    <div className="col-md-4 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>കെ.കെ.എം.എ ഐഡി നമ്പർ <br/>KKMA ID Number</label>
                      <input type="text" name="kkmaId" value={form.kkmaId} onChange={handleChange} style={inputBoxStyle} />
                      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 8, fontStyle: 'italic' }}>പുതുക്കുന്നവർക്ക് മാത്രം (For renewers only)</p>
                    </div>
                  
                    <div className="col-md-4 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>ഫോട്ടോ <br/> (Photo)*</label>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <input type="file" name="photo" accept="image/*" onChange={handleChange} required style={{ 
                            ...inputBoxStyle, 
                            padding: '10px 14px',
                            cursor: 'pointer',
                            fontSize: '14px'
                          }} />
                        </div>
                        {previewUrl && (
                          <div style={{ flexShrink: 0 }}>
                            <img src={previewUrl} alt="Preview" style={{ 
                              width: 60, 
                              height: 60, 
                              objectFit: 'cover', 
                              borderRadius: 6,
                              border: '2px solid #83b253',
                              background: '#f9fafb'
                            }} />
                          </div>
                        )}
                      </div>
                      <p style={{ fontSize: 12, color: '#6b7280', marginTop: 8, fontStyle: 'italic' }}>വ്യക്തമായ, ഏറ്റവും പുതിയ പാസ്പോർട്ട് സൈസ് ഫോട്ടോ അപ്ലോഡ് ചെയ്യുക (JPG/PNG).<br/>(Upload a clear, recent passport-size photo (JPG/PNG))</p>
                    </div>
                  </div>
                </div>

                {/* Contact & IDs */}
                <div className="sidebar-widget" style={{ 
                  padding: 24, 
                  border: '2px solid #e5e7eb', 
                  borderRadius: 12, 
                  marginBottom: 24,
                  background: '#fefefe',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                                     <h4 style={{ 
                     marginBottom: 20, 
                     color: '#83b253', 
                     fontSize: 18,
                     fontWeight: 700,
                     borderBottom: '2px solid #83b253',
                     paddingBottom: 8
                   }}>കോൺടാക്ട് ഐഡന്റിഫിക്കേഷൻ വിവരങ്ങൾ (Contact & Identification Details)</h4>
                  <div className="row clearfix">
                    <div className="col-md-4 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>സിവില്‍ ഐഡി നമ്പര്‍ (Civil ID Number)*</label>
                      <input type="text" name="civilId" value={form.civilId} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>പാസ്പോർട്ട് നമ്പര്‍ (Passport Number)*</label>
                      <input type="text" name="passport" value={form.passport} onChange={handleChange} required style={inputBoxStyle} />
                    </div>  
                 
                    <div className="col-md-4 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>മൊബൈൽ നമ്പര്‍ (Mobile Number)*</label>
                      <input type="tel" name="mobile" value={form.mobile} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>മൊബൈൽ നമ്പര്‍ 2 (Mobile Number 2)</label>
                      <input type="tel" name="mobile2" value={form.mobile2} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-4 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>വാട്സ്ആപ് നമ്പര്‍ (WhatsApp Number)</label>
                      <input type="tel" name="whatsappnumber" value={form.whatsappnumber} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                  </div>
                </div>

                {/* Address & Profession */}
                <div className="sidebar-widget" style={{ 
                  padding: 24, 
                  border: '2px solid #e5e7eb', 
                  borderRadius: 12, 
                  marginBottom: 24,
                  background: '#fefefe',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                                     <h4 style={{ 
                     marginBottom: 20, 
                     color: '#83b253', 
                     fontSize: 18,
                     fontWeight: 700,
                     borderBottom: '2px solid #83b253',
                     paddingBottom: 8
                   }}>കോണ്ടാക്ട് വിവരങ്ങൾ (Contact Details)</h4>
                  <div className="row clearfix">
                    <div className="col-md-6 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>കുവൈത്തില്‍ താമസിക്കുന്ന സ്ഥലം  <br/>(Address in Kuwait)</label>
                      <input name="addressinKuwait" value={form.addressinKuwait} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>തൊഴില്‍ <br/> (Profession)</label>
                      <input type="text" name="proffession" value={form.proffession} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>വിദ്യാഭ്യാസ യോഗ്യത (Educational Qualification)</label>
                      <input type="text" name="qualification" value={form.qualification} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>ഇന്ത്യയിലെ വീട്ടു പേര് (House Name in India)*</label>
                      <input type="text" name="addressinIndia" value={form.addressinIndia} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>സ്ഥലം (Place)*</label>
                      <input type="text" name="locationinIndia" value={form.locationinIndia} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>സംസ്ഥാനം (State)*</label>
                      <input type="text" name="stateinIndia" value={form.stateinIndia} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>ജില്ല <br/> (District)*</label>
                      <input type="text" name="districtinIndia" value={form.districtinIndia} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>പഞ്ചായത്ത്/മുനിസിപ്പാലിറ്റി/കോര്‍പറേഷന്‍ (Panchayath/Municipality/Corporation)*</label>
                      <input type="text" name="panchayath" value={form.panchayath} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-3 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>പോസ്റ്റ് ഓഫീസ്  <br/>(Post Office)*</label>
                      <input type="text" name="postoffice" value={form.postoffice} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    
                    <div className="col-md-2 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>പിൻകോഡ് <br/> (Pin Code)</label>
                      <input type="tel" name="pincode" value={form.pincode} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                    <div className="col-md-5 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>ഇന്ത്യയില്‍ ബന്ധപ്പെടാനുള്ള നമ്പര്‍ <br/>(Contact Number in India)*</label>
                      <input type="tel" name="contactnumberinIndia" value={form.contactnumberinIndia} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-5 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>ഇന്ത്യന്‍ നമ്പര്‍ 2  <br/>(Indian Number 2)</label>
                      <input type="tel" name="contactnumberiindia2" value={form.contactnumberiindia2} onChange={handleChange} style={inputBoxStyle} />
                    </div>
                  </div>
                </div>

                {/* Family Members */}
                <div className="sidebar-widget" style={{ 
                  padding: 24, 
                  border: '2px solid #e5e7eb', 
                  borderRadius: 12, 
                  marginBottom: 24,
                  background: '#fefefe',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                  <div className="row clearfix" style={{ alignItems: 'center' }}>
                    <div className="col-md-8 col-sm-12">
                                             <h5 style={{ 
                         marginBottom: 20, 
                         color: '#83b253',
                         fontSize: 18,
                         fontWeight: 700,
                         borderBottom: '2px solid #83b253',
                         paddingBottom: 8
                       }}>കുടുംബ വിവരങ്ങള്‍ (നിലവില്‍ ജീവിച്ചിരിക്കുന്നവര്‍ മാത്രം) (Family Details - Living Members Only) </h5>
                    </div>
                    
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-12 col-sm-12">
                      <div style={{ overflowX: 'auto' }}>
                        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead style={{ background: '#fafafa' }}>
                            <tr>
                            <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>ബന്ധം (Relation)</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>പേര് (Name)</th>
 
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>വയസ്സ് (Age)</th>
   
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>സ്ഥലം (Place)</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}> Action</th>
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
                                      <option value="">തിരഞ്ഞെടുക്കുക (Select)</option>
                                      <option value="മകന്‍">മകന്‍ (Son)</option>
                                      <option value="മകള്‍">മകള്‍ (Daughter)</option>
                                    </select>
                                  )}
                                </td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <input type="text" value={row.name} onChange={(e) => setFamily((arr) => arr.map((r, i) => i === idx ? { ...r, name: e.target.value } : r))} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }} />
                                </td>
                             
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <input type="text" value={row.age} onChange={(e) => setFamily((arr) => arr.map((r, i) => i === idx ? { ...r, age: e.target.value } : r))} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }} />
                                </td>
                              
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>
                                  <select value={row.place} onChange={(e) => setFamily((arr) => arr.map((r, i) => i === idx ? { ...r, place: e.target.value as FamilyMember['place'] } : r))} style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: 6, padding: '8px 10px', background: '#fff' }}>
                                    <option value="">തിരഞ്ഞെടുക്കുക (Select)</option>
                                    <option value="കുവൈത്തില്‍">കുവൈത്തില്‍ (In Kuwait)</option>
                                    <option value="നാട്ടിൽ">നാട്ടിൽ (In India)</option>
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
                                  style={{ color: '#83b253', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                                  onMouseEnter={(e) => { e.currentTarget.style.color = '#000' }}
                                  onMouseLeave={(e) => { e.currentTarget.style.color = '#83b253' }}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                  </svg>
                                  മക്കൾ (Children)
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
                <div className="sidebar-widget" style={{ 
                  padding: 24, 
                  border: '2px solid #e5e7eb', 
                  borderRadius: 12, 
                  marginBottom: 24,
                  background: '#fefefe',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                  <div className="row clearfix" style={{ alignItems: 'center' }}>
                    <div className="col-md-12 col-sm-12">
                                             <h5 style={{ 
                         marginBottom: 20, 
                         color: '#83b253',
                         fontSize: 18,
                         fontWeight: 700,
                         borderBottom: '2px solid #83b253',
                         paddingBottom: 8
                       }}> അടിയന്തിര ഘട്ടങ്ങളില്‍ ബന്ധപ്പെടാനുള്ള ബന്ധുവിന്‍റെയോ, സുഹൃത്തിന്‍റെയോ നമ്പര്‍ <br/>(Emergency Contact Numbers) </h5>
                    </div>
                  </div>
                  <div className="row clearfix">
                    <div className="col-md-12 col-sm-12">
                      <div style={{ overflowX: 'auto' }}>
                        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>പേര് (Name)*</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>ഫോൺ (Phone)*</th>
                              <th style={{ borderBottom: '1px solid #e5e7eb', padding: 8 }}>ബന്ധു/സുഹൃത്ത് (Relative/Friend)</th>
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
                                    <option value="">തിരഞ്ഞെടുക്കുക (Select)</option>
                                    <option value="ബന്ധു">ബന്ധു (Relative)</option>
                                    <option value="സുഹൃത്ത്">സുഹൃത്ത് (Friend)</option>
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
                <div className="sidebar-widget" style={{ 
                  padding: 24, 
                  border: '2px solid #e5e7eb', 
                  borderRadius: 12, 
                  marginBottom: 24,
                  background: '#fefefe',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                                     <h4 style={{ 
                     marginBottom: 20, 
                     color: '#83b253', 
                     fontSize: 18,
                     fontWeight: 700,
                     borderBottom: '2px solid #83b253',
                     paddingBottom: 8
                   }}>അംഗങ്ങൾ അറിഞ്ഞിരിക്കേണ്ട , പാലിച്ചിരിക്കേണ്ടതായ  നിയമാവലികൾ<br/> (Rules & Regulations for Members)</h4>
              <ul className="list" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#83b253', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>കുവൈത്ത് കേരള മുസ്ലിം അസോസിയേഷന്‍ (കെ.കെ.എം.എ) കുവൈത്തില്‍ പ്രവര്‍ത്തിക്കുന്ന ഒരു സ്വതന്ത്ര സംഘടനയാണ്.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#83b253', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>കുവൈത്തിലോ,ഇന്ത്യയിലോ പ്രവര്‍ത്തിക്കുന്ന ഒരു സംഘടനയുടെയും പോഷക സംഘടന അല്ല.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#83b253', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>അംഗങ്ങള്‍ ഇസ്ലാമിക ചര്യ അനുസരിച്ച് ജീവിക്കുന്നവരും,സ്വഭാവത്തില്‍ വിശുദ്ധി കാത്ത് സൂക്ഷിക്കുന്നവരും ആയിരിക്കണം.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#83b253', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                  <span>കെ.കെ.എം.എ നടപ്പിലാക്കുന്ന കുടുംബ ക്ഷേമ പദ്ധതി,അംഗത്വ ക്ഷേമ പദ്ധതി തുടങ്ങിയ സാമൂഹിക ക്ഷേമ പദ്ധതികളുമായി സഹകരിക്കാന്‍ അംഗങ്ങള്‍ ബാധ്യസ്ഥരാണ്.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#83b253', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                      <span>കുടുംബ സഹായ പദ്ധതി/അംഗത്വ ക്ഷേമ പദ്ധതി പോലുള്ള അംഗത്വപരമായ നിര്‍ബന്ധ ബാധ്യതകള്‍ നല്‍കുവാനുള്ള സര്‍ക്കുലര്‍ കിട്ടിക്കഴിഞ്ഞാല്‍ വിഹിതം, നിശ്ചയിച്ച തിയ്യതിക്കകം ബ്രാഞ്ച് ഭാരവാഹികളെ ഏല്പിക്കണം. അത് മെമ്പര്‍മാരുടെ ഉത്തരവാദിത്വമാണ്.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#83b253', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                      <span>പുതിയ മെമ്പര്‍മാര്‍ക്ക് അവരുടെ അംഗത്വ അപേക്ഷ,രസീതി തിയ്യതി മുതല്‍ 3 മാസങ്ങള്‍ക്ക് ശേഷം മാത്രമേ കെ.കെ.എം.എ.യുടെ ക്ഷേമ പദ്ധതികള്‍ക്ക് അര്‍ഹരാവുകയുള്ളൂ. എന്നാല്‍ അംഗത്വം എടുത്തതിന് ശേഷം പ്രാബല്യത്തില്‍ വരുന്ന എല്ലാ സ്കീമുകളും അടക്കുവാന്‍ ഈ മെമ്പര്‍മാര്‍ ബാധ്യസ്ഥരായിരിക്കും.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#83b253', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                      <span>മെമ്പര്‍മാര്‍ ചുരുങ്ങിയത് മാസത്തില്‍ ഒരിക്കലെങ്കിലും ബ്രാഞ്ച് ഭാരവാഹികളുമായി ബന്ധപ്പെടുകയും,സംഘടനാ കാര്യങ്ങള്‍ അറിഞ്ഞിരിക്കുകയും വേണം. അംഗങ്ങളുടെ വിലാസമോ, ഫോണ്‍ നമ്പറോ മാറുകയാണെങ്കില്‍,വിവരങ്ങള്‍ യഥാസമയം ബ്രാഞ്ച് ഭാരവാഹികളെ അറിയിക്കേണ്ടതാണ്.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#83b253', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                      <span>ദേശ വിരുദ്ധ പ്രവര്‍ത്തനങ്ങളിലും,മദ്യം,മയക്ക് മരുന്ന്,ചൂതാട്ടം തുടങ്ങിയ സാമൂഹ്യ തിന്മകളിലും,അധാര്‍മിക പ്രവര്‍ത്തനങ്ങളിലും ഏര്‍പ്പെടുന്നവരുടെ അംഗത്വം മുന്‍കാല പ്രാബല്യത്തോടെ തനിയെ നഷ്ട്ടപ്പെടുന്നതായിരിക്കും. അംഗത്വത്തിനുള്ള അപേക്ഷകള്‍ സ്വീകരിക്കുവാനും, കാരണം കാണിക്കാതെ തിരസ്കരിക്കുവാനും,മെമ്പര്‍മാരുടെ അംഗത്വം റദ്ദാക്കാനും അധികാരം കെ.കെ.എം.എയുടെ കേന്ദ്ര കമ്മിറ്റിയില്‍ നിക്ഷിപ്തമാണ്.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#83b253', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                      <span>ആത്മഹത്യ ചെയ്യുന്ന അംഗങ്ങളുടെ കുടുംബങ്ങള്‍ കെ.കെ.എം.എ നല്‍കുന്ന യാതൊരു അനുകൂല്യങ്ങള്‍ക്കോ, ക്ഷേമ പദ്ധതികള്‍ക്കോ അര്‍ഹരായിരിക്കുകയില്ല.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#83b253', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                      <span>എല്ലാ മെമ്പര്‍മാരും കെ.കെ.എം.എ കേന്ദ്ര കമ്മിറ്റിയുടെ അധികാര പരിധിയില്‍ ഉള്ളവരും, മെമ്പര്‍മാരെ സംബന്ധിച്ചുള്ള അവസാന തീരുമാനം എടുക്കാനുള്ള അധികാരം കെ.കെ.എം.എ കേന്ദ്ര കമ്മിറ്റിയില്‍ നിക്ഷിപ്തമായിരിക്കുകയും ചെയ്യും. ഏതെങ്കിലും വ്യക്തികള്‍ക്കോ,സ്റ്റാര്‍ ക്ലബ് മെമ്പര്‍മാര്‍ക്കോ മെമ്പര്‍മാരുടെ ഉത്തരവാദിത്തം ഏറ്റെടുക്കാന്‍ സാധിക്കില്ല.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <span aria-hidden="true" style={{ color: '#83b253', marginTop: 2 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </span>
                      <span>അംഗങ്ങള്‍ കുവൈത്തില്‍ നിന്നും യാത്ര പുറപ്പെട്ട്  6 മാസം കഴിയുകയും,തിരിച്ചെത്താതിരിക്കുകയും ചെയ്താല്‍  അംഗത്വം സ്വമേധയാ നഷ്ട്ടപ്പെടുന്നതായിരിക്കും.</span>
                </li>
                  </ul>
                 </div>

                {/* Oath / Affidavit */}
                <div className="sidebar-widget" style={{ 
                  padding: 24, 
                  border: '2px solid #e5e7eb', 
                  borderRadius: 12, 
                  marginBottom: 24,
                  background: '#fefefe',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                                     <h4 style={{ 
                     marginBottom: 20, 
                     color: '#83b253', 
                     fontSize: 18,
                     fontWeight: 700,
                     borderBottom: '2px solid #83b253',
                     paddingBottom: 8
                   }}>സത്യവാചകം (Oath/Affidavit)</h4>
                  <p style={{ marginBottom: 16, color: '#374151' }}>മുകളില്‍ കൊടുത്ത എല്ലാ നിബന്ധനകളും , മറ്റ് നിയമാവലികളും ഞാന്‍ വായിച്ച് മനസ്സിലാക്കി എന്നും, ഇവയെല്ലാം പാലിച്ച്കൊള്ളുമെന്നും ഇതിനാല്‍ ഉറപ്പ് നല്‍കുന്നു.  
                  </p>
                  <div className="row clearfix">
                    <div className="col-md-6 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>പേര് (Name)*</label>
                      <input type="text" name="oathName" value={form.oathName} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>തീയ്യതി (Date)*</label>
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
                    <div className="col-md-6 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>നിര്‍ദ്ദേശിച്ച മെമ്പറുടെ പേര്<br/> (Recommended Member Name)*</label>
                      <input type="text" name="recommenderName" value={form.recommenderName} onChange={handleChange} required style={inputBoxStyle} />
                    </div>
                    <div className="col-md-6 col-sm-12 form-group" style={{ marginBottom: '20px' }}>
                      <label style={{ fontWeight: 600, color: '#374151', marginBottom: 8, display: 'block' }}>നിർദേശിച്ച മെമ്പറുടെ കെ.കെ.എം.എ ഐഡി <br/> (Recommended Member KKMA ID)</label>
                      <input type="text" name="recommenderKkmaId" value={form.recommenderKkmaId} onChange={handleChange} style={inputBoxStyle} />
                    </div>
              </div>
            </div>

                {/* Submit */}
                <div className="form-group" style={{ textAlign: 'center', marginTop: 32 }}>
              <button
                    type="submit"
                className="theme-btn"
                    disabled={submitting}
                                         style={{ 
                       cursor: submitting ? 'not-allowed' : 'pointer', 
                       opacity: submitting ? 0.6 : 1,
                       background: submitting ? '#9ca3af' : 'linear-gradient(135deg, #83b253 0%, #6b9142 100%)',
                       border: 'none',
                       padding: '16px 32px',
                       fontSize: '16px',
                       fontWeight: 700,
                       borderRadius: '8px',
                       color: '#fff',
                       boxShadow: submitting ? 'none' : '0 4px 12px rgba(131, 178, 83, 0.3)',
                       transform: submitting ? 'none' : 'translateY(-1px)',
                       transition: 'all 0.2s ease'
                     }}
              >
                    {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Rules Modal removed; rules are displayed inline above */}
    </div>
  )
}

