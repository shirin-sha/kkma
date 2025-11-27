import { Star } from 'lucide-react';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { API_URL } from '../utils/config'

export default function Contact(): React.JSX.Element {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  const branches = [
    { name: 'Abu Halifa', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Ahmed Al-Sabah', address: 'Street 1, Block 1, Abu Halifa, Hawally' },
    { name: 'Ahmadi', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Fatima Al-Ahmad', address: 'Street 2, Block 2, Ahmadi, Ahmadi' },
    { name: 'Kuwait City', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Mohammed Al-Kuwait', address: 'Street 3, Block 3, Kuwait City, Capital' },
    { name: 'Abbasiya', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Noura Al-Abbasi', address: 'Street 4, Block 4, Abbasiya, Hawally' },
    { name: 'Fahahaeel', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Khalid Al-Fahahaeel', address: 'Street 5, Block 5, Fahahaeel, Ahmadi' },
    { name: 'Farwaniya', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Mariam Al-Farwaniya', address: 'Street 6, Block 6, Farwaniya, Farwaniya' },
    { name: 'Fintas', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Abdullah Al-Fintas', address: 'Street 7, Block 7, Fintas, Ahmadi' },
    { name: 'Hasawi', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Hessa Al-Hasawi', address: 'Street 8, Block 8, Hasawi, Ahmadi' },
    { name: 'Hawally', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Saad Al-Hawally', address: 'Street 9, Block 9, Hawally, Hawally' },
    { name: 'Jahra', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Nasser Al-Jahra', address: 'Street 10, Block 10, Jahra, Jahra' },
    { name: 'Khaitan', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Layla Al-Khaitan', address: 'Street 11, Block 11, Khaitan, Farwaniya' },
    { name: 'Mahbola', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Yousef Al-Mahbola', address: 'Street 12, Block 12, Mahbola, Ahmadi' },
    { name: 'Sabhan', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Aisha Al-Sabhan', address: 'Street 13, Block 13, Sabhan, Hawally' },
    { name: 'Salmiya', phone: '+965123456789', email: 'info@kkma.net', contactPerson: 'Omar Al-Salmiya', address: 'Street 14, Block 14, Salmiya, Hawally' },
  ]

  const cardsPerSlide = 2
  const totalSlides = Math.ceil(branches.length / cardsPerSlide)

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex)
  }

  // Create slides with exactly 2 cards each
  const createSlides = () => {
    const slides: (typeof branches[0])[][] = []
    for (let i = 0; i < totalSlides; i++) {
      const startIndex = i * cardsPerSlide
      const endIndex = startIndex + cardsPerSlide
      const slideCards = branches.slice(startIndex, endIndex)
      slides.push(slideCards)
    }
    return slides
  }

  const slides = createSlides()
  console.log('Total slides:', totalSlides)
  console.log('Slides:', slides)
  console.log('Current slide:', currentSlide)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 4000)
    return () => clearInterval(interval)
  }, [totalSlides])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setStatus(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) {
      setStatus({ ok: false, msg: 'Please fill name, email and message.' })
      return
    }
    setSubmitting(true)
    setStatus(null)
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (res.ok && data?.ok) {
        setStatus({ ok: true, msg: 'Message sent successfully.' })
        setForm({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus({ ok: false, msg: data?.error || 'Failed to send message.' })
      }
    } catch (err) {
      setStatus({ ok: false, msg: 'Network error. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>  Contact</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="contact-information">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-5 col-md-6 col-sm-12 content-column">
              <div className="content_block_12">
                <div className="content-box">
                  <div className="sec-title">
                    <h6><Star fill='currentColor' size={16} /><span>We're Here to Listen and Assist You</span></h6>
                    <h2>Get in Touch with KKMA</h2>
                    <div className="title-shape"></div>
                  </div>
                  <div className="text">
                    <p>
                      Whether you have a question, need assistance, or want to learn more about our initiatives, we're just a message away. Connect with us through the form, and our team will get back to you promptly.
                    </p>
                    <div className="contact_box_n two"><p><span><i className="fa fa fa-envelope"></i>Email : </span>info@kkma.net</p></div>
                    <div className="contact_box_n two"><p><span><i className="fa fa fa-phone"></i>Phone : </span>+965 506 49506</p></div>
                    <div className="contact_box_n two"><p><span><i className="fa fa fa-mobile"></i>Magnet : </span>+965 506 49506</p></div>
                  </div>
                  <div className="social-box">
                    <ul className="social-style-one clearfix">
                      <li><a href="#" title="Facebook" target="_blank" rel="noreferrer"><i className="fab fa fa-facebook"></i></a></li>
                      <li><a href="#" title="Twitter" target="_blank" rel="noreferrer"><i className="fab fa fa-twitter"></i></a></li>
                      <li><a href="#" title="Pinterest" target="_blank" rel="noreferrer"><i className="fab fa fa-pinterest-p"></i></a></li>
                      <li><a href="#" title="Instagram" target="_blank" rel="noreferrer"><i className="fab fa fa-instagram"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7 col-md-12 col-sm-12 contact-column">
              <div className="contact_form_box">
                <div id="contact-form" className="default-form">
                  <form onSubmit={handleSubmit}>
                    <div className="row clearfix">
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="form-group">
                          <input type="text" name="name" placeholder="Your Name" required value={form.name} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="form-group">
                          <input type="email" name="email" placeholder="Email Address" required value={form.email} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <input type="text" name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <textarea name="message" placeholder="Write Your Message ..." rows={6} value={form.message} onChange={handleChange}></textarea>
                        </div>
                        {status && (
                          <div style={{
                            background: status.ok ? '#ecfdf5' : '#fee2e2',
                            border: `1px solid ${status.ok ? '#a7f3d0' : '#fecaca'}`,
                            color: status.ok ? '#065f46' : '#b91c1c',
                            padding: 12,
                            borderRadius: 8,
                            marginBottom: 12,
                            fontSize: 14,
                          }}>
                            {status.msg}
                          </div>
                        )}
                        <div className="message-btn">
                          <button className="theme-btn" type="submit" name="submit-form" disabled={submitting}>
                            {submitting ? 'Sending...' : 'Send Message'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-information-two" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2021/05/download-bg-2.jpg)' }}>
        <div className="layer-bg" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-CONTACT-PAGE.jpg)' }}></div>
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content_block_3">
              <div className="content-box">
  {/* Flex container with flex-wrap */}
  <div style={{ 
    display: 'flex', 
    alignItems: 'flex-start',  // Align to top
    gap: '15px', 
    marginBottom: '20px' 
  }}>
    <div className="icon-box" style={{ 
      width: '60px', 
      height: '60px', 
      minWidth: '60px',  // Ensure minimum width
      backgroundColor: 'white', 
      borderRadius: '50%', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <i className="fa fa-map" style={{ color: '#22c55e', fontSize: '24px' }}></i>
    </div>
    <h4 style={{ 
      color: 'white', 
      fontWeight: 'bold', 
      margin: 0,
      flex: 1,  // Take remaining space
      fontSize: '1.1rem',
      lineHeight: '1.4',
      paddingLeft:'0px'
    }}>
      Contact Your Local KKMA Office for Personalized Assistance and Support.
    </h4>
  </div>
  
  <h2 style={{ color: 'white', fontWeight: 'bold', fontSize: '2.5rem', lineHeight: '1.2' }}>
    Get in Touch with Any of Our Branches Across Kuwait.
  </h2>
</div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 inner-column">
              <div className="inner-content" style={{ position: 'relative' }}>
                <div className="contact-cards-container" style={{ 
                  overflow: 'hidden',
                  borderRadius: '12px',
                  position: 'relative',
                  width: '100%',
                  height: '320px'
                }}>
                  <div 
                    className="contact-cards-slider"
                    style={{
                      display: 'flex',
                      transition: 'transform 0.3s ease-in-out',
                      transform: `translateX(-${currentSlide * 100}%)`,
                      width: `100%`,
                      height: '100%'
                    }}
                  >
                    {slides.map((slideCards, slideIndex) => {
                      console.log(`Rendering slide ${slideIndex}:`, slideCards)
                      return (
                      <div key={slideIndex} style={{ 
                        display: 'flex', 
                        width: '100%',
                        padding: '0 10px',
                        flexShrink: 0,
                        minWidth: '100%',
                        height: '100%'
                      }}>
                        {slideCards.map((branch, cardIndex) => {
                          console.log(`Rendering card ${cardIndex} in slide ${slideIndex}:`, branch)
                          return (
                          <div key={cardIndex} style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '24px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            minHeight: '280px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            width: '48%',
                            flexShrink: 0,
                            marginRight: cardIndex === 0 ? '4%' : '0px'
                          }}>
                            <div>
                              <h4 style={{ 
                                fontSize: '1.5rem', 
                                fontWeight: 'bold', 
                                color: '#1f2937', 
                                marginBottom: '12px' 
                              }}>
                                {branch.name}
                              </h4>
                              <div style={{
                                width: '40px',
                                height: '3px',
                                backgroundColor: '#22c55e',
                                marginBottom: '20px'
                              }}></div>
                              <div style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.6' }}>
                                <p style={{ marginBottom: '8px' }}>
                                  <a href={`tel:${branch.phone.replace(/\s/g, '')}`} style={{ color: '#374151', textDecoration: 'none' }}>
                                    {branch.phone}
                                  </a>
                                </p>
                                <p style={{ marginBottom: '8px' }}>
                                  <a href={`mailto:${branch.email}`} style={{ color: '#374151', textDecoration: 'none' }}>
                                    {branch.email}
                                  </a>
                                </p>
                                <p style={{ marginBottom: '8px' }}>
                                  Contact Person: {branch.contactPerson}
                                </p>
                                <p>
                                  Address: {branch.address}
                                </p>
                              </div>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                              <a 
                                href="#" 
                                style={{ 
                                  color: '#374151', 
                                  textDecoration: 'none', 
                                  fontWeight: '500',
                                  fontSize: '14px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px'
                                }}
                              >
                                GET DIRECTION <span style={{ fontSize: '12px' }}>›</span>
                              </a>
                            </div>
                          </div>
                          )
                        })}
                      </div>
                      )
                    })}
                  </div>
                </div>
                
             
                
                {/* Pagination indicators */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '8px',
                  marginTop: '20px'
                }}>
                  {Array.from({ length: totalSlides }, (_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      style={{
                        width: index === currentSlide ? '20px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        border: 'none',
                        backgroundColor: index === currentSlide ? '#22c55e' : '#d1d5db',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}





