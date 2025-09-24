import React from 'react'

type Member = {
    img: string
    name: string
    role: string
    email: string
    phone: string
    social: { facebook?: string; instagram?: string; linkedin?: string }
}

export default function Team({ members }: { members: Member[] }): React.JSX.Element {
    return (
        <section
      className="team-section sec-pad bg-color-1"
      style={{
        position: "relative",
      }}
    >
      {/* Background shape */}
      <div
        className="pattern-layer"
        style={{
          backgroundImage:
            "url(https://kkma.net/wp-content/uploads/2021/05/shape-5-2.png)",
        }}
      ></div>

      <div className="auto-container">
        {/* Section title */}
        <div className="sec-title">
          <h6>
            <i className="flaticon-star"></i>
            <span>Guiding Lights Behind Our Vision</span>
          </h6>
          <h2>Meet Our Leadership</h2>
          <div className="title-shape"></div>
          <a href="https://kkma.net/our-team/" className="theme-btn">
            All members
          </a>
        </div>

        {/* Team Members */}
        <div className="row clearfix">
          {members.map((member, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-6 col-sm-12 team-block"
            >
              <div className="team-block-one wow fadeInUp">
                <div className="inner-box">
                  <figure className="image-box">
                    <img src={member.img} alt={member.name} width="270" height="270" />
                  </figure>
                  <div className="lower-content">
                    <div className="author-box">
                      <h4>{member.name}</h4>
                      <span className="designation">{member.role}</span>
                    </div>
                    <ul className="othre-info clearfix">
                      <li className="mail-box">
                        <a href={`mailto:${member.email}`}>
                          <i className="flaticon-mail-inbox-app"></i>Email
                        </a>
                      </li>
                      <li className="phone-box">
                        <i className="flaticon-emergency-call"></i>
                        <a href={`tel:${member.phone}`}>{member.phone}</a>
                      </li>
                      <li className="share-option">
                        <i className="share-icon flaticon-share"></i>
                        <ul className="share-links clearfix">
                          {member.social.facebook && (
                            <li>
                              <a
                                href={member.social.facebook}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  backgroundColor: "rgb(59, 89, 152)",
                                  color: "#fff",
                                }}
                              >
                                <i className="fab fa-facebook"></i>
                              </a>
                            </li>
                          )}
                          {member.social.instagram && (
                            <li>
                              <a
                                href={member.social.instagram}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fab fa-instagram"></i>
                              </a>
                            </li>
                          )}
                          {member.social.linkedin && (
                            <li>
                              <a
                                href={member.social.linkedin}
                                target="_blank"
                                rel="noreferrer"
                              >
                                <i className="fab fa-linkedin"></i>
                              </a>
                            </li>
                          )}
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    )
} 