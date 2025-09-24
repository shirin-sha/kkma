import React, { useState } from 'react'

export default function Contact(): React.JSX.Element {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<{ ok: boolean; msg: string } | null>(null)

  const branches = [
    'Abu Halifa',
    'Ahmadi',
    'Kuwait City',
    'Abbasiya',
    'Fahahaeel',
    'Farwaniya',
    'Fintas',
    'Hasawi',
    'Hawally',
    'Jahra',
    'Khaitan',
    'Mahbola',
    'Sabhan',
    'Salmiya',
  ]

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
      const baseUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001'
      const res = await fetch(`${baseUrl}/api/contact`, {
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
                    <h6><i className="flaticon-star"></i><span>We're Here to Listen and Assist You</span></h6>
                    <h2>Get in Touch with KKMA</h2>
                    <div className="title-shape"></div>
                  </div>
                  <div className="text">
                    <p>
                      Whether you have a question, need assistance, or want to learn more about our initiatives, we're just a message away. Connect with us through the form, and our team will get back to you promptly.
                    </p>
                    <div className="contact_box_n two"><p><span><i className="fa fa fa-envelope"></i>Email : </span>info@kkma.net</p></div>
                    <div className="contact_box_n two"><p><span><i className="fa fa fa-phone-office"></i>Phone : </span>+965 506 49506</p></div>
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
                  <h4><i className="fa fa-map"></i>Contact Your Local KKMA Office for Personalized Assistance and Support.</h4>
                  <h2>Get in Touch with Any of Our Branches Across Kuwait.</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 inner-column">
              <div className="inner-content">
                <div className="two-column-carousel owl-carousel owl-theme owl-nav-none">
                  {branches.map((name, idx) => (
                    <div key={idx} className="single-item">
                      <h4>{name}</h4>
                      <ul className="info clearfix">
                        <li>
                          <p><a href="tel:96550649506">+965 506 49506</a><br /><a href="mailto:info@kkma.net">info@kkma.net</a></p>
                        </li>
                        <li>
                          <p>Conatct Person: Full Name <br /> Address: Street 1, Block 1, City Name, Governaorate</p>
                        </li>
                      </ul>
                      <div className="link"><a href="#">Get Direction<i className="flaticon-right-arrow"></i></a></div>
                    </div>
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





