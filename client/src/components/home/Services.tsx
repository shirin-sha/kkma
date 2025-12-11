import { Star, Home, Activity, HeartPulse, GraduationCap, Shield, Users, TrendingUp, HandHeart, BookOpen, Plane, Hospital, Target } from 'lucide-react'
import React from 'react'

export default function Services(): React.JSX.Element {
    const services = [
        { title: 'Housing Improvement', icon: Home },
        { title: 'Early Detection Center', icon: Activity },
        { title: 'Medical Assistance Program', icon: HeartPulse },
        { title: 'Educational Scholarship', icon: GraduationCap },
        { title: 'Members Welfare Scheme', icon: Shield },
        { title: 'Family Benefit Scheme', icon: Users },
        { title: 'KKMA Investment Club', icon: TrendingUp },
        { title: 'Community Welfare Activities', icon: HandHeart },
        { title: 'Seminars & Religious Classes', icon: BookOpen },
        { title: 'Hajj & Umrah Programs', icon: Plane },
        { title: 'Kidney Dialysis Centre', icon: Hospital },
        { title: 'Campaigns, Training & Development', icon: Target }
    ]

    return (
        <section className="service-section" style={{ backgroundImage: 'url(/images/home/2021/05/service-bg-4.jpg)' }}>
               <div className="sec-title centred">
               <h6><Star fill='currentColor' size={16} /><span>Wide Range of Support Programs for You and Your Family</span><Star fill='currentColor' size={16} /></h6>
               <h2>Comprehensive Membership Benefits</h2>
                    <div className="title-shape"></div>
                </div>
            <div className="auto-container">
                <div className="row clearfix">
                    {services.map(({ title, icon: Icon }) => (
                        <div key={title} className="col-lg-3 col-md-6 col-sm-12 service-block"><div className="service-block-one"><div className="inner-box"><h4><a href="#">{title}</a></h4><div className="btn-box"><a href="#">More</a></div><div className="icon-box"><Icon size={48} strokeWidth={1.5} /></div></div></div></div>
                    ))}
                </div>
            </div>
        </section>
    )
} 