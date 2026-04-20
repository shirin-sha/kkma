import React, { useEffect, useMemo, useState } from 'react'

type TeamGroup =
  | 'pmt_executives'
  | 'central_committee_office_bearers'
  | 'ahmadi_zonal_committee'
  | 'city_zonal_committee'
  | 'farwaniya_zonal_committee'

type TeamMember = {
  _id?: string
  name: string
  role: string
  group: TeamGroup
  email?: string
  phone?: string
  photoPath?: string
  social?: {
    facebook?: string
    instagram?: string
    linkedin?: string
  }
  displayOrder: number
  isActive: boolean
}

type ApiList = { ok: boolean; items: TeamMember[] }
type Mode = 'list' | 'create' | 'edit'

const TEAM_GROUPS: TeamGroup[] = [
  'pmt_executives',
  'central_committee_office_bearers',
  'ahmadi_zonal_committee',
  'city_zonal_committee',
  'farwaniya_zonal_committee',
]

const GROUP_LABELS: Record<TeamGroup, string> = {
  pmt_executives: 'PMT Executives',
  central_committee_office_bearers: 'Central Committee Office Bearers',
  ahmadi_zonal_committee: 'Ahmadi Zonal Committee',
  city_zonal_committee: 'City Zonal Committee',
  farwaniya_zonal_committee: 'Farwaniya Zonal Committee',
}

const ZONAL_GROUPS: TeamGroup[] = ['ahmadi_zonal_committee', 'city_zonal_committee', 'farwaniya_zonal_committee']

const emptyMember: TeamMember = {
  name: '',
  role: '',
  group: 'pmt_executives',
  email: '',
  phone: '',
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
  },
  displayOrder: 1,
  isActive: true,
}

export default function AdminTeam(): React.JSX.Element {
  const [items, setItems] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<Mode>('list')
  const [form, setForm] = useState<TeamMember>(emptyMember)
  const [file, setFile] = useState<File | null>(null)
  const [editingId, setEditingId] = useState<string>('')
  const [draggingId, setDraggingId] = useState<string | null>(null)
  const [dragOverId, setDragOverId] = useState<string | null>(null)

  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || '', [])
  const isZonalGroup = ZONAL_GROUPS.includes(form.group)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token !== 'admin-authenticated') {
      window.location.href = '/admin'
    }
  }, [])

  async function load() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/api/admin/team`)
      const data: ApiList = await res.json()
      if (res.ok && data.ok) {
        setItems(data.items)
      } else {
        setError('Failed to load team members')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  function onNew() {
    setForm(emptyMember)
    setFile(null)
    setEditingId('')
    setMode('create')
  }

  function onEdit(member: TeamMember) {
    setForm({
      ...member,
      social: {
        facebook: member.social?.facebook || '',
        instagram: member.social?.instagram || '',
        linkedin: member.social?.linkedin || '',
      },
    })
    setFile(null)
    setEditingId(member._id || '')
    setMode('edit')
  }

  function onCancel() {
    setMode('list')
    setForm(emptyMember)
    setFile(null)
    setEditingId('')
  }

  function onGroupChange(nextGroup: TeamGroup) {
    setForm((prev) => {
      const next = { ...prev, group: nextGroup }
      if (ZONAL_GROUPS.includes(nextGroup)) {
        next.email = ''
        next.social = { facebook: '', instagram: '', linkedin: '' }
      }
      return next
    })
    if (ZONAL_GROUPS.includes(nextGroup)) {
      setFile(null)
    }
  }

  async function onDelete(id?: string) {
    if (!id) return
    if (!confirm('Delete this team member?')) return
    try {
      const res = await fetch(`${baseUrl}/api/admin/team/${id}`, { method: 'DELETE' })
      if (res.ok) await load()
    } catch {
      alert('Delete failed')
    }
  }

  async function onToggleStatus(member: TeamMember) {
    if (!member._id) return
    const isZonal = ZONAL_GROUPS.includes(member.group)
    const fd = new FormData()
    fd.append('name', member.name)
    fd.append('role', member.role)
    fd.append('group', member.group)
    fd.append('email', isZonal ? '' : member.email || '')
    fd.append('phone', member.phone || '')
    fd.append('facebook', isZonal ? '' : member.social?.facebook || '')
    fd.append('instagram', isZonal ? '' : member.social?.instagram || '')
    fd.append('linkedin', isZonal ? '' : member.social?.linkedin || '')
    fd.append('isActive', (!member.isActive).toString())

    try {
      const res = await fetch(`${baseUrl}/api/admin/team/${member._id}`, {
        method: 'PUT',
        body: fd,
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        await load()
      } else {
        alert(data?.error || 'Status update failed')
      }
    } catch {
      alert('Status update failed')
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fd = new FormData()
    const isZonal = ZONAL_GROUPS.includes(form.group)
    fd.append('name', form.name)
    fd.append('role', form.role)
    fd.append('group', form.group)
    fd.append('email', isZonal ? '' : form.email || '')
    fd.append('phone', form.phone || '')
    fd.append('facebook', isZonal ? '' : form.social?.facebook || '')
    fd.append('instagram', isZonal ? '' : form.social?.instagram || '')
    fd.append('linkedin', isZonal ? '' : form.social?.linkedin || '')
    fd.append('isActive', String(form.isActive))
    if (!isZonal && file) fd.append('photo', file)

    const isEdit = mode === 'edit' && editingId
    const url = isEdit ? `${baseUrl}/api/admin/team/${editingId}` : `${baseUrl}/api/admin/team`
    const method = isEdit ? 'PUT' : 'POST'

    try {
      const res = await fetch(url, { method, body: fd })
      const data = await res.json()
      if (res.ok && data.ok) {
        onCancel()
        await load()
      } else {
        alert(data?.error || 'Save failed')
      }
    } catch {
      alert('Save failed')
    }
  }

  async function saveGroupOrder(group: TeamGroup, groupRows: TeamMember[]) {
    const ids = groupRows.map((row) => row._id).filter((id): id is string => Boolean(id))
    if (ids.length !== groupRows.length) {
      alert('Some rows are missing IDs. Please refresh and try again.')
      return false
    }

    try {
      const res = await fetch(`${baseUrl}/api/admin/team/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ group, ids }),
      })
      const data = await res.json()
      if (!res.ok || !data.ok) {
        alert(data?.error || 'Reorder failed')
        await load()
        return false
      }
      return true
    } catch {
      alert('Reorder failed')
      await load()
      return false
    }
  }

  function reorderRows(rows: TeamMember[], sourceId: string, targetId: string): TeamMember[] {
    const fromIdx = rows.findIndex((row) => row._id === sourceId)
    const toIdx = rows.findIndex((row) => row._id === targetId)
    if (fromIdx < 0 || toIdx < 0 || fromIdx === toIdx) return rows

    const next = [...rows]
    const [moved] = next.splice(fromIdx, 1)
    next.splice(toIdx, 0, moved)
    return next
  }

  async function onDropRow(group: TeamGroup, targetId: string) {
    if (!draggingId || draggingId === targetId) return

    const groupRows = items.filter((item) => item.group === group)
    const reorderedGroupRows = reorderRows(groupRows, draggingId, targetId)
    if (reorderedGroupRows === groupRows) return

    const updatedItems = [
      ...items.filter((item) => item.group !== group),
      ...reorderedGroupRows.map((row, index) => ({ ...row, displayOrder: index + 1 })),
    ]
    setItems(updatedItems)

    const ok = await saveGroupOrder(group, reorderedGroupRows)
    if (!ok) return
    await load()
  }

  function renderTable(group: TeamGroup): React.JSX.Element {
    const rows = items.filter((item) => item.group === group)
    return (
      <div style={{ marginBottom: 20 }}>
        <h4 style={{ marginTop: 0, marginBottom: 10, color: '#111827' }}>{GROUP_LABELS[group]}</h4>
        <div style={{ overflowX: 'auto', border: '1px solid #d1d5db', borderRadius: 8 }}>
          <table style={{ width: '100%', minWidth: 760, borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', borderBottom: '1px solid #d1d5db', borderRight: '1px solid #e5e7eb' }}>Order</th>
                <th style={{ padding: '10px 12px', borderBottom: '1px solid #d1d5db', borderRight: '1px solid #e5e7eb' }}>Photo</th>
                <th style={{ padding: '10px 12px', borderBottom: '1px solid #d1d5db', borderRight: '1px solid #e5e7eb' }}>Name</th>
                <th style={{ padding: '10px 12px', borderBottom: '1px solid #d1d5db', borderRight: '1px solid #e5e7eb' }}>Role</th>
                <th style={{ padding: '10px 12px', borderBottom: '1px solid #d1d5db', borderRight: '1px solid #e5e7eb' }}>Phone</th>
                <th style={{ padding: '10px 12px', borderBottom: '1px solid #d1d5db', borderRight: '1px solid #e5e7eb' }}>Status</th>
                <th style={{ padding: '10px 12px', borderBottom: '1px solid #d1d5db' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: 12, color: '#6b7280' }}>No members found.</td>
                </tr>
              ) : (
                rows.map((member) => (
                  <tr
                    key={member._id}
                    draggable={Boolean(member._id)}
                    onDragStart={() => setDraggingId(member._id || null)}
                    onDragOver={(e) => {
                      e.preventDefault()
                      if (dragOverId !== member._id) setDragOverId(member._id || null)
                    }}
                    onDrop={async (e) => {
                      e.preventDefault()
                      await onDropRow(group, member._id || '')
                      setDraggingId(null)
                      setDragOverId(null)
                    }}
                    onDragEnd={() => {
                      setDraggingId(null)
                      setDragOverId(null)
                    }}
                    style={{
                      borderTop: '1px solid #e5e7eb',
                      background: dragOverId === member._id ? '#f3f4f6' : '#fff',
                    }}
                  >
                    <td style={{ padding: 12, borderRight: '1px solid #f3f4f6' }}>{member.displayOrder}</td>
                    <td style={{ padding: 12, borderRight: '1px solid #f3f4f6' }}>
                      {member.photoPath ? (
                        <img
                          src={`${baseUrl}${member.photoPath}`}
                          alt={member.name}
                          style={{ width: 46, height: 46, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }}
                        />
                      ) : (
                        <span style={{ color: '#9ca3af' }}>-</span>
                      )}
                    </td>
                    <td style={{ padding: 12, borderRight: '1px solid #f3f4f6' }}>{member.name}</td>
                    <td style={{ padding: 12, borderRight: '1px solid #f3f4f6' }}>{member.role}</td>
                    <td style={{ padding: 12, borderRight: '1px solid #f3f4f6' }}>{member.phone || '-'}</td>
                    <td style={{ padding: 12, borderRight: '1px solid #f3f4f6' }}>
                      <button
                        onClick={() => onToggleStatus(member)}
                        style={{
                          border: '1px solid #e5e7eb',
                          background: member.isActive ? '#dcfce7' : '#f3f4f6',
                          color: member.isActive ? '#166534' : '#6b7280',
                          borderRadius: 20,
                          padding: '4px 10px',
                          cursor: 'pointer',
                          fontSize: 12,
                        }}
                      >
                        {member.isActive ? 'Active' : 'Hidden'}
                      </button>
                    </td>
                    <td style={{ padding: 12, whiteSpace: 'nowrap' }}>
                      <button
                        onClick={() => onEdit(member)}
                        title="Edit"
                        aria-label="Edit member"
                        style={{
                          marginRight: 8,
                          border: 'none',
                          background: 'transparent',
                          color: '#16a34a',
                          cursor: 'pointer',
                          padding: 0,
                          lineHeight: 0,
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => onDelete(member._id)}
                        title="Delete"
                        aria-label="Delete member"
                        style={{
                          border: 'none',
                          background: 'transparent',
                          color: '#b91c1c',
                          cursor: 'pointer',
                          padding: 0,
                          lineHeight: 0,
                        }}
                      >
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          <path d="M10 11v6" />
                          <path d="M14 11v6" />
                          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h3 style={{ margin: 0, color: '#111827', fontSize: 16, fontWeight: 600 }}>Team Management</h3>
          {mode === 'list' ? (
            <button onClick={onNew} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', background: '#111827', color: '#fff', borderRadius: 6, cursor: 'pointer' }}>
              Add Member
            </button>
          ) : (
            <button onClick={onCancel} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', background: '#fff', borderRadius: 6, cursor: 'pointer' }}>
              Back
            </button>
          )}
        </div>

        {mode !== 'list' ? (
          <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Role / Designation</label>
                <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} required style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isZonalGroup ? '1fr 1fr' : '1fr 1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Group</label>
                <select value={form.group} onChange={(e) => onGroupChange(e.target.value as TeamGroup)} required style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }}>
                  {TEAM_GROUPS.map((group) => (
                    <option key={group} value={group}>
                      {GROUP_LABELS[group]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Phone</label>
                <input value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
              </div>
              {!isZonalGroup && (
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Email</label>
                  <input type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
                </div>
              )}
            </div>

            {!isZonalGroup && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Facebook</label>
                  <input value={form.social?.facebook || ''} onChange={(e) => setForm({ ...form, social: { ...form.social, facebook: e.target.value } })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Instagram</label>
                  <input value={form.social?.instagram || ''} onChange={(e) => setForm({ ...form, social: { ...form.social, instagram: e.target.value } })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>LinkedIn</label>
                  <input value={form.social?.linkedin || ''} onChange={(e) => setForm({ ...form, social: { ...form.social, linkedin: e.target.value } })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'end' }}>
              {!isZonalGroup && (
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Photo</label>
                  <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  {(file || form.photoPath) && (
                    <div style={{ marginTop: 8 }}>
                      <img
                        src={file ? URL.createObjectURL(file) : `${baseUrl}${form.photoPath}`}
                        alt="preview"
                        style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8, border: '1px solid #e5e7eb' }}
                      />
                    </div>
                  )}
                </div>
              )}
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Active
              </label>
            </div>

            <div>
              <button type="submit" style={{ padding: '10px 14px', background: '#111827', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
                {mode === 'edit' ? 'Update Member' : 'Create Member'}
              </button>
            </div>
          </form>
        ) : (
          <>
            {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 12 }}>{error}</div>}
            {loading ? <div style={{ color: '#6b7280' }}>Loading...</div> : (
              <>
                {TEAM_GROUPS.map((group) => (
                  <React.Fragment key={group}>{renderTable(group)}</React.Fragment>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

