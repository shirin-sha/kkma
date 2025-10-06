import { Star } from 'lucide-react';
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
                      <span>Get Involved and Maximize Your Membership Experience</span>
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
                  <div className="inner-box clearfix">
                    <div className="btn-box pull-left"><a href="/contact">Contact Now</a></div>
                    <div className="support-box pull-left">
                      <i className="flaticon-emergency-call"></i>
                      <h5>KKMA Representative</h5>
                      <p><a href="tel:96512345678">+965 123 456 78</a> (08: AM to 07:00 PM)</p>
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
      <section className="membership-accordion sec-pad">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12">
              <h2 style={{ marginBottom: 10 }}>Become Part of a Dynamic Network</h2>
              <h2 style={{ marginTop: 0 }}>Join the KKMA Community</h2>
              <div className="title-shape" style={{ margin: '20px 0' }}></div>
              <p>
                Discover the benefits of joining KKMA, a thriving community of over 14,700 members united by a common mission.
                Engage with us through volunteer service, contribute to beneficial schemes, and participate in organizational events.
                Start your membership journey by submitting an application, photographs, and a nominal fee to our branch committees
                for a two-year membership. Join us today and contribute to a greater cause!
              </p>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12">
              <div className="elementor-accordion">
                {accordionItems.map((item, index) => {
                  const isOpen = openIndex === index
                  return (
                    <div className="elementor-accordion-item" key={index}>
                      <div
                        id={`mi-tab-title-${index + 1}`}
                        className="elementor-tab-title"
                        role="button"
                        aria-controls={`mi-tab-content-${index + 1}`}
                        aria-expanded={isOpen}
                        onClick={() => toggleItem(index)}
                        style={{ cursor: 'pointer' }}
                      >
                        <span className="elementor-accordion-icon elementor-accordion-icon-left" aria-hidden="true">
                          <span className="elementor-accordion-icon-closed">
                            <svg className="e-font-icon-svg e-fas-plus" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                              <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                            </svg>
                          </span>
                          <span className="elementor-accordion-icon-opened">
                            <svg className="e-font-icon-svg e-fas-minus" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" width="14" height="14">
                              <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                            </svg>
                          </span>
                        </span>
                        <a className="elementor-accordion-title" tabIndex={0}>{item.title}</a>
                      </div>
                      <div
                        id={`mi-tab-content-${index + 1}`}
                        className="elementor-tab-content elementor-clearfix"
                        role="region"
                        aria-labelledby={`mi-tab-title-${index + 1}`}
                        style={{ display: isOpen ? 'block' : 'none' }}
                      >
                        {item.content}
                      </div>
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
              <i className="flaticon-star"></i>
              <span>Joining, Engaging, and Enhancing Community Life</span>
              <i className="flaticon-star"></i>
            </h6>
            <h2>Your Path to KKMA Membership</h2>
            <div className="title-shape"></div>
          </div>
          <div className="inner-container mr-0">
            <div className="upper-box clearfix">
              {[
                { title: 'Application Process', text: 'Steps to Apply for Membership' },
                { title: 'Membership Fee', text: 'Cost and Payment Details' },
                { title: 'Identification Card Issuance', text: 'Receiving Your KKMA ID' },
                { title: 'Volunteer Opportunities', text: 'Engage in Community Service' },
                { title: 'Member Benefits', text: 'Advantages of KKMA Membership' },
                { title: 'Membership Criteria', text: 'Qualifications for Joining' },
                { title: 'Committee Involvement', text: 'Participate in Leadership Roles' },
                { title: 'Expectations from Members', text: 'Obligations & Responsibilities' },
                { title: 'Encourage Others', text: 'Invite Friends and Family to Join' },
              ].map((item, idx) => (
                <div className="solution-block-one" key={idx}>
                  <div className="inner-box">
                    <div className="icon-box"><i className="icon flaticon-click"></i></div>
                    <h4>{item.title}</h4>
                    <p>{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="lower-box clearfix">
              <div className="bg-layer" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2021/05/bg-1-2.jpg)' }}></div>
              <div className="text pull-left">
                <div className="icon-box"><i className="icon flaticon-idea"></i></div>
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

      {/* Closing Info */}
      <section className="membership-closing sec-pad">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <h2 style={{ marginBottom: 10 }}>Easy Steps to Join Our Community</h2>
              <h2 style={{ marginTop: 0 }}>Start Your Membership with KKMA</h2>
              <div className="title-shape" style={{ margin: '20px 0' }}></div>
              <p>
                Joining KKMA is a straightforward process designed for your convenience. Simply obtain a membership form from any of our
                branch committees, attach two personal photographs and a membership <strong>fee of KD 2.500</strong> for two years. Submit your
                application to a branch office bearer, and upon approval, you will receive your KKMA Identification Card. Encourage your friends
                and relatives to take this simple step towards becoming part of our supportive and dynamic community.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* End Closing Info */}
    </div>
  )
}
















