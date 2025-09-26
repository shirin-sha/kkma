import React, { useEffect, useMemo, useState } from 'react'

type EventItem = {
  _id?: string
  title: string
  description?: string
  category?: string
  startDate?: string
  endDate?: string
  startTime?: string
  endTime?: string
  venueCity?: string
  venueState?: string
  venueCountry?: string
  cost?: string
  organizerName?: string
  organizerPhone?: string
  organizerEmail?: string
  organizerWebsite?: string
  imagePath?: string
}

type ApiList = { ok: boolean; items: EventItem[]; page: number; limit: number; total: number }

type Mode = 'list' | 'create' | 'edit'

const emptyEvent: EventItem = { title: '' }

export default function AdminEvents(): React.JSX.Element {
  const [items, setItems] = useState<EventItem[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(10)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<Mode>('list')
  const [form, setForm] = useState<EventItem>(emptyEvent)
  const [file, setFile] = useState<File | null>(null)
  const [editingId, setEditingId] = useState<string>('')

  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token !== 'admin-authenticated') {
      window.location.href = '/admin/login'
    }
  }, [])

  async function load() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/events?page=${page}&limit=${limit}`)
      const data: ApiList = await res.json()
      if (res.ok && data.ok) {
        setItems(data.items)
        setTotal(data.total)
      } else {
        setError('Failed to load')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [page])

  function onNew() {
    setForm(emptyEvent)
    setFile(null)
    setEditingId('')
    setMode('create')
  }
  function onEdit(ev: EventItem) {
    setForm({ ...ev })
    setFile(null)
    setEditingId(ev._id || '')
    setMode('edit')
  }
  function onCancel() {
    setMode('list')
    setForm(emptyEvent)
    setFile(null)
    setEditingId('')
  }

  async function onDelete(id?: string) {
    if (!id) return
    if (!confirm('Delete this event?')) return
    try {
      const res = await fetch(`${baseUrl}/api/events/${id}`, { method: 'DELETE' })
      if (res.ok) await load()
    } catch {}
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fd = new FormData()
    Object.entries(form).forEach(([k, v]) => {
      if (v !== undefined && v !== null && k !== 'imagePath' && k !== '_id') {
        fd.append(k, String(v))
      }
    })
    if (file) fd.append('image', file)

    const isEdit = mode === 'edit' && editingId
    const url = isEdit ? `${baseUrl}/api/events/${editingId}` : `${baseUrl}/api/events`
    const method = isEdit ? 'PUT' : 'POST'
    const res = await fetch(url, { method, body: fd })
    const data = await res.json()
    if (res.ok && data.ok) {
      onCancel()
      await load()
    } else {
      alert(data?.error || 'Save failed')
    }
  }

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div>
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, color: '#111827', fontSize: 16, fontWeight: 600 }}>Events & Programs</h3>
          {mode === 'list' ? (
            <button onClick={onNew} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', background: '#111827', color: '#fff', borderRadius: 6, cursor: 'pointer' }}>New Event</button>
          ) : (
            <button onClick={onCancel} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, cursor: 'pointer' }}>Back</button>
          )}
        </div>

        {mode !== 'list' ? (
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Title</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Description</label>
              <textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={6} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Category</label>
                <input value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Cost</label>
                <input value={form.cost || ''} onChange={(e) => setForm({ ...form, cost: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Start Date</label>
                <input type="date" value={form.startDate || ''} onChange={(e) => setForm({ ...form, startDate: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>End Date</label>
                <input type="date" value={form.endDate || ''} onChange={(e) => setForm({ ...form, endDate: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Start Time</label>
                <input type="time" value={form.startTime || ''} onChange={(e) => setForm({ ...form, startTime: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>End Time</label>
                <input type="time" value={form.endTime || ''} onChange={(e) => setForm({ ...form, endTime: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>City</label>
                <input value={form.venueCity || ''} onChange={(e) => setForm({ ...form, venueCity: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>State</label>
                <input value={form.venueState || ''} onChange={(e) => setForm({ ...form, venueState: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Country</label>
                <input value={form.venueCountry || ''} onChange={(e) => setForm({ ...form, venueCountry: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Organizer Name</label>
                <input value={form.organizerName || ''} onChange={(e) => setForm({ ...form, organizerName: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Organizer Phone</label>
                <input value={form.organizerPhone || ''} onChange={(e) => setForm({ ...form, organizerPhone: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Organizer Email</label>
                <input type="email" value={form.organizerEmail || ''} onChange={(e) => setForm({ ...form, organizerEmail: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Organizer Website</label>
                <input value={form.organizerWebsite || ''} onChange={(e) => setForm({ ...form, organizerWebsite: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Image</label>
              <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
              {(file || form.imagePath) && (
                <div style={{ marginTop: 8 }}>
                  <img src={file ? URL.createObjectURL(file) : `${baseUrl}${form.imagePath}`} alt="preview" style={{ maxWidth: 240, borderRadius: 8, border: '1px solid #e5e7eb' }} />
                </div>
              )}
            </div>
            <div>
              <button type="submit" style={{ padding: '10px 14px', background: '#111827', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>{mode === 'edit' ? 'Update' : 'Create'}</button>
            </div>
          </form>
        ) : (
          <>
            {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 12 }}>{error}</div>}
            <div className="table-responsive">
              <table className="admin__table" style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr style={{ background: '#f9fafb', color: '#111827', textAlign: 'left' }}>
                    <th style={{ fontWeight: 600, padding: '10px 12px', borderTopLeftRadius: 8, borderBottom: '1px solid #e5e7eb' }}>Title</th>
                    <th style={{ fontWeight: 600, padding: '10px 12px', borderBottom: '1px solid #e5e7eb' }}>Date</th>
                    <th style={{ fontWeight: 600, padding: '10px 12px', borderBottom: '1px solid #e5e7eb' }}>Location</th>
                    <th style={{ fontWeight: 600, padding: '10px 12px', borderTopRightRadius: 8, borderBottom: '1px solid #e5e7eb' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={4} style={{ padding: 16, color: '#6b7280' }}>Loading...</td></tr>
                  ) : items.length === 0 ? (
                    <tr><td colSpan={4} style={{ padding: 16, color: '#6b7280' }}>No events found.</td></tr>
                  ) : (
                    items.map((ev) => (
                      <tr key={ev._id} style={{ borderTop: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '12px', color: '#111827' }}>{ev.title}</td>
                        <td style={{ padding: '12px', color: '#6b7280' }}>
                          {(ev.startDate || '')}{ev.endDate ? ` - ${ev.endDate}` : ''}
                        </td>
                        <td style={{ padding: '12px', color: '#111827' }}>{[ev.venueCity, ev.venueState, ev.venueCountry].filter(Boolean).join(', ')}</td>
                        <td style={{ padding: '12px' }}>
                          <button onClick={() => onEdit(ev)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#2563eb', marginRight: 8 }}>Edit</button>
                          <button onClick={() => onDelete(ev._id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#dc2626' }}>Delete</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: page <= 1 ? 'not-allowed' : 'pointer' }}>Prev</button>
              <div style={{ color: '#111827', fontSize: 14 }}>Page {page} of {totalPages}</div>
              <button onClick={() => setPage((p) => Math.min(Math.max(1, Math.ceil(total / limit)), p + 1))} disabled={page >= Math.max(1, Math.ceil(total / limit))} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: page >= Math.max(1, Math.ceil(total / limit)) ? 'not-allowed' : 'pointer' }}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}





