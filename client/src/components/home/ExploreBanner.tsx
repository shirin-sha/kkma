import React from 'react'

export default function ExploreBanner(): React.JSX.Element {
    return (
        <div className="explore-banner bg-color-1">
            <div className="auto-container">
                <div className="inner-container clearfix">
                    <div className="single-item">
                        <div className="title-box">
                            <h3>Forms &amp; Applications</h3>
                            <p>Frequently downloaded documents &amp; resources.</p>
                        </div>
                    </div>

                    <div className="single-item">
                        <div className="inner-box">
                            <figure className="icon-box"><img decoding="async" src="https://kkma.net/wp-content/uploads/2021/05/icon-1-2.png" alt="Icon Image" />
                            </figure>
                            <h4> Educational Scholarship</h4>
                            <p><a href="#">Download the form from here.</a></p>
                        </div>
                    </div>
                    <div className="single-item">
                        <div className="inner-box">
                            <figure className="icon-box"><img decoding="async" src="https://kkma.net/wp-content/uploads/2021/05/icon-2-2.png" alt="Icon Image" />
                            </figure>
                            <h4> Housing Improvement</h4>
                            <p><a href="#">Download the form from here.</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 