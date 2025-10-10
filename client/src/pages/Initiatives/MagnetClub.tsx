import { Star, CheckCheck, Users, Hospital, Lightbulb, MousePointerClick } from 'lucide-react';
import React, { useState } from 'react'

export default function MagnetClub(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const accordionItems: { title: string; content: React.ReactNode }[] = [
    {
      title: 'Offer aid to sick patients in various hospitals in Kuwait.',
      content: (
        <div>
          <p>Our team of MAGNET volunteers goes to offer aid to sick patients in various hospitals in Kuwait, namely:</p>
          <ol>
            <li>Adan Hospital</li>
            <li>Farwaniya Hospital</li>
            <li>Sabah Hospital</li>
            <li>Amiri Hospital</li>
            <li>Jahra Hospital</li>
            <li>Mubarak Al Kabir Hospital</li>
          </ol>
        </div>
      ),
    },
    {
      title: 'Benefits of Patient Visits',
      content: (
        <div>
          <p>
            Love and caring are critical tools for helping patients get better. Visiting a sick friend or relation in
            hospital really could make a difference to their health. It's already well known that emotions have a powerful
            effect on a patient's health. So even if you have nothing to say, your presence at a sick friend's bedside is enough.
          </p>
          <p>
            Our volunteers also coordinate possible and emergency financial assistance to needy poor patients for their
            further treatment through KKMA's charitable initiatives and the kind support of individuals and organizations.
          </p>
        </div>
      ),
    },
    {
      title: 'Become a part of the team by volunteering your name.',
      content: (
        <div>
          <p>
            Volunteering is an extremely rewarding experience. By joining our team, you can have the opportunity to gain
            valuable experience and to use your interpersonal and administrative skills to support a patient in hospital who is
            a KKMA member, a friend or anyone regardless of his nationality or religion.
          </p>
          <p>
            While there are specific volunteer benefits, the greatest award is the knowledge that you help to extend the best
            patient care possible to those who truly need it.
          </p>
        </div>
      ),
    },
    {
      title: 'Volunteer Benefits',
      content: (
        <div>
          <p>
            MAGNET Volunteers are vital to the KKMA mission of setting the standard of excellence in community service. By
            volunteering at MAGNET, your benefits include:
          </p>
          <ul>
            <li>
              – As an expression of appreciation, volunteers who complete at least 100 hours of service during a year receive
              recognition from the KKMA MAGNET annually.
            </li>
            <li>– A volunteer identification badge to be worn while on hospital visits.</li>
            <li>– A training on Emergency Response Care.</li>
            <li>– Great satisfaction in helping others</li>
          </ul>
        </div>
      ),
    },
    {
      title: 'Volunteer Training and Development',
      content: (
        <div>
          <p>
            Our MAGNET volunteers receive comprehensive training to enhance their skills and effectiveness in patient support.
            Training includes Emergency Response Care and effective communication strategies, ensuring that volunteers are well-prepared
            to provide compassionate and practical assistance. This professional development not only benefits the patients but also
            enriches the personal growth of our volunteers.
          </p>
        </div>
      ),
    },
    {
      title: 'Patient Care Coordination',
      content: (
        <div>
          <p>
            MAGNET volunteers play a crucial role in coordinating patient care by working closely with hospital staff and KKMA's
            charitable initiatives. This includes arranging emergency financial support for patients in need, managing logistical
            aspects of care, and ensuring that every patient receives the necessary resources and attention for their treatment and
            recovery.
          </p>
        </div>
      ),
    },
    {
      title: 'Community Impact and Recognition',
      content: (
        <div>
          <p>
            The MAGNET Volunteer Program's impact extends beyond individual patient support to foster a stronger, more compassionate
            community. Volunteers are recognized annually for their dedication, with opportunities to participate in community events
            and outreach activities. This recognition highlights their invaluable contributions and reinforces the importance of
            community service in improving lives.
          </p>
        </div>
      ),
    },
  ]

  const toggleItem = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <div className="magnet-club-page">
      {/* Page Title */}
      <section
        className="page-title"
        style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}
      >
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>Magnet Club</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li>Magnet Club</li>
            </ul>
          </div>
        </div>
      </section>
      {/* End Page Title */}

      {/* about-style-four */}
      <section className="about-style-four sec-pad">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content_block_6">
                <div className="content-box">
                  <div className="sec-title">
                    <h6>
                     <Star fill='currentColor' size={16} />
                      <span>Compassionate Care and Support for Hospital Patients </span>
                     <Star fill='currentColor' size={16} />
                    </h6>
                    <h2>MAGNET Volunteer Group</h2>
                    <div className="title-shape"></div>
                  </div>
                  <div className="text">
                    <p>
                      MAGNET is a dedicated volunteer group under the umbrella of the Kuwait Kerala Muslim Association (KKMA).
                      Established with the noble mission of providing compassionate support and aid to patients in hospitals across
                      Kuwait, MAGNET volunteers play a critical role in improving the well-being of those who are sick and in need of care.
                      By offering their time, talents, and kindness, MAGNET volunteers help to fill the emotional and practical gaps that
                      may exist for patients, especially those who are far from home or without family support.
                    </p>
                  </div>
                  <div className="inner-box clearfix">
                    <div className="left-column pull-left">
                      <div className="single-item">
                        <div className="icon-box"><CheckCheck /></div>
                        <h6>Provide Aids</h6>
                        <h4>Patient Assistance</h4>
                      </div>
                      <div className="single-item">
                        <div className="icon-box"><CheckCheck /></div>
                        <h6>Hospital Visits</h6>
                        <h4>Hospital Outreach</h4>
                      </div>
                    </div>
                    <div className="right-column pull-right">
                      <div className="text">
                        <p>Offer crucial emotional and financial support during recovery.</p>
                      </div>
                      <div className="text">
                        <p>Engage with patients across key hospitals in Kuwait.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-sm-12 content-column">
              <div className="content_block_7">
                <div className="content-box">
                  <div className="left-column">
                    <div className="inner centred">
                      <div className="icon-box"><Users /></div>
                      <h6>MAGNET Services</h6>
                      <h4>Supporting Patients</h4>
                    </div>
                    <ul className="list clearfix">
                      <li>Patient Assistance</li>
                      <li>Recognition Program</li>
                      <li>Emotional Support</li>
                      <li>Emergency Assistance</li>
                      <li>Training and Development</li>
                    </ul>
                  </div>
                  <div className="right-column">
                    <figure className="image-box">
                      <img src="https://kkma.net/wp-content/uploads/2024/09/Magnet-KKMA.jpg" alt="MAGNET" />
                    </figure>
                    <div className="inner centred">
                      <div className="icon-box"><Hospital /></div>
                      <h6>Hospital Outreach</h6>
                      <h4>Volunteer Opportunities</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* about-style-four end */}

      {/* solutions-section */}
      <section className="solutions-section alternat-2">
        <div className="auto-container">
          <div className="sec-title centred light">
            <h6>
              <Star fill='currentColor' size={16} />
              <span>Committed to Caring, Supporting, and Empowering Communities</span>
              <Star fill='currentColor' size={16} />
            </h6>
            <h2>Comprehensive Volunteer Services</h2>
            <div className="title-shape"></div>
          </div>

          <div className="inner-container mr-0">
            <div className="upper-box clearfix">
              {[
                { title: 'Patient Care Visits', text: 'Support for hospital patients.' },
                { title: 'Volunteer Coordination', text: 'Organizing effective efforts.' },
                { title: 'Emergency Financial Aid', text: 'Crucial support for patients.' },
                { title: 'Training and Development', text: 'Essential skills for volunteers.' },
                { title: 'Emotional Support', text: 'Boosting patient morale.' },
                { title: 'Community Engagement', text: 'Connecting through activities.' },
                { title: 'Recognition and Awards', text: 'Honoring volunteer service.' },
                { title: 'Health and Wellness', text: 'Promoting community well-being.' },
                { title: 'Networking Opportunities', text: 'Connecting like-minded volunteers.' },
              ].map((item, idx) => (
                <div className="solution-block-one" key={idx}>
                  <div className="inner-box">
                    <div className="icon-box"><MousePointerClick /></div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lower-box clearfix">
              <div
                className="bg-layer"
                style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2021/05/bg-1-2.jpg)' }}
              ></div>
              <div className="text pull-left">
                <div className="icon-box"><Lightbulb /></div>
                <h3>Be the Light in Someone&apos;s Darkest Hour</h3>
                <p>Your time and compassion can change lives. Join our volunteer team today.</p>
              </div>
              <div className="btn-box pull-right">
                <a href="#" className="theme-btn">Get Involved</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* solutions-section end */}

      {/* Main Content + Accordion Section - New Design */}
      <section className="magnet-info-accordion sec-pad" style={{ 
        backgroundColor: '#ffffff', 
        padding: '60px 0'
      }}>
        <div className="auto-container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0 20px' 
        }}>
          <div className="row clearfix" style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            margin: '0 -15px' 
          }}>
            {/* Left Content Section */}
            <div className="col-lg-5 col-md-12 col-sm-12" style={{ 
              padding: '0 15px',
              flex: '0 0 41.666667%',
              maxWidth: '41.666667%'
            }}>
              <div className="content-section" style={{ 
                paddingRight: '40px',
                marginTop: '60px'
              }}>
                <h6 style={{ 
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#28a745',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '20px',
                  lineHeight: '1.4'
                }}>
                  BRINGING COMPASSION FOR PATIENT CARE
                </h6>
                <h2 style={{ 
                  fontSize: '48px',
                  fontWeight: '700',
                  color: '#000000',
                  lineHeight: '1.2',
                  marginBottom: '20px',
                  marginTop: '0'
                }}>
                  A Heartfelt Commitment
                </h2>
                <div style={{ 
                  width: '60px',
                  height: '4px',
                  backgroundColor: '#28a745',
                  marginBottom: '30px'
                }}></div>
                <p style={{ 
                  fontSize: '16px',
                  lineHeight: '1.6',
                  color: '#333333',
                  marginBottom: '0'
                }}>
                  The MAGNET Volunteer Program dedicates itself to supporting patients across major hospitals in Kuwait. 
                  Volunteers provide emotional support, coordinate emergency financial aid, and enhance patient well-being through 
                  their compassionate presence.
                </p>
              </div>
            </div>

            {/* Right Accordion Section */}
            <div className="col-lg-7 col-md-12 col-sm-12" style={{ 
              padding: '0 15px',
              flex: '0 0 58.333333%',
              maxWidth: '58.333333%'
            }}>
              <div className="accordion-section" style={{ 
                marginTop: '60px'
              }}>
                {accordionItems.map((item, index) => {
                  const isOpen = openIndex === index
                  return (
                    <div 
                      key={index} 
                      className="accordion-item" 
                      style={{ 
                        border: '1px solid #e0e0e0',
                        borderBottom: index < accordionItems.length - 1 ? 'none' : '1px solid #e0e0e0',
                        backgroundColor: '#ffffff'
                      }}
                    >
                      <div
                        className="accordion-header"
                        onClick={() => toggleItem(index)}
                        style={{ 
                          padding: '20px 25px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#ffffff',
                          transition: 'background-color 0.3s ease'
                        }}
                      >
                        <span 
                          className="accordion-icon" 
                          style={{ 
                            marginRight: '15px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            color: '#000000',
                            minWidth: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {isOpen ? '−' : '+'}
                        </span>
                        <span 
                          className="accordion-title" 
                          style={{ 
                            fontSize: '16px',
                            fontWeight: '500',
                            color: '#000000',
                            lineHeight: '1.4'
                          }}
                        >
                          {item.title}
                        </span>
                      </div>
                      {isOpen && (
                        <div 
                          className="accordion-content" 
                          style={{ 
                            padding: '0 25px 25px 60px',
                            backgroundColor: '#ffffff',
                            borderTop: '1px solid #e0e0e0'
                          }}
                        >
                          {item.content}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Main Content + Accordion Section */}
    </div>
  )
}