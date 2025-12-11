import React from 'react'
import { Star } from 'lucide-react'

export default function PeopleBehind(): React.JSX.Element {
  const founder = {
    img: '/images/people/KKMA-SAGEER-TRIKARIPUR.jpg',
    name: 'SAGEER TRIKARIPUR',
    role: 'FOUNDER PRESIDENT & GUIDE',
    introTitle: 'Visionary Leader and Guiding Spirit',
    introSubtitle: 'Remembering Our Founder',
    introDesc:
      'Sageer Trikarpur, our esteemed Founder and Guide, left an indelible mark on KKMA and our community. His visionary leadership and unwavering commitment to service laid the foundation for our organization. His legacy continues to inspire and drive us as we honor his memory and the profound impact he had in shaping our mission and values.'
  }

  type TeamMember = {
    img: string
    name: string
    role: string
    phone?: string
    email?: string
  }

  const pmtExecutives: TeamMember[] = [
    { img: '/images/people/KKMA-K-SIDDIK-Chief-patron.jpg', name: 'K. SIDDIK', role: 'Chief Patron', phone: '+965 123 456 78' },
    { img: '/images/people/KKMA-Akbar-Sidique.jpg', name: 'AKBAR SIDDIQUE', role: 'Patron', phone: '+965 123 456 78' },
    { img: '/images/people/KKMA-A-P-ABDUL-SALAM.jpg', name: 'A. P. ABDUL SALAM', role: 'Chairman', phone: '+965 123 456 78' },
    { img: '/images/people/KKMA-IBRAHIM-KUNNIL.jpg', name: 'IBRAHIM KUNNIL', role: 'Vice Chairman', phone: '+965 123 456 78' },
    { img: '/images/people/KKMA-N-A-MUNEER.jpg', name: 'N.A. MUNEER', role: 'PMT Members', phone: '+965 123 456 78' },
    { img: '/images/people/KKMA-MOHAMMED-ALI-MATRA.jpg', name: 'MOHAMMED ALI MATRA', role: 'PMT Members', phone: '+965 123 456 78' },
    { img: '/images/people/KKMA-ABDUL-FATHAH-THAYYIL.jpg', name: 'ABDUL FATHAH THAYYIL', role: 'PMT Members', phone: '+965 123 456 78' }
  ]

  const ccOfficeBearers: TeamMember[] = [
    { img: '/images/people/KKMA-K-BASHEER.jpg', name: 'K. BASHEER', role: 'President', phone: '+965 69677996' },
    { img: '/images/people/KKMA-B-M-IQBAL.jpg', name: 'B. M. IQBAL', role: 'General Secretary', phone: '+965 99483350' },
    { img: '/images/people/KKMA-MUNEER-KUNIYA.jpg', name: 'MUNEER KUNIYA', role: 'Treasurer', phone: '+965 90027939' },
    { img: '/images/people/KKMA-H-A-GAFOOR.jpg', name: 'H.A. GAFOOR', role: 'Working President', phone: '+965 99765237' },
    { img: '/images/people/KKMA-O-P-SHARAFUDHEEN.jpg', name: 'O. P. SHARAFUDHEEN', role: 'Working President', phone: '+965 90060532' },
    { img: '/images/people/KKMA-K-C-RAFEEQUE.jpg', name: 'K. C. RAFEEQUE', role: 'Working President', phone: '+965 99514546' },
    { img: '/images/people/KKMA-MOHAMMED-RASHEED-ZAMZAM.jpg', name: 'MOHAMMED RASHEED ZAMZAM', role: 'Working President', phone: '+965 99428719' },
    { img: '/images/people/Mohamed-Navas-kkma.jpg', name: 'MOHAMED NAVAZ CEENDAVIDA', role: 'Organizing Secretary', phone: '+965 97130710' },
    { img: '/images/people/KKMA-O-M-SHAFI.jpg', name: 'O.M. SHAFI', role: 'Vice President', phone: '+965 66649544' },
    { img: '/images/people/KKMA-A-T-NOUFAL.jpg', name: 'A.T.NOUFAL', role: 'Vice President', phone: '+965 97420679' },
    { img: '/images/people/KKMA-P-M-JAFFER.jpg', name: 'P.M. JAFFER', role: 'Vice President', phone: '+965 66610087' },
    { img: '/images/people/KKMA-LATHEEF-EDAYOOR.jpg', name: 'LATHEEF EDAYOOR', role: 'Vice President', phone: '+965 66637447' },
    { img: '/images/people/KKMA-NIZAM-NALAKATH.jpg', name: 'NIZAM NALAKATH', role: 'Vice President', phone: '+965 99125481' },
    { img: '/images/people/KKMA-P-M-SHEREEF.jpg', name: 'P.M. SHEREEF', role: 'Vice President', phone: '+965 60610733' },
    { img: '/images/people/KKMA-T-FIROZ.jpg', name: 'T. FIROZ', role: 'Vice President', phone: '+965 99408973' },
    { img: '/images/people/KKMA-MAJEED-RAWABI.jpg', name: 'MAJEED RAWABI', role: 'Vice President', phone: '+965 66865382' },
    { img: '/images/people/KKMA-ASLAM-HAMZA.jpg', name: 'ASLAM HAMZA', role: 'Vice President', phone: '+965 51716683' },
    { img: '/images/people/KKMA-ASHARAF-MANKAV.jpg', name: 'ASHARAF MANKAVE', role: 'Vice President', phone: '+965 94739004' },
    { img: '/images/people/KKMA-JABBAR-GURPURA.jpg', name: 'JABBAR GURPURA', role: 'Vice President', phone: '+965 66015758' },
    { img: '/images/people/KKMA-ABDUL-KALAM-MOULAVI.jpg', name: 'ABDUL KALAM MOULAVI', role: 'Vice President', phone: '+965 55226268' },
    { img: '/images/people/Muhammed-Kunji-kkma.jpg', name: 'K. H. MUHAMMED KUNJI', role: 'Vice President', phone: '+965 99590480' },
    { img: '/images/people/KKMA-M-P-SULFIQUER.jpg', name: 'M. P. SULFIQUER', role: 'Secretary', phone: '+965 97834590' },
    { img: '/images/people/KKMA-K-C-KAREEM.jpg', name: 'K. C. KAREEM', role: 'Secretary', phone: '+965 66644175' },
    { img: '/images/people/KKMA-P-A-ABDULLA.jpg', name: 'P. A. ABDULLA', role: 'Secretary', phone: '+965 66608287' },
    { img: '/images/people/KKMA-MUHAMMED-ALI-KADINJIMOOLA.jpg', name: 'MUHAMMED ALI KADINJIMOOLA', role: 'Secretary', phone: '+965 66053044' }
  ]

  type ZonalRow = { name: string; role: string; contact: string }

  const ahmadiRows: ZonalRow[] = [
    { name: 'Haris P.M.', role: 'President', contact: '69697991' },
    { name: 'Mohammed Rafeeque K. T.', role: 'General Secretary', contact: '99840697' },
    { name: 'Niyad K.P', role: 'Treasurer', contact: '51211001' },
    { name: 'Mohammed Rafeeque K. T.', role: 'Ag. Vice President Membership', contact: '99840697' },
    { name: 'Firos T.', role: 'Vice President (FBS & MWS)', contact: '99408973' },
    { name: 'Basheer Udinoor', role: 'Vice President (Social Projects)', contact: '94000392' },
    { name: 'Ashraf Ali', role: 'Vice President (Relief)', contact: '99682119' },
    { name: 'Saleem Kommeri', role: 'Vice President (Magnet)', contact: '94993120' },
    { name: 'C.M. Ashraf', role: 'Vice President (Arts, Sports & Event Management)', contact: '66616501' },
    { name: 'Abdul Rasheed', role: 'Vice President (Skill Development & Moral Development)', contact: '50454585' },
    { name: 'Naser M.T', role: 'Vice President (Student Development & Family Club)', contact: '69080303' },
    { name: 'Mohammed Yaseen', role: 'IT Secretary', contact: '60077428' },
    { name: 'Shaheer Ahmed', role: 'Admin Secretary', contact: '60655992' },
    { name: 'Sharafudeen Ckm', role: 'Communication Secretary', contact: '99267163' }
  ]

  const cityRows: ZonalRow[] = [
    { name: 'Abdul Lathif Shedia', role: 'President', contact: '66765892' },
    { name: 'Abdul Razak', role: 'General Secretary', contact: '99702396' },
    { name: 'Kamarudheen P', role: 'Treasurer', contact: '99641052' },
    { name: 'Mohammed Raees VK', role: 'Secretary (Administration & IT)', contact: '50199030' },
    { name: 'Abdulla Karambra', role: 'Secretary (Communication)', contact: '99750546' },
    { name: 'Jaffar. Panankandy', role: 'Vice President (Membership ,Health Scheme & Privilege Card)', contact: '98594480' },
    { name: 'Naseer Karamkulangara', role: 'Vice President (FBS, MWS)', contact: '55887486' },
    { name: 'Abdulla Vavad', role: 'Vice President (Social Projects (MAP, HIP, FD & DWW), Fund Drive)', contact: '67736765' },
    { name: 'Mohammed Hadad CH', role: 'Vice President (Relief Cell & KDRC)', contact: '97472101' },
    { name: 'NAJMUDDEN TC', role: 'Vice President (Magnet, Legal Cell & Employment Cell)', contact: '50209565' },
    { name: 'Noushad AK', role: 'Vice President (Arts & Sports, Event Management)', contact: '919048747247' },
    { name: 'Mustafa AT', role: 'Vice President (Skill Development & Moral Development (Religious))', contact: '51254333' },
    { name: 'Majeed Karadi K C', role: 'Vice President (Students Development & Family Club)', contact: '65859412' }
  ]

  const farwaniyaRows: ZonalRow[] = [
    { name: 'MOHAMMED SALEEM. P P P', role: 'President', contact: '99321831' },
    { name: 'Mr PV. MOUIDEEN KOYA', role: 'Working President (Zone)', contact: '99481932' },
    { name: 'Mr SABIR MOHAMMED', role: 'Vice President - Membership', contact: '97207221' },
    { name: 'Mr Najumudheen', role: 'Vice President - Health Scheme', contact: '67036073' },
    { name: 'Mr Abdul Gafoor', role: 'Vice President - Social Projects (MAP, HIP, FD & DWW)', contact: '67030025' },
    { name: 'Haneefa Padanna', role: 'Vice President - Fund Drive & KDRC', contact: '67623861' },
    { name: 'C A Mohammed', role: 'Vice President - Relief Cell', contact: '55610012' },
    { name: 'Mr Yakoob Elathoor', role: 'Vice President - Magnet', contact: '99783716' },
    { name: 'Mr Rafeeq Usman', role: 'Vice President - Employment Cell', contact: '99417062' },
    { name: 'Mr Mahmood Perumba', role: 'Vice President - Arts & Sports', contact: '50276444' },
    { name: 'Mr Shamseer Naser', role: 'Vice President - Event Management', contact: '50084100' },
    { name: 'Mr Shameer Jaleeb', role: 'Vice President - Skill Development', contact: '99112778' },
    { name: 'Mr Sidheeq Sabhan', role: 'Vice President - Students Development', contact: '97397143' },
    { name: 'Mr Jamsheed', role: 'General Secretary', contact: '94068738' },
    { name: 'Mr Sideeq (Jaleeb)', role: 'Secretary - Administration', contact: '99208625' },
    { name: 'Mr Usman Madathil', role: 'Secretary - Communication', contact: '99129503' },
    { name: 'Dr S Muhammed', role: 'Treasurer', contact: '66915688' }
  ]

  const renderTeamGrid = (title: string, subtitle: string, members: TeamMember[]) => (
    <section className="team-section sec-pad ">
      <div className="auto-container">
        <div className="sec-title">
          <h6><Star fill='currentColor' size={16} /><span>{subtitle}</span></h6>
          <h2>{title}</h2>
          <div className="title-shape"></div>
        </div>
        <div className="row clearfix">
          {members.map((member, idx) => (
            <div key={idx} className="col-lg-3 col-md-6 col-sm-12 team-block">
              <div className="team-block-one wow fadeInUp">
                <div className="inner-box">
                  <figure className="image-box"><img src={member.img} alt={member.name} width="270" height="270" /></figure>
                  <div className="lower-content">
                    <div className="author-box">
                      <h4>{member.name}</h4>
                      <span className="designation">{member.role}</span>
                    </div>
                    {(member.email || member.phone) && (
                      <ul className="othre-info clearfix">
                        {member.email && (
                          <li className="mail-box"><a href={`mailto:${member.email}`}><i className="flaticon-mail-inbox-app"></i>Email</a></li>
                        )}
                        {member.phone && (
                          <li className="phone-box"><i className="fa fa fa-phone"></i><a href={`tel:${member.phone}`}>{member.phone}</a></li>
                        )}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )

  const renderZonal = (title: string, rows: ZonalRow[]) => (
    <section className="sec-pad">
      <div className="auto-container">
        <div className="sec-title">
          <h6><span>Driving Community Engagement and Local Initiatives</span></h6>
          <h2>{title}</h2>
          <div className="title-shape"></div>
        </div>
        <div className="table-responsive">
          <table className="table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: 12, borderBottom: '1px solid #ebebeb', background: '#f7f7f7', textAlign: 'left' }}>Name</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ebebeb', background: '#f7f7f7', textAlign: 'left' }}>Designation</th>
                <th style={{ padding: 12, borderBottom: '1px solid #ebebeb', background: '#f7f7f7', textAlign: 'left' }}>Contact Number</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={`${r.name}-${i}`}>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f3f3' }}><b>{r.name}</b></td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f3f3', color: '#83b253' }}><b>{r.role}</b></td>
                  <td style={{ padding: 10, borderBottom: '1px solid #f3f3f3', color: '#bb322a' }}><b>{r.contact}</b></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )

  return (
    <div className="boxed_wrapper">
      <section className="page-title" style={{ backgroundImage: 'url(/images/page-title/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred"><h1>Our Team</h1></div>
            <ul className="bread-crumb clearfix"><li><a href="/">Home</a></li><li>Our Team</li></ul>
          </div>
        </div>
      </section>

      <section className="sec-pad" style={{ backgroundColor: '#201e1f', padding: '80px 0' }}>
        <div className="auto-container">
          <div className="row clearfix align-items-center">
            <div className="col-lg-7 col-md-12 col-sm-12">
              <div className="sec-title" style={{ marginBottom: 0 }}>
                <h6 style={{
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  fontSize: '14px',
                  letterSpacing: 1.2,
                  marginBottom: 12
                }}>
                  {founder.introTitle}
                </h6>
                <h2 style={{ 
                  fontSize: '36px', 
                  lineHeight: 1.2, 
                  fontWeight: 600, 
                  color: '#ffffff',
                  marginBottom: 20
                }}>
                  {founder.introSubtitle}
                </h2>
                <p style={{ 
                  color: '#ffffff', 
                  fontSize: '16px', 
                  lineHeight: 1.8,
                  marginBottom: 0
                }}>
                  {founder.introDesc}
                </p>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-sm-12">
              <div className="row clearfix">
                <div className="col-12" style={{ textAlign: 'center' }}>
                  <figure className="image" style={{ marginBottom: 20 }}>
                    <img 
                      src={founder.img} 
                      alt={founder.name} 
                      style={{ 
                        width: '300px', 
                        height: '360px', 
                        objectFit: 'cover',
                        borderRadius: '8px',
                        border: '4px solid #ffffff'
                      }} 
                    />
                  </figure>
                  <h2 style={{ 
                    fontWeight: 800, 
                    fontSize: '24px',
                    color: '#ffffff',
                    marginBottom: '8px',
                    textTransform: 'uppercase'
                  }}>
                    {founder.name}
                  </h2>
                  <h3 style={{ 
                    fontSize: '16px', 
                    color: '#ffffff',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    marginBottom: 0
                  }}>
                    {founder.role}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {renderTeamGrid('Our PMT Executives', 'Guiding Our Mission with Expertise and Commitment', pmtExecutives)}

      {renderTeamGrid('Central Committee Office Bearers', 'Leading with Vision and Dedication', ccOfficeBearers)}

      {renderZonal('Ahmadi Zonal Committee', ahmadiRows)}

      <div className="elementor-divider"><span className="elementor-divider-separator"></span></div>

      {renderZonal('City Zonal Committee', cityRows)}

      <div className="elementor-divider"><span className="elementor-divider-separator"></span></div>

      {renderZonal('Farwaniya Zonal Committee', farwaniyaRows)}
    </div>
  )
}
