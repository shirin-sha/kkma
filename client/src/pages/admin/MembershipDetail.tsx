import React, { useEffect, useMemo, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export default function AdminMembershipDetail(): React.JSX.Element {
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])
  const { id } = useParams()
  const [item, setItem] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError('')
        const res = await fetch(`${baseUrl}/api/membership/applications/${id}`)
        const data = await res.json()
        if (res.ok && data?.ok) setItem(data.item)
        else setError(data?.error || 'Failed to load')
      } catch {
        setError('Failed to load')
      } finally {
        setLoading(false)
      }
    }
    if (id) run()
  }, [id, baseUrl])

  const handleDownloadPdf = async () => {
    const element = document.getElementById("pdf-content"); // your div id
  
    if (!element) {
      console.error("Element not found!");
      return;
    }
  
    try {
      // Convert HTML to Canvas
      const canvas = await html2canvas(element, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL("image/png");
  
      // Create PDF (Portrait, mm, A4)
      const pdf = new jsPDF("p", "mm", "a4");
  
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
  
      // Image props
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
  
      // Compute explicit break offsets (in mm) from .page-break markers
      const containerRect = element.getBoundingClientRect();
      const totalDomHeight = Math.max(element.scrollHeight, containerRect.height);
      const breakOffsetsMm = Array.from(element.querySelectorAll('.page-break'))
        .map((el) => {
          const r = (el as HTMLElement).getBoundingClientRect();
          const domY = Math.max(0, (r.top - containerRect.top) + element.scrollTop);
          const ratio = totalDomHeight > 0 ? domY / totalDomHeight : 0;
          return imgHeight * ratio;
        })
        .filter((mm) => mm > 0.1 && mm < imgHeight - 0.1)
        .sort((a, b) => a - b);
  
      // Walk the content: start new pages at natural page breaks OR the next .page-break marker, whichever comes first
      let yOffset = 0; // in mm, top of the visible slice within the big image
      let iBreak = 0;
      let pageIndex = 0;
      while (yOffset < imgHeight - 0.1) {
        if (pageIndex > 0) pdf.addPage();
        const position = -yOffset; // shift image up to show the correct slice
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  
        const nextNatural = yOffset + pdfHeight; // next page boundary
        if (iBreak < breakOffsetsMm.length && breakOffsetsMm[iBreak] > yOffset + 0.1 && breakOffsetsMm[iBreak] < nextNatural - 0.1) {
          yOffset = breakOffsetsMm[iBreak];
          iBreak += 1;
        } else {
          yOffset = nextNatural;
        }
        pageIndex += 1;
      }
  
      const safeName = String(item?.fullName || 'application').replace(/[^a-z0-9\-]+/gi, '_');
      pdf.save(`${safeName}_application.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  if (loading) return <div className="auto-container" style={{ padding: 16 }}>Loading...</div>
  if (error || !item) return <div className="auto-container" style={{ padding: 16, color: '#991b1b' }}>{error || 'Not found'}</div>

  return (
    <div>
      <section className="contact-section" style={{ paddingTop: 0, paddingBottom: '60px' }} >
        <div className="auto-container">
          <style>{`@media print { .no-print { display: none !important; } }`}</style>
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <Link to="/admin/memberships" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#83b253', textDecoration: 'none', fontWeight: 600 }}>
              <span aria-hidden="true" style={{ display: 'inline-flex' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#83b253" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </span>
              Back
            </Link>
            <span role="button" tabIndex={0} onClick={handleDownloadPdf} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleDownloadPdf(); }} aria-label="Download PDF" title="Download PDF" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, color: '#83b253', fontWeight: 600 }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#83b253" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Download
            </span>
          </div>
          <div  id="pdf-content" style={{
            borderRadius: '12px',
            padding: '32px',
            background: '#fefefe',
            boxShadow: '0 8px 24px rgba(131, 178, 83, 0.15)'
          }} >
            <div   style={{ 
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
              border: '2px solid #9bc46a',
              position: 'relative'
            }} className="form-header-card">
              <img src="/logo/KKMA-LOGO.png" alt="KKMA" style={{ width: 96, height: 96, objectFit: 'contain' }} />
              <div style={{ textAlign: 'center', paddingRight: item.photoPath ? 112 : 0 }}>
                <div style={{ fontWeight: 800, fontSize: 20, marginBottom: 8, textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>KUWAIT KERALA MUSLIM ASSOCIATION [KKMA]</div>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>കുവൈറ്റ് കേരള മുസ്ലിം അസോസിയേഷൻ</div>
                <div style={{ fontWeight: 700, fontSize: 16, textShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>അംഗത്തിനുള്ള അപേക്ഷ ഫോറം</div>
              </div>
              {item.photoPath ? (
                <img crossOrigin="anonymous" src={item.photoPath.startsWith('http') ? item.photoPath : `${baseUrl}${item.photoPath}`} alt="Photo" style={{ position: 'absolute', right: 12, top: 12, width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '2px solid #e5e7eb', background: '#fff' }} />
              ) : null}
            </div>

            <div  className="pdf-root"> 
              {/* Primary details */}
              <div className="sidebar-widget" style={{ 
                padding: 24, 
                border: '2px solid #e5e7eb', 
                borderRadius: 12, 
                marginBottom: 24,
                background: '#fefefe',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <DetailBody baseUrl={baseUrl} selected={item} />
              </div>

              {/* Rules */}
              
              <div className="sidebar-widget" style={{ 
                padding: 24, 
                border: '2px solid #e5e7eb', 
                borderRadius: 12, 
                marginBottom: 24,
                background: '#fefefe',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <h4 style={{ 
                  marginBottom: 12, 
                  color: '#83b253', 
                  fontSize: 18,
                  fontWeight: 700,
                  borderBottom: '2px solid #83b253',
                  paddingBottom: 8
                }}>അംഗങ്ങൾ അറിഞ്ഞിരിക്കേണ്ട , പാലിച്ചിരിക്കേണ്ടതായ  നിയമാവലികൾ</h4>
                <ul className="rules-list" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <span className="bullet" style={{ color: '#83b253', fontWeight: 700, marginTop: 2 }}>●</span>
                    <span>കുവൈത്ത് കേരള മുസ്ലിം അസോസിയേഷന്‍ (കെ.കെ.എം.എ) കുവൈത്തില്‍ പ്രവര്‍ത്തിക്കുന്ന ഒരു സ്വതന്ത്ര സംഘടനയാണ്.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <span className="bullet" style={{ color: '#83b253', fontWeight: 700, marginTop: 2 }}>●</span>
                    <span>കുവൈത്തിലോ,ഇന്ത്യയിലോ പ്രവര്‍ത്തിക്കുന്ന ഒരു സംഘടനയുടെയും പോഷക സംഘടന അല്ല.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <span className="bullet" style={{ color: '#83b253', fontWeight: 700, marginTop: 2 }}>●</span>
                    <span>അംഗങ്ങള്‍ ഇസ്ലാമിക ചര്യ അനുസരിച്ച് ജീവിക്കുന്നവരും,സ്വഭാവത്തില്‍ വിശുദ്ധി കാത്ത് സൂക്ഷിക്കുന്നവരും ആയിരിക്കണം.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <span className="bullet" style={{ color: '#83b253', fontWeight: 700, marginTop: 2 }}>●</span>
                    <span>കെ.കെ.എം.എ നടപ്പിലാക്കുന്ന കുടുംബ ക്ഷേമ പദ്ധതി,അംഗത്വ ക്ഷേമ പദ്ധതി തുടങ്ങിയ സോഷ്യല്‍ ക്ഷേമ പദ്ധതികളുമായി സഹകരിക്കാന്‍ അംഗങ്ങള്‍ ബാധ്യസ്ഥരാണ്.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <span className="bullet" style={{ color: '#83b253', fontWeight: 700, marginTop: 2 }}>●</span>
                    <span>കുടുംബ സഹായ പദ്ധതി/അംഗത്വ ക്ഷേമ പദ്ധതി പോലുള്ള അംഗത്വപരമായ നിര്‍ബന്ധ ബാധ്യതകള്‍ നല്‍കുവാനുള്ള സര്്ക്കുലര്‍ കിട്ടിക്കഴിഞ്ഞാല്‍ വിഹിതം, നിശ്ചയിച്ച തിയ്യതിക്കകം ബ്രാഞ്ച് ഭാരവാഹികളെ ഏല്പിക്കണം. അത് മെമ്പര്‍മാരുടെ ഉത്തരവാദിത്വമാണ്.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <span className="bullet" style={{ color: '#83b253', fontWeight: 700, marginTop: 2 }}>●</span>
                    <span>പുതിയ മെമ്പര്‍മാര്‍ക്ക് അവരുടെ അംഗത്വ അപേക്ഷ,രസീതി തിയ്യതി മുതല്‍ 3 മാസങ്ങള്‍ക്ക് ശേഷം മാത്രമേ കെ.കെ.എം.എ.യുടെ ക്ഷേമ പദ്ധതികള്‍ക്ക് അര്‍ഹരാവുകയുള്ളൂ. എന്നാല്‍ അംഗത്വം എടുത്തതിന് ശേഷം പ്രാബല്യത്തില്‍ വരുന്ന എല്ലാ സ്കീമുകളും അടക്കുവാന്‍ ഈ മെമ്പര്‍മാര്‍ ബാധ്യസ്തരായിരിക്കും.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <span className="bullet" style={{ color: '#83b253', fontWeight: 700, marginTop: 2 }}>●</span>
                    <span>മെമ്പര്‍മാര്‍ ചുരുങ്ങിയത് മാസത്തില്‍ ഒരിക്കലെങ്കിലും ബ്രാഞ്ച് ഭാരവാഹികളുമായി ബന്ധപ്പെടുകയും,സംഘടനാ കാര്യങ്ങള്‍ അറിഞ്ഞിരിക്കുകയും വേണം. അംഗങ്ങളുടെ വിലാസമോ, ഫോണ്‍ നമ്പറോ മാറുകയാണെങ്കില്‍,വിവരങ്ങള്‍ യഥാസമയം ബ്രാഞ്ച് ഭാരവാഹികളെ അറിയിക്കേണ്ടതാണ്.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <span className="bullet" style={{ color: '#83b253', fontWeight: 700, marginTop: 2 }}>●</span>
                    <span>ദേശ വിരുദ്ധ പ്രവര്‍ത്തനങ്ങളിലും,മദ്യം,മയക്ക് മരുന്ന്,ചൂതാട്ടം തുടങ്ങിയ സാമൂഹ്യ തിന്മകളിലും,അധാര്‍മിക പ്രവര്‍ത്തനങ്ങളിലും ഏര്‍പ്പെടുന്നവരുടെ അംഗത്വം മുന്‍കാല പ്രാബല്യത്തോടെ തനിയെ നഷ്ട്ടപ്പെടുന്നതായിരിക്കും. അംഗത്വത്തിനുള്ള അപേക്ഷകള്‍ സ്വീകരിക്കുവാനും, കാരണം കാണിക്കാതെ തിരസ്കരിക്കുവാനും,മെമ്പര്‍മാരുടെ അംഗത്വം റദ്ദാക്കാനും അധികാരം കെ.കെ.എം.എയുടെ കേന്ദ്ര കമ്മിറ്റിയില്‍ നിക്ഷിപ്തമാണ്.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <span className="bullet" style={{ color: '#83b253', fontWeight: 700, marginTop: 2 }}>●</span>
                    <span>ആത്മഹത്യ ചെയ്യുന്ന അംഗങ്ങളുടെ കുടുംബങ്ങള്‍ കെ.കെ.എം.എ നല്‍കുന്ന യാതൊരു അനുകൂല്യങ്ങള്‍ക്കോ, ക്ഷേമ പദ്ധതികള്‍ക്കോ അര്‍ഹരായിരിക്കുകയില്ല.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                    <span className="bullet" style={{ color: '#83b253', fontWeight: 700, marginTop: 2 }}>●</span>
                    <span>എല്ലാ മെമ്പര്‍മാരും കെ.കെ.എം.എ കേന്ദ്ര കമ്മിറ്റിയുടെ അധികാര പരിധിയില്‍ ഉള്ളവരും, മെമ്പര്‍മാരെ സംബന്ധിച്ചുള്ള അവസാന തീരുമാനം എടുക്കാനുള്ള അധികാരം കെ.കെ.എം.എ കേന്ദ്ര കമ്മിറ്റിയില്‍ നിക്ഷിപ്തമായിരിക്കുകയും ചെയ്യും. ഏതെങ്കിലും വ്യക്തികള്‍ക്കോ,സ്റ്റാര്‍ ക്ലബ് മെമ്പര്‍മാര്‍ക്കോ മെമ്പര്‍മാരുടെ ഉത്തരവാദിത്വം ഏറ്റെടുക്കാന്‍ സാധിക്കില്ല.</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span className="bullet" style={{ color: '#83b253', fontWeight: 700, marginTop: 2 }}>●</span>
                    <span>അംഗങ്ങള്‍ കുവൈത്തില്‍ നിന്നും യാത്ര പുറപ്പെട്ട് 6 മാസം കഴിയുകയും,തിരിച്ചെത്താതിരിക്കുകയും ചെയ്താല്‍  അംഗത്വം സ്വമേധയാ നഷ്ട്ടപ്പെടുന്നതായിരിക്കും.</span>
                  </li>
                </ul>
              </div>

              {/* Oath */}
              {(item.extra?.oathName || item.extra?.oathDate || item.extra?.recommenderName || item.extra?.recommenderKkmaId) && (
                <div className="sidebar-widget " style={{ 
                  padding: 24, 
                  border: '2px solid #e5e7eb', 
                  borderRadius: 12, 
                  marginBottom: 24,
                  background: '#fefefe',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                }}>
                  <h4 style={{ 
                    marginBottom: 12, 
                    color: '#83b253', 
                    fontSize: 18,
                    fontWeight: 700,
                    borderBottom: '2px solid #83b253',
                    paddingBottom: 8
                  }}>സത്യവാചകം</h4>
                  <p style={{ margin: '0 0 12px 0', color: '#374151' }}>മുകളില്‍ കൊടുത്ത എല്ലാ നിബന്ധനകളും , മറ്റ് നിയമാവലികളും ഞാന്‍ വായിച്ച് മനസ്സിലാക്കി എന്നും, ഇവയെല്ലാം പാലിച്ച്കൊള്ളെന്നും ഇതിനാല്‍ ഉറപ്പ് നല്‍കുന്നു.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 12 }}>
                    <Field label="പേര്" value={item.extra?.oathName || '—'} />
                    <Field label="തീയ്യതി" value={item.extra?.oathDate || '—'} />
                    <Field label="നിര്‍ദ്ദേശിച്ച മെമ്പറുടെ പേര്" value={item.extra?.recommenderName || '—'} />
                    <Field label="നിർദേശിച്ച മെമ്പറുടെ കെ.കെ.എം.എ ഐഡി" value={item.extra?.recommenderKkmaId || '—'} />
                  </div>
                </div>
              )}

              {/* Official use only */}
              <div className="sidebar-widget" style={{ 
                padding: 24, 
                border: '2px solid #e5e7eb', 
                borderRadius: 12, 
                marginBottom: 24,
                background: '#fefefe',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
              }}>
                <h4 style={{ 
                  marginBottom: 12, 
                  color: '#83b253', 
                  fontSize: 18,
                  fontWeight: 700,
                  borderBottom: '2px solid #83b253',
                  paddingBottom: 8
                }}>FOR OFFICIAL USE ONLY</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                  <InputField label="സോണല്‍ (Zone)" value={item.extra?.zone || ''} />
                  <InputField label="ബ്രാഞ്ച് (Branch)" value={item.extra?.branch || item.branch || ''} />
                  <InputField label="യൂണിറ്റ് (Unit)" value={item.extra?.unit || ''} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginTop: 8 }}>
                  <InputField label="കെ.കെ.എം.എ ഐഡി" value={item.extra?.recommenderKkmaId || ''} />
                  <InputField label="BRANCH APPROVED BY (NAME)" value={item.extra?.branchApprovedByName || ''} />
                  <InputField label="DATE (DD/MM/YYYY)" value={item.extra?.branchApprovedDate || ''} placeholder="DD/MM/YYYY" />
                </div>
              </div>
            </div>

          
          </div>
        </div>
        
      </section>
    </div>
  )
}

function Field(props: { label: string; value: React.ReactNode; full?: boolean }): React.JSX.Element {
  const { label, value, full } = props
  return (
    <div style={{ gridColumn: full ? 'span 3 / span 3' : undefined }}>
      <div className="field-label" style={{ fontWeight: 600, color: '#374151', marginBottom: 8 }}>{label}</div>
      <div className="field-value value-box" style={{ color: '#111827', border: '2px solid #d1d5db', borderRadius: 6, padding: '12px 14px', background: '#fff', fontSize: '14px' }}>{value}</div>
    </div>
  )
}

function InputField(props: { label: string; value?: string; placeholder?: string }): React.JSX.Element {
  const { label, value, placeholder } = props
  return (
    <div>
      <div className="field-label" style={{ fontWeight: 600, color: '#374151', marginBottom: 8 }}>{label}</div>
      <input type="text" defaultValue={value || ''} placeholder={placeholder} style={{ width: '100%', color: '#111827', border: '2px solid #d1d5db', borderRadius: 6, padding: '12px 14px', background: '#fff', fontSize: '14px', transition: 'border-color 0.2s ease, box-shadow 0.2s ease' }} />
    </div>
  )
}

function DetailBody({ baseUrl, selected }: { baseUrl: string; selected: any }) {
  return (
    <div className="print-body">
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        <Field label="പേര്" value={selected.fullName} />
        <Field label="ബ്ലഡ് ഗ്രൂപ്പ്" value={selected.extra?.bloodGroup || '—'} />
        <Field label="അംഗത്വ തരം" value={selected.applicationType} />
      </div>

      <div style={{ marginTop: 16 }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
          <Field label="സിവില്‍ ഐഡി നമ്പര്*" value={selected.extra?.civilId || '—'} />
          <Field label="പാസ്പോർട്ട് നമ്പര്*" value={selected.extra?.passport || '—'} />
          <Field label="മൊബൈൽ നമ്പര്‍" value={selected.phone || '—'} />
          <Field label="മൊബൈൽ നമ്പര്‍ 2" value={selected.extra?.mobile2 || '—'} />
          <Field label="വാട്സ്ആപ്പ് നമ്പര്‍" value={selected.extra?.whatsappnumber || '—'} />
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
          <Field label="കുവൈത്തില്‍ താമസിക്കുന്ന സ്ഥലം" value={selected.extra?.addressinKuwait || selected.address || '—'} />
          <Field label="തൊഴിൽ" value={selected.extra?.proffession || '—'} />
          <Field label="വിദ്യാഭ്യാസ യോഗ്യത" value={selected.extra?.qualification || '—'} />
        </div>
        <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
          <Field label="ഇന്ത്യയിലെ വീട്ടുപേര്" value={selected.extra?.addressinIndia || '—'} />
          <Field label="സ്ഥലം" value={selected.extra?.locationinIndia || '—'} />
          <Field label="സംസ്ഥാനം" value={selected.extra?.stateinIndia || '—'} />
        </div>
        <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 12 }}>
          <Field label="ജില്ല" value={selected.extra?.districtinIndia || '—'} />
          <Field label="പഞ്ചായത്ത്/മുനിസിപ്പാലിറ്റി/കോര്‍പറേഷന്‍" value={selected.extra?.panchayath || '—'} />
          <Field label="പോസ്റ്റ് ഓഫീസ്" value={selected.extra?.postoffice || '—'} />
        </div>
        <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: 12 }}>
          <Field label="പിൻകോഡ്" value={selected.extra?.pincode || '—'} />
          <Field label="ഇന്ത്യയിലെ ബന്ധപ്പെടാനുള്ള നമ്പർ" value={selected.extra?.contactnumberinIndia || '—'} />
          <Field label="ഇന്ത്യൻ നമ്പർ 2" value={selected.extra?.contactnumberiindia2 || '—'} />
        </div>
      </div>


      <div style={{ marginTop: 16 }}>
        <h4 style={{ 
          marginBottom: 12, 
          color: '#83b253', 
          fontSize: 18,
          fontWeight: 700,
          borderBottom: '2px solid #83b253',
          paddingBottom: 8
        }}>കുടുംബ വിവരങ്ങള്‍ (നിലവില്‍ ജീവിച്ചിരിക്കുന്നവര്‍ മാത്രം)</h4>
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #e5e7eb', padding: 8, background: '#fafafa' }}>ബന്ധം</th>
                <th style={{ border: '1px solid #e5e7eb', padding: 8, background: '#fafafa' }}>പേര്</th>
                <th style={{ border: '1px solid #e5e7eb', padding: 8, background: '#fafafa' }}>വയസ്സ്</th>
                <th style={{ border: '1px solid #e5e7eb', padding: 8, background: '#fafafa' }}>സ്ഥലം</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(selected.extra?.family) && selected.extra.family.map((f: any, i: number) => (
                <tr key={i}>
                  <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{f?.relation || '—'}</td>
                  <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{f?.name || '—'}</td>
                  <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{f?.age || '—'}</td>
                  <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{f?.place || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div style={{ marginTop: 16 }}>
        <h4 style={{ 
          marginBottom: 12, 
          color: '#83b253', 
          fontSize: 18,
          fontWeight: 700,
          borderBottom: '2px solid #83b253',
          paddingBottom: 8
        }}>അടിയന്തിര ഘട്ടങ്ങളില്‍ ബന്ധപ്പെടാനുള്ള ബന്ധുവിന്‍റെയോ, സുഹൃത്തിന്‍റെയോ നമ്പര്‍</h4>
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #e5e7eb' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #e5e7eb', padding: 8, background: '#fafafa' }}>പേര്</th>
                <th style={{ border: '1px solid #e5e7eb', padding: 8, background: '#fafafa' }}>ഫോൺ</th>
                <th style={{ border: '1px solid #e5e7eb', padding: 8, background: '#fafafa' }}>ബന്ധം</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(selected.extra?.emergencyContacts) && selected.extra.emergencyContacts.map((c: any, i: number) => (
                <tr key={i}>
                  <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{c?.name || '—'}</td>
                  <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{c?.phone || '—'}</td>
                  <td style={{ border: '1px solid #e5e7eb', padding: 8 }}>{c?.relation || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
} 