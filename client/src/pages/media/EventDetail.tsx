import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

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

export default function EventDetail(): React.JSX.Element {
  const { id } = useParams()
  const [item, setItem] = useState<EventItem | null>(null)
  const [error, setError] = useState('')
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])

  useEffect(() => {
    const load = async () => {
      if (!id) return
      try {
        const res = await fetch(`${baseUrl}/api/events/${id}`)
        const data = await res.json()
        if (res.ok && data?.ok) setItem(data.item)
        else setError('Not found')
      } catch {
        setError('Network error')
      }
    }
    load()
  }, [id, baseUrl])

  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = item?.title || 'KKMA Event'
  const imgSrc = item?.imagePath ? `${baseUrl}${item.imagePath}` : undefined

  return (
    <div>
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>  Events &amp; Programs</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li><a href="/media/events-and-programs">Events &amp; Programs</a></li>
              <li>{item?.title || 'Event'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sidebar-page-container">
        <div className="auto-container">
          {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 16 }}>{error}</div>}
          {!item ? (
            <div style={{ color: '#6b7280' }}>Loading...</div>
          ) : (
            <div className="row clearfix">
              <div className="content-side col-lg-8 col-md-12 col-sm-12">
                <div className="news-block-three">
                  {imgSrc && (
                    <figure className="image"><img src={imgSrc} alt="" /></figure>
                  )}
                  <div className="lower-content">
                    <h3>{item.title}</h3>
                    {item.category && <div className="category">{item.category}</div>}
                    {item.description && <div style={{ whiteSpace: 'pre-wrap' }}>{item.description}</div>}
                  </div>
                </div>
              </div>
              <aside className="sidebar-side col-lg-4 col-md-12 col-sm-12">
                <div className="sidebar">
                  <div className="sidebar-widget">
                    <h4>Event Details</h4>
                    <ul>
                      {item.startDate && <li><strong>Date:</strong> {item.startDate}{item.endDate ? ` - ${item.endDate}` : ''}</li>}
                      {item.startTime && <li><strong>Time:</strong> {item.startTime}{item.endTime ? ` - ${item.endTime}` : ''}</li>}
                      {[item.venueCity, item.venueState, item.venueCountry].filter(Boolean).length > 0 && (
                        <li><strong>Venue:</strong> {[item.venueCity, item.venueState, item.venueCountry].filter(Boolean).join(', ')}</li>
                      )}
                      {item.cost && <li><strong>Cost:</strong> {item.cost}</li>}
                      {item.organizerName && <li><strong>Organizer:</strong> {item.organizerName}</li>}
                      {item.organizerPhone && <li><strong>Phone:</strong> {item.organizerPhone}</li>}
                      {item.organizerEmail && <li><strong>Email:</strong> {item.organizerEmail}</li>}
                      {item.organizerWebsite && <li><strong>Website:</strong> <a href={item.organizerWebsite} target="_blank">{item.organizerWebsite}</a></li>}
                    </ul>
                  </div>

                  <div className="sidebar-widget">
                    <h4>Share</h4>
                    <ul className="social-links">
                      <li><a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank">Facebook</a></li>
                      <li><a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`} target="_blank">Twitter/X</a></li>
                      <li><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`} target="_blank">LinkedIn</a></li>
                      <li><a href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}${imgSrc ? `&media=${encodeURIComponent(imgSrc)}` : ''}&description=${encodeURIComponent(shareText)}`} target="_blank">Pinterest</a></li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  )
} 