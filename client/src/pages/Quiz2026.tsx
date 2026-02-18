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
			<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px, 5vw, 40px)' }}>
				<div style={{ textAlign: 'center' }}>
					<div style={{ fontSize: 'clamp(16px, 4vw, 18px)', marginBottom: 8 }}>Loading quiz...</div>
				</div>
			</div>
		)
	}

	if (error && !quiz) {
		return (
			<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px, 5vw, 40px)' }}>
				<div style={{ textAlign: 'center', color: '#ef4444', maxWidth: '100%' }}>
					<div style={{ fontSize: 'clamp(16px, 4vw, 18px)', marginBottom: 16, wordWrap: 'break-word' }}>{error}</div>
					<button 
						onClick={() => window.location.href = '/'} 
						style={{ 
							padding: 'clamp(10px, 2.5vw, 12px) clamp(20px, 5vw, 24px)', 
							background: '#111827', 
							color: '#fff', 
							border: 'none', 
							borderRadius: 8, 
							cursor: 'pointer',
							fontSize: 'clamp(14px, 3.5vw, 16px)',
							minHeight: '44px'
						}}
					>
						Go Home
					</button>
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

			<div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(20px, 5vw, 40px) clamp(16px, 4vw, 20px)' }}>
				{/* Quiz Title Section */}
				<div style={{ textAlign: 'center', marginBottom: 'clamp(24px, 6vw, 40px)' }}>
					<h2 style={{ fontSize: '20px', fontWeight: 500, marginBottom: 20, color: '#83b253', lineHeight: '1.3' }}>
						അറിവ് നേടൂ, ഒപ്പം സമ്മാനങ്ങളും....
					</h2>
					<h1 style={{ fontSize: '30px', fontWeight: 700, color: '#374151', lineHeight: '1.3', marginBottom: 16 }}>
						കെ.കെ.എം.എ "റമദാൻ ക്വിസ്സ് 2026" : Day {quiz.day}
					</h1>
					<div style={{ width: 100, height: 2, background: '#e5e7eb', margin: '20px auto' }}></div>
				</div>

			{/* Image and Video Section */}
			{(quiz.imagePath || videoId) && (
				<>
					<style>{`
						.quiz-image-video-grid {
							display: grid;
							grid-template-columns: ${quiz.imagePath && videoId ? 'minmax(300px, 1fr) minmax(400px, 2.5fr)' : '1fr'};
							gap: clamp(16px, 4vw, 24px);
							margin-bottom: clamp(24px, 6vw, 40px);
							align-items: start;
						}
						@media (max-width: 1024px) {
							.quiz-image-video-grid {
								grid-template-columns: ${quiz.imagePath && videoId ? 'minmax(250px, 1fr) minmax(350px, 2fr)' : '1fr'} !important;
							}
						}
						@media (max-width: 768px) {
							.quiz-image-video-grid {
								grid-template-columns: 1fr !important;
								gap: 16px;
							}
						}
						.quiz-image-container {
							width: 100%;
							display: flex;
							align-items: flex-start;
							justify-content: center;
							max-width: 100%;
						}
						.quiz-image-container img {
							width: 100%;
							height: auto;
							display: block;
							object-fit: contain;
						}
						.quiz-video-container {
							height: clamp(250px, 50vw, 500px);
							width: 100%;
							min-height: 300px;
						}
						@media (min-width: 769px) and (max-width: 1024px) {
							.quiz-video-container {
								height: clamp(300px, 45vw, 450px);
							}
						}
						@media (min-width: 1025px) {
							.quiz-video-container {
								height: clamp(400px, 50vw, 500px);
							}
						}
						@media (max-width: 480px) {
							.quiz-video-container {
								height: clamp(200px, 60vw, 300px);
								min-height: 200px;
							}
						}
					`}</style>
					<div className="quiz-image-video-grid">
						{quiz.imagePath && (
							<div className="quiz-image-container" style={{ boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderRadius: 8, }}>
								<img
									src={`${baseUrl}${quiz.imagePath}`}
									alt={quiz.title}
									onClick={() => setLightboxOpen(true)}
									style={{ cursor: 'pointer', transition: 'opacity 0.2s', borderRadius: 4 }}
									onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
									onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
								/>
							</div>
						)}
						{videoId && (
							<div className="quiz-video-container" style={{ borderRadius: 8, overflow: 'hidden' }}>
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
				<div style={{ background: '#d1fae5', padding: 'clamp(20px, 5vw, 24px)', borderRadius: 12, textAlign: 'center', marginBottom: 'clamp(24px, 6vw, 40px)' }}>
					<h3 style={{ fontSize: 'clamp(18px, 4.5vw, 20px)', fontWeight: 600, marginBottom: 12, color: '#065f46' }}>
						✓ Thank You!
					</h3>
					<p style={{ color: '#047857', fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
						Your answer has been submitted successfully. Thank you for participating!
					</p>
				</div>
			) : (
				<div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 'clamp(20px, 5vw, 32px)', marginBottom: 'clamp(24px, 6vw, 40px)' }}>
					<h2 style={{ fontSize: '24px', fontWeight: 700, marginBottom: 16, color: '#111827', lineHeight: '1.3' }}>
						ഇന്നത്തെ ചോദ്യങ്ങൾക്ക് ഇവിടെ ഉത്തരം നൽകുക
					</h2>
					<p style={{ color: '#374151', marginBottom: 24, fontSize: '16px', lineHeight: '1.6' }}>
						ഒരാൾ ഒരു ഫോൺ നമ്പറിൽ നിന്നും ഒരിക്കൽ മാത്രമേ ഉത്തരം എൻ്റർ ചെയ്യാൻ പാടുള്ളൂ.
					</p>

					<form onSubmit={handleSubmit} style={{ display: 'grid', gap: 'clamp(16px, 4vw, 20px)' }}>
						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151', fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
								Full Name <span style={{ color: '#ef4444' }}>*</span>
							</label>
							<input
								type="text"
								value={formData.fullName}
								onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
								placeholder="നിങ്ങളുടെ മുഴുവൻ പേര്"
								required
								style={{ width: '100%', padding: 'clamp(10px, 2.5vw, 12px)', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 'clamp(14px, 3.5vw, 16px)', boxSizing: 'border-box' }}
							/>
						</div>

						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151', fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
								Phone Number <span style={{ color: '#ef4444' }}>*</span>
							</label>
							<input
								type="tel"
								value={formData.phoneNumber}
								onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
								placeholder="നിങ്ങളുടെ നമ്പർ നൽകുക."
								required
								style={{ width: '100%', padding: 'clamp(10px, 2.5vw, 12px)', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 'clamp(14px, 3.5vw, 16px)', boxSizing: 'border-box' }}
							/>
						</div>

						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151', fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
								Your Location <span style={{ color: '#ef4444' }}>*</span>
							</label>
							<input
								type="text"
								value={formData.location}
								onChange={(e) => setFormData({ ...formData, location: e.target.value })}
								placeholder="നിങ്ങളുടെ സ്ഥലം"
								required
								style={{ width: '100%', padding: 'clamp(10px, 2.5vw, 12px)', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 'clamp(14px, 3.5vw, 16px)', boxSizing: 'border-box' }}
							/>
						</div>

						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 8, color: '#374151', fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
								Select Residence Country <span style={{ color: '#ef4444' }}>*</span>
							</label>
							<select
								value={formData.residenceCountry}
								onChange={(e) => setFormData({ ...formData, residenceCountry: e.target.value })}
								required
								style={{ width: '100%', padding: 'clamp(10px, 2.5vw, 12px)', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 'clamp(14px, 3.5vw, 16px)', boxSizing: 'border-box', cursor: 'pointer' }}
							>
								<option value="">താമസിക്കുന്ന രാജ്യം</option>
								{RESIDENCE_COUNTRIES.map(country => (
									<option key={country} value={country}>{country}</option>
								))}
							</select>
						</div>

						<div>
							<label style={{ display: 'block', fontWeight: 600, marginBottom: 12, color: '#374151', fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: 1.4 }}>
								വീഡിയോയിലെ ചോദ്യത്തിനുള്ള ഉത്തരം താഴെ നിന്ന് തിരഞ്ഞെടുക്കുക <span style={{ color: '#ef4444' }}>*</span>
							</label>
							<div style={{ display: 'grid', gap: 'clamp(10px, 2.5vw, 12px)' }}>
								{quiz.options.map((option, idx) => (
									<label
										key={idx}
										style={{
											display: 'flex',
											alignItems: 'flex-start',
											padding: 'clamp(12px, 3vw, 16px)',
											border: formData.answer === option.value ? '2px solid #111827' : '1px solid #d1d5db',
											borderRadius: 8,
											cursor: 'pointer',
											background: formData.answer === option.value ? '#f9fafb' : '#fff',
											transition: 'all 0.2s',
											minHeight: '44px'
										}}
									>
										<input
											type="radio"
											name="answer"
											value={option.value}
											checked={formData.answer === option.value}
											onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
											required
											style={{ marginRight: 12, marginTop: 2, cursor: 'pointer', flexShrink: 0 }}
										/>
										<span style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', color: '#374151', lineHeight: 1.5, flex: 1 }}>{option.label}</span>
									</label>
								))}
							</div>
						</div>

						{error && (
							<div style={{ padding: 'clamp(10px, 2.5vw, 12px)', background: '#fee2e2', color: '#991b1b', borderRadius: 8, fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
								{error}
							</div>
						)}

						<button
							type="submit"
							disabled={submitting}
							style={{
								padding: 'clamp(12px, 3vw, 14px) clamp(24px, 6vw, 28px)',
								background: submitting ? '#9ca3af' : '#111827',
								color: '#fff',
								border: 'none',
								borderRadius: 8,
								fontSize: 'clamp(15px, 3.75vw, 16px)',
								fontWeight: 600,
								cursor: submitting ? 'not-allowed' : 'pointer',
								transition: 'background 0.2s',
								minHeight: '44px',
								width: '100%'
							}}
						>
							{submitting ? 'Submitting...' : 'Submit Answer'}
						</button>
					</form>
				</div>
			)}

			{/* Description Section - Placed after the form */}
			<div style={{ marginTop: 'clamp(24px, 6vw, 40px)' }}>
				<div style={{ fontSize: '16px', lineHeight: '1.8', color: '#374151' }}>
					<p style={{ marginBottom: '16px' }}>
						കുവൈത്ത് കേരള മുസ്ലിം അസ്സോസിയേഷൻ പുണ്യമാക്കപ്പെട്ട റമദാൻ മാസത്തിൽ ഓൺലൈൻ ആയി സംഘടിപ്പിക്കുന്ന മത പ്രഭാഷണങ്ങളും അതിനെ അധികരിച്ചുള്ള ക്വിസ്സുകളും ആണ് ഈ വീഡിയോകളിൽ ഉൾക്കൊള്ളിച്ചിട്ടുള്ളത്. 
					<br />
                    	റമദാൻ മാസം മുഴുവൻ ഓരോ ദിവസവും കേരളത്തിലെയും, കുവൈത്തിലെയും പ്രശസ്തരായ പണ്ഡിതന്മാർ പങ്കെടുക്കുന്ന അഞ്ചോ- ആറോ മിനിട്ട് നീണ്ട് നിൽക്കുന്ന പഠനാർഹമായ വീഡിയോ കെ.കെ.എം.എ വെബ്സൈറ്റ് വഴി അപ്‌ലോഡ് ചെയ്യുന്നതാണ്.
					</p>
					<p style={{ marginBottom: '16px' }}>
						വീഡിയോയുടെ അവസാനം അന്നേ ദിവസം നടത്തിയിട്ടുള്ള പ്രഭാഷണത്തെ അധികരിച്ച് ഒരു ചോദ്യവും ഉണ്ടായിരിക്കുന്നതാണ്. ലിങ്ക് ക്ലിക്ക് ചെയ്ത് വീഡിയോ കണ്ടതിന്‌ ശേഷം നിങ്ങളുടെ ഡീറ്റെയിൽസ് എന്റർ ചെയ്ത് ഇവിടെ തന്നെ നിങ്ങളുടെ ഉത്തരവും കൊടുക്കാവുന്നതാണ്.
					</p>
					<p style={{ marginBottom: 0 }}>
						ഓരോ ദിവസവും ശരിയുത്തരം അയച്ചവരിൽ നിന്നും തിരഞ്ഞെടുത്ത ഒരാൾക്ക് ദിവസവും ആകർഷകമായ സമ്മാനം ഉണ്ടായിരിക്കുന്നതാണ്.
					</p>
				</div>
			</div>
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
						padding: 'clamp(10px, 2.5vw, 20px)'
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
							top: 'clamp(10px, 2.5vw, 20px)',
							right: 'clamp(10px, 2.5vw, 20px)',
							background: 'rgba(255, 255, 255, 0.9)',
							border: 'none',
							borderRadius: '50%',
							width: 'clamp(36px, 9vw, 40px)',
							height: 'clamp(36px, 9vw, 40px)',
							fontSize: 'clamp(20px, 5vw, 24px)',
							cursor: 'pointer',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#111827',
							fontWeight: 'bold',
							zIndex: 10000,
							minWidth: '44px',
							minHeight: '44px'
						}}
					>
						×
					</button>
					<img
						src={`${baseUrl}${quiz.imagePath}`}
						alt={quiz.title}
						onClick={(e) => e.stopPropagation()}
						style={{
							maxWidth: '95%',
							maxHeight: '95%',
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
