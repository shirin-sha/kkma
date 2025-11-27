import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || '', [])
  const [items, setItems] = useState<ApplicationItem[]>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(20)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [selected, setSelected] = useState<ApplicationItem | null>(null)
  const navigate = useNavigate()

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
          <table className="table" style={{ width: '100%', minWidth: 600, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb' }}>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Name</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Phone</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Type</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Created</th>
                <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} style={{ padding: 12, color: '#6b7280' }}>Loading...</td></tr>
              ) : items.length === 0 ? (
                <tr><td colSpan={5} style={{ padding: 12, color: '#6b7280' }}>No applications found.</td></tr>
              ) : (
                items.map((it) => (
                  <tr key={it._id}>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap' }}>{it.fullName}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap' }}>{it.phone || '—'}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap' }}>
                      <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 500 }}>
                        {it.applicationType}
                      </span>
                    </td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap', fontSize: 13, color: '#6b7280' }}>{formatDate(it.createdAt)}</td>
                    <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => navigate(`/admin/memberships/${it._id}`)}
                        style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 12px', cursor: 'pointer', color: '#2563eb', fontWeight: 600, fontSize: 13 }}
                      >
                        View
                      </button>
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

      {/* Detail Modal removed; now navigates to dedicated page */}
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