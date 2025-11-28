import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/config'

type ContactItem = {
  _id: string
  name: string
  email: string
  subject?: string
  message: string
  createdAt: string
}

type ApiResponse = {
  ok: boolean
  items: ContactItem[]
  page: number
  limit: number
  total: number
}

export default function AdminContacts(): React.JSX.Element {
  const [items, setItems] = useState<ContactItem[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<ContactItem | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token !== 'admin-authenticated') {
      window.location.href = '/admin'
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_URL}/api/contact?page=${page}&limit=${limit}`)
        const data: ApiResponse = await res.json()
        if (res.ok && data.ok) {
          setItems(data.items)
          setTotal(data.total)
        } else {
          setError('Failed to load contacts')
        }
      } catch {
        setError('Network error')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [page, limit])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  function onView(msg: ContactItem) {
    setSelected(msg)
    setOpen(true)
  }
  function onClose() {
    setOpen(false)
    setSelected(null)
  }

  const formatDisplay = (iso?: string): string => {
    if (!iso) return '-'
    try {
      return new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true }).format(new Date(iso))
    } catch {
      return '-'
    }
  }

  return (
    <div className="boxed_wrapper">
      <section className="sidebar-page-container">
        <div>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 }}>
            <h3 style={{ margin: 0, marginBottom: 12, color: '#111827', fontSize: 16, fontWeight: 600 }}>Contact Enquiries</h3>

            {error && (
              <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 16, fontSize: 14 }}>{error}</div>
            )}

            <div className="table-responsive" style={{ overflowX: 'auto', marginBottom: 16 }}>
              <table className="admin__table" style={{ width: '100%', minWidth: 600, borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: '#f9fafb', color: '#111827', textAlign: 'left' }}>
                    <th style={{ fontWeight: 600, padding: '10px 12px', borderTopLeftRadius: 8, borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>Name</th>
                    <th style={{ fontWeight: 600, padding: '10px 12px', borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>Email</th>
                    <th style={{ fontWeight: 600, padding: '10px 12px', borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>Subject</th>
                    <th style={{ fontWeight: 600, padding: '10px 12px', borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>Date</th>
                    <th style={{ fontWeight: 600, padding: '10px 12px', borderTopRightRadius: 8, borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={5} style={{ padding: 16, color: '#6b7280' }}>Loading...</td></tr>
                  ) : items.length === 0 ? (
                    <tr><td colSpan={5} style={{ padding: 16, color: '#6b7280' }}>No messages found.</td></tr>
                  ) : (
                    items.map((m) => (
                      <tr key={m._id} style={{ borderTop: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '12px', color: '#111827', whiteSpace: 'nowrap' }}>{m.name}</td>
                        <td style={{ padding: '12px', whiteSpace: 'nowrap' }}><a href={`mailto:${m.email}`} style={{ color: '#111827', textDecoration: 'none' }}>{m.email}</a></td>
                        <td style={{ padding: '12px', color: '#111827', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.subject || '-'}</td>
                        <td style={{ padding: '12px', color: '#6b7280', whiteSpace: 'nowrap', fontSize: 13 }}>{formatDisplay(m.createdAt)}</td>
                        <td style={{ padding: '12px' }}>
                          <button type="button" aria-label="View message" title="View message" onClick={() => onView(m)} style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', color: '#374151', fontSize: 14 }}>View</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
              <div style={{ color: '#111827', fontSize: 14 }}>Page {page} of {Math.max(1, Math.ceil(total / limit))}</div>
              <button onClick={() => setPage((p) => Math.min(Math.max(1, Math.ceil(total / limit)), p + 1))} disabled={page >= totalPages} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
            </div>
          </div>
        </div>
      </section>

      {open && selected && (
        <div className="modal__overlay" role="dialog" aria-modal="true" style={{ position: 'fixed', inset: 0, background: 'rgba(17,24,39,0.2)', display: 'grid', placeItems: 'center' }}>
          <div className="modal__card" style={{ width: 'min(560px, 92%)', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <div className="modal__header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 14, borderBottom: '1px solid #e5e7eb' }}>
              <h6 style={{ margin: 0, color: '#111827', fontSize: 16 }}>Contact from {selected.name}</h6>
              <button type="button" className="modal__close" aria-label="Close" onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 18 }}>✕</button>
            </div>
            <div className="modal__body" style={{ padding: 16, color: '#111827' }}>
              <div style={{ marginBottom: 8 }}><strong>Email:</strong> {selected.email}</div>
              {selected.subject && <div style={{ marginBottom: 8 }}><strong>Subject:</strong> {selected.subject}</div>}
              <div style={{ marginBottom: 8 }}><strong>Received:</strong> {formatDisplay(selected.createdAt)}</div>
              <div style={{ whiteSpace: 'pre-wrap' }}><strong>Message:</strong><br />{selected.message}</div>
            </div>
            <div className="modal__footer" style={{ padding: 12, borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="button" className="modal__btn" onClick={onClose} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, cursor: 'pointer' }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 