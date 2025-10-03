import React, { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

type EventItem = {
  _id: string
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
  createdAt: string
  updatedAt: string
}

export default function EventsPrograms(): React.JSX.Element {
  const [events, setEvents] = useState<EventItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(9)
  const [searchParams, setSearchParams] = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    return searchParams.get('category') || 'all'
  })
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${baseUrl}/api/events?page=${page}&limit=${limit}`)
        const data = await res.json()
        if (res.ok && data?.ok && Array.isArray(data.items)) {
          setEvents(data.items)
          setTotal(Number(data.total || 0))
        } else {
          setError('Failed to load events')
        }
      } catch {
        setError('Network error')
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [page, limit, baseUrl])

  // Filter events based on selected category
  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'all') {
      return events
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    return events.filter(event => {
      const eventStartDate = new Date(event.startDate || event.createdAt)
      const eventDate = new Date(eventStartDate.getFullYear(), eventStartDate.getMonth(), eventStartDate.getDate())

      switch (selectedCategory) {
        case 'featured':
          // Events marked as featured (you can add a featured field to your Event model)
          return event.category?.toLowerCase().includes('featured') || 
                 event.title?.toLowerCase().includes('featured') ||
                 event.description?.toLowerCase().includes('featured')
        
        case 'upcoming':
          // Events that start today or in the future
          return eventDate >= today
        
        case 'meetings':
          // Events categorized as meetings
          return event.category?.toLowerCase().includes('meeting') || 
                 event.title?.toLowerCase().includes('meeting') ||
                 event.description?.toLowerCase().includes('meeting')
        
        default:
          // Filter by specific category if it matches the event's category
          return event.category?.toLowerCase() === selectedCategory.toLowerCase()
      }
    })
  }, [events, selectedCategory])

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setPage(1) // Reset to first page when changing category
    
    // Update URL parameters
    const newSearchParams = new URLSearchParams(searchParams)
    if (category === 'all') {
      newSearchParams.delete('category')
    } else {
      newSearchParams.set('category', category)
    }
    setSearchParams(newSearchParams)
  }

  // Helper function to format date badge
  const formatDateBadge = (dateString?: string) => {
    if (!dateString) return { day: '01', monthYear: "Jan'24" }
    
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = monthNames[date.getMonth()]
    const year = String(date.getFullYear()).slice(-2)
    
    return { day, monthYear: `${month}'${year}` }
  }

  // Helper function to format date range
  const formatDateRange = (startDate?: string, endDate?: string, startTime?: string, endTime?: string) => {
    if (!startDate) return 'Date TBD'
    
    const start = new Date(startDate)
    const startFormatted = start.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
    
    if (!endDate || endDate === startDate) {
      // Single day event
      const timeInfo = startTime && endTime ? ` at ${startTime} - ${endTime}` : startTime ? ` at ${startTime}` : ''
      return `${startFormatted}${timeInfo}`
    } else {
      // Multi-day event
      const end = new Date(endDate)
      const endFormatted = end.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
      return `${startFormatted} - ${endFormatted}`
    }
  }

  // Helper function to format location
  const formatLocation = (venueCity?: string, venueState?: string, venueCountry?: string) => {
    const parts = [venueCity, venueState, venueCountry].filter(Boolean)
    return parts.length > 0 ? parts.join(', ') : 'Location TBD'
  }

  const totalPages = Math.max(1, Math.ceil(total / limit))

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
              <li>Events &amp; Programs</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="events-grid sec-pad-2">
        <div className="auto-container">
          {/* Category Filter Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '12px', 
            marginBottom: '40px',
            flexWrap: 'wrap'
          }}>
            {[
              { key: 'all', label: 'All Events' },
              { key: 'featured', label: 'Featured Events' },
              { key: 'upcoming', label: 'Upcoming Events' },
              { key: 'meetings', label: 'Upcoming Meetings' }
            ].map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategoryChange(category.key)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  background: selectedCategory === category.key ? '#83b253' : '#f8f9fa',
                  color: selectedCategory === category.key ? '#fff' : '#374151',
                  border: selectedCategory === category.key ? 'none' : '1px solid #e5e7eb'
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.key) {
                    e.currentTarget.style.background = '#e5e7eb'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.key) {
                    e.currentTarget.style.background = '#f8f9fa'
                  }
                }}
              >
                {category.label}
              </button>
            ))}
          </div>

          {error && (
            <div style={{ 
              background: '#fee2e2', 
              border: '1px solid #fecaca', 
              color: '#b91c1c', 
              padding: 12, 
              borderRadius: 8, 
              marginBottom: 16 
            }}>
              {error}
            </div>
          )}
          
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
              Loading events...
            </div>
          ) : filteredEvents.length === 0 ? (
            <div style={{ 
              background: '#eff6ff', 
              border: '1px solid #bfdbfe', 
              color: '#1e3a8a', 
              padding: 20, 
              borderRadius: 8, 
              textAlign: 'center' 
            }}>
              No {selectedCategory === 'all' ? '' : selectedCategory} events found.
            </div>
          ) : (
            <>
          <div className="row clearfix">
                {filteredEvents.map((event) => {
                  const dateBadge = formatDateBadge(event.startDate)
                  const dateRange = formatDateRange(event.startDate, event.endDate, event.startTime, event.endTime)
                  const location =  event.venueCountry
                  
                  return (
                    <div key={event._id} className="col-lg-4 col-md-6 col-sm-12 schedule-block">
                <div className="schedule-block-one">
                  <div className="inner-box">
                    <div className="image-box">
                            <figure className="image">
                              {event.imagePath ? (
                                <img 
                                  src={`${baseUrl}${event.imagePath}`} 
                                  alt={event.title}
                                  style={{ 
                                    width: '100%', 
                                    height: '250px', 
                                    objectFit: 'contain',
                                    objectPosition: 'center',
                                    backgroundColor: '#f8f9fa'
                                  }}
                                />
                              ) : (
                                <div style={{ 
                                  width: '100%', 
                                  height: '250px', 
                                  background: '#f0f0f0', 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  justifyContent: 'center', 
                                  color: '#666' 
                                }}>
                                  No Image
                                </div>
                              )}
                            </figure>
                      <div className="content-box">
                              <div className="post-date">
                                <h3>{dateBadge.day}<span>{dateBadge.monthYear}</span></h3>
                              </div>
                        <div className="text">
                                {event.category && (
                                  <span className="category" style={{ 
                                    background: '#83b253', 
                                    color: '#fff', 
                                    padding: '4px 8px', 
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    fontWeight: '500'
                                  }}>
                                    <i className="flaticon-star" style={{ fontSize: '10px', marginRight: '4px' }}></i>
                                    {event.category}
                                  </span>
                                )}
                                <h4 style={{ color: '#83b253', fontSize: '18px', fontWeight: '700', margin: '10px 0' }}>
                                  {event.title}
                                </h4>
                        </div>
                      </div>
                    </div>
                    <div className="lower-content">
                      <ul className="post-info clearfix">
                              <li>
                                <i className="flaticon-clock-circular-outline"></i>
                                {dateRange}
                              </li>
                              <li>
                                <i className="flaticon-gps"></i>
                                {location}
                              </li>
                            
                      </ul>
                         
                            <div className="links">
                              <Link 
                                to={`/media/events-and-programs/${event._id}`}
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  color: '#83b253',
                                  textDecoration: 'none',
                                  fontWeight: '600',
                                  fontSize: '14px',
                                  transition: 'color 0.2s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#6a9a3e'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#83b253'}
                              >
                                Read More<i className="flaticon-right-arrow"></i>
                              </Link>
                            </div>
                    </div>
                  </div>
                </div>
              </div>
                  )
                })}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    {page > 1 && (
                      <button
                        onClick={() => setPage(page - 1)}
                        style={{
                          padding: '10px 16px',
                          background: '#83b253',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        Previous
                      </button>
                    )}
                    
                    <span style={{
                      padding: '10px 16px',
                      background: '#f3f4f6',
                      color: '#374151',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Page {page} of {totalPages}
                    </span>
                    
                    {page < totalPages && (
                      <button
                        onClick={() => setPage(page + 1)}
                        style={{
                          padding: '10px 16px',
                          background: '#83b253',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        Next
                      </button>
                    )}
          </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}












