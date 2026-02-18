import React, { useEffect, useMemo, useState } from 'react'

type Quiz = {
	_id?: string
	year: number
	day: number
	title: string
	heading?: string
	subheading?: string
	description?: string
	imagePath?: string
	videoUrl?: string
	question: string
	options: { value: string; label: string }[]
	correctAnswer: string
	isActive: boolean
}

const emptyQuiz: Quiz = {
	year: 2026,
	day: 1,
	title: '',
	heading: '',
	subheading: '',
	description: '',
	imagePath: '',
	videoUrl: '',
	question: '',
	options: [
		{ value: 'one', label: '' },
		{ value: 'two', label: '' }
	],
	correctAnswer: 'one',
	isActive: true,
}

export default function AdminQuiz(): React.JSX.Element {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')
	const [form, setForm] = useState<Quiz>(emptyQuiz)
	const [file, setFile] = useState<File | null>(null)
	const [editingId, setEditingId] = useState<string>('')
	const [currentDay, setCurrentDay] = useState<number>(1)

	const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || '', [])

	useEffect(() => {
		const token = localStorage.getItem('adminToken')
		if (token !== 'admin-authenticated') {
			window.location.href = '/admin'
		}
	}, [])

	// Get current day (1-30) - Default to day 1, admin can change it
	useEffect(() => {
		// Start with day 1, admin can select any day they want to edit
		setCurrentDay(1)
		setForm(prev => ({ ...prev, day: 1 }))
	}, [])

	async function loadQuiz(day: number) {
		setLoading(true)
		setError('')
		try {
			const res = await fetch(`${baseUrl}/api/admin/quiz?year=2026`)
			const data = await res.json()
			if (res.ok && data.ok) {
				const quiz = data.items.find((q: Quiz) => q.day === day)
				if (quiz) {
					setForm({ ...quiz, day })
					setEditingId(quiz._id || '')
				} else {
					// No quiz for this day, use empty form
					setForm({ ...emptyQuiz, day, year: 2026 })
					setEditingId('')
				}
			} else {
				setError('Failed to load')
			}
		} catch {
			setError('Network error')
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		if (currentDay > 0) {
			loadQuiz(currentDay)
		}
	}, [currentDay, baseUrl])

	function handleDayChange(day: number) {
		setCurrentDay(day)
		setFile(null)
	}

	function addOption() {
		const newValue = `option-${form.options.length + 1}`
		setForm({
			...form,
			options: [...form.options, { value: newValue, label: '' }]
		})
	}

	function removeOption(index: number) {
		if (form.options.length <= 2) {
			alert('At least 2 options are required')
			return
		}
		const newOptions = form.options.filter((_, i) => i !== index)
		setForm({
			...form,
			options: newOptions,
			correctAnswer: form.correctAnswer === form.options[index].value ? newOptions[0].value : form.correctAnswer
		})
	}

	async function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (form.options.length < 2) {
			alert('At least 2 options are required')
			return
		}
		if (!form.options.find(o => o.value === form.correctAnswer)) {
			alert('Please select a valid correct answer')
			return
		}

		const fd = new FormData()
		fd.append('year', String(form.year))
		fd.append('day', String(currentDay))
		fd.append('title', 'Ramadan Quiz 2026') // Title not used on public page, but required by schema
		if (form.heading) fd.append('heading', form.heading)
		if (form.subheading) fd.append('subheading', form.subheading)
		if (form.description) fd.append('description', form.description)
		if (form.videoUrl) fd.append('videoUrl', form.videoUrl)
		// Question is not needed - it comes from the video
		fd.append('question', 'Question from video') // Placeholder, not used
		fd.append('options', JSON.stringify(form.options))
		fd.append('correctAnswer', form.correctAnswer)
		fd.append('isActive', String(form.isActive))
		if (file) fd.append('image', file)

		const isEdit = editingId && editingId !== ''
		const url = isEdit ? `${baseUrl}/api/admin/quiz/${editingId}` : `${baseUrl}/api/admin/quiz`
		const method = isEdit ? 'PUT' : 'POST'
		const res = await fetch(url, { method, body: fd })
		const data = await res.json()
		if (res.ok && data.ok) {
			alert('Quiz saved successfully!')
			await loadQuiz(currentDay)
		} else {
			alert(data?.error || 'Save failed')
		}
	}

	return (
		<div>
			<div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
					<h3 style={{ margin: 0, color: '#111827', fontSize: 16, fontWeight: 600 }}>Ramadan Quiz 2026</h3>
				</div>

				{loading ? (
					<div style={{ padding: 20, textAlign: 'center' }}>Loading quiz...</div>
				) : error ? (
					<div style={{ padding: 20, color: '#ef4444' }}>{error}</div>
				) : (
					<form onSubmit={onSubmit} style={{ display: 'grid', gap: 12 }}>
						<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
							<div>
								<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Day (1-30)</label>
								<input type="number" min="1" max="30" value={currentDay} onChange={(e) => handleDayChange(parseInt(e.target.value, 10))} required style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
								<small style={{ display: 'block', marginTop: 4, color: '#6b7280' }}>Select the day to edit. The form will load that day's quiz.</small>
							</div>
							<div>
								<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Active</label>
								<select value={String(form.isActive)} onChange={(e) => setForm({ ...form, isActive: e.target.value === 'true' })} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }}>
									<option value="true">Yes</option>
									<option value="false">No</option>
								</select>
							</div>
						</div>
						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Heading</label>
							<input value={form.heading || ''} onChange={(e) => setForm({ ...form, heading: e.target.value })} placeholder="അറിവ് നേടൂ, ഒപ്പം സമ്മാനങ്ങളും...." style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
							<small style={{ display: 'block', marginTop: 4, color: '#6b7280' }}>Main heading displayed at the top (green text)</small>
						</div>
						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Subheading</label>
							<input value={form.subheading || ''} onChange={(e) => setForm({ ...form, subheading: e.target.value })} placeholder='കെ.കെ.എം.എ "റമദാൻ ക്വിസ്സ് 2026" : Day' style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
							<small style={{ display: 'block', marginTop: 4, color: '#6b7280' }}>Subheading (Day number will be added automatically)</small>
						</div>
						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Description</label>
							<textarea value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={5} placeholder="Enter description text that will appear at the bottom of the quiz page..." style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
							<small style={{ display: 'block', marginTop: 4, color: '#6b7280' }}>This description will be displayed at the bottom of the quiz page</small>
						</div>
						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Image</label>
							<input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
							{form.imagePath && !file && (
								<div style={{ marginTop: 8 }}>
									<img src={`${baseUrl}${form.imagePath}`} alt="Current" style={{ maxWidth: 200, maxHeight: 200, objectFit: 'cover', borderRadius: 8 }} />
								</div>
							)}
						</div>
						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Video URL (YouTube)</label>
							<input type="url" value={form.videoUrl || ''} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} placeholder="https://youtu.be/..." style={{ width: '100%', padding: 10, border: '1px solid #d1d5db', borderRadius: 8 }} />
							<small style={{ display: 'block', marginTop: 4, color: '#6b7280' }}>The question will come from the video</small>
						</div>
						<div>
							<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
								<label style={{ fontWeight: 600 }}>Answer Options</label>
								<button type="button" onClick={addOption} style={{ padding: '6px 12px', background: '#10b981', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Add Option</button>
							</div>
							{form.options.map((opt, idx) => (
								<div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
									<input type="radio" checked={form.correctAnswer === opt.value} onChange={() => setForm({ ...form, correctAnswer: opt.value })} style={{ cursor: 'pointer' }} />
									<input type="text" value={opt.value} onChange={(e) => {
										const newOptions = [...form.options]
										newOptions[idx].value = e.target.value
										setForm({ ...form, options: newOptions, correctAnswer: form.correctAnswer === opt.value ? e.target.value : form.correctAnswer })
									}} placeholder="Option value" required style={{ flex: 1, padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} />
									<input type="text" value={opt.label} onChange={(e) => {
										const newOptions = [...form.options]
										newOptions[idx].label = e.target.value
										setForm({ ...form, options: newOptions })
									}} placeholder="Option label" required style={{ flex: 2, padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }} />
									{form.options.length > 2 && (
										<button type="button" onClick={() => removeOption(idx)} style={{ padding: '6px 12px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer' }}>Remove</button>
									)}
								</div>
							))}
							<small style={{ display: 'block', marginTop: 4, color: '#6b7280' }}>Select the radio button next to the correct answer</small>
						</div>
						<button type="submit" style={{ padding: '12px 24px', background: '#111827', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>Save Quiz</button>
					</form>
				)}
			</div>
		</div>
	)
}
