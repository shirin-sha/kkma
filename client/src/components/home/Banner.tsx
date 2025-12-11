import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import { Star } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/effect-fade'

export default function Banner(): React.JSX.Element {
    return (
        <section className="banner-section style-one">
            <Swiper
                modules={[Autoplay, EffectFade, Pagination]}
                effect="fade"
                loop
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="banner-carousel"
            >
                <SwiperSlide>
                    <div className="slide-item">
                        <div className="image-layer" style={{ backgroundImage: 'url(/images/herobanner/hero1.jpg)' }}></div>
                        <div className="auto-container">
                            <div className="content-box wh-anim">
                                <h6 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: 0 }}>
                                    <Star fill='white' size={16} />
                                    Building a Stronger Future Together
                                </h6>
                                <h1>Empowering the Community </h1>
                                <h1>Since 2001</h1>
                                <p>KKMA is dedicated to enhancing the lives of its members and the wider community. Discover our mission, values, and the impact we've made over the years.</p>
                                <div className="btn-box"><a href="#" className="theme-btn">Learn More</a></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="slide-item">
                        <div className="image-layer" style={{ backgroundImage: 'url(/images/herobanner/hero2.jpg)' }}></div>
                        <div className="auto-container">
                            <div className="content-box wh-anim">
                                <h6 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: 0 }}>
                                    <Star fill='white' size={16} />
                                    Your Support Fuels Our Mission
                                </h6>
                                <h1>Transforming Lives Through Social Projects</h1>
                                <p>KKMA's social projects are designed to uplift and support the community. From education to healthcare, our initiatives aim to provide essential services and opportunities to those in need.</p>
                                <div className="btn-box"><a href="#" className="theme-btn">Explore Our Projects</a></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div className="slide-item">
                        <div className="image-layer" style={{ backgroundImage: 'url(/images/herobanner/hero3.jpg)' }}></div>
                        <div className="auto-container">
                            <div className="content-box wh-anim">
                                <h6 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, padding: 0 }}>
                                    <Star fill='white' size={16} />
                                    Your Support Fuels Our Mission
                                </h6>
                                <h1>Transforming Lives Through Social Projects</h1>
                                <p>KKMA's social projects are designed to uplift and support the community. From education to healthcare, our initiatives aim to provide essential services and opportunities to those in need.</p>
                                <div className="btn-box"><a href="#" className="theme-btn">Explore Our Projects</a></div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </section>
    )
} 