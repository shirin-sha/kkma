import { Star, Mail } from 'lucide-react'
import React, { useState } from 'react'

export default function Schedules(): React.JSX.Element {
    const [activeTab, setActiveTab] = useState("tab-1")
    return (
        <section className="schedules-section sec-pad bg-color-1">
            {/* Background Image */}
            <div
                className="bg-layer"
                style={{
                    backgroundImage:
                        "url(/images/home/2021/06/schedule-bg-2.jpg)",
                }}
            ></div>

            <div className="auto-container">
                {/* Title Section */}
                <div className="title-inner">
                    <div className="row clearfix">
                        <div className="col-lg-6 col-md-6 col-sm-12 title-column">
                            <div className="sec-title light">
                                <h6>
                                    <Star fill='currentColor' size={14} />
                                    <span>Our Calendars</span>
                                </h6>
                                <h2>Our Schedules &amp; Routines</h2>
                                <div className="title-shape"></div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12 text-column">
                            <div className="text">
                                <p>
                                    Whether you're looking to connect, learn, or contribute,
                                    there's an event for everyone. Stay updated and be a part of
                                    our vibrant community life.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Section */}
                <div className="schedule-tab">
                    <div className="tab-btn-box">
                        <ul className="tab-btns schedule-tab-btns clearfix">
                            <li
                                className={`p-tab-btn ${activeTab === "tab-1" ? "active-btn" : ""}`}
                                onClick={() => setActiveTab("tab-1")}
                            >
                                Upcoming Events
                            </li>
                            <li
                                className={`p-tab-btn ${activeTab === "tab-2" ? "active-btn" : ""}`}
                                onClick={() => setActiveTab("tab-2")}
                            >
                                Upcoming Meetings
                            </li>
                            <li
                                className={`p-tab-btn ${activeTab === "tab-3" ? "active-btn" : ""}`}
                                onClick={() => setActiveTab("tab-3")}
                            >
                                Featured Events
                            </li>
                        </ul>
                    </div>

                    <div className="inner-content">
                        <div className="row clearfix">
                            {/* Subscribe Column */}
                            <div className="col-lg-4 col-md-12 col-sm-12 form-column">
                                <div className="subscribe-inner centred">
                                    <div
                                        className="upper-box"
                                        style={{
                                            backgroundImage:
                                                "url(/images/home/KKMA-Events-Homepage.jpg)",
                                        }}
                                    >
                                        <div className="icon-box">
                                            <Mail size={48} strokeWidth={1.5} />
                                        </div>
                                        <h3>Subscribe Us</h3>
                                        <p>Get latest News &amp; Events Details.</p>
                                    </div>

                                    <div className="lower-box">
                                        {/* Replace Mailchimp with your own handler */}
                                        <form className="subscribe-form">
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder="mailid@example.com"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="theme-btn">
                                                    Subscribe Us
                                                </button>
                                            </div>
                                        </form>
                                        <div className="text">
                                            <h6>We will not share your email with others.</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Tabs Content Column */}
                            <div className="col-lg-8 col-md-12 col-sm-12 inner-column">
                                <div className="p-tabs-content">
                                    <div
                                        className={`p-tab ${activeTab === "tab-1" ? "active-tab" : ""}`}
                                        id="tab-1"
                                    >
                                        <div className="no-find__events d-flex align-items-center justify-content-center">
                                            <h4>There is no events or events expires</h4>
                                        </div>
                                    </div>

                                    <div
                                        className={`p-tab ${activeTab === "tab-2" ? "active-tab" : ""}`}
                                        id="tab-2"
                                    >
                                        <div className="no-find__events d-flex align-items-center justify-content-center">
                                            <h4>There is no events or events expires</h4>
                                        </div>
                                    </div>

                                    <div
                                        className={`p-tab ${activeTab === "tab-3" ? "active-tab" : ""}`}
                                        id="tab-3"
                                    >
                                        <div className="no-find__events d-flex align-items-center justify-content-center">
                                            <h4>There is no events or events expires</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* End Tabs Content */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
} 