import React, { useState } from 'react'

export default function OverviewHistorySection() {
  const accordionItems = [
    {
      title: 'Founding and Establishment',
      content: (
        <p>
          In a gloomy evening of December 2001, a group of 100 like-minded people seeking a new
          horizon for social activities joined together and decided to form a platform — an
          organization with a new vision was then born. The Association was established on
          December 16, 2001 with a mission to aid and secure the development of its members who are
          mainly low-salaried and middle-income Indian nationals working in Kuwait.
        </p>
      ),
    },
    {
      title: 'Organizational Structure and Growth',
      content: (
        <p>
          A flashback on KKMA’s past year activities will reveal that we are right on this
          direction by implementing various programs to execute our mission. KKMA currently has 15
          units in different parts of Kuwait having unit and zonal level committees to look after
          its activities.
        </p>
      ),
    },
    {
      title: 'Major Achievements and Programs',
      content: (
        <ul className="list-style-one" style={{ marginLeft: 18 }}>
          <li>
            <strong>Family Benefit Scheme (FBS):</strong> Major achievement is the planning and
            implementation of this scheme for the benefit of the organization’s deceased family
            members.
          </li>
          <li>
            <strong>Members’ Welfare Scheme (MWS):</strong> Implemented for assisting members in
            need, including financial support for emergency medical treatment in India and air
            tickets for returning home in difficult conditions.
          </li>
          <li>
            <strong>Student Adoption Program:</strong> KKMA adopts poor but brilliant students to
            financially support them for their college graduate initiatives. Currently, there are 44
            students studying in various universities in India.
          </li>
          <li>
            <strong>Educational Support:</strong> KKMA takes responsibility for ensuring the basic
            education of the children of its members in the event of their death.
          </li>
        </ul>
      ),
    },
    {
      title: 'Social Development and Relief Efforts',
      content: (
        <p>
          On the social development side, KKMA was at the forefront of resolving community matters
          either financially or by conveying matters to the concerned authority. The organization
          recently raised funds for a Relief Fund to support Tsunami-affected compatriots in India.
          The Association established a Relief Fund to support people with shelter, helping 21 such
          individuals in Kerala and South Canara of Karnataka State. This was in addition to
          supporting several needy poor and destitute individuals in Kuwait and Kerala.
        </p>
      ),
    },
    {
      title: 'Events and Educational Programs',
      content: (
        <ul className="list-style-one" style={{ marginLeft: 18 }}>
          <li>Annual Eid Milan programs attended by more than 10,000 people.</li>
          <li>Grand Iftar parties.</li>
          <li>Weekly religious study classes.</li>
          <li>NRI Saving Seminars.</li>
          <li>Talk shows on NRI issues and Media Talks.</li>
          <li>Personality and Leadership Development Programs.</li>
          <li>Cooking contests for Indian women and Student’s Drawing Contests.</li>
          <li>Numerous branch and zonal level literary and cultural activities.</li>
        </ul>
      ),
    },
    {
      title: 'Funding and Future Focus',
      content: (
        <p>
          All required funds for the above activities are generated from our members and
          well-wishers, plus a few fundraising programs such as Eid Milan programs. The success of
          the organization is attributed to its sincere members and hard-working unit and central
          committee leaders. In the future, the prime focus of the Association will continue to be
          its members’ aid and development.
        </p>
      ),
    },
  ]

  const [openIndex, setOpenIndex] = useState<number>(0)

  return (
    <section className="history-section sec-pad bg-color-1">
      <div className="auto-container">
        <div className="row clearfix" style={{ display: 'grid', gridTemplateColumns: '1fr 1.25fr', gap: 28, alignItems: 'start' }}>
          {/* Left Intro */}
          <div className="content-column">
            <div className="content_block_1">
              <div className="content-box" style={{ paddingRight: 24 }}>
              <div className="sec-title"><h6> 
                    A Legacy of Commitment and Growth
                  </h6>
                  <h2 style={{ fontSize: '36px', lineHeight: 1.2, fontWeight: 600, color: '#1a1a1a' }}>Our Story and Achievements</h2>
                  <div className="title-shape" style={{ width: 95, height: 4, background: '#83B253', marginTop: 16 }}></div>
                </div>
                <div className="text">
                  <p style={{ color: '#4b5563', fontSize: 18, lineHeight: 1.9 }}>
                    Explore the evolution and achievements of our organization since its inception in
                    December 2001. From founding to impactful programs and events, discover how we’ve
                    dedicated ourselves to supporting our members and community through various
                    initiatives and relief efforts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Accordion */}
          <div>
            <div
              className="history-accordion"
              style={{
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: 8,
                overflow: 'hidden'
              }}
            >
              {accordionItems.map((item, index) => {
                const isOpen = openIndex === index
                return (
                  <div key={item.title} style={{ borderTop: index === 0 ? 'none' : '1px solid #e5e7eb' }}>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      className="accordion-header"
                      style={{
                        display: 'flex',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                        padding: '18px 20px',
                        background: '#fff',
                        color: '#111827',
                        fontWeight: 500,
                        fontSize: '16px',
                        cursor: 'pointer',
                        border: 'none',
                        textAlign: 'left'
                      }}
                    >
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{item.title}</span>
                      <span
                        aria-hidden
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 999,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isOpen ? '#83B253' : '#f3f4f6',
                          color: isOpen ? '#fff' : '#111827',
                          fontSize: 18,
                          lineHeight: 1
                        }}
                      >
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div style={{ padding: '16px 20px', color: '#4b5563', fontSize: 16, lineHeight: 1.8 }}>
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
  )
}