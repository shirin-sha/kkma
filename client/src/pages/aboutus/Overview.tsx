import React, { useMemo, useState } from 'react';
import PageTitle from '../../components/PageTitle';
import OverviewAboutSection from '../../components/overview/OverviewAboutSection';
import OverviewVisionSection from '../../components/overview/OverviewVisionSection';
import OverviewHistorySection from '../../components/overview/OverviewHistorySection';
import OverviewDiscoverSection from '../../components/overview/OverviewDiscoverSection';
import { Star, ChevronUp, ChevronDown, Handshake, GraduationCap, HeartPulse, HandHeart, Briefcase, Leaf, CheckCircle2 } from 'lucide-react';

export default function Overview(): React.JSX.Element {
	return (
		<>
			<PageTitle
				title="About Us"
				backgroundImageUrl="https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg"
				breadcrumb={[
					{ label: 'Home', url: '/' },
					{ label: 'About Us' }
				]}
			/>
			<OverviewAboutSection />
			<OverviewVisionSection />
			<OverviewHistorySection />
			<OverviewDiscoverSection />
			<div>
      {/* Strategic Objectives Section */}
      <section className="sec-pad" style={{ backgroundColor: '#ffffff' }}>
        <div className="auto-container">
          <div className="row clearfix">
            {/* Left column - title and description */}
            <div className="col-lg-5 col-md-12 col-sm-12">
              <div className="sec-title" style={{ textAlign: 'left' }}>
                <h6>
                  <span>DRIVING IMPACT THROUGH COMMUNITY AND STRATEGIC GOALS</span>
               
                </h6>
                <h2>Our Strategic Objectives and Initiatives</h2>
                <div className="title-shape"></div>
              </div>
              <p>
                Driving growth and support through benefit schemes, educational aid, investment
                opportunities, healthcare partnerships, cultural promotion, and charitable fundraising,
                all aimed at enriching our community and enhancing well–being.
              </p>
            </div>

            {/* Right column - checklist */}
            <div className="col-lg-7 col-md-12 col-sm-12">
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {[
                  'ESTABLISH Benefit Schemes for KKMA members and their family.',
                  'PROVIDE financial assistance for higher education of deserving poor students in Kerala.',
                  'ESTABLISH an INVESTMENT CLUB to encourage saving habits among members.',
                  'ESTABLISH partnership with health providers to provide free or minimum cost treatment and services for deserving patients.',
                  'PLAN and HOST periodic classes and meetings for networking and development.',
                  'PROMOTE Kuwait–India friendship and strengthen relations.',
                  'COORDINATE with Indian Embassy in Kuwait for resolutions for issues related to Indian community in Kuwait.',
                  'PROMOTE awareness of Muslim community identity and its cultural and religious heritage.',
                ].map((text, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 12,
                    padding: '14px 0',
                    borderBottom: '1px solid #E5E7EB'
                  }}>
                    <span style={{ color: '#83B253', marginTop: 2 }}>
                      <CheckCircle2 size={18} />
                    </span>
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="information-section bg-color-1">
        <div
          className="bg-layer"
          style={{
            backgroundImage:
              "url(https://kkma.net/wp-content/uploads/2024/08/KKMA_ABOUT-1.jpg)",
          }}
        ></div>
        <div className="auto-container">
          <div className="sec-title centred light">
            <h6>
              <Star fill='currentColor' size={14} />
              <span>
                cultural, professional, and personal growth within our community.
              </span>
              <Star fill='currentColor' size={14} />
            </h6>
            <h2>Empowering Community Through Diverse Initiatives</h2>
            <div className="title-shape"></div>
          </div>

          {/* Info Blocks - Vertical Slider */}
          <InfoSlider />
        </div>
      </section>

      {/* Award Section */}
      <section className="award-section bg-color-1">
        <figure className="image-layer">
          <img
            src="https://kkma.net/wp-content/uploads/2024/08/About-Awards.jpg"
            alt="Awesome Image"
          />
        </figure>
        <div
          className="vector-image"
          style={{
            backgroundImage:
              "url(https://kkma.net/wp-content/themes/whitehall/assets/images/icons/icon-bg-2.png)",
          }}
        ></div>
        <div className="auto-container">
          <div className="sec-title">
            <h6>
              <Star fill='currentColor' size={14} />
              <span>Our Awards</span>
            </h6>
            <h2>Our Recognitions & Appreciations</h2>
            <div className="title-shape"></div>
          </div>
          <div className="row clearfix">
            <div className="col-xl-3 col-lg-4 col-md-6 award-block">
              <div className="award-block-one">
                <div className="inner-box">
                  <figure className="award-box">
                    <div
                      className="bg-pattern"
                      style={{
                        backgroundImage:
                          "url(https://kkma.net/wp-content/themes/whitehall/assets/images/icons/icon-bg-1.png)",
                      }}
                    ></div>
                    <img
                      src="https://kkma.net/wp-content/uploads/2024/08/Demo-Awards-1.png"
                      alt="Award Image"
                    />
                  </figure>
                  <h4>
                    KKMA Demo <br />
                    Awards
                  </h4>
                  <div className="overlay-content">
                    <h4>
                      KKMA Demo <br />
                      Awards
                    </h4>
                    <p>
                      Demo awards section content for KKMA organization in
                      Kuwait.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-md-6 award-block">
              <div className="award-block-one">
                <div className="inner-box">
                  <figure className="award-box">
                    <div
                      className="bg-pattern"
                      style={{
                        backgroundImage:
                          "url(https://kkma.net/wp-content/themes/whitehall/assets/images/icons/icon-bg-1.png)",
                      }}
                    ></div>
                    <img
                      src="https://kkma.net/wp-content/uploads/2024/08/Demo-Awards-1.png"
                      alt="Award Image"
                    />
                  </figure>
                  <h4>
                  Kuwait Community
                   <br />
                    Awards
                  </h4>
                  <div className="overlay-content">
                    <h4>
                    Kuwait Community
                   <br />
                    Awards
                    </h4>
                    <p>
                    Demo awards section content for KKMA organization in Kuwait.
                    </p>
                  </div>
                </div>
              </div>
            </div> <div className="col-xl-3 col-lg-4 col-md-6 award-block">
              <div className="award-block-one">
                <div className="inner-box">
                  <figure className="award-box">
                    <div
                      className="bg-pattern"
                      style={{
                        backgroundImage:
                          "url(https://kkma.net/wp-content/themes/whitehall/assets/images/icons/icon-bg-1.png)",
                      }}
                    ></div>
                    <img
                      src="https://kkma.net/wp-content/uploads/2024/08/Demo-Awards-1.png"
                      alt="Award Image"
                    />
                  </figure>
                  <h4>
                    KKMA Demo <br />
                    Awards
                  </h4>
                  <div className="overlay-content">
                    <h4>
                    Demo Kuwait <br/>
                    Awards
                    </h4>
                    <p>
                      Demo awards section content for KKMA organization in
                      Kuwait.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* ➝ Repeat for other awards */}
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section
        className="feature-section sec-pad"
        style={{
          backgroundImage:
            "url(https://kkma.net/wp-content/uploads/2021/05/feature-bg-2.jpg)",
        }}
      >
        <div className="auto-container">
          <div className="sec-title centred">
            <h6>
              <Star fill='currentColor' size={14} />
              <span>
                Discover opportunities to engage, connect, and contribute
              </span>
              <Star fill='currentColor' size={14} />
            </h6>
            <h2>Explore Our Key Offerings and Programs</h2>
            <div className="title-shape"></div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
              <div className="feature-block-two">
                <div className="inner-box">
                  <figure className="image-box">
                    <img
                      src="https://kkma.net/wp-content/uploads/2024/08/Magnet-Club-About-Page.jpg"
                      alt="Awesome Image"
                    />
                  </figure>
                  <div className="lower-content">
                    <div className="icon-box">
                      <i className="fa fa-hands-helping"></i>
                    </div>
                    <h4>
                      <a href="#">Join with our Magnet Club</a>
                    </h4>
                    <div className="btn-box">
                      <a href="#">
                        Read More<i className="flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
              <div className="feature-block-two">
                <div className="inner-box">
                  <figure className="image-box">
                    <img
                      src="https://kkma.net/wp-content/uploads/2024/08/KKMA_ABOUT-Software-System.jpg"
                      alt="Awesome Image"
                    />
                  </figure>
                  <div className="lower-content">
                    <div className="icon-box">
                      <i className="fa fa-hands-helping"></i>
                    </div>
                    <h4>
                      <a href="#">Explore Members Area System</a>
                    </h4>
                    <div className="btn-box">
                      <a href="#">
                        Read More<i className="flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>     <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
              <div className="feature-block-two">
                <div className="inner-box">
                  <figure className="image-box">
                    <img
                      src="https://kkma.net/wp-content/uploads/2024/08/Magnet-Club-About-Page-1.jpg"
                      alt="Awesome Image"
                    />
                  </figure>
                  <div className="lower-content">
                    <div className="icon-box">
                      <i className="fa fa-hands-helping"></i>
                    </div>
                    <h4>
                      <a href="#">KKMA Social Projects & initiatives</a>
                    </h4>
                    <div className="btn-box">
                      <a href="#">
                        Read More<i className="flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-12 feature-block">
              <div className="feature-block-two">
                <div className="inner-box">
                  <figure className="image-box">
                    <img
                      src="https://kkma.net/wp-content/uploads/2024/08/KKMA_ABOUT-Classifieds.jpg"
                      alt="Awesome Image"
                    />
                  </figure>
                  <div className="lower-content">
                    <div className="icon-box">
                      <i className="fa fa-hands-helping"></i>
                    </div>
                    <h4>
                      <a href="#">KKMA Classified Section</a>
                    </h4>
                    <div className="btn-box">
                      <a href="#">
                        Read More<i className="flaticon-right-arrow"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ➝ Repeat for other feature blocks */}
          </div>
        </div>
      </section>
    </div>
		</>
	);
}

type InfoItem = {
  id: string
  count: string
  icon: React.ElementType
  title: string
  desc: string
}

function InfoSlider(): React.JSX.Element {
  const items: InfoItem[] = useMemo(() => [
    {
      id: 'engagement',
      count: '01.',
      icon: Handshake,
      title: 'Community Engagement Initiatives',
      desc: 'Fostering strong local ties through community-driven projects and collaborative events that address pressing social needs.'
    },
    {
      id: 'education',
      count: '02.',
      icon: GraduationCap,
      title: 'Cultural Heritage Preservation',
      desc: 'Committed to preserving and celebrating the rich cultural heritage of our members through educational and cultural programs.'
    },
    {
      id: 'healthcare',
      count: '03.',
      icon: HeartPulse,
      title: 'Advocacy and Support Services',
      desc: 'Providing advocacy and support to address the challenges faced by our community members in various areas of their lives.'
    },
    {
      id: 'welfare',
      count: '04.',
      icon: HandHeart,
      title: 'Youth Empowerment Activities',
      desc: 'Creating opportunities for young people to develop leadership skills, engage in community service, and build their future.'
    },
    {
      id: 'welfare',
      count: '05.',
      icon: Briefcase,
      title: 'Career Development Workshops',
      desc: 'Organizing workshops and seminars to enhance the professional skills and career prospects of our members.'
    },
    {
      id: 'welfare',
      count: '06.',
      icon: Leaf,
      title: 'Environmental Sustainability Efforts',
      desc: 'Implementing green practices and promoting sustainability within our operations to protect and preserve our environment.'
    }
  ], [])

  const [index, setIndex] = useState(0)
  const active = items[index]

  const goUp = () => setIndex((i) => (i - 1 + items.length) % items.length)
  const goDown = () => setIndex((i) => (i + 1) % items.length)

  return (
    <div className="inner-content" style={{ position: 'relative' }}>
      <div className="schedule-carousel" style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="information-block-one">
          <div
            className="inner-box"
            style={{
              position: 'relative',
              background: '#ffffff',
              borderRadius: 12,
              boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
              padding: '24px 28px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* Corner badge with quarter circle and count (overlay) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: 80,
                height: 80,
                overflow: 'hidden',
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 80,
                  height: 80,
                  background: '#83B253',
                  borderRadius: '0 0 80px 0'
                }}
              />
              <div style={{ position: 'absolute', top: 10, left: 10, color: '#ffffff', fontWeight: 700, fontSize: 16 }}>
                {active.count}
              </div>
            </div>

            {/* Icon area */}
            <div style={{ width: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {active.icon ? React.createElement(active.icon, { size: 96, color: '#83B253' }) : null}
            </div>

            {/* Text content */}
            <div className="text" style={{ flex: 1 }}>
              <h4 style={{ fontSize: 22, fontWeight: 700, color: '#1F2937', marginBottom: 8 }}>{active.title}</h4>
              <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.6 }}>{active.desc}</p>
            </div>

            {/* Controls column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                type="button"
                aria-label="Previous"
                onClick={goUp}
                style={{
                  background: '#F3F4F6',
                  color: '#111827',
                  border: '1px solid #E5E7EB',
                  borderRadius: 8,
                  width: 56,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronUp size={18} />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={goDown}
                style={{
                  background: '#F3F4F6',
                  color: '#111827',
                  border: '1px solid #E5E7EB',
                  borderRadius: 8,
                  width: 56,
                  height: 48,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronDown size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}