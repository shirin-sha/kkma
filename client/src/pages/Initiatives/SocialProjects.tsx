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
      img: 'https://kkma.net/wp-content/uploads/2021/05/KKMA-Social-Projects-Housing-Improvement.jpg',
      link: 'https://kkma.net/social-projects/housing-improvement-program/'
    },
    {
      title: 'Early Detection Center',
      desc: 'Promoting early diagnosis to prevent and manage serious health conditions.',
      icon: 'fa fa-heartbeat',
      img: 'https://kkma.net/wp-content/uploads/2021/05/KKMA-Social-Projects-Early-Detection-Center.jpg',
      link: 'https://kkma.net/social-projects/early-detection-center-for-heart-diseases/'
    },
    {
      title: 'Medical Assistance Program',
      desc: 'We are offering essential medical aid to those in urgent need.',
      icon: 'fa fa-clinic-medical',
      img: 'https://kkma.net/wp-content/uploads/2021/05/KKMA-Social-Projects-Medical-Assistance-Program.jpg',
      link: 'https://kkma.net/social-projects/medical-assistance-program/'
    },
    {
      title: 'Educational Scholarship',
      desc: 'Supporting education for deserving students through scholarships.',
      icon: 'fa fa-book',
      img: 'https://kkma.net/wp-content/uploads/2021/05/KKMA-Social-Projects-Educational-Scholarship-Program.jpg',
      link: 'https://kkma.net/social-projects/educational-scholarship-program/'
    },
    {
      title: 'Members Welfare Scheme',
      desc: 'Ensuring welfare and support for members in challenging times.',
      icon: 'fa fa-hands-helping',
      img: 'https://kkma.net/wp-content/uploads/2021/05/KKMA-Social-Projects-Members-Benefit-Scheme.jpg',
      link: 'https://kkma.net/social-projects/members-welfare-scheme/'
    },
    {
      title: 'Family Benefit Scheme',
      desc: 'We are providing financial aid to families of deceased members.',
      icon: 'fa fa-users',
      img: 'https://kkma.net/wp-content/uploads/2021/05/KKMA-Social-Projects-Family-Benefit-Scheme.jpg',
      link: 'https://kkma.net/social-projects/family-benefit-scheme/'
    },
    {
      title: 'KKMA Investment Club',
      desc: 'Encouraging savings and investments among members for financial security.',
      icon: 'fa fa-money-check',
      img: 'https://kkma.net/wp-content/uploads/2021/06/KKMA-Social-Projects-Investment.jpg',
      link: 'https://kkma.net/social-projects/kkma-investment-club/'
    },
    {
      title: 'Community Welfare Activities',
      desc: 'Enhancing community well-being through diverse social initiatives.',
      icon: 'icon flaticon-group',
      img: 'https://kkma.net/wp-content/uploads/2021/06/KKMA-Social-Projects-Community-welfare.jpg',
      link: 'https://kkma.net/social-projects/community-welfare-activities/'
    },
    {
      title: 'Seminars & Religious Classes',
      desc: 'Empowering members with knowledge through seminars and classes.',
      icon: 'fa fa-users-class',
      img: 'https://kkma.net/wp-content/uploads/2021/06/KKMA-Social-Projects-Seminars-1.jpg',
      link: 'https://kkma.net/social-projects/seminars-religious-classes/'
    },
    {
      title: 'Hajj & Umrah Programs',
      desc: 'Facilitating Hajj and Umrah journeys for members.',
      icon: 'fa fa-mosque',
      img: 'https://kkma.net/wp-content/uploads/2021/06/KKMA-Social-Projects-Hajj-Umrah.jpg',
      link: 'https://kkma.net/social-projects/hajj-umrah-programs/'
    },
    {
      title: 'Kidney Dialysis Centre',
      desc: 'Offering affordable dialysis treatment to patients in need.',
      icon: 'fa fa-kidneys',
      img: 'https://kkma.net/wp-content/uploads/2021/06/KKMA-Social-Projects-Kidney-Dialysis-Center.jpg',
      link: 'https://kkma.net/social-projects/kidney-dialysis-centre/'
    },
    {
      title: 'Campaigns, Training & Development',
      desc: 'Fostering growth through targeted campaigns and development programs.',
      icon: 'fa fa-book-reader',
      img: 'https://kkma.net/wp-content/uploads/2021/06/KKMA-Social-Projects-Training.jpg',
      link: 'https://kkma.net/social-projects/campaigns-training-development/'
    }
  ]

  return (
    <div className="boxed_wrapper">
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
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
                  <h6><i className="flaticon-star"></i><span>Empowering Communities, Enriching Lives</span></h6>
                  <h2>Comprehensive Social Initiatives for Community Upliftment</h2>
                  <div className="title-shape"></div>
                </div>
                <div className="text"><p>
                  Dive into our wide-ranging projects designed to bring about meaningful change. These initiatives span education, healthcare, and community support, reflecting our unwavering commitment to improving lives and building a stronger, resilient society.
                </p></div>
                <div className="inner-box clearfix">
                  <div className="btn-box pull-left"><a href="/contact">Contact Now</a></div>
                  <div className="support-box pull-left">
                    <i className="flaticon-emergency-call"></i>
                    <h5>KKMA Representative</h5>
                    <p><a href="tel:96512345678">+965 123 456 78</a> (08: AM to 07:00 PM)</p>
                  </div>
                </div>
              </div></div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 image-column">
              <figure className="image-box"><img src="https://kkma.net/wp-content/uploads/2024/08/KKMA-Social-Projects.jpg" alt="Social Projects" /></figure>
            </div>
          </div>
        </div>
      </section>

      <section className="explore-style-two departments-page sec-pad centred">
        <div className="auto-container">
          <div className="sec-title centred">
            <h6><i className="flaticon-star"></i><span>Dedicated to Enhancing Lives and Fostering Community Growth</span><i className="flaticon-star"></i></h6>
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












