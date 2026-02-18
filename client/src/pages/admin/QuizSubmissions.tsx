import React, { useEffect, useMemo, useState } from 'react'

type QuizSubmission = {
	_id: string
	quizId: {
		_id: string
		day: number
		year: number
		title: string
	}
	year: number
	day: number
	fullName: string
	phoneNumber: string
	location: string
	residenceCountry: string
	answer: string
	isCorrect: boolean
	submittedAt: string
	ipAddress?: string
}

type SubmissionStats = {
	total: number
	correct: number
	incorrect: number
	accuracy: string
}

export default function QuizSubmissions(): React.JSX.Element {
	const [allSubmissions, setAllSubmissions] = useState<QuizSubmission[]>([])
	const [submissions, setSubmissions] = useState<QuizSubmission[]>([])
	const [submissionStats, setSubmissionStats] = useState<SubmissionStats | null>(null)
	const [loadingSubmissions, setLoadingSubmissions] = useState(false)
	const [submissionError, setSubmissionError] = useState<string>('')
	const [selectedDay, setSelectedDay] = useState<number | null>(null)
	const [correctFilter, setCorrectFilter] = useState<'all' | 'correct' | 'incorrect'>('all')

	const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || '', [])

	useEffect(() => {
		const token = localStorage.getItem('adminToken')
		if (token !== 'admin-authenticated') {
			window.location.href = '/admin'
		}
	}, [])

	useEffect(() => {
		// Load all submissions on mount
		loadAllSubmissions()
	}, [baseUrl])

	async function loadAllSubmissions() {
		setLoadingSubmissions(true)
		setSubmissionError('')
		try {
			console.log('Loading all submissions...')
			const res = await fetch(`${baseUrl}/api/admin/quiz/submissions/all`)
			
			console.log('Response status:', res.status, res.statusText)
			console.log('Response ok:', res.ok)
			
			const text = await res.text()
			console.log('Response text length:', text.length)
			console.log('Response text preview:', text.substring(0, 200))
			
			if (!res.ok) {
				let errorMsg = `HTTP ${res.status}: ${res.statusText}`
				try {
					const errorData = JSON.parse(text)
					errorMsg = errorData.error || errorMsg
					if (errorData.details) {
						errorMsg += ` - ${errorData.details.substring(0, 200)}`
					}
				} catch {
					errorMsg = text || errorMsg
				}
				console.error('API returned error:', errorMsg)
				throw new Error(errorMsg)
			}

			if (!text || text.trim() === '') {
				throw new Error('Empty response from server')
			}

			let data
			try {
				data = JSON.parse(text)
			} catch (parseError: any) {
				console.error('JSON parse error:', parseError, 'Response text:', text)
				throw new Error(`Invalid JSON response: ${text.substring(0, 100)}`)
			}

			console.log('All Submissions API Response:', data)
			
			if (data.ok === true || data.ok === 'true') {
				const items = data.items || []
				
				// Calculate stats from items
				const total = items.length
				const correct = items.filter((s: any) => s.isCorrect === true).length
				const incorrect = total - correct
				const accuracy = total > 0 ? ((correct / total) * 100).toFixed(2) : '0.00'
				
				const stats = {
					total,
					correct,
					incorrect,
					accuracy
				}
				
				console.log('Setting all submissions:', items.length, 'items')
				setAllSubmissions(items)
				setSubmissions(items)
				setSubmissionStats(stats)
				setSubmissionError('')
			} else {
				const errorMsg = data.error || 'Failed to load submissions'
				const details = data.details ? ` (${data.details.substring(0, 200)})` : ''
				console.error('Failed to load submissions:', errorMsg, details)
				setSubmissionError(`${errorMsg}${details}`)
				setSubmissions([])
				setSubmissionStats(null)
			}
		} catch (err: any) {
			const errorMsg = err.message || 'Network error while loading submissions'
			console.error('Failed to load submissions - Full error:', err)
			console.error('Error stack:', err.stack)
			setSubmissionError(errorMsg)
			setSubmissions([])
			setSubmissionStats(null)
		} finally {
			setLoadingSubmissions(false)
		}
	}

	function formatDate(dateString: string): string {
		const date = new Date(dateString)
		return date.toLocaleString('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: '2-digit',
			minute: '2-digit'
		})
	}

	// Get unique days from submissions
	const uniqueDays = useMemo(() => {
		const days = new Set<number>()
		allSubmissions.forEach(sub => {
			if (sub.day) days.add(sub.day)
		})
		return Array.from(days).sort((a, b) => a - b)
	}, [allSubmissions])

	// Filter submissions by selected day and correct/incorrect status
	useEffect(() => {
		let filtered = allSubmissions
		
		// Filter by day
		if (selectedDay !== null) {
			filtered = filtered.filter(sub => sub.day === selectedDay)
		}
		
		// Filter by correct/incorrect status
		if (correctFilter === 'correct') {
			filtered = filtered.filter(sub => sub.isCorrect === true)
		} else if (correctFilter === 'incorrect') {
			filtered = filtered.filter(sub => sub.isCorrect === false)
		}
		
		setSubmissions(filtered)
		
		// Recalculate stats for filtered submissions
		const total = filtered.length
		const correct = filtered.filter(s => s.isCorrect === true).length
		const incorrect = total - correct
		const accuracy = total > 0 ? ((correct / total) * 100).toFixed(2) : '0.00'
		
		setSubmissionStats({
			total,
			correct,
			incorrect,
			accuracy
		})
	}, [selectedDay, correctFilter, allSubmissions])

	return (
		<div>
			<div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16, marginBottom: 24 }}>
				<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 12 }}>
					<h2 style={{ margin: 0, color: '#111827', fontSize: 20, fontWeight: 600 }}>Quiz Submissions</h2>
					<div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
						<label style={{ fontWeight: 600, fontSize: 14, color: '#374151', marginRight: 8 }}>Filter by Day:</label>
						<select
							value={selectedDay || ''}
							onChange={(e) => {
								const day = e.target.value ? parseInt(e.target.value, 10) : null
								setSelectedDay(day)
							}}
							style={{
								padding: '8px 12px',
								border: '1px solid #d1d5db',
								borderRadius: 8,
								fontSize: 14,
								minWidth: 120,
								cursor: 'pointer',
								marginRight: 8
							}}
						>
							<option value="">All Days</option>
							{uniqueDays.map(day => (
								<option key={day} value={day}>Day {day}</option>
							))}
						</select>
						<label style={{ fontWeight: 600, fontSize: 14, color: '#374151', marginRight: 8 }}>Answer Status:</label>
						<select
							value={correctFilter}
							onChange={(e) => {
								setCorrectFilter(e.target.value as 'all' | 'correct' | 'incorrect')
							}}
							style={{
								padding: '8px 12px',
								border: '1px solid #d1d5db',
								borderRadius: 8,
								fontSize: 14,
								minWidth: 140,
								cursor: 'pointer',
								marginRight: 8
							}}
						>
							<option value="all">All Answers</option>
							<option value="correct">Correct Only</option>
							<option value="incorrect">Incorrect Only</option>
						</select>
						<button 
							onClick={loadAllSubmissions}
							disabled={loadingSubmissions}
							style={{ 
								padding: '10px 20px', 
								background: loadingSubmissions ? '#9ca3af' : '#3b82f6', 
								color: '#fff', 
								border: 'none', 
								borderRadius: 8, 
								cursor: loadingSubmissions ? 'not-allowed' : 'pointer', 
								fontSize: 14,
								fontWeight: 600
							}}
						>
							{loadingSubmissions ? 'Loading...' : 'Refresh'}
						</button>
					</div>
				</div>
			</div>

			{/* Submissions Display */}
			<div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, padding: 16 }}>
				{loadingSubmissions ? (
					<div style={{ padding: 20, textAlign: 'center' }}>Loading submissions...</div>
				) : submissionError ? (
					<div style={{ padding: 16, background: '#fee2e2', color: '#991b1b', borderRadius: 8, marginBottom: 16 }}>
						<strong>Error loading submissions:</strong> {submissionError}
						<div style={{ marginTop: 8, fontSize: 14 }}>
							<button 
								onClick={loadAllSubmissions}
								style={{ padding: '6px 12px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
							>
								Retry
							</button>
						</div>
					</div>
				) : submissionStats !== null && submissionStats !== undefined ? (
					<>
						{/* Statistics */}
						<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 20 }}>
							<div style={{ background: '#f3f4f6', padding: 16, borderRadius: 8 }}>
								<div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Total Submissions</div>
								<div style={{ fontSize: 24, fontWeight: 700, color: '#111827' }}>{submissionStats.total}</div>
							</div>
							<div style={{ background: '#d1fae5', padding: 16, borderRadius: 8 }}>
								<div style={{ fontSize: 12, color: '#065f46', marginBottom: 4 }}>Correct Answers</div>
								<div style={{ fontSize: 24, fontWeight: 700, color: '#065f46' }}>{submissionStats.correct}</div>
							</div>
							<div style={{ background: '#fee2e2', padding: 16, borderRadius: 8 }}>
								<div style={{ fontSize: 12, color: '#991b1b', marginBottom: 4 }}>Incorrect Answers</div>
								<div style={{ fontSize: 24, fontWeight: 700, color: '#991b1b' }}>{submissionStats.incorrect}</div>
							</div>
							<div style={{ background: '#dbeafe', padding: 16, borderRadius: 8 }}>
								<div style={{ fontSize: 12, color: '#1e40af', marginBottom: 4 }}>Accuracy Rate</div>
								<div style={{ fontSize: 24, fontWeight: 700, color: '#1e40af' }}>{submissionStats.accuracy}%</div>
							</div>
						</div>

						{/* Submissions Table */}
						{submissions.length === 0 ? (
							<div style={{ padding: 20, textAlign: 'center', color: '#6b7280' }}>
								{selectedDay || correctFilter !== 'all' 
									? `No submissions found${selectedDay ? ` for Day ${selectedDay}` : ''}${correctFilter !== 'all' ? ` (${correctFilter === 'correct' ? 'Correct' : 'Incorrect'} only)` : ''}.`
									: 'No submissions found.'}
							</div>
						) : (
							<div style={{ overflowX: 'auto' }}>
								<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
									<thead>
										<tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
											<th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Day</th>
											<th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Year</th>
											<th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Name</th>
											<th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Phone</th>
											<th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Location</th>
											<th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Country</th>
											<th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Answer</th>
											<th style={{ padding: '12px', textAlign: 'center', fontWeight: 600, color: '#374151' }}>Status</th>
											<th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#374151' }}>Submitted At</th>
										</tr>
									</thead>
									<tbody>
										{submissions.map((submission) => (
											<tr key={submission._id} style={{ borderBottom: '1px solid #e5e7eb' }}>
												<td style={{ padding: '12px', color: '#111827', fontWeight: 600 }}>{submission.day}</td>
												<td style={{ padding: '12px', color: '#111827', fontWeight: 600 }}>{submission.year}</td>
												<td style={{ padding: '12px', color: '#111827' }}>{submission.fullName}</td>
												<td style={{ padding: '12px', color: '#111827' }}>{submission.phoneNumber}</td>
												<td style={{ padding: '12px', color: '#111827' }}>{submission.location}</td>
												<td style={{ padding: '12px', color: '#111827' }}>{submission.residenceCountry}</td>
												<td style={{ padding: '12px', color: '#111827' }}>{submission.answer}</td>
												<td style={{ padding: '12px', textAlign: 'center' }}>
													<span style={{
														padding: '4px 8px',
														borderRadius: 4,
														fontSize: 12,
														fontWeight: 600,
														background: submission.isCorrect ? '#d1fae5' : '#fee2e2',
														color: submission.isCorrect ? '#065f46' : '#991b1b'
													}}>
														{submission.isCorrect ? '✓ Correct' : '✗ Incorrect'}
													</span>
												</td>
												<td style={{ padding: '12px', color: '#6b7280', fontSize: 12 }}>{formatDate(submission.submittedAt)}</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						)}
					</>
				) : (
					<div style={{ padding: 20, textAlign: 'center', color: '#6b7280' }}>Loading submissions...</div>
				)}
			</div>
		</div>
	)
}
