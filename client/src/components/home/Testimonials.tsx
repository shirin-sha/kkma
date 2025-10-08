import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Quote } from 'lucide-react'
import 'swiper/css'

export default function Testimonials(): React.JSX.Element {
    return (
        <section className="testimonial-section centred" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2021/05/testimonial-bg-3.jpg)' }}>
            <div className="auto-container">
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                    loop
                    spaceBetween={30}
                    breakpoints={{
                        0: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        992: { slidesPerView: 3 },
                    }}
                    className="three-item-carousel"
                >
                    <SwiperSlide>
                        <div className="testimonial-block-one">
                            <div className="inner-box">
                                <figure className="image-box">
                                    <img decoding="async" width="120" height="120" src="https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview.png" className="attachment-whitehall_120x120 size-whitehall_120x120 wp-post-image" alt="" srcSet="https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview.png 120w, https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview-60x60.png 60w, https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview-70x70.png 70w" sizes="(max-width: 120px) 100vw, 120px" />
                                    <span className="quote-icon">
                                        <Quote size={20} fill="currentColor" />
                                    </span>
                                </figure>
                                <div className="text">
                                    <p>KKMA's commitment to social welfare is unmatched. Their programs address critical needs and showcase the power of collective action for the greater good.</p>
                                </div>
                                <div className="author-box">
                                    <h4>Demo Full Name</h4>
                                    <span className="designation">Director | Demo Company</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-block-one">
                            <div className="inner-box">
                                <figure className="image-box">
                                    <img decoding="async" width="120" height="120" src="https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview.png" className="attachment-whitehall_120x120 size-whitehall_120x120 wp-post-image" alt="" srcSet="https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview.png 120w, https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview-60x60.png 60w, https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview-70x70.png 70w" sizes="(max-width: 120px) 100vw, 120px" />
                                    <span className="quote-icon">
                                        <Quote size={20} fill="currentColor" />
                                    </span>
                                </figure>
                                <div className="text">
                                    <p>KKMA empowers communities through education and healthcare, making a tangible difference in the lives of many. Their efforts are both impactful and far-reaching.</p>
                                </div>
                                <div className="author-box">
                                    <h4>Demo Full Name 3</h4>
                                    <span className="designation">Secretary | Demo Organization</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="testimonial-block-one">
                            <div className="inner-box">
                                <figure className="image-box">
                                    <img decoding="async" width="120" height="120" src="https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview.png" className="attachment-whitehall_120x120 size-whitehall_120x120 wp-post-image" alt="" srcSet="https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview.png 120w, https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview-60x60.png 60w, https://kkma.net/wp-content/uploads/2021/05/Demo-Profile-removebg-preview-70x70.png 70w" sizes="(max-width: 120px) 100vw, 120px" />
                                    <span className="quote-icon">
                                        <Quote size={20} fill="currentColor" />
                                    </span>
                                </figure>
                                <div className="text">
                                    <p>KKMA is a cornerstone in our community, dedicated to uplifting lives through their educational, healthcare, and social welfare initiatives. Their impact is truly inspiring.</p>
                                </div>
                                <div className="author-box">
                                    <h4>Demo Full Name</h4>
                                    <span className="designation">Chairman | Company Name</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    )
} 