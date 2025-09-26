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
  const contentRef = useRef<HTMLDivElement>(null)

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
    if (!contentRef.current) return
    const element = contentRef.current
    const scale = Math.min(3, 2480 / Math.max(element.clientWidth, 1))
    const canvas = await html2canvas(element, {
      scale,
      backgroundColor: '#ffffff',
      useCORS: true,
      logging: false,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    })

    const imgData = canvas.toDataURL('image/png')
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()

    const marginHorizontal = 2 // mm - minimal left/right margins
    const marginVertical = 5 // mm - keep top/bottom margins
    const contentWidth = pageWidth - marginHorizontal * 2

    // Compute base image size within content width
    const baseImgWidth = contentWidth
    const baseImgHeight = (canvas.height * baseImgWidth) / canvas.width

    // Scale down so the total image height spans at most 2 pages (within margins)
    const targetPages = 2
    const pageHeightAvailable = pageHeight - marginVertical * 2
    // Calculate scale to fit content evenly across 2 pages
    const scaleToTwoPages = Math.min(1, (targetPages * pageHeightAvailable) / baseImgHeight)
    const imgWidth = baseImgWidth * scaleToTwoPages
    const imgHeight = baseImgHeight * scaleToTwoPages

    // Center horizontally within margins
    const x = marginHorizontal + (contentWidth - imgWidth) / 2
    const yStart = marginVertical

    // Split content evenly across pages
    const contentPerPage = imgHeight / 2
    
    // First page - top half
    pdf.addImage(imgData, 'PNG', x, yStart, imgWidth, imgHeight)
    
    // Second page - bottom half
    if (imgHeight > pageHeightAvailable) {
      pdf.addPage()
      const secondPagePosition = yStart - contentPerPage
      pdf.addImage(imgData, 'PNG', x, secondPagePosition, imgWidth, imgHeight)
    }

    const safeName = String(item?.fullName || 'application').replace(/[^a-z0-9\-]+/gi, '_')
    pdf.save(`${safeName}_application.pdf`)
  }

  if (loading) return <div className="auto-container" style={{ padding: 16 }}>Loading...</div>
  if (error || !item) return <div className="auto-container" style={{ padding: 16, color: '#991b1b' }}>{error || 'Not found'}</div>

  return (
    <div className="auto-container admin-modal" style={{ padding: 16 }}>
      <div ref={contentRef} className="pdf-root" style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 16 }}>
        <div className="print-header" style={{ textAlign: 'center', position: 'relative', border: '1px solid #e5e7eb', background: '#f8fafc', borderRadius: 8, padding: 12, paddingRight: 112, marginBottom: 12, minHeight: 100 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 18 }}>KUWAIT KERALA MUSLIM ASSOCIATION [KKMA]</div>
            <div style={{ fontWeight: 700 }}>കുവൈറ്റ് കേരള മുസ്ലിം അസോസിയേഷൻ</div>
            <div style={{ fontWeight: 700 }}>അംഗത്തിനുള്ള അപേക്ഷ ഫോറം</div>
          </div>
          <div style={{ height: 3, background: '#2563eb', borderRadius: 2, marginTop: 8 }} />
          {item.photoPath ? (
            <img crossOrigin="anonymous" src={item.photoPath.startsWith('http') ? item.photoPath : `${baseUrl}${item.photoPath}`} alt="Photo" style={{ position: 'absolute', right: 12, top: 12, width: 80, height: 80, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }} />
          ) : null}
        </div>

        <DetailBody baseUrl={baseUrl} selected={item} />
      </div>

      <div className="print-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb', paddingTop: 12, marginTop: 12 }}>
        <Link to="/admin/memberships" className="theme-btn">Back</Link>
        <div style={{ display: 'flex', gap: 8 }}>
          {/* <button type="button" className="theme-btn" onClick={handleDownloadPdf}>Download PDF</button> */}
          <button type="button" className="theme-btn" onClick={() => window.print()}>Print</button>
        </div>
      </div>
    </div>
  )
}

function Field(props: { label: string; value: React.ReactNode; full?: boolean }): React.JSX.Element {
  const { label, value, full } = props
  return (
    <div style={{ gridColumn: full ? 'span 3 / span 3' : undefined }}>
      <div className="field-label" style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>{label}</div>
      <div className="field-value value-box" style={{ color: '#111827', border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 12px', background: '#fff' }}>{value}</div>
    </div>
  )
}

function InputField(props: { label: string; value?: string; placeholder?: string }): React.JSX.Element {
  const { label, value, placeholder } = props
  return (
    <div>
      <div className="field-label" style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>{label}</div>
      <input type="text" defaultValue={value || ''} placeholder={placeholder} style={{ width: '100%', color: '#111827', border: '1px solid #e5e7eb', borderRadius: 8, padding: '10px 12px', background: '#fff' }} />
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
        <Field label="സിവില്‍ ഐഡി നമ്പര്*" value={selected.extra?.civilId || '—'} />
        <Field label="പാസ്പോർട്ട് നമ്പര്*" value={selected.extra?.passport || '—'} />
        <Field label="മൊബൈൽ നമ്പര്‍" value={selected.phone || '—'} />
        <Field label="മൊബൈൽ നമ്പര്‍ 2" value={selected.extra?.mobile2 || '—'} />
        <Field label="വാട്സ്ആപ്പ് നമ്പര്‍" value={selected.extra?.whatsappnumber || '—'} />
      </div>

      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 12 }}>
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
      <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
        <Field label="പിൻകോഡ്" value={selected.extra?.pincode || '—'} />
        <Field label="ഇന്ത്യയിലെ ബന്ധപ്പെടാനുള്ള നമ്പർ" value={selected.extra?.contactnumberinIndia || '—'} />
        <Field label="ഇന്ത്യൻ നമ്പർ 2" value={selected.extra?.contactnumberiindia2 || '—'} />
      </div>

      <div style={{ marginTop: 16 }}>
        <h5 style={{ margin: '0 0 8px 0', padding: '6px 10px', background: '#eff6ff', borderLeft: '4px solid #2563eb', borderRadius: 6, color: '#111827' }}>അടിയന്തിര ഘട്ടങ്ങളില്‍ ബന്ധപ്പെടാനുള്ള ബന്ധുവിന്‍റെയോ, സുഹൃത്തിന്‍റെയോ നമ്പര്‍</h5>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>പേര്</th>
                <th>ഫോൺ</th>
                <th>ബന്ധം</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(selected.extra?.emergencyContacts) && selected.extra.emergencyContacts.map((c: any, i: number) => (
                <tr key={i}>
                  <td>{c?.name || '—'}</td>
                  <td>{c?.phone || '—'}</td>
                  <td>{c?.relation || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <h5 style={{ margin: '0 0 8px 0', padding: '6px 10px', background: '#eff6ff', borderLeft: '4px solid #2563eb', borderRadius: 6, color: '#111827' }}>കുടുംബ വിവരങ്ങള്‍</h5>
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>ബന്ധം</th>
                <th>പേര്</th>
                <th>വയസ്സ്</th>
                <th>സ്ഥലം</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(selected.extra?.family) && selected.extra.family.map((f: any, i: number) => (
                <tr key={i}>
                  <td>{f?.relation || '—'}</td>
                  <td>{f?.name || '—'}</td>
                  <td>{f?.age || '—'}</td>
                  <td>{f?.place || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: 16 }}>
        <h5 style={{ margin: '0 0 8px 0', padding: '6px 10px', background: '#eff6ff', borderLeft: '4px solid #2563eb', borderRadius: 6, color: '#111827' }}>അംഗങ്ങൾ അറിഞ്ഞിരിക്കേണ്ട , പാലിച്ചിരിക്കേണ്ടതായ  നിയമാവലികൾ</h5>
        <ul className="rules-list" style={{ margin: 0, paddingLeft: 20, listStyleType: 'disc' }}>
          <li>കുവൈത്ത് കേരള മുസ്ലിം അസോസിയേഷന്‍ (കെ.കെ.എം.എ) കുവൈത്തില്‍ പ്രവര്‍ത്തിക്കുന്ന ഒരു സ്വതന്ത്ര സംഘടനയാണ്.</li>
          <li>കുവൈത്തിലോ,ഇന്ത്യയിലോ പ്രവര്‍ത്തിക്കുന്ന ഒരു സംഘടനയുടെയും പോഷക സംഘടന അല്ല.</li>
          <li>അംഗങ്ങള്‍ ഇസ്ലാമിക ചര്യ അനുസരിച്ച് ജീവിക്കുന്നവരും,സ്വഭാവത്തില്‍ വിശുദ്ധി കാത്ത് സൂക്ഷിക്കുന്നവരും ആയിരിക്കണം.</li>
          <li>കെ.കെ.എം.എ നടപ്പിലാക്കുന്ന കുടുംബ ക്ഷേമ പദ്ധതി,അംഗത്വ ക്ഷേമ പദ്ധതി തുടങ്ങിയ സോഷ്യല്‍ ക്ഷേമ പദ്ധതികളുമായി സഹകരിക്കാന്‍ അംഗങ്ങള്‍ ബാധ്യസ്ഥരാണ്.</li>
          <li>കുടുംബ സഹായ പദ്ധതി/അംഗത്വ ക്ഷേമ പദ്ധതി പോലുള്ള അംഗത്വപരമായ നിര്‍ബന്ധ ബാധ്യതകള്‍ നല്‍കുവാനുള്ള സര്‍ക്കുലര്‍ കിട്ടിക്കഴിഞ്ഞാല്‍ വിഹിതം, നിശ്ചയിച്ച തിയ്യതിക്കകം ബ്രാഞ്ച് ഭാരവാഹികളെ ഏല്പിക്കണം. അത് മെമ്പര്‍മാരുടെ ഉത്തരവാദിത്വമാണ്.</li>
          <li>പുതിയ മെമ്പര്‍മാര്‍ക്ക് അവരുടെ അംഗത്വ അപേക്ഷ,രസീതി തിയ്യതി മുതല്‍ 3 മാസങ്ങള്‍ക്ക് ശേഷം മാത്രമേ കെ.കെ.എം.എ.യുടെ ക്ഷേമ പദ്ധതികള്‍ക്ക് അര്‍ഹരാവുകയുള്ളൂ. എന്നാല്‍ അംഗത്വം എടുത്തതിന് ശേഷം പ്രാബല്യത്തില്‍ വരുന്ന എല്ലാ സ്കീമുകളും അടക്കുവാന്‍ ഈ മെമ്പര്‍മാര്‍ ബാധ്യസ്ഥരായിരിക്കും.</li>
          <li>മെമ്പര്‍മാര്‍ ചുരുങ്ങിയത് മാസത്തില്‍ ഒരിക്കലെങ്കിലും ബ്രാഞ്ച് ഭാരവാഹികളുമായി ബന്ധപ്പെടുകയും,സംഘടനാ കാര്യങ്ങള്‍ അറിഞ്ഞിരിക്കുകയും വേണം. അംഗങ്ങളുടെ വിലാസമോ, ഫോണ്‍ നമ്പറോ മാറുകയാണെങ്കില്‍,വിവരങ്ങള്‍ യഥാസമയം ബ്രാഞ്ച് ഭാരവാഹികളെ അറിയിക്കേണ്ടതാണ്.</li>
          <li>ദേശ വിരുദ്ധ പ്രവര്‍ത്തനങ്ങളിലും,മദ്യം,മയക്ക് മരുന്ന്,ചൂതാട്ടം തുടങ്ങിയ സാമൂഹ്യ തിന്മകളിലും,അധാര്‍മിക പ്രവര്‍ത്തനങ്ങളിലും ഏര്‍പ്പെടുന്നവരുടെ അംഗത്വം മുന്‍കാല പ്രാബല്യത്തോടെ തനിയെ നഷ്ട്ടപ്പെടുന്നതായിരിക്കും. അംഗത്വത്തിനുള്ള അപേക്ഷകള്‍ സ്വീകരിക്കുവാനും, കാരണം കാണിക്കാതെ തിരസ്കരിക്കുവാനും,മെമ്പര്‍മാരുടെ അംഗത്വം റദ്ദാക്കാനും അധികാരം കെ.കെ.എം.എയുടെ കേന്ദ്ര കമ്മിറ്റിയില്‍ നിക്ഷിപ്തമാണ്.</li>
          <li>ആത്മഹത്യ ചെയ്യുന്ന അംഗങ്ങളുടെ കുടുംബങ്ങള്‍ കെ.കെ.എം.എ നല്‍കുന്ന യാതൊരു അനുകൂല്യങ്ങള്‍ക്കോ, ക്ഷേമ പദ്ധതികള്‍ക്കോ അര്‍ഹരായിരിക്കുകയില്ല.</li>
          <li>എല്ലാ മെമ്പര്‍മാരും കെ.കെ.എം.എ കേന്ദ്ര കമ്മിറ്റിയുടെ അധികാര പരിധിയില്‍ ഉള്ളവരും, മെമ്പര്‍മാരെ സംബന്ധിച്ചുള്ള അവസാന തീരുമാനം എടുക്കാനുള്ള അധികാരം കെ.കെ.എം.എ കേന്ദ്ര കമ്മിറ്റിയില്‍ നിക്ഷിപ്തമായിരിക്കുകയും ചെയ്യും. ഏതെങ്കിലും വ്യക്തികള്‍ക്കോ,സ്റ്റാര്‍ ക്ലബ് മെമ്പര്‍മാര്‍ക്കോ മെമ്പര്‍മാരുടെ ഉത്തരവാദിത്വം ഏറ്റെടുക്കാന്‍ സാധിക്കില്ല.</li>
          <li>അംഗങ്ങള്‍ കുവൈത്തില്‍ നിന്നും യാത്ര പുറപ്പെട്ട് 6 മാസം കഴിയുകയും,തിരിച്ചെത്താതിരിക്കുകയും ചെയ്താല്‍  അംഗത്വം സ്വമേധയാ നഷ്ട്ടപ്പെടുന്നതായിരിക്കും.</li>
        </ul>
      </div>

      {(selected.extra?.oathName || selected.extra?.oathDate || selected.extra?.recommenderName || selected.extra?.recommenderKkmaId) && (
        <div style={{ marginTop: 16 }}>
          <h5 style={{ margin: '0 0 8px 0', padding: '6px 10px', background: '#eff6ff', borderLeft: '4px solid #2563eb', borderRadius: 6, color: '#111827' }}>സത്യവാചകം</h5>
          <p style={{ margin: '0 0 8px 0' }}>മുകളില്‍ കൊടുത്ത എല്ലാ നിബന്ധനകളും , മറ്റ് നിയമാവലികളും ഞാന്‍ വായിച്ച് മനസ്സിലാക്കി എന്നും, ഇവയെല്ലാം പാലിച്ച്കൊള്ളെന്നും ഇതിനാല്‍ ഉറപ്പ് നല്‍കുന്നു.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
            <Field label="പേര്" value={selected.extra?.oathName || '—'} />
            <Field label="തീയ്യതി" value={selected.extra?.oathDate || '—'} />
            <Field label="നിര്‍ദ്ദേശിച്ച മെമ്പറുടെ പേര്" value={selected.extra?.recommenderName || '—'} />
            <Field label="കെ.കെ.എം.എ ഐഡി" value={selected.extra?.recommenderKkmaId || '—'} />
          </div>
        </div>
      )}

      <div style={{ marginTop: 16, paddingTop: 8, borderTop: '1px dashed #e5e7eb' }}>
        <h5 style={{ margin: '0 0 8px 0', padding: '6px 10px', background: '#eff6ff', borderLeft: '4px solid #2563eb', borderRadius: 6, color: '#111827', textTransform: 'uppercase' }}>FOR OFFICIAL USE ONLY</h5>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
          <InputField label="സോണല്‍ (Zone)" value={selected.extra?.zone || ''} />
          <InputField label="ബ്രാഞ്ച് (Branch)" value={selected.extra?.branch || selected.branch || ''} />
          <InputField label="യൂണിറ്റ് (Unit)" value={selected.extra?.unit || ''} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12, marginTop: 8 }}>
          <InputField label="കെ.കെ.എം.എ ഐഡി" value={selected.extra?.recommenderKkmaId || ''} />
          <InputField label="BRANCH APPROVED BY (NAME)" value={selected.extra?.branchApprovedByName || ''} />
          <InputField label="DATE (DD/MM/YYYY)" value={selected.extra?.branchApprovedDate || ''} placeholder="DD/MM/YYYY" />
        </div>
      </div>
    </div>
  )
} 