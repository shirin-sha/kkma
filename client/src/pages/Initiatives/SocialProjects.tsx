import { Star, Phone } from 'lucide-react'
import React from 'react'

type ProjectCard = {
  title: string
  desc: string
  icon: string
  img: string
  link: string
}

export default function SocialProjects(): React.JSX.Element {
  const projects: ProjectCard[] = [
    {
      title: 'Housing Improvement',
      desc: 'Providing safe and improved housing for underprivileged families.',
      icon: 'fa fa-house-damage',
      img: '/images/initiatives/KKMA-Social-Projects-Housing-Improvement.jpg',
      link: '#'
    },
    {
      title: 'Early Detection Center',
      desc: 'Promoting early diagnosis to prevent and manage serious health conditions.',
      icon: 'fa fa-heartbeat',
      img: '/images/initiatives/KKMA-Social-Projects-Early-Detection-Center.jpg',
      link: '#'
    },
    {
      title: 'Medical Assistance Program',
      desc: 'We are offering essential medical aid to those in urgent need.',
      icon: 'fa fa-clinic-medical',
      img: '/images/initiatives/KKMA-Social-Projects-Medical-Assistance-Program.jpg',
      link: '#'
    },
    {
      title: 'Educational Scholarship',
      desc: 'Supporting education for deserving students through scholarships.',
      icon: 'fa fa-book',
      img: '/images/initiatives/KKMA-Social-Projects-Educational-Scholarship-Program.jpg',
      link: '#'
    },
    {
      title: 'Members Welfare Scheme',
      desc: 'Ensuring welfare and support for members in challenging times.',
      icon: 'fa fa-hands-helping',
      img: '/images/initiatives/KKMA-Social-Projects-Members-Benefit-Scheme.jpg',
      link: '#'
    },
    {
      title: 'Family Benefit Scheme',
      desc: 'We are providing financial aid to families of deceased members.',
      icon: 'fa fa-users',
      img: '/images/initiatives/KKMA-Social-Projects-Family-Benefit-Scheme.jpg',
      link: '#'
    },
    {
      title: 'KKMA Investment Club',
      desc: 'Encouraging savings and investments among members for financial security.',
      icon: 'fa fa-money-check',
      img: '/images/initiatives/KKMA-Social-Projects-Investment.jpg',
      link: '#'
    },
    {
      title: 'Community Welfare Activities',
      desc: 'Enhancing community well-being through diverse social initiatives.',
      icon: 'fa fa-users',
      img: '/images/initiatives/KKMA-Social-Projects-Community-welfare.jpg',
      link: '#'
    },
    {
      title: 'Seminars & Religious Classes',
      desc: 'Empowering members with knowledge through seminars and classes.',
      icon: 'fa fa-graduation-cap',
      img: '/images/initiatives/KKMA-Social-Projects-Seminars-1.jpg',
      link: '#'
    },
    {
      title: 'Hajj & Umrah Programs',
      desc: 'Facilitating Hajj and Umrah journeys for members.',
      icon: 'fa fa-mosque',
      img: '/images/initiatives/KKMA-Social-Projects-Hajj-Umrah.jpg',
      link: '#'
    },
    {
      title: 'Kidney Dialysis Centre',
      desc: 'Offering affordable dialysis treatment to patients in need.',
      icon: 'fa fa-tint',
      img: '/images/initiatives/KKMA-Social-Projects-Kidney-Dialysis-Center.jpg',
      link: '#'
    },
    {
      title: 'Campaigns, Training & Development',
      desc: 'Fostering growth through targeted campaigns and development programs.',
      icon: 'fa fa-book-reader',
      img: '/images/initiatives/KKMA-Social-Projects-Training.jpg',
      link: '#'
    }
  ]

  return (
    <div className="boxed_wrapper">
      <section className="page-title" style={{ backgroundImage: 'url(/images/page-title/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred"><h1>Social Projects</h1></div>
            <ul className="bread-crumb clearfix"><li><a href="/">Home</a></li><li>Social Projects</li></ul>
          </div>
        </div>
      </section>

      <section className="about-department sec-pad-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-column">
              <div className="content_block_11"><div className="content-box">
                <div className="sec-title light">
                  <h6><Star fill='currentColor' size={16} /><span>Empowering Communities, Enriching Lives</span></h6>
                  <h2>Comprehensive Social Initiatives for Community Upliftment</h2>
                  <div className="title-shape"></div>
                </div>
                <div className="text"><p>
                  Dive into our wide-ranging projects designed to bring about meaningful change. These initiatives span education, healthcare, and community support, reflecting our unwavering commitment to improving lives and building a stronger, resilient society.
                </p></div>
                <div className="inner-box clearfix">
                  <div className="btn-box pull-left"><a href="/contact">Contact Now</a></div>
                  <div className="support-box pull-left" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: '50%', background: '#7BB045' }}>
                      <Phone color="#fff" size={22} strokeWidth={2} />
                    </span>
                    <div>
                      <h5 style={{ margin: 0 }}>KKMA Representative</h5>
                      <p style={{ margin: 0 }}><a href="tel:96512345678">+965 123 456 78</a> (08: AM to 07:00 PM)</p>
                    </div>
                  </div>
                </div>
              </div></div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 image-column">
              <figure className="image-box"><img src="/images/initiatives/KKMA-Social-Projects.jpg" alt="Social Projects" /></figure>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-style-two departments-page sec-pad centred">
        <div className="auto-container">
          <div className="sec-title centred">
            <h6><Star fill='currentColor' size={16} /><span>Dedicated to Enhancing Lives and Fostering Community Growth</span><Star fill='currentColor' size={16} /></h6>
            <h2>Empowering Communities Through Meaningful Initiatives</h2>
            <div className="title-shape"></div>
          </div>
          <div className="row clearfix">
            {projects.map((p, idx) => (
              <div key={idx} className="col-lg-3 col-md-6 col-sm-12 explore-block">
                <div className="explore-block-two">
                  <div className="inner-box">
                    <figure className="image-box"><img src={p.img} width={270} height={370} alt={p.title} /></figure>
                    <div className="content-box">
                      <div className="icon-box"><i className={p.icon}></i></div>
                      <h4>{p.title}</h4>
                    </div>
                    <div className="overlay-content">
                      <div className="icon-box"><i className={p.icon}></i></div>
                      <p>{p.desc}</p>
                      <div className="text">
                        <h4>{p.title}</h4>
                        <a href={p.link}>Read More</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}



















