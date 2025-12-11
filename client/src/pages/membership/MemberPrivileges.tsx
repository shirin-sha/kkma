import { Star, Phone } from 'lucide-react'
import React from 'react'

type Partner = {
  title: string
  img: string
  instagram?: string
  facebook?: string
  tiktok?: string
  detailsHref?: string
}

type Category = {
  heading: string
  partners: Partner[]
}

export default function MemberPrivileges(): React.JSX.Element {
  const categories: Category[] = [
    {
      heading: 'HOSPITALS & PHARMACIES',
      partners: [
        {
          title: 'CITY CLINIC GROUP',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-CITY-CLINIC-GROUP.jpg',
        },
        {
          title: 'SALMIYA CLINIC',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-SALMIYA-CLINIC.jpg',
        },
        {
          title: 'MEDX MEDICAL GROUP',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-MEDX-MEDICAL-CARE.jpg',
        },
        {
          title: 'ASTER MIMS',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-ASTER-MIMS-HOSPITAL.jpg',
        },
        {
          title: 'APOLLO CLINIC',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-APOLLO-CLINIC.jpg',
        },
        {
          title: 'KIMS ALSHIFA',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-KIMS-ALSHIFA-HOSPITAL.jpg',
        },
        {
          title: 'MOULANA HOSPITAL',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-MOULANA-HOSPITAL.jpg',
        },
        {
          title: 'SYRUS MM HOSPITAL',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-MM-HOSPITAL.jpg',
        },
        {
          title: 'KALYANI MEDICALS & CLINIC',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-KALYANI-MEDICALS.jpg',
        },
        {
          title: 'NATIONAL MEDICALS',
          img: '/images/member-privileges/Demo-Logo-1.jpg',
        },
        {
          title: 'KANNUR Med. Col. PHARMACY',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-KANNUR-MEDICAL-COLLEGE.jpg',
        },
      ],
    },
    {
      heading: 'SUPERMARKETS & HYPERMARKETS',
      partners: [
        {
          title: 'GRAND HYPERMARKET',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-GRAND-HYPERMARKET.jpg',
        },
        {
          title: 'MANGO HYPERMARKET',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-MANGO-HYPERMARKET.jpg',
        },
      ],
    },
    {
      heading: 'RESTAURANTS',
      partners: [
        {
          title: 'THAKKARA RESTAURANT',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-THAKKARA-RESTAURANT.jpg',
        },
        {
          title: 'ALIYANS THAKKARA',
          img: '/images/member-privileges/Demo-Logo-1.jpg',
        },
        {
          title: 'CALICUT CHEF',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-CALICUT-CHEF-REASTAURANT-JLEEB-PARK.jpg',
        },
        {
          title: 'SANGEETHA VEG.',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-SANGEETHA-VEG-REASTAURANT.jpg',
        },
      ],
    },
    {
      heading: 'GOLD & DIAMONDS',
      partners: [
        {
          title: 'JOY ALUKKAS',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-JOY-ALUKKAS-GOLD-DIAMONDS.jpg',
        },
        {
          title: 'MANAVATTY',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-MANAVATTY-GOLD-AND-DIAMONDS.jpg',
        },
        {
          title: 'MILORA',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-MILORA-GOLD-AND-DIAMONDS.jpg',
        },
      ],
    },
    {
      heading: 'OTHER PARTNERS',
      partners: [
        {
          title: 'SPEEDEX CARGO',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-SPEEDEX-CARGO-SERVICE.jpg',
        },
        {
          title: 'ALBERTO GARAGE',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-ALBERTO-GARAGE.jpg',
        },
        {
          title: 'BAHRAN EXCHANGE CO. (BEC)',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-BEC-BAHRAIN-EXCHANGE.jpg',
        },
        {
          title: 'SULFEX',
          img: '/images/member-privileges/KKMA-MEMBER-PRIVILEGES-SULFEX.jpg',
        },
        {
          title: 'TILEX',
          img: '/images/member-privileges/Tilex-.jpg',
        },
      ],
    },
  ]

  return (
    <div className="member-privileges-page">
      {/* Page Title */}
      <section
        className="page-title"
        style={{ backgroundImage: 'url(/images/page-title/KKMA-page-title.jpg)' }}
      >
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>KKMA Member Privileges</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li>KKMA Member Privileges</li>
            </ul>
          </div>
        </div>
      </section>
      {/* End Page Title */}

      {/* Hero / Intro */}
      <section className="about-department sec-pad-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-8 col-md-12 col-sm-12 content-column">
              <div className="content_block_11">
                <div className="content-box">
                  <div className="sec-title light">
                    <h6>
                      <Star fill='currentColor' size={16} />
                      <span>Exclusive Benefits and Discounts for KKMA Members</span>
                    </h6>
                    <h2>Unlock Your KKMA Membership Perks &amp; Privileges</h2>
                    <div className="title-shape"></div>
                  </div>
                  <div className="text">
                    <p>
                      Explore the wide range of exclusive discounts and benefits available to KKMA members. Our privilege partners
                      offer special deals to enhance your experience and add value to your membership. Discover all the locations and
                      start enjoying the savings today!
                    </p>
                  </div>
                  <div className="inner-box clearfix" style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <div className="btn-box pull-left"><a href="/contact">Contact Now</a></div>
                    <div className="support-box pull-left" style={{
                      borderRadius: 8,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 42, height: 42, borderRadius: '50%', background: '#7BB045' }}>
                      <Phone color="#fff" size={22} strokeWidth={2} />
                    </span>
                      <div>
                        <h5 style={{ color: '#fff', margin: 0, fontWeight: 700 }}>KKMA Representative</h5>
                        <p style={{ color: '#fff', margin: 0, opacity: .9 }}>
                          <a href="tel:96512345678" style={{ color: '#fff', textDecoration: 'none' }}>+965 123 456 78</a> (08: AM to 07:00 PM)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-12 col-sm-12 image-column">
              <figure className="image-box">
                <img src="/images/member-privileges/Privilege-member.jpg" alt="Privileges" />
              </figure>
            </div>
          </div>
        </div>
      </section>
      {/* End Hero */}

      {/* Categories */}
      {categories.map((category, categoryIdx) => (
        <div className="category-section" key={category.heading}>
          <div className="elementor-element elementor-invisible">
            <div className="elementor-widget-container" style={{ maxWidth: 900, margin: '0 auto 20px', border: '1px solid #e5e5e5', borderRadius: 8, padding: '10px 16px' }}>
              <h2 className="elementor-heading-title elementor-size-default" style={{ textAlign: 'center', margin: 0 }}>{category.heading}</h2>
            </div>
          </div>

          <div className="auto-container" style={{ paddingTop: 20, paddingBottom: 10 }}>
            <div className="row clearfix" style={{ rowGap: 30 }}>
              {category.partners.map((partner: Partner, idx: number) => (
                <div className="col-lg-3 col-md-6 col-sm-12" key={`${categoryIdx}-${idx}`}>
                  <div className="privilege-card centred" style={{ padding: 16, border: '1px solid #e5e5e5', borderRadius: 8, backgroundColor: '#fff', height: '100%' }}>
                    <div className="elementor-widget-image" style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                      <img src={partner.img} alt={partner.title} style={{ width: '100%', maxWidth: 320, maxHeight: 200, objectFit: 'contain' }} />
                    </div>
                    <h2 className="elementor-heading-title elementor-size-default" style={{ fontSize: 18 }}>{partner.title}</h2>

                    <div className="elementor-social-icons-wrapper elementor-grid" role="list" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', columnGap: 12, marginTop: 8 }}>
                      <span className="elementor-grid-item" role="listitem">
                        {partner.instagram ? (
                          <a className="elementor-icon elementor-social-icon elementor-social-icon-instagram elementor-animation-shrink" target="_blank" rel="noreferrer" href={partner.instagram}>
                            <svg className="e-font-icon-svg e-fab-instagram" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                          </a>
                        ) : (
                          <span className="elementor-icon elementor-social-icon elementor-social-icon-instagram" style={{ opacity: .35 }}>
                            <svg className="e-font-icon-svg e-fab-instagram" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path></svg>
                          </span>
                        )}
                      </span>
                      <span className="elementor-grid-item" role="listitem">
                        {partner.facebook ? (
                          <a className="elementor-icon elementor-social-icon elementor-social-icon-facebook elementor-animation-shrink" target="_blank" rel="noreferrer" href={partner.facebook}>
                            <svg className="e-font-icon-svg e-fab-facebook" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
                          </a>
                        ) : (
                          <span className="elementor-icon elementor-social-icon elementor-social-icon-facebook" style={{ opacity: .35 }}>
                            <svg className="e-font-icon-svg e-fab-facebook" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path></svg>
                          </span>
                        )}
                      </span>
                      <span className="elementor-grid-item" role="listitem">
                        {partner.tiktok ? (
                          <a className="elementor-icon elementor-social-icon elementor-social-icon-tiktok elementor-animation-shrink" target="_blank" rel="noreferrer" href={partner.tiktok}>
                            <svg className="e-font-icon-svg e-fab-tiktok" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg>
                          </a>
                        ) : (
                          <span className="elementor-icon elementor-social-icon elementor-social-icon-tiktok" style={{ opacity: .35 }}>
                            <svg className="e-font-icon-svg e-fab-tiktok" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"></path></svg>
                          </span>
                        )}
                      </span>
                    </div>

                    <div className="elementor-button-wrapper" style={{ marginTop: 12 }}>
                      <a className="elementor-button elementor-button-link elementor-size-sm" href={partner.detailsHref || '#'} style={{ backgroundColor: '#4CAF50', color: '#fff', display: 'inline-block', padding: '8px 16px', borderRadius: 6 }}>
                        <span className="elementor-button-content-wrapper">
                          <span className="elementor-button-text">More Details</span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}


