import React from 'react'

export default function OverviewVisionSection() {
  return (
    <section
      className="vision-mission-goals centred"
      style={{
        backgroundColor: '#83B253',
        backgroundImage:
          'linear-gradient(rgba(131,178,83,0.9), rgba(131,178,83,0.9)), url(/images/about/KKMA-page-title.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="auto-container" style={{ maxWidth: 1600 }}>
        <div className="sec-title centred light" style={{ paddingTop: 60, paddingBottom: 30 }}>
          <h6 style={{ color: '#fff' }}>
            <span>Fostering Growth and Unity in Our Community</span>
          </h6>
          <h2 style={{ color: '#fff' }}>Our Vision, Mission, and Goals</h2>
          <div className="title-shape"></div>
        </div>

        <div className="row clearfix" style={{ paddingBottom: 60 }}>
          {/* Vision */}
          <div className="col-lg-4 col-md-12 col-sm-12" style={{ marginBottom: 20 }}>
            <div
              className="overview-card"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 10,
                padding: 20,
                color: '#fff',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: '#fff'
              }}>KKMA VISION</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, fontSize: 16 }}>
                To create a dynamic and vibrant platform for Non Resident Indians to come together
                and participate in a wide range of aid and development activities
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="col-lg-4 col-md-12 col-sm-12" style={{ marginBottom: 20 }}>
            <div
              className="overview-card"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 10,
                padding: 20,
                color: '#fff',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: '#fff'
              }}>KKMA MISSION</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, fontSize: 16 }}>
                The MISSION of Kuwait Kerala Muslim Association (KKMA) is to aid and secure
                development of its members and the community that represents.
              </p>
            </div>
          </div>

          {/* Goals */}
          <div className="col-lg-4 col-md-12 col-sm-12" style={{ marginBottom: 20 }}>
            <div
              className="overview-card"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.35)',
                borderRadius: 10,
                padding: 20,
                color: '#fff',
                minHeight: 220,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <h3 style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
                letterSpacing: 0.6,
                textTransform: 'uppercase',
                color: '#fff'
              }}>KKMA GOALS</h3>
              <p style={{ color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, fontSize: 16 }}>
                KKMA Aim to fulfill this MISSION by providing educational opportunities, promoting
                professional and personal growth; and carrying out our social responsibility and
                enhancing pride within our organization and reinforcing our reputation as a vital
                Indian organization in Kuwait.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}