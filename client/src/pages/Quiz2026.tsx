import React, { useEffect, useState, useMemo } from 'react'

type Quiz = {
	_id: string
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
}

const RESIDENCE_COUNTRIES = [
	'Kuwait',
	'India',
	'UAE',
	'Oman',
	'Saudi Arabia',
	'Qatar',
	'Bahrain',
	'Other Countries'
]

export default function Quiz2026(): React.JSX.Element {
	const [quiz, setQuiz] = useState<Quiz | null>(null)
	const [loading, setLoading] = useState(true)
	const [submitting, setSubmitting] = useState(false)
	const [submitted, setSubmitted] = useState(false)
	const [error, setError] = useState('')
	const [lightboxOpen, setLightboxOpen] = useState(false)

	const [formData, setFormData] = useState({
		fullName: '',
		phoneNumber: '',
		location: '',
		residenceCountry: '',
		answer: ''
	})

	const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || '', [])

	useEffect(() => {
		async function loadQuiz() {
			try {
				const res = await fetch(`${baseUrl}/api/quiz/current`)
				const data = await res.json()
				if (res.ok && data.ok) {
					setQuiz(data.quiz)
				} else {
					setError(data.error || 'Quiz not found')
				}
			} catch (err) {
				setError('Failed to load quiz')
			} finally {
				setLoading(false)
			}
		}

		loadQuiz()
	}, [baseUrl])

	function extractVideoId(url: string): string | null {
		if (!url) return null
		const patterns = [
			/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
			/youtube\.com\/watch\?.*v=([^&\n?#]+)/
		]
		for (const pattern of patterns) {
			const match = url.match(pattern)
			if (match) return match[1]
		}
		return null
	}

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!quiz) return

		setSubmitting(true)
		setError('')

		try {
			const res = await fetch(`${baseUrl}/api/quiz/submit`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					quizId: quiz._id,
					fullName: formData.fullName,
					phoneNumber: formData.phoneNumber,
					location: formData.location,
					residenceCountry: formData.residenceCountry,
					answer: formData.answer
				})
			})

			if (!res.ok) {
				// Try to parse error response
				try {
					const errorData = await res.json()
					setError(errorData.error || `Submission failed (${res.status})`)
				} catch {
					setError(`Submission failed (${res.status} ${res.statusText})`)
				}
				return
			}

			const data = await res.json()
			if (data.ok) {
				setSubmitted(true)
			} else {
				setError(data.error || 'Submission failed')
			}
		} catch (err: any) {
			console.error('Submission error:', err)
			setError(err.message || 'Network error. Please check your connection and try again.')
		} finally {
			setSubmitting(false)
		}
	}

	if (loading) {
		return (
			<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<div style={{ textAlign: 'center' }}>
					<div style={{ fontSize: 18, marginBottom: 8 }}>Loading quiz...</div>
				</div>
			</div>
		)
	}

	if (error && !quiz) {
		return (
			<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				<div style={{ textAlign: 'center', color: '#ef4444' }}>
					<div style={{ fontSize: 18, marginBottom: 8 }}>{error}</div>
					<button onClick={() => window.location.href = '/'} style={{ padding: '10px 20px', background: '#111827', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}>Go Home</button>
				</div>
			</div>
		)
	}

	if (!quiz) return <div>No quiz found</div>

	const videoId = quiz.videoUrl ? extractVideoId(quiz.videoUrl) : null

	return (
		<div>
			{/* Page Title Section with Breadcrumb */}
			<section className="page-title" style={{ backgroundImage: 'url(/images/page-title/KKMA-page-title.jpg)' }}>
				<div className="auto-container">
					<div className="content-box">
						<div className="title centred">
							<h1>Ramadan Quiz 2026</h1>
						</div>
						<ul className="bread-crumb clearfix">
							<li><a href="/">Home</a></li>
							<li>Ramadan Quiz 2026</li>
						</ul>
					</div>
				</div>
			</section>

			<div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 20px' }}>
				{/* Quiz Title Section */}
				<div style={{ textAlign: 'center', marginBottom: 40 }}>
					{quiz.heading && (
						<h2 style={{ fontSize: 20, fontWeight: 500, marginBottom: 12, color: '#83B253' }}>
							{quiz.heading}
						</h2>
					)}
					{quiz.subheading && (
						<h1 style={{ fontSize: 32, fontWeight: 700, color: '#374151' }}>
							{quiz.subheading} {quiz.day}
						</h1>
					)}
					<div style={{ width: 100, height: 2, background: '#e5e7eb', margin: '20px auto' }}></div>
				</div>

			{/* Image and Video Section */}
			{(quiz.imagePath || videoId) && (
				<>
					<style>{`
						.quiz-image-video-grid {
							display: grid;
							grid-template-columns: ${quiz.imagePath && videoId ? '1fr 3fr' : '1fr'};
							gap: 24px;
							margin-bottom: 40px;
							align-items: start;
						}
						@media (max-width: 768px) {
							.quiz-image-video-grid {
								grid-template-columns: 1fr !important;
							}
						}
					`}</style>
					<div className="quiz-image-video-grid">
						{quiz.imagePath && (
							<div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
								<img
									src={`${baseUrl}${quiz.imagePath}`}
									alt={quiz.title}
									onClick={() => setLightboxOpen(true)}
									style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', cursor: 'pointer', transition: 'opacity 0.2s' }}
									onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
									onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
								/>
							</div>
						)}
						{videoId && (
							<div style={{ height: '400px' }}>
								<iframe
									width="100%"
									height="100%"
									src={`https://www.youtube.com/embed/${videoId}`}
									title="Quiz Video"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
									style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
								></iframe>
							</div>
						)}
					</div>
				</>
			)}

			{/* Form Section */}
			{submitted ? (
				<div style={{ background: '#d1fae5', padding: 24, borderRadius: 12, textAlign: 'center', marginBottom: 40 }}>
					<h3 style={{ fontSize: 20, fontWeight: 600, marginBottom: 12, color: '#065f46' }}>
						✓ Thank You!
					</h3>
					<p style={{ color: '#047857' }}>
						Your answer has been submitted successfully. Thank you for participating!
					</p>
				</div>
			) : (
				<div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 32, marginBottom: 40 }}>
					<h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: '#111827' }}>
						ഇന്നത്തെ ചോദ്യങ്ങൾക്ക് ഇവിടെ ഉത്തരം നൽകുക
					</h2>
					<p style={{ color: '#6b7280', marginBottom: 24 }}>
						ഒരാൾ ഒരു ഫോൺ നമ്പറിൽ നിന്നും ഒരിക്കൽ മാത്രമേ ഉത്തരം എൻ്റർ ചെയ്യാൻ പാടുള്ളൂ.
					</p>

					<form onSubmit={handleSubmit} style={{ display: 'grid', gap: 20 }}>
						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
								Full Name <span style={{ color: '#ef4444' }}>*</span>
							</label>
							<input
								type="text"
								value={formData.fullName}
								onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
								placeholder="നിങ്ങളുടെ മുഴുവൻ പേര്"
								required
								style={{ width: '100%', padding: 12, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 16 }}
							/>
						</div>

						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
								Phone Number <span style={{ color: '#ef4444' }}>*</span>
							</label>
							<input
								type="tel"
								value={formData.phoneNumber}
								onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
								placeholder="നിങ്ങളുടെ നമ്പർ നൽകുക."
								required
								style={{ width: '100%', padding: 12, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 16 }}
							/>
						</div>

						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
								Your Location <span style={{ color: '#ef4444' }}>*</span>
							</label>
							<input
								type="text"
								value={formData.location}
								onChange={(e) => setFormData({ ...formData, location: e.target.value })}
								placeholder="നിങ്ങളുടെ സ്ഥലം"
								required
								style={{ width: '100%', padding: 12, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 16 }}
							/>
						</div>

						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151' }}>
								Select Residence Country <span style={{ color: '#ef4444' }}>*</span>
							</label>
							<select
								value={formData.residenceCountry}
								onChange={(e) => setFormData({ ...formData, residenceCountry: e.target.value })}
								required
								style={{ width: '100%', padding: 12, border: '1px solid #d1d5db', borderRadius: 8, fontSize: 16 }}
							>
								<option value="">താമസിക്കുന്ന രാജ്യം</option>
								{RESIDENCE_COUNTRIES.map(country => (
									<option key={country} value={country}>{country}</option>
								))}
							</select>
						</div>

						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 12, color: '#374151' }}>
								വീഡിയോയിലെ ചോദ്യത്തിനുള്ള ഉത്തരം താഴെ നിന്ന് തിരഞ്ഞെടുക്കുക <span style={{ color: '#ef4444' }}>*</span>
							</label>
							<div style={{ display: 'grid', gap: 12 }}>
								{quiz.options.map((option, idx) => (
									<label
										key={idx}
										style={{
											display: 'flex',
											alignItems: 'center',
											padding: 16,
											border: formData.answer === option.value ? '2px solid #111827' : '1px solid #d1d5db',
											borderRadius: 8,
											cursor: 'pointer',
											background: formData.answer === option.value ? '#f9fafb' : '#fff',
											transition: 'all 0.2s'
										}}
									>
										<input
											type="radio"
											name="answer"
											value={option.value}
											checked={formData.answer === option.value}
											onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
											required
											style={{ marginRight: 12, cursor: 'pointer' }}
										/>
										<span style={{ fontSize: 16, color: '#374151' }}>{option.label}</span>
									</label>
								))}
							</div>
						</div>

						{error && (
							<div style={{ padding: 12, background: '#fee2e2', color: '#991b1b', borderRadius: 8 }}>
								{error}
							</div>
						)}

						<button
							type="submit"
							disabled={submitting}
							style={{
								padding: '14px 28px',
								background: submitting ? '#9ca3af' : '#111827',
								color: '#fff',
								border: 'none',
								borderRadius: 8,
								fontSize: 16,
								fontWeight: 600,
								cursor: submitting ? 'not-allowed' : 'pointer',
								transition: 'background 0.2s'
							}}
						>
							{submitting ? 'Submitting...' : 'Submit Answer'}
						</button>
					</form>
				</div>
			)}

			{/* Description Section - Placed after the form */}
			{quiz.description && (
				<div style={{ marginTop: 40 }}>
					<div style={{ fontSize: 16, lineHeight: 1.8, color: '#374151', whiteSpace: 'pre-wrap' }}>
						{quiz.description}
					</div>
				</div>
			)}
			</div>

			{/* Lightbox Modal for Full Image */}
			{lightboxOpen && quiz.imagePath && (
				<div
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: 'rgba(0, 0, 0, 0.9)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 9999,
						cursor: 'pointer',
						padding: '20px'
					}}
					onClick={() => setLightboxOpen(false)}
				>
					<button
						onClick={(e) => {
							e.stopPropagation()
							setLightboxOpen(false)
						}}
						style={{
							position: 'absolute',
							top: '20px',
							right: '20px',
							background: 'rgba(255, 255, 255, 0.9)',
							border: 'none',
							borderRadius: '50%',
							width: '40px',
							height: '40px',
							fontSize: '24px',
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#111827',
							fontWeight: 'bold',
							zIndex: 10000
						}}
					>
						×
					</button>
					<img
						src={`${baseUrl}${quiz.imagePath}`}
						alt={quiz.title}
						onClick={(e) => e.stopPropagation()}
						style={{
							maxWidth: '90%',
							maxHeight: '90%',
							objectFit: 'contain',
							borderRadius: '8px',
							boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
						}}
					/>
				</div>
			)}
		</div>
	)
}
