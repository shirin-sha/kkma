import React, { useEffect, useMemo, useState } from 'react'
import { Edit, Trash2 } from 'lucide-react'
import ReactQuill from 'react-quill'

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
	galleryPaths?: string[]
	content?: string
  contentHtml?: string
	date: { day: string; monthYear: string }
	category: string
	author: string
	comments: number
}

type ApiList = { ok: boolean; items: Post[] }

type Mode = 'list' | 'create' | 'edit'

const emptyPost: Post = {
	title: '',
	href: '',
	img: '',
	imagePath: '',
	galleryPaths: [],
	content: '',
  contentHtml: '',
	date: { day: '', monthYear: '' },
	category: 'All News & Updates',
	author: '',
	comments: 0,
}

const GALLERY_MAX = 40

const editorModules = {
	toolbar: [
		[{ header: [1, 2, 3, false] }],
		['bold', 'italic', 'underline', 'strike'],
		[{ list: 'ordered' }, { list: 'bullet' }],
		[{ align: [] }],
		['link'],
		['clean'],
	],
}

const editorFormats = [
	'header',
	'bold',
	'italic',
	'underline',
	'strike',
	'list',
	'bullet',
	'align',
	'link',
]

export default function AdminNews(): React.JSX.Element {
	const [items, setItems] = useState<Post[]>([])
	// pagination removed
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [mode, setMode] = useState<Mode>('list')
	const [form, setForm] = useState<Post>(emptyPost)
	const [file, setFile] = useState<File | null>(null)
	const [editingId, setEditingId] = useState<string>('')
	const [dateInput, setDateInput] = useState<string>('')
	const [galleryFiles, setGalleryFiles] = useState<File[]>([])
	const [existingGallery, setExistingGallery] = useState<string[]>([])
	const [removedGallery, setRemovedGallery] = useState<string[]>([])

	const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || '', [])

	const filePreviewUrl = useMemo(() => {
		if (!file) return null
		return URL.createObjectURL(file)
	}, [file])

	const galleryPreviewUrls = useMemo(
		() => galleryFiles.map((g) => URL.createObjectURL(g)),
		[galleryFiles]
	)

	useEffect(() => {
		return () => {
			if (filePreviewUrl) URL.revokeObjectURL(filePreviewUrl)
		}
	}, [filePreviewUrl])

	useEffect(() => {
		return () => {
			galleryPreviewUrls.forEach((url) => URL.revokeObjectURL(url))
		}
	}, [galleryPreviewUrls])

	function resetGalleryState(paths: string[] = []) {
		setExistingGallery(paths)
		setRemovedGallery([])
		setGalleryFiles([])
	}

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
			const res = await fetch(`${baseUrl}/api/news`)
			const data: ApiList = await res.json()
			if (res.ok && data.ok) {
				setItems(data.items)
			} else {
				setError('Failed to load')
			}
		} catch {
			setError('Network error')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => { load() }, [])

	function onNew() {
		setForm(emptyPost)
		setFile(null)
		setEditingId('')
		setDateInput(dateToISO(new Date()))
		resetGalleryState([])
		setMode('create')
	}
	function onEdit(p: Post) {
		setForm({ ...p })
		setFile(null)
		setEditingId(p._id || '')
		resetGalleryState(Array.isArray(p.galleryPaths) ? [...p.galleryPaths] : [])
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
		resetGalleryState([])
	}

	function onRemoveExistingGallery(path: string) {
		setExistingGallery((prev) => prev.filter((p) => p !== path))
		setRemovedGallery((prev) => (prev.includes(path) ? prev : [...prev, path]))
	}

	function onRemovePendingGallery(index: number) {
		setGalleryFiles((prev) => prev.filter((_, i) => i !== index))
	}

	function onPickGalleryFiles(e: React.ChangeEvent<HTMLInputElement>) {
		const picked = Array.from(e.target.files || [])
		if (picked.length === 0) return
		const remaining = GALLERY_MAX - (existingGallery.length + galleryFiles.length)
		if (remaining <= 0) {
			alert(`Maximum ${GALLERY_MAX} gallery images allowed`)
			e.target.value = ''
			return
		}
		const toAdd = picked.slice(0, remaining)
		if (picked.length > remaining) {
			alert(`Only ${remaining} more image(s) can be added (max ${GALLERY_MAX})`)
		}
		setGalleryFiles((prev) => [...prev, ...toAdd])
		e.target.value = ''
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
    if (form.contentHtml) {
      fd.append('contentHtml', form.contentHtml)
    } else if (form.content) {
      fd.append('content', form.content)
    }
    if (dateInput) {
      const [y, m, d] = dateInput.split('-')
      fd.append('publishedDate', `${d}/${m}/${y}`) // dd/mm/yyyy
    }
		if (file) fd.append('image', file)
		if (galleryFiles && galleryFiles.length > 0) {
			for (const gf of galleryFiles) fd.append('gallery', gf)
		}
		if (mode === 'edit' && removedGallery.length > 0) {
			fd.append('removeGallery', JSON.stringify(removedGallery))
		}

		const isEdit = mode === 'edit' && editingId
		const url = isEdit ? `${baseUrl}/api/news/${editingId}` : `${baseUrl}/api/news`
		const method = isEdit ? 'PUT' : 'POST'

		try {
			const res = await fetch(url, { method, body: fd })
			let data: { ok?: boolean; error?: string } = {}
			try {
				data = await res.json()
			} catch {
				alert(res.status === 413
					? 'Upload too large. Your server or hosting may have a request size limit — try fewer or smaller images.'
					: 'Save failed — server returned an invalid response.')
				return
			}
			if (res.ok && data.ok) {
				onCancel()
				await load()
			} else {
				alert(data?.error || 'Save failed')
			}
		} catch {
			alert('Network error — could not save. Please check your connection and try again.')
		}
	}

	// pagination removed

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
							<ReactQuill
								theme="snow"
								value={form.contentHtml || form.content || ''}
								onChange={(value) => setForm({ ...form, contentHtml: value })}
								modules={editorModules}
								formats={editorFormats}
								style={{
									background: '#fff',
								}}
							/>
							<small style={{ display: 'block', marginTop: 4, color: '#6b7280' }}>
								Use the toolbar to format the news content. This will appear in the News Detail page.
							</small>
						</div>
						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Image</label>
							<input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
							<small style={{ display: 'block', marginTop: 4, color: '#6b7280' }}>
								Images are auto-compressed after upload.
							</small>
							{(file || form.imagePath) && (
								<div style={{ marginTop: 8 }}>
									<img src={filePreviewUrl || `${baseUrl}${form.imagePath}`} alt="preview" style={{ maxWidth: 240, borderRadius: 8, border: '1px solid #e5e7eb' }} />
								</div>
							)}
						</div>
						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>
								Gallery Images ({existingGallery.length + galleryFiles.length}/{GALLERY_MAX})
							</label>
							<input
								type="file"
								accept="image/*"
								multiple
								onChange={onPickGalleryFiles}
								disabled={existingGallery.length + galleryFiles.length >= GALLERY_MAX}
							/>
							<small style={{ display: 'block', marginTop: 4, color: '#6b7280' }}>
								Max {GALLERY_MAX} images. New uploads are added to the gallery — click Update/Create to save.
							</small>
							{(existingGallery.length > 0 || galleryFiles.length > 0) && (
								<div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
									{existingGallery.map((path) => (
										<div key={path} style={{ position: 'relative', width: 80, height: 80 }}>
											<img
												src={`${baseUrl}${path}`}
												alt="gallery"
												style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid #e5e7eb', display: 'block' }}
											/>
											<button
												type="button"
												title="Remove"
												aria-label="Remove gallery image"
												onClick={() => onRemoveExistingGallery(path)}
												style={{
													position: 'absolute',
													top: -6,
													right: -6,
													width: 22,
													height: 22,
													borderRadius: '50%',
													border: 'none',
													background: '#dc2626',
													color: '#fff',
													cursor: 'pointer',
													fontSize: 14,
													lineHeight: '22px',
													padding: 0,
												}}
											>
												×
											</button>
										</div>
									))}
									{galleryFiles.map((g, i) => (
										<div key={`new-${i}-${g.name}-${g.size}-${g.lastModified}`} style={{ position: 'relative', width: 80, height: 80 }}>
											<img
												src={galleryPreviewUrls[i]}
												alt="new gallery"
												style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6, border: '1px solid #93c5fd', display: 'block' }}
											/>
											<button
												type="button"
												title="Remove"
												aria-label="Remove pending gallery image"
												onClick={() => onRemovePendingGallery(i)}
												style={{
													position: 'absolute',
													top: -6,
													right: -6,
													width: 22,
													height: 22,
													borderRadius: '50%',
													border: 'none',
													background: '#dc2626',
													color: '#fff',
													cursor: 'pointer',
													fontSize: 14,
													lineHeight: '22px',
													padding: 0,
												}}
											>
												×
											</button>
										</div>
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
						<div className="table-responsive" style={{ overflowX: 'auto', marginBottom: 16 }}>
							<table className="admin__table" style={{ width: '100%', minWidth: 700, borderCollapse: 'separate', borderSpacing: 0 }}>
								<thead>
									<tr style={{ background: '#f9fafb', color: '#111827', textAlign: 'left' }}>
										<th style={{ fontWeight: 600, padding: '10px 12px', borderTopLeftRadius: 8, borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>Title</th>
										<th style={{ fontWeight: 600, padding: '10px 12px', borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>Date</th>
										<th style={{ fontWeight: 600, padding: '10px 12px', borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>Category</th>
										<th style={{ fontWeight: 600, padding: '10px 12px', borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>Author</th>
										<th style={{ fontWeight: 600, padding: '10px 12px', borderTopRightRadius: 8, borderBottom: '1px solid #e5e7eb', whiteSpace: 'nowrap' }}>Action</th>
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
												<td style={{ padding: '12px', color: '#111827', maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</td>
												<td style={{ padding: '12px', color: '#6b7280', whiteSpace: 'nowrap', fontSize: 13 }}>
													{p.date?.day} <span style={{ color: '#9ca3af' }}>{p.date?.monthYear}</span>
												</td>
												<td style={{ padding: '12px', color: '#111827', whiteSpace: 'nowrap', fontSize: 13 }}>{p.category}</td>
												<td style={{ padding: '12px', color: '#111827', whiteSpace: 'nowrap' }}>{p.author}</td>
									<td style={{ padding: '12px', whiteSpace: 'nowrap' }}>
										<button
											aria-label="Edit"
											title="Edit"
											onClick={() => onEdit(p)}
											style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 10px', cursor: 'pointer', color: '#2563eb', marginRight: 6, fontSize: 13 }}
										>
											<Edit size={16} />
										</button>
										<button
											aria-label="Delete"
											title="Delete"
											onClick={() => onDelete(p._id)}
											style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 6, padding: '6px 10px', cursor: 'pointer', color: '#dc2626', fontSize: 13 }}
										>
											<Trash2 size={16} />
										</button>
									</td>
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>

						{/* pagination removed */}
					</>
				)}
			</div>
		</div>
	)
} 