import { Star, Phone, Users, UserCheck, FileText, Award, CheckCircle, Lightbulb } from 'lucide-react';
import React, { useState } from 'react'

export default function MembershipInformation(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const accordionItems: { title: string; content: React.ReactNode }[] = [
    {
      title: 'Membership Information',
      content: (
        <p>
          As at end December 2024, KKMA has over 16,600 members. Members hail from diverse backgrounds and serve to make up a
          unique combination to enhance the organization&apos;s ability to achieve its mission.
        </p>
      ),
    },
    {
      title: 'Who Can Join?',
      content: (
        <p>
          Membership in the organization is open to all Muslims who support the mission and meet both the ethical and moral
          criteria established. Generally, membership into the organization is by nomination of two existing members. However,
          persons who subscribe to the organization&apos;s mission may apply independently.
        </p>
      ),
    },
    {
      title: 'Membership Criteria',
      content: (
        <p>
          Currently the membership is granted only to NRIs living in Kuwait hailing from Kerala State and also the Malayalam
          speaking community of Dakshina Kannada of Karnataka Sate.
        </p>
      ),
    },
    {
      title: 'Membership Process',
      content: (
        <ul>
          <li>– Applicant to submit a membership application along with two personal photographs and membership fee (KD 2.500 for two years) to KKMA branch committees.</li>
          <li>– Branch Committee review application and recommends to Central Membership Committee</li>
          <li>– Membership Committee approves the membership.</li>
          <li>– Membership committee issues Identification Card.</li>
        </ul>
      ),
    },
    {
      title: 'Membership Obligation',
      content: (
        <ul>
          <li>– Possible volunteer service in KKMA sponsored programs/events or equivalent.</li>
          <li>– Contribution to Family Benefit Scheme and Members Welfare Scheme on time.</li>
          <li>– Service on sub-committees.</li>
          <li>– Attendance at general body meetings</li>
        </ul>
      ),
    },
    {
      title: 'Interested to join? If yes, you need to:',
      content: (
        <ul>
          <li>– Get a membership application from from our branch committee</li>
          <li>– Please fill in.</li>
          <li>– Attach two personal photographs and KD 2.500 as membership fee for two years.</li>
          <li>– Submit form to any of our branch committee office bearer.</li>
        </ul>
      ),
    },
  ]

  const toggleItem = (index: number) => setOpenIndex((cur) => (cur === index ? null : index))

  return (
    <div className="membership-information-page">
      {/* Page Title */}
      <section
        className="page-title"
        style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}
      >
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>Membership Information</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li>Membership Information</li>
            </ul>
          </div>
        </div>
      </section>
      {/* End Page Title */}

      {/* Hero / About Department */}
      <section className="about-department sec-pad-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-column">
              <div className="content_block_11">
                <div className="content-box">
                  <div className="sec-title light">
                    <h6>
                      <Star fill='currentColor' size={16} />  
                      <span>Get Involved and Maximize Your Membership Experience </span>
                      <Star fill='currentColor' size={16} />
                    </h6>
                    <h2>Explore KKMA Membership</h2>
                    <div className="title-shape"></div>
                  </div>
                  <div className="text">
                    <p>
                      Welcome to the vibrant community of KKMA! As a member, numerous opportunities await you to engage and
                      contribute to our collective goals. Whether you&apos;re looking to participate actively or explore the different
                      levels of involvement, there&apos;s a place for everyone. Connect with branch officials today to start making the
                      most of your membership and enjoy the rewards of being a social contributor.
                    </p>
                  </div>
                  <div className="inner-box clearfix" style={{
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%'
                  }}>
                    <div className="btn-box">
                      <a href="/contact" style={{
                        backgroundColor: 'transparent',
                        color: 'white',
                        border: '2px solid #ffffff',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        display: 'inline-block',
                        transition: 'all 0.3s ease'
                      }}>Contact Now</a>
                    </div>
                    <div className="support-box" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '15px'
                    }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: '50%', background: '#7BB045' }}>
                      <Phone color="#fff" size={22} strokeWidth={2} />
                    </span>
                      <div>
                        <h5 style={{ 
                          color: 'white', 
                          margin: '0 0 5px 0',
                          fontSize: '18px',
                          fontWeight: 'bold'
                        }}>KKMA Representative</h5>
                        <p style={{ 
                          color: 'white', 
                          margin: '0',
                          fontSize: '14px'
                        }}>
                          <a href="tel:96512345678" style={{ color: 'white', textDecoration: 'none' }}>
                            +965 123 456 78
                          </a> (08: AM to 07:00 PM)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 image-column">
              <figure className="image-box">
                <img src="https://kkma.net/wp-content/uploads/2024/09/KKMA-Membership-Information-Page.jpg" alt="Membership" />
              </figure>
            </div>
          </div>
        </div>
      </section>
      {/* End Hero */}

      {/* Mid Headings + Accordion */}
      <section className="membership-accordion sec-pad" style={{ 
        backgroundColor: '#ffffff', 
        padding: '0px 0',
        marginBottom: '110px'
      }}>
        <div className="auto-container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          padding: '0px' 
        }}>
          <div className="row clearfix" style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
          }}>
            {/* Left Content Section */}
            <div className="col-lg-5 col-md-12 col-sm-12" style={{ 
              padding: '0 15px',
              flex: '0 0 41.666667%',
              maxWidth: '41.666667%'
            }}>
              <div className="content-section" style={{ 
                paddingRight: '40px',
                marginBottom: '60px'
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
                  BECOME PART OF A DYNAMIC NETWORK
                </h6>
                <h2 style={{ 
                  fontSize: '48px',
                  fontWeight: '700',
                  color: '#000000',
                  lineHeight: '1.2',
                  marginBottom: '20px',
                  marginTop: '0'
                }}>
                  Join the KKMA Community
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
                  Discover the benefits of joining KKMA, a thriving community of over 14,700 members united by a common mission.
                  Engage with us through volunteer service, contribute to beneficial schemes, and participate in organizational events.
                  Start your membership journey by submitting an application, photographs, and a nominal fee to our branch committees
                  for a two-year membership. Join us today and contribute to a greater cause!
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
      {/* End Mid Headings + Accordion */}

      {/* Solutions / Services Grid */}
      <section className="solutions-section alternat-2">
        <div className="auto-container">
          <div className="sec-title centred light">
            <h6>
              <Star fill='currentColor' size={16} />
              <span>Joining, Engaging, and Enhancing Community Life </span>
              <Star fill='currentColor' size={16} />
            </h6>
            <h2>Your Path to KKMA Membership</h2>
            <div className="title-shape"></div>
          </div>
          <div className="inner-container mr-0">
            <div className="upper-box clearfix">
              {[
                { title: 'Application Process', text: 'Steps to Apply for Membership', icon: FileText },
                { title: 'Membership Fee', text: 'Cost and Payment Details', icon: Award },
                { title: 'Identification Card Issuance', text: 'Receiving Your KKMA ID', icon: UserCheck },
                { title: 'Volunteer Opportunities', text: 'Engage in Community Service', icon: Users },
                { title: 'Member Benefits', text: 'Advantages of KKMA Membership', icon: CheckCircle },
                { title: 'Membership Criteria', text: 'Qualifications for Joining', icon: UserCheck },
                { title: 'Committee Involvement', text: 'Participate in Leadership Roles', icon: Users },
                { title: 'Expectations from Members', text: 'Obligations & Responsibilities', icon: CheckCircle },
                { title: 'Encourage Others', text: 'Invite Friends and Family to Join', icon: Users },
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div className="solution-block-one" key={idx}>
                    <div className="inner-box">
                      <div className="icon-box"><IconComponent size={24} /></div>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="lower-box clearfix">
              <div className="bg-layer" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2021/05/bg-1-2.jpg)' }}></div>
              <div className="text pull-left">
                <div className="icon-box"><Lightbulb size={24} /></div>
                <h3>Embark on Your Journey with KKMA Membership</h3>
                <p>Learn More About How to Join and Engage in Meaningful Community Initiatives</p>
              </div>
              <div className="btn-box pull-right">
                <a href="/contact" className="theme-btn">Contact Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Solutions */}

      {/* Closing Info - Themed CTA */}
      <section className="membership-closing sec-pad" style={{
        padding: '70px 0'
      }}>
        <div className="auto-container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <div className="row clearfix" style={{ display: 'flex', alignItems: 'center' }}>
            <div className="col-lg-8 col-md-12 col-sm-12">
              <div style={{ maxWidth: 760 }}>
              <h6 style={{ 
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#28a745',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '20px',
                  lineHeight: '1.4'
                }}>
                Easy Steps to Join Our Community
                </h6>
                <h2 style={{
                  marginTop: 10,
                  marginBottom: 16,
                  fontSize: 40,
                  lineHeight: 1.2
                }}>Start Your Membership with KKMA</h2>
                <div style={{ width: 70, height: 4, background: '#28a745', marginBottom: 20 }}></div>
                <p style={{ fontSize: 16, lineHeight: 1.7, color: '#333' }}>
                  Apply online — click <strong>Apply Now</strong> to open the secure member registration form. Complete the
                  details, and pay the <strong>membership fee of KD 2.500</strong> for two
                  years. No physical forms or branch visits required. After review and approval, you’ll receive your KKMA
                  Identification Card. Invite friends and family to join our supportive and dynamic community.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12" style={{ display: 'flex', justifyContent: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/membership/register" className="theme-btn" style={{
                  backgroundColor: '#28a745',
                  color: '#fff',
                  padding: '12px 22px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontWeight: 700
                }}>Apply Now</a>
                <a href="/contact" className="theme-btn" style={{
                  backgroundColor: '#202230',
                  color: '#fff',
                  padding: '12px 22px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  fontWeight: 700,
                  border: '1px solid rgba(255,255,255,0.2)'
                }}>Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Closing Info */}
    </div>
  )
}



















