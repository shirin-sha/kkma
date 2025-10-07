import React from 'react'

export default function Activities(): React.JSX.Element {
    return (
        <section className="activities-section centred bg-color-1">
            <div className="auto-container">
                <div className="inner-container">
                    <div className="row clearfix">
                        <div className="col-lg-3 col-md-6 col-sm-12 single-column"><div className="single-item"><div className="icon-box"><i className="fas fa-users"></i></div><h6>Building Strong Bonds</h6><h4>Community Support</h4></div></div>
                        <div className="col-lg-3 col-md-6 col-sm-12 single-column"><div className="single-item"><div className="icon-box"><i className="fa fa-hand-holding-heart"></i></div><h6>Helping in Times of Need</h6><h4>Social Welfare</h4></div></div>
                        <div className="col-lg-3 col-md-6 col-sm-12 single-column"><div className="single-item"><div className="icon-box"><i className="fa fa-hands-helping"></i></div><h6>Difference Through Service</h6><h4>Volunteer Programs</h4></div></div>
                        <div className="col-lg-3 col-md-6 col-sm-12 single-column"><div className="single-item"><div className="icon-box"><i className="fa fa-mosque"></i></div><h6>Fostering Spiritual Growth</h6><h4>Religious Guidance</h4></div></div>
                    </div>
                </div>
            </div>
        </section>
    )
} 