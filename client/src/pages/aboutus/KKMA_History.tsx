import { Star } from 'lucide-react'
import React from 'react'

type TimelineItem = {
  year: string
  kicker: string
  title: string
  text: string
  img: string
  align: 'left' | 'right'
}

export default function KKMA_History(): React.JSX.Element {
  const items: TimelineItem[] = [
    {
      year: '2001',
      kicker: 'Birth of a Vision',
      title: '2001: The Formation',
      text:
        "On December 16, 2001, a dedicated group of 100 individuals founded KKMA to support and uplift the Indian community in Kuwait, focusing on social activities and development.",
      img: '/images/history/KKMA-History-The-Formation.jpg',
      align: 'left'
    },
    {
      year: '2002',
      kicker: 'Early Milestones',
      title: "2002: First Initiatives",
      text:
        "KKMA launched its first programs, including the Family Benefit Scheme (FBS) and Members' Welfare Scheme (MWS), providing essential support and financial aid to members in need.",
      img: '/images/history/KKMA-History-First-Project.jpg',
      align: 'right'
    },
    {
      year: '2003',
      kicker: 'Expanding Reach',
      title: '2003: Establishing Units',
      text:
        'KKMA expanded its structure by establishing 15 units across different parts of Kuwait, creating unit and zonal committees to effectively manage and oversee its activities.',
      img: '/images/history/KKMA-History-Branches.jpg',
      align: 'left'
    },
    {
      year: '2005',
      kicker: 'Investing in Education',
      title: '2005: Student Adoption Program',
      text:
        'KKMA introduced the Student Adoption Program, offering financial assistance to deserving students pursuing higher education in India. This initiative currently supports 44 students.',
      img: '/images/history/KKMA-History-Student-Adoption-Program.jpg',
      align: 'right'
    },
    {
      year: '2008',
      kicker: 'Community Impact',
      title: '2008: Social Development Efforts',
      text:
        'KKMA introduced the Student Adoption Program, offering financial assistance to deserving students pursuing higher education in India. This initiative currently supports 44 students.',
      img: '/images/history/KKMA-History-Social-projects.jpg',
      align: 'left'
    },
    {
      year: '2010',
      kicker: 'Enriching Lives',
      title: '2010: Expanding Social Programs',
      text:
        'The organization expanded its social programs with various educational and entertainment events, such as Eid Milan programs and Iftar parties, fostering community engagement and cultural pride.',
      img: '/images/history/KKMA-History-Social-Projects-1.jpg',
      align: 'right'
    },
    {
      year: '2012',
      kicker: 'Enhancing Well-being',
      title: '2012: Health Initiatives',
      text:
        'KKMA formed partnerships with health providers to offer medical assistance and establish health-related programs, improving access to care for deserving members and their families.',
      img: '/images/history/KKMA-History-Health-Initiatives.jpg',
      align: 'left'
    },
    {
      year: '2015',
      kicker: 'Building Relationships',
      title: '2015: Strengthening Community Ties',
      text:
        'KKMA focused on promoting Kuwait-India friendship and strengthening ties with the Indian Embassy in Kuwait, addressing community issues and enhancing cultural understanding.',
      img: '/images/history/KKMA-History-communities.jpg',
      align: 'right'
    },
    {
      year: '2017',
      kicker: 'Encouraging Financial Growth',
      title: '2017: Launch of Investment Club',
      text:
        'The establishment of the Investment Club aimed to encourage saving habits and investment among members, further supporting their financial stability and growth.',
      img: '/images/history/KKMA-History-Investment.jpg',
      align: 'left'
    },
    {
      year: '2018',
      kicker: 'Responding to Crises',
      title: '2018: Launch of Relief Fund Initiatives',
      text:
        'KKMA established a dedicated Relief Fund to support victims of natural disasters and other emergencies, providing aid to individuals and families in distress.',
      img: '/images/history/KKMA-History-Relief-Funds.jpg',
      align: 'right'
    },
    {
      year: '2020',
      kicker: 'Innovation and Resilience',
      title: '2020: Adapting to New Challenges',
      text:
        'KKMA adapted to emerging challenges by implementing new programs and digital solutions, ensuring continued support for its members and expanding its outreach.',
      img: '/images/history/KKMA-History-New-Challenges.jpg',
      align: 'left'
    },
    {
      year: '2022',
      kicker: 'Fostering Community Spirit',
      title: '2022: Cultural and Religious Programs',
      text:
        'The organization increased its focus on cultural and religious programs, hosting various seminars, study classes, and community events to strengthen ties and share knowledge.',
      img: '/images/history/KKMA-History-Cultural-Religious.jpg',
      align: 'right'
    },
    {
      year: '2023',
      kicker: 'Looking Ahead',
      title: '2023: Future Aspirations',
      text:
        'With a robust foundation and ongoing commitment to its mission, KKMA continues to focus on member aid, community development, and expanding its impactful initiatives for a brighter future.',
      img: '/images/history/KKMA-History-Future-Aspirations.jpg',
      align: 'left'
    },
    {
      year: '2024',
      kicker: 'Enhancing Membership Access',
      title: '2024: Member Management System',
      text:
        'Our new Member Management System allows members to log in securely and effortlessly update their personal information, track benefits, and access exclusive resources.',
      img: '/images/history/KKMA-History-Membership-System.jpg',
      align: 'right'
    },
    {
      year: '2024',
      kicker: 'Embracing Modernity',
      title: '2024: New Website Launch',
      text:
        'KKMA launched a new digital platform to streamline member services, improve communication, and facilitate easier access to resources and updates for the community.',
      img: '/images/history/KKMA-History-Website.jpg',
      align: 'left'
    }
  ]

  return (
    <div className="boxed_wrapper">
      <section className="page-title" style={{ backgroundImage: 'url(/images/page-title/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred"><h1>KKMA History</h1></div>
            <ul className="bread-crumb clearfix"><li><a href="/">Home</a></li><li>KKMA History</li></ul>
          </div>
        </div>
      </section>

      <section className="history-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-4 col-md-12 col-sm-12 title-column">
              <div className="sec-title">
                <h6><Star fill='currentColor' size={16} /><span>Tracing the Milestones of KKMA's Impact</span></h6>
                <h2>Our Journey Through Time</h2>
                <div className="title-shape"></div>
                <p>Explore the evolution of KKMA as we reflect on our key milestones, achievements, and pivotal moments. From our founding in 2001 to our latest initiatives, discover how we've grown and shaped our community over the years.</p>
              </div>
            </div>

            <div className="col-lg-8 col-md-12 col-sm-12 inner-column">
              <div className="inner-box">
                {items.map((it, idx) => (
                  <div key={idx} className={`single-item ${it.align === 'left' ? 'style-one' : 'style-two text-right'}`}>
                    <figure className="image-box"><img src={it.img} alt={it.title} /></figure>
                    <div className="text">
                      <span>{it.year}</span>
                      <h6>{it.kicker}</h6>
                      <h4>{it.title}</h4>
                      <p>{it.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
