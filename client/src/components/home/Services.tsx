import React from 'react'

export default function Services(): React.JSX.Element {
    return (
        <section className="service-section" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2021/05/service-bg-4.jpg)' }}>
            <div className="auto-container">
                <div className="row clearfix"><div className="col-lg-6 col-md-6 col-sm-12 m-auto title-column"><div className="sec-title centred"><h6><i className="flaticon-star"></i><span>Wide Range of Support Programs for You and Your Family</span><i className="flaticon-star"></i></h6><h2>Comprehensive Membership Benefits</h2><div className="title-shape"></div></div></div></div>
                <div className="row clearfix">
                    {['Housing Improvement', 'Early Detection Center', 'Medical Assistance Program', 'Educational Scholarship', 'Members Welfare Scheme', 'Family Benefit Scheme', 'KKMA Investment Club', 'Community Welfare Activities', 'Seminars & Religious Classes', 'Hajj & Umrah Programs', 'Kidney Dialysis Centre', 'Campaigns, Training & Development'].map((title) => (
                        <div key={title} className="col-lg-3 col-md-6 col-sm-12 service-block"><div className="service-block-one"><div className="inner-box"><h4><a href="#">{title}</a></h4><div className="btn-box"><a href="#">More</a></div><div className="icon-box"><i className="fa fa-check"></i></div></div></div></div>
                    ))}
                </div>
            </div>
        </section>
    )
} 