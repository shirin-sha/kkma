import React, { useEffect, useMemo, useState } from 'react'

type ApplicationItem = {
  _id: string
  applicationType: 'new' | 'renew'
  fullName: string
  branch?: string
  phone?: string
  email?: string
  address?: string
  photoPath?: string
  status: 'submitted' | 'approved' | 'rejected'
  createdAt: string
  extra?: any
}

type ListResponse = {
  ok: boolean
  items: ApplicationItem[]
  page: number
  limit: number
  total: number
}

export default function AdminMemberships(): React.JSX.Element {
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])
  const [items, setItems] = useState<ApplicationItem[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<ApplicationItem | null>(null)

  const formatDate = (iso?: string) => {
    if (!iso) return ''
    try {
      const d = new Date(iso)
      return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false }).format(d)
    } catch {
      return iso
    }
  }

  const fetchItems = async (p = page) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/membership/applications?page=${p}&limit=${limit}`)
      const data: ListResponse = await res.json()
      if (res.ok && data?.ok) {
        setItems(data.items || [])
        setTotal(data.total || 0)
        setPage(data.page || 1)
      } else {
        setError(((data as any)?.error as string) || 'Failed to load applications')
      }
    } catch (e: any) {
      setError('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h3 style={{ margin: 0 }}>Membership Applications</h3>
        <div style={{ color: '#6b7280' }}>{total} total</div>
      </div>

      {error && (
        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: 10, borderRadius: 8, marginBottom: 12 }}>{error}</div>
      )}

      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 10 }}>Name</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 10 }}>Phone</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 10 }}>Email</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 10 }}>Branch</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 10 }}>Type</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 10 }}>Created</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 10 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} style={{ padding: 12, color: '#6b7280' }}>Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={7} style={{ padding: 12, color: '#6b7280' }}>No applications found.</td></tr>
              ) : (
                items.map((it) => (
                  <tr key={it._id}>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 10 }}>{it.fullName}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 10 }}>{it.phone || '—'}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 10 }}>{it.email || '—'}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 10 }}>{it.branch || '—'}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 10 }}>{it.applicationType}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 10 }}>{formatDate(it.createdAt)}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: 10 }}>
                      <span
                        onClick={() => setSelected(it)}
                        style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#000' }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#2563eb' }}
                      >
                        View
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 10, borderTop: '1px solid #e5e7eb' }}>
          <div style={{ color: '#6b7280' }}>Page {page} of {totalPages}</div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span
              onClick={page > 1 ? () => fetchItems(page - 1) : undefined}
              style={{ color: page <= 1 ? '#9ca3af' : '#2563eb', cursor: page <= 1 ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
              onMouseEnter={(e) => { if (page > 1) e.currentTarget.style.color = '#000' }}
              onMouseLeave={(e) => { if (page > 1) e.currentTarget.style.color = '#2563eb' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              Prev
            </span>
            <span
              onClick={page < totalPages ? () => fetchItems(page + 1) : undefined}
              style={{ color: page >= totalPages ? '#9ca3af' : '#2563eb', cursor: page >= totalPages ? 'not-allowed' : 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}
              onMouseEnter={(e) => { if (page < totalPages) e.currentTarget.style.color = '#000' }}
              onMouseLeave={(e) => { if (page < totalPages) e.currentTarget.style.color = '#2563eb' }}
            >
              Next
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </span>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <div style={{ width: '100%', maxWidth: 900, background: '#fff', borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column', maxHeight: '90vh' }}>
            <div style={{ padding: 16, borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h4 style={{ margin: 0 }}>Application Detail</h4>
              <span
                onClick={() => setSelected(null)}
                style={{ color: '#6b7280', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#000' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Close
              </span>
            </div>
            <div style={{ padding: 16, overflowY: 'auto', flex: '1 1 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                <Field label="Full Name" value={selected.fullName} />
                <Field label="Branch" value={selected.branch || '—'} />
                <Field label="Phone" value={selected.phone || '—'} />
                <Field label="Email" value={selected.email || '—'} />
                <Field label="Type" value={selected.applicationType} />
                <Field label="Status" value={selected.status} />
                <Field label="Created At" value={formatDate(selected.createdAt)} />
              </div>

              {selected.address && (
                <div style={{ marginTop: 12 }}>
                  <Field label="Address" value={selected.address} full />
                </div>
              )}

              {/* Extra fields */}
              {selected.extra && (
                <div style={{ marginTop: 16 }}>
                  <h5 style={{ margin: '0 0 8px 0' }}>Extra</h5>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 12 }}>
                    <Field label="Blood Group" value={selected.extra?.bloodGroup || '—'} />
                    <Field label="Civil ID" value={selected.extra?.civilId || '—'} />
                    <Field label="WhatsApp" value={selected.extra?.whatsappnumber || '—'} />
                    <Field label="Profession" value={selected.extra?.proffession || '—'} />
                    <Field label="Qualification" value={selected.extra?.qualification || '—'} />
                  </div>

                  {/* Emergency Contacts */}
                  {Array.isArray(selected.extra?.emergencyContacts) && selected.extra.emergencyContacts.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      <h5 style={{ margin: '0 0 8px 0' }}>Emergency Contacts</h5>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Name</th>
                              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Relation</th>
                              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Phone</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selected.extra.emergencyContacts.map((c: any, i: number) => (
                              <tr key={i}>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{c?.name || '—'}</td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{c?.relation || '—'}</td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{c?.phone || '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Family Members */}
                  {Array.isArray(selected.extra?.family) && selected.extra.family.length > 0 && (
                    <div style={{ marginTop: 12 }}>
                      <h5 style={{ margin: '0 0 8px 0' }}>Family Members</h5>
                      <div style={{ overflowX: 'auto' }}>
                        <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <thead>
                            <tr>
                              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Name</th>
                              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Relation</th>
                              <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: 8 }}>Age</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selected.extra.family.map((f: any, i: number) => (
                              <tr key={i}>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{f?.name || '—'}</td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{f?.relation || '—'}</td>
                                <td style={{ borderBottom: '1px solid #f3f4f6', padding: 8 }}>{f?.age || '—'}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Photo Preview */}
              {selected.photoPath && (
                <div style={{ marginTop: 16 }}>
                  <h5 style={{ margin: '0 0 8px 0' }}>Photo</h5>
                  <img
                    src={selected.photoPath.startsWith('http') ? selected.photoPath : `${baseUrl}${selected.photoPath}`}
                    alt="Photo"
                    style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }}
                  />
                </div>
              )}
            </div>
            <div style={{ padding: 16, borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="theme-btn" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Field(props: { label: string; value: React.ReactNode; full?: boolean }): React.JSX.Element {
  const { label, value, full } = props
  return (
    <div style={{ gridColumn: full ? 'span 3 / span 3' : undefined }}>
      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 600 }}>{value}</div>
    </div>
  )
} 