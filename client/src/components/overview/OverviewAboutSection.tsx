import { Star, Check, ArrowRight } from 'lucide-react';
import React from 'react';

export default function OverviewAboutSection(): React.JSX.Element {
	return (
		<section className="about-style-three">
			<div className="auto-container">
				<div className="row clearfix align-items-center">
					{/* Left Content */}
					<div className="col-lg-4 col-md-12 col-sm-12 content-column">
						<div className="content_block_5">
							<div className="content-box">
								<div className="sec-title" style={{ textAlign: 'left', marginBottom: '30px' }}>
									<h6 style={{ fontSize: '16px', fontWeight: '600', color: '#83b253', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
										<Star fill='currentColor' size={14} />
										<span>About KKMA</span>
									</h6>
									<h2 style={{ fontSize: '39px', fontWeight: '700', color: '#1a1a1a', marginBottom: '20px', lineHeight: '1.2' }}>Building a Stronger Community</h2>
									<div className="title-shape"></div>
								</div>
								<div className="text">
									<h4>Established in 2001</h4>
									<p>
										KKMA is a vibrant organization dedicated to empowering the
										Indian muslim community in Kuwait through social,
										educational, and welfare initiatives, fostering unity, and
										promoting growth for all members.
									</p>

									<ul className="list clearfix">
										<li>
											<Check size={16} className="inline mr-2" />Family Support Programs
										</li>
										<li>
											<Check size={16} className="inline mr-2" />Educational Scholarships
										</li>
										<li>
											<Check size={16} className="inline mr-2" />Medical Assistance
										</li>
										<li>
											<Check size={16} className="inline mr-2" />Social Projects
										</li>
										<li>
											<Check size={16} className="inline mr-2" />Community Welfare
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					{/* Middle Image */}
					<div className="col-lg-4 col-md-6 col-sm-12 image-column">
						<figure className="image-box">
							<img
								src="https://kkma.net/wp-content/uploads/2024/08/KKMA-About-Us-1.jpg"
								alt="About KKMA"
							/>
						</figure>
					</div>

					{/* Right Features */}
					<div className="col-lg-4 col-md-6 col-sm-12 inner-column">
						{/* Visionaries */}
						<div className="feature-block-one">
							<div className="inner-box">
								<figure className="image">
									<img
										src="https://kkma.net/wp-content/uploads/2024/08/KKMA-Our-executive-Members.jpg"
										alt="Meet Our Visionaries"
									/>
								</figure>
								<div className="text">
									<h4>Meet Our Visionaries</h4>
									<a href="#">
										<ArrowRight size={16} />
									</a>
								</div>
								<div className="overlay-content">
									<h4>Meet Our Visionaries</h4>
									<p>
										Discover the leaders and dedicated committee members driving
											our mission forward. Learn more about the people who make
											our organization thrive.
									</p>
								</div>
							</div>
						</div>

						{/* Journey */}
						<div className="feature-block-one">
							<div className="inner-box">
								<figure className="image">
									<img
										src="https://kkma.net/wp-content/uploads/2024/08/KKMA-History.jpg"
										alt="Explore Our Journey"
									/>
								</figure>
								<div className="text">
									<h4>Explore Our Journey</h4>
									<a href="#">
										<ArrowRight size={16} />
									</a>
								</div>
								<div className="overlay-content">
									<h4>Explore Our Journey</h4>
									<p>
										Uncover the rich history and milestones of our organization.
										Dive into the story of how we evolved and achieved our goals
										over the years.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
} 