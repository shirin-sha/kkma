import React, { useEffect, useMemo, useState } from 'react'

const NEWS_CATEGORIES = [
	'All News & Updates',
	'KKMA UPDATES',
	'News Homepage',
	'News India',
	'News Kuwait',
	'Uncategorized',
] as const

const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] as const
const APOSTROPHE = '’'

function dateToISO(d: Date): string {
	const y = d.getFullYear()
	const m = String(d.getMonth() + 1).padStart(2, '0')
	const day = String(d.getDate()).padStart(2, '0')
	return `${y}-${m}-${day}`
}

function isoToDisplayParts(iso: string): { day: string; monthYear: string } {
	const d = new Date(iso)
	if (isNaN(d.getTime())) {
		const now = new Date()
		return { day: String(now.getDate()), monthYear: `${MONTHS_SHORT[now.getMonth()]}${APOSTROPHE}${String(now.getFullYear()).slice(-2)}` }
	}
	const day = String(d.getDate())
	const monthYear = `${MONTHS_SHORT[d.getMonth()]}${APOSTROPHE}${String(d.getFullYear()).slice(-2)}`
	return { day, monthYear }
}

function displayToISO(day: string, monthYear: string): string {
	const monthAbbrev = (monthYear || '').slice(0, 3)
	const monthIdx = Math.max(0, MONTHS_SHORT.indexOf(monthAbbrev as any))
	const yearMatch = (monthYear || '').match(/(\d{2})/)
	const yy = yearMatch ? parseInt(yearMatch[1], 10) : (new Date().getFullYear() % 100)
	const year = 2000 + (isNaN(yy) ? (new Date().getFullYear() % 100) : yy)
	const d = new Date(year, monthIdx, parseInt(day || '1', 10))
	return dateToISO(d)
}

type Post = {
	_id?: string
	title: string
	href: string
	img?: string
	imagePath?: string
	content?: string
	date: { day: string; monthYear: string }
	category: string
	author: string
	comments: number
}

type ApiList = { ok: boolean; items: Post[]; page: number; limit: number; total: number }

type Mode = 'list' | 'create' | 'edit'

const emptyPost: Post = {
	title: '',
	href: '',
	img: '',
	imagePath: '',
	content: '',
	date: { day: '', monthYear: '' },
	category: 'All News & Updates',
	author: '',
	comments: 0,
}

export default function AdminNews(): React.JSX.Element {
	const [items, setItems] = useState<Post[]>([])
	const [page, setPage] = useState(1)
	const [total, setTotal] = useState(0)
	const [limit] = useState(10)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [mode, setMode] = useState<Mode>('list')
	const [form, setForm] = useState<Post>(emptyPost)
	const [file, setFile] = useState<File | null>(null)
	const [editingId, setEditingId] = useState<string>('')
	const [dateInput, setDateInput] = useState<string>('')
	const [galleryFiles, setGalleryFiles] = useState<File[]>([])

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
			const res = await fetch(`${baseUrl}/api/news?page=${page}&limit=${limit}`)
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
		setForm(emptyPost)
		setFile(null)
		setEditingId('')
		setDateInput(dateToISO(new Date()))
		setMode('create')
	}
	function onEdit(p: Post) {
		setForm({ ...p })
		setFile(null)
		setEditingId(p._id || '')
		try {
			setDateInput(displayToISO(p.date?.day, p.date?.monthYear))
		} catch {
			setDateInput(dateToISO(new Date()))
		}
		setMode('edit')
	}
	function onCancel() {
		setMode('list')
		setForm(emptyPost)
		setFile(null)
		setEditingId('')
		setDateInput('')
		setGalleryFiles([])
	}

	async function onDelete(id?: string) {
		if (!id) return
		if (!confirm('Delete this post?')) return
		try {
			const res = await fetch(`${baseUrl}/api/news/${id}`, { method: 'DELETE' })
			if (res.ok) {
				await load()
			}
		} catch {}
	}

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		const fd = new FormData()
		fd.append('title', form.title)
		if (form.category) fd.append('category', form.category)
		if (form.author) fd.append('author', form.author)
		if (form.content) fd.append('content', form.content)
		if (dateInput) {
			const parts = isoToDisplayParts(dateInput)
			fd.append('day', parts.day)
			fd.append('monthYear', parts.monthYear)
		}
		if (file) fd.append('image', file)
		if (galleryFiles && galleryFiles.length > 0) {
			for (const gf of galleryFiles) fd.append('gallery', gf)
		}

		const isEdit = mode === 'edit' && editingId
		const url = isEdit ? `${baseUrl}/api/news/${editingId}` : `${baseUrl}/api/news`
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
					<h3 style={{ margin: 0, color: '#111827', fontSize: 16, fontWeight: 600 }}>News & Updates</h3>
					{mode === 'list' ? (
						<button onClick={onNew} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', background: '#111827', color: '#fff', borderRadius: 6, cursor: 'pointer' }}>New Post</button>
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
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Content</label>
							<textarea value={form.content || ''} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={6} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
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
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Gallery Images</label>
							<input type="file" accept="image/*" multiple onChange={(e) => setGalleryFiles(Array.from(e.target.files || []))} />
							{galleryFiles.length > 0 && (
								<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
									{galleryFiles.map((g, i) => (
										<img key={i} src={URL.createObjectURL(g)} alt="gallery" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb' }} />
									))}
								</div>
							)}
						</div>
						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Publish Date</label>
							<input type="date" value={dateInput} onChange={(e) => setDateInput(e.target.value)} required style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
						</div>
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
							<div>
								<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Category</label>
								<select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }}>
									{NEWS_CATEGORIES.map((cat) => (
										<option key={cat} value={cat}>{cat}</option>
									))}
								</select>
							</div>
							<div>
								<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Author</label>
								<input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} required style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
							</div>
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
										<th style={{ fontWeight: 600, padding: '10px 12px', borderBottom: '1px solid #e5e7eb' }}>Category</th>
										<th style={{ fontWeight: 600, padding: '10px 12px', borderBottom: '1px solid #e5e7eb' }}>Author</th>
										<th style={{ fontWeight: 600, padding: '10px 12px', borderTopRightRadius: 8, borderBottom: '1px solid #e5e7eb' }}>Action</th>
									</tr>
								</thead>
								<tbody>
									{loading ? (
										<tr><td colSpan={5} style={{ padding: 16, color: '#6b7280' }}>Loading...</td></tr>
									) : items.length === 0 ? (
										<tr><td colSpan={5} style={{ padding: 16, color: '#6b7280' }}>No posts found.</td></tr>
									) : (
										items.map((p) => (
											<tr key={p._id} style={{ borderTop: '1px solid #f3f4f6' }}>
												<td style={{ padding: '12px', color: '#111827' }}>{p.title}</td>
												<td style={{ padding: '12px', color: '#6b7280' }}>
													{p.date?.day} <span style={{ color: '#9ca3af' }}>{p.date?.monthYear}</span>
												</td>
												<td style={{ padding: '12px', color: '#111827' }}>{p.category}</td>
												<td style={{ padding: '12px', color: '#111827' }}>{p.author}</td>
												<td style={{ padding: '12px' }}>
													<button onClick={() => onEdit(p)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#2563eb', marginRight: 8 }}>Edit</button>
													<button onClick={() => onDelete(p._id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#dc2626' }}>Delete</button>
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
							<button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} style={{ padding: '8px 12px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff', cursor: page >= totalPages ? 'not-allowed' : 'pointer' }}>Next</button>
						</div>
					</>
				)}
			</div>
		</div>
	)
} 