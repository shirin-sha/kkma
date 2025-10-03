import { Star } from 'lucide-react'
import React from 'react'

export default function About(): React.JSX.Element {
    return (
        <section className="about-section sec-pad bg-color-1">
            <div className="auto-container">
                <div className="row clearfix">
                    <div className="col-lg-6 col-md-12 col-sm-12 content-column">
                        <div className="content_block_1"><div className="content-box">
                            <div className="sec-title"><h6> <Star fill='green' size={16} /><span>A Tradition of Service and Community Empowerment</span></h6><h2>Empowering the Community, Shaping the Future</h2><div className="title-shape"></div></div>
                            <div className="text"><h5>Established in 2001, KKMA is dedicated to uplifting the Indian community in Kuwait through education, healthcare, and social initiatives. We connect members with opportunities for personal and professional growth.</h5><p>Our efforts focus on making a tangible difference, from scholarships to healthcare support, ensuring that our community thrives. Together, we build a brighter future for all.</p></div>
                            <div className="inner-box clearfix">
                                <figure className="signature pull-left"><img decoding="async" src="https://kkma.net/wp-content/uploads/2024/08/Connect-us-on-.png" alt="Signature" />
                                </figure>
                                <ul className="social-style-one clearfix">
                                    <li><a href="https://facebook.com/kkma.net" target="_blank"><i className="fab fa fa-facebook-f"></i></a></li>
                                    <li><a href="https://www.instagram.com/kkmakuwait" target="_blank"><i className="fab fa fa-instagram"></i></a></li>
                                    <li><a href="https://www.youtube.com/@kkma2002" target="_blank"><i className="fab fa fa-youtube"></i></a></li>
                                    <li><a href="https://www.tiktok.com/@kkma427?_t=ZS-8yQj1lf3lb8&#038;_r=1" target="_blank"><i className="fab fa fa-google-play"></i></a></li>
                                </ul>
                            </div>
                            <div className="lower-box"><div className="row clearfix">
                                <div className="col-lg-6 col-md-6 col-sm-12 single-column"><div className="single-item"><div className="icon-box"><i className="fa fa-users"></i></div><h5>Membership</h5><p><a href="tel:96566649544">+965 6664 9544</a></p></div></div>
                                <div className="col-lg-6 col-md-6 col-sm-12 single-column"><div className="single-item"><div className="icon-box"><i className="fa fa-hands-helping"></i></div><h5>Magnet Club</h5><p><a href="tel:96599408973">+965 9940 8973</a></p></div></div>
                            </div></div>
                        </div></div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 image-column">
                        <div className="image_block_1"><div className="image-box">
                            <figure className="image"><img src="https://kkma.net/wp-content/uploads/2024/08/KKMA-Homepage-Image-1.jpg" alt="Awesome Image" /></figure>
                            <div className="text"><h4>"Our strength lies in our unity, and our future is built on the foundation of giving back to the community."</h4></div>
                        </div></div>
                    </div>
                </div>
            </div>
        </section>
    )
} 