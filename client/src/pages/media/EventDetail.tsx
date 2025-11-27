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
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || '', [])

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

  // Calendar functionality
  const generateCalendarUrl = (format: 'google' | 'outlook' | 'outlook365' | 'ics') => {
    if (!item) return '#'

    const startDate = new Date(item.startDate || '')
    const endDate = item.endDate ? new Date(item.endDate) : startDate
    
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    }

    const title = encodeURIComponent(item.title)
    const description = encodeURIComponent(item.description || '')
    const location = encodeURIComponent(
      [item.venueCity, item.venueState, item.venueCountry].filter(Boolean).join(', ')
    )

    switch (format) {
      case 'google':
        const googleStart = formatDate(startDate)
        const googleEnd = formatDate(endDate)
        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${googleStart}/${googleEnd}&details=${description}&location=${location}`
      
      case 'outlook':
        const outlookStart = startDate.toISOString()
        const outlookEnd = endDate.toISOString()
        return `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&startdt=${outlookStart}&enddt=${outlookEnd}&body=${description}&location=${location}`
      
      case 'outlook365':
        const outlook365Start = startDate.toISOString()
        const outlook365End = endDate.toISOString()
        return `https://outlook.office365.com/calendar/action/compose?subject=${title}&startdt=${outlook365Start}&enddt=${outlook365End}&body=${description}&location=${location}`
      
      case 'ics':
        const icsStart = formatDate(startDate)
        const icsEnd = formatDate(endDate)
        const icsData = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'PRODID:-//KKMA//Event//EN',
          'BEGIN:VEVENT',
          `DTSTART:${icsStart}`,
          `DTEND:${icsEnd}`,
          `SUMMARY:${item.title}`,
          `DESCRIPTION:${item.description || ''}`,
          `LOCATION:${[item.venueCity, item.venueState, item.venueCountry].filter(Boolean).join(', ')}`,
          'END:VEVENT',
          'END:VCALENDAR'
        ].join('\r\n')
        
        const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        
        // Create temporary download link
        const link = document.createElement('a')
        link.href = url
        link.download = `${item.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
        return '#'
    }
  }

  const handleCalendarClick = (format: 'google' | 'outlook' | 'outlook365' | 'ics') => {
    const url = generateCalendarUrl(format)
    if (format !== 'ics' && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer')
    }
  }

  // Map functionality
  const getMapUrl = () => {
    if (!item) return '#'
    
    const location = [item.venueCity, item.venueState, item.venueCountry].filter(Boolean).join(', ') || 'Kuwait'
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
  }

  const handleMapClick = () => {
    const mapUrl = getMapUrl()
    if (mapUrl !== '#') {
      window.open(mapUrl, '_blank', 'noopener,noreferrer')
    }
  }

  // Helper function to convert 24-hour time to 12-hour format
  const formatTime12Hour = (time24: string) => {
    if (!time24) return ''
    
    try {
      const [hours, minutes] = time24.split(':')
      const hour = parseInt(hours, 10)
      const min = minutes || '00'
      
      if (hour === 0) {
        return `12:${min} AM`
      } else if (hour < 12) {
        return `${hour}:${min} AM`
      } else if (hour === 12) {
        return `12:${min} PM`
      } else {
        return `${hour - 12}:${min} PM`
      }
    } catch (error) {
      return time24 // Return original if parsing fails
    }
  }

  // Share functionality
  const handleShare = (platform: 'facebook' | 'twitter' | 'linkedin' | 'pinterest') => {
    const title = item?.title || 'KKMA Event'
    const url = pageUrl
    const text = shareText

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400')
        break
      
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank', 'width=600,height=400')
        break
      
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank', 'width=600,height=400')
        break
      
      case 'pinterest':
        const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}${imgSrc ? `&media=${encodeURIComponent(imgSrc)}` : ''}&description=${encodeURIComponent(text)}`
        window.open(pinterestUrl, '_blank', 'width=600,height=400')
        break
    }
  }

  // Debug dropdown state
  useEffect(() => {
    console.log('dropdownOpen state changed:', dropdownOpen)
  }, [dropdownOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (dropdownOpen && !target.closest('.calendar-dropdown')) {
        setDropdownOpen(false)
      }
    }

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [dropdownOpen])

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

      <section className="sidebar-page-container sec-pad-2">
        <div className="auto-container">
          {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 16 }}>{error}</div>}
          {!item ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>Loading event details...</div>
          ) : (
            <div className="row clearfix">
              {/* Left Content Section */}
              <div className="content-side col-lg-8 col-md-12 col-sm-12">
                <div className="event-detail-content">
                  {/* Event Image */}
                  {imgSrc && (
                    <div style={{ marginBottom: 24 }}>
                      <img 
                        src={imgSrc} 
                        alt={item.title}
                        style={{ 
                          width: '100%', 
                          height: '400px', 
                          objectFit: 'contain', 
                          objectPosition: 'center',
                          borderRadius: 12,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          backgroundColor: '#f8f9fa'
                        }}
                      />
                    </div>
                  )}

                  {/* Event Title */}
                  <h1 style={{
                    fontSize: '32px',
                    fontWeight: '700',
                    color: '#83b253',
                    lineHeight: '1.3',
                    margin: '0 0 20px 0'
                  }}>
                    {item.title}
                  </h1>

                  {/* Event Description */}
                  {item.description && (
                    <div style={{ 
                      fontSize: '16px', 
                      lineHeight: '1.7', 
                      color: '#374151',
                      marginBottom: 32,
                      whiteSpace: 'pre-wrap'
                    }}>
                      {item.description}
                    </div>
                  )}

             

                  {/* Event Details Section */}
                  <div style={{ 
                    background: '#f8f9fa', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px', 
                    padding: '24px',
                    marginBottom: 32
                  }}>
                    <h3 style={{ 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      color: '#1f2937', 
                      margin: '0 0 20px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <i className="far fa-info-circle" style={{ color: '#83b253' }}></i>
                      Event Details
                    </h3>
                    
                    <div style={{ display: 'grid', gap: '16px' }}>
                      {item.startDate && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <i className="far fa-calendar-alt" style={{ fontSize: '16px', color: '#83b253', width: '20px' }}></i>
                          <div>
                            <strong style={{ color: '#374151' }}>Date:</strong>
                            <span style={{ marginLeft: '8px', color: '#6b7280' }}>
                              {new Date(item.startDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {item.startTime && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <i className="far fa-clock" style={{ fontSize: '16px', color: '#83b253', width: '20px' }}></i>
                          <div>
                            <strong style={{ color: '#374151' }}>Time:</strong>
                            <span style={{ marginLeft: '8px', color: '#6b7280' }}>
                              {formatTime12Hour(item.startTime)}{item.endTime ? ` - ${formatTime12Hour(item.endTime)}` : ''}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {item.cost && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <i className="fas fa-tag" style={{ fontSize: '16px', color: '#83b253', width: '20px' }}></i>
                          <div>
                            <strong style={{ color: '#374151' }}>Cost:</strong>
                            <span style={{ marginLeft: '8px', color: '#6b7280' }}>{item.cost}</span>
                          </div>
                        </div>
                      )}
                      
                      {item.organizerWebsite && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <i className="fas fa-globe" style={{ fontSize: '16px', color: '#83b253', width: '20px' }}></i>
                          <div>
                            <strong style={{ color: '#374151' }}>Website:</strong>
                            <a href={item.organizerWebsite} target="_blank" rel="noopener noreferrer" style={{ 
                              marginLeft: '8px', 
                              color: '#1877f2',
                              textDecoration: 'none'
                            }}>
                              www.kkma.net
                            </a>
                          </div>
                        </div>
                      )}
                      
                      {(item.organizerName || item.organizerPhone || item.organizerEmail) && (
                        <div style={{ marginTop: '8px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                          <h4 style={{ 
                            fontSize: '16px', 
                            fontWeight: '600', 
                            color: '#1f2937', 
                            margin: '0 0 12px 0' 
                          }}>
                            Organizer Information
                          </h4>
                          
                          {item.organizerPhone && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                              <i className="fas fa-phone" style={{ fontSize: '14px', color: '#83b253', width: '20px' }}></i>
                              <div>
                                <strong style={{ color: '#374151' }}>Phone:</strong>
                                <a href={`tel:${item.organizerPhone}`} style={{ 
                                  marginLeft: '8px', 
                                  color: '#1877f2',
                                  textDecoration: 'none'
                                }}>
                                  {item.organizerPhone}
                                </a>
                              </div>
                            </div>
                          )}
                          
                          {item.organizerEmail && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                              <i className="far fa-envelope" style={{ fontSize: '14px', color: '#83b253', width: '20px' }}></i>
                              <div>
                                <strong style={{ color: '#374151' }}>Email:</strong>
                                <a href={`mailto:${item.organizerEmail}`} style={{ 
                                  marginLeft: '8px', 
                                  color: '#1877f2',
                                  textDecoration: 'none'
                                }}>
                                  {item.organizerEmail}
                                </a>
                              </div>
                            </div>
                          )}
                          
                          {item.organizerWebsite && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <i className="fas fa-external-link-alt" style={{ fontSize: '14px', color: '#83b253', width: '20px' }}></i>
                              <div>
                                <strong style={{ color: '#374151' }}>Website:</strong>
                                <a href={item.organizerWebsite} target="_blank" rel="noopener noreferrer" style={{ 
                                  marginLeft: '8px', 
                                  color: '#1877f2',
                                  textDecoration: 'none'
                                }}>
                                  View Organizer Website
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add to Calendar Dropdown */}
                  <div className="calendar-dropdown" style={{ marginBottom: 32, position: 'relative' }}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          console.log('Button clicked, current dropdownOpen:', dropdownOpen)
                          setDropdownOpen(!dropdownOpen)
                        }}
                        style={{
                          background: '#83b253',
                          color: '#fff',
                          border: 'none',
                          padding: '12px 24px',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          transition: 'background 0.2s ease',
                          minWidth: '180px',
                          justifyContent: 'space-between'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#6d9443'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#83b253'}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <i className="far fa-calendar-plus"></i>
                          Add to Calendar
                        </div>
                        <i className={`fas fa-chevron-${dropdownOpen ? 'up' : 'down'}`} style={{ fontSize: '12px' }}></i>
                      </button>
                      
                      {dropdownOpen && (
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: '0',
                          background: '#fff',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          zIndex: 1000,
                          minWidth: '200px',
                          marginTop: '4px'
                        }}>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCalendarClick('google')
                              setDropdownOpen(false)
                            }}
                            style={{
                              width: '100%',
                              background: 'transparent',
                              color: '#374151',
                              border: 'none',
                              padding: '12px 16px',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              transition: 'background 0.2s ease',
                              borderBottom: '1px solid #f3f4f6'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <i className="fab fa-google" style={{ color: '#4285f4', width: '16px' }}></i>
                            Google Calendar
                          </button>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCalendarClick('outlook')
                              setDropdownOpen(false)
                            }}
                            style={{
                              width: '100%',
                              background: 'transparent',
                              color: '#374151',
                              border: 'none',
                              padding: '12px 16px',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              transition: 'background 0.2s ease',
                              borderBottom: '1px solid #f3f4f6'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <i className="fab fa-microsoft" style={{ color: '#0078d4', width: '16px' }}></i>
                            Outlook Live
                          </button>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCalendarClick('outlook365')
                              setDropdownOpen(false)
                            }}
                            style={{
                              width: '100%',
                              background: 'transparent',
                              color: '#374151',
                              border: 'none',
                              padding: '12px 16px',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              transition: 'background 0.2s ease',
                              borderBottom: '1px solid #f3f4f6'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <i className="fab fa-microsoft" style={{ color: '#0078d4', width: '16px' }}></i>
                            Outlook 365
                          </button>
                          
                          <button 
                            onClick={(e) => {
                              e.stopPropagation()
                              handleCalendarClick('ics')
                              setDropdownOpen(false)
                            }}
                            style={{
                              width: '100%',
                              background: 'transparent',
                              color: '#374151',
                              border: 'none',
                              padding: '12px 16px',
                              fontSize: '14px',
                              fontWeight: '500',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '12px',
                              transition: 'background 0.2s ease'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          >
                            <i className="fas fa-calendar-alt" style={{ color: '#6b7280', width: '16px' }}></i>
                            iCalendar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                     {/* Map Section */}
                     <div style={{ 
                    background: '#f8f9fa', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px', 
                    padding: '24px',
                    marginBottom: 32
                  }}>
                    <h3 style={{ 
                      fontSize: '20px', 
                      fontWeight: '700', 
                      color: '#1f2937', 
                      margin: '0 0 16px 0',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      <i className="fas fa-map-marker-alt" style={{ color: '#83b253' }}></i>
                      Event Location
                    </h3>
                    <div 
                      onClick={handleMapClick}
                      style={{ 
                        background: '#ffffff', 
                        border: '1px solid #e5e7eb', 
                        borderRadius: '8px', 
                        padding: '20px', 
                        textAlign: 'center',
                        color: '#6b7280',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#83b253'
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(131, 178, 83, 0.1)'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#e5e7eb'
                        e.currentTarget.style.boxShadow = 'none'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }}
                    >
                      <i className="fas fa-map-marker-alt" style={{ fontSize: '24px', color: '#83b253', marginBottom: '8px' }}></i>
                      <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px', color: '#83b253' }}>
                        {[item?.venueCity, item?.venueState, item?.venueCountry].filter(Boolean).join(', ') || 'Kuwait'}
                      </div>
                      <div style={{ fontSize: '12px' }}>Click to view on Google Maps</div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <aside className="sidebar-side col-lg-4 col-md-12 col-sm-12">
                <div className="blog-sidebar">

                  {/* Event Categories */}
                  <div className="widget sidebar-widget">
                    <h2 className="wp-block-heading">Event Categories:</h2>
                    <ul className="wp-block-categories-list wp-block-categories">
                      <li><a href="/media/events-and-programs">All Events</a></li>
                      <li><a href="/media/events-and-programs?category=featured">Featured Events</a></li>
                      <li><a href="/media/events-and-programs?category=upcoming">Upcoming Events</a></li>
                      <li><a href="/media/events-and-programs?category=meetings">Upcoming Meetings</a></li>
                    </ul>
                  </div>


                </div>
              </aside>
            </div>
          )}
        </div>
      </section>

      {/* Share Section */}
      {item && (
        <section style={{ background: '#f8f9fa', padding: '40px 0' }}>
          <div className="auto-container">
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ fontSize: '24px', fontWeight: '700', color: '#1f2937', marginBottom: '24px' }}>Share With Others</h3>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => handleShare('facebook')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#1877f2',
                    color: '#fff',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#166fe5'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#1877f2'}
                >
                  <i className="fab fa-facebook-f"></i>
                  Facebook
                </button>
                
                <button 
                  onClick={() => handleShare('twitter')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#1da1f2',
                    color: '#fff',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#1a91da'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#1da1f2'}
                >
                  <i className="fab fa-twitter"></i>
                  Twitter
                </button>
                
                <button 
                  onClick={() => handleShare('linkedin')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#0a66c2',
                    color: '#fff',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#0855a5'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#0a66c2'}
                >
                  <i className="fab fa-linkedin-in"></i>
                  LinkedIn
                </button>
                
                <button 
                  onClick={() => handleShare('pinterest')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#bd081c',
                    color: '#fff',
                    padding: '12px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#a50718'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#bd081c'}
                >
                  <i className="fab fa-pinterest-p"></i>
                  Pinterest
                </button>

              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
} 