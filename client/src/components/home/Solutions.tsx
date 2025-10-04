import { Star } from 'lucide-react';
import React from 'react'

type Solution = { icon: string; title: string; desc: string }

const solutions: Solution[] = [
    { icon: "fa fa-search-plus", title: "Established Legacy", desc: "Over two decades of service." },
    { icon: "fa fa-map-marker-check", title: "Strong Community", desc: "Extensive Network in Kuwait." },
    { icon: "fa fa-not-equal", title: "Non-Profit Initiatives", desc: "Focused on social good." },
    { icon: "fa fa-badge-check", title: "Trusted Leadership", desc: "Guided by experienced leaders." },
    { icon: "fa fa-users-medical", title: "Collaborative Efforts", desc: "Partnerships for greater impact." },
    { icon: "fa fa-tasks", title: "Diverse Programs", desc: "Catering to various needs." },
    { icon: "fa fa-award", title: "Volunteer Opportunities", desc: "Engage and contribute." },
    { icon: "fa fa-hands-helping", title: "Member-Centric Approach", desc: "Prioritizing member welfare." },
    { icon: "fa fa-rocket", title: "Progressive Vision", desc: "Adapting to modern challenges." },
]

export default function Solutions(): React.JSX.Element {
    return (
        <section className="solutions-section">
            {/* Background & Patterns */}
            <figure className="image-layer">
                <img
                    src="https://kkma.net/wp-content/uploads/2024/08/KKMA-Kuwait-Tower.jpg"
                    alt="Awesome Image"
                />
            </figure>

            <div className="pattern-box">
                <div
                    className="pattern-1"
                    style={{
                        backgroundImage:
                            "url(https://kkma.net/wp-content/themes/whitehall/assets/images/shape/shape-2.png)",
                    }}
                ></div>
                <div
                    className="pattern-2"
                    style={{
                        backgroundImage:
                            "url(https://kkma.net/wp-content/themes/whitehall/assets/images/shape/shape-3.png)",
                    }}
                ></div>
                <div
                    className="pattern-3"
                    style={{
                        backgroundImage:
                            "url(https://kkma.net/wp-content/themes/whitehall/assets/images/shape/shape-3.png)",
                    }}
                ></div>
                <div
                    className="pattern-4 float-bob-y"
                    style={{
                        backgroundImage:
                            "url(https://kkma.net/wp-content/uploads/2021/05/shape-4-2.png)",
                    }}
                ></div>
            </div>

            <div className="auto-container">
                {/* Section Title */}
                <div className="sec-title centred">
                    <h6>
                        <Star fill='currentColor' size={14} />
                        <span>
                            Dedicated to Community Growth, Support, and Collective Success
                        </span>
                        <Star fill='currentColor' size={14} />
                    </h6>
                    <h2>Empowering Our Community: A Legacy of Service</h2>
                    <div className="title-shape"></div>
                </div>

                <div className="inner-container">
                    {/* Solutions Grid */}
                    <div className="upper-box clearfix">
                        {solutions.map((item, index) => (
                            <div className="solution-block-one" key={index}>
                                <div className="inner-box">
                                    <div className="icon-box">
                                        <i className={item.icon}></i>
                                    </div>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* CTA lower box */}
                    <div className="lower-box clearfix">
                        <div
                            className="bg-layer"
                            style={{
                                backgroundImage:
                                    "url(https://kkma.net/wp-content/uploads/2021/05/bg-1-2.jpg)",
                            }}
                        ></div>
                        <div className="text pull-left">
                            <div className="icon-box">
                                <i className="icon flaticon-idea"></i>
                            </div>
                            <h3>Transform Lives and Strengthen Our Community Together</h3>
                            <p>
                                Step forward and be part of meaningful change. Together, we can
                                create a brighter future for all.
                            </p>
                        </div>

                        <div className="btn-box pull-right">
                            <a href="#" className="theme-btn">
                                Get Involved Today
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 