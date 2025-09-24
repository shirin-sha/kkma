import React from 'react';

export default function FooterWP(): React.JSX.Element {
	return (
		<footer className="main-footer">
			<div className="footer-top">
				<div className="auto-container">
					<div className="top-inner">
						<div className="row clearfix">
							<div className="col-lg-3 col-md-6 col-sm-12 logo-column">
								<figure className="footer-logo"><a href="/"><img src="https://kkma.net/wp-content/uploads/2024/08/KKMA-LOGO-WITH-TEXT.png" alt="Logo"/></a></figure>
							</div>
							<div className="col-lg-5 col-md-6 col-sm-12 text-column">
								<div className="text">
									<h3>Subscribe Newsletter</h3>
									<p>Get updates delivered to your inbox.</p>
								</div>
							</div>
							<div className="col-lg-4 col-md-12 col-sm-12 form-column">
								<div className="postcode-form">
									<form className="mc4wp-form">
										<div className="form-group"><input type="email" name="email" placeholder="mailid@example.com" required/></div>
										<div className="form-group"><button className="theme-btn" type="submit">Subscribe Us</button></div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="widget-section footer-top-one">
				<div className="auto-container">
					<div className="row clearfix">
						<div className="col-lg-3 col-md-6 col-sm-12 footer-column">
							<div className="footer-widget widget_nav_menu">
								<div className="widget-title"><h3>Social Projects</h3></div>
								<ul className="menu">
									<li><a href="#">Family Benefit Scheme</a></li>
									<li><a href="#">Kidney Dialysis Centre</a></li>
									<li><a href="#">Medical Assistance Program</a></li>
									<li><a href="#">Educational Scholarship</a></li>
									<li><a href="#">Hajj & Umrah Programs</a></li>
									<li><a href="#">Early Detection Center</a></li>
									<li><a href="#">Housing Improvement Program</a></li>
									<li><a href="#">Members Welfare Scheme</a></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-12 footer-column">
							<div className="footer-widget widget_nav_menu">
								<div className="widget-title"><h3>Quick Links</h3></div>
								<ul className="menu">
									<li><a href="#">About Us</a></li>
									<li><a href="#">People Behind</a></li>
									<li><a href="#">Magnet Club</a></li>
									<li><a href="#">Social Projects</a></li>
									<li><a href="#">News & Updates</a></li>
									<li><a href="#">Events & Programs</a></li>
									<li><a href="#">Membership Information</a></li>
									<li><a href="#">Downloads</a></li>
								</ul>
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-12 footer-column">
							<div className="footer-widget widget_whitehall_contact_info">
								<div className="contact-widget">
									<div className="widget-title"><h3>Contact Info</h3></div>
									<div className="widget-content">
										<ul className="info clearfix">
											<li><h5>Branches</h5><p>Abuhalifa, Ahmadi, Kuwait City, Abbasiya, Fahahaeel, Farwaniya, Fintas, Hasawi, Hawally, Jahra, Khaitan, Mahbola, Sabhan, Salmiya</p></li>
											<li><h5>General Phone</h5><p><a href="tel:96550649506">+965 506 49506</a></p></li>
											<li><h5>Email:</h5><p><a href="mailto:info@kkma.net">info@kkma.net</a></p></li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-12 footer-column">
							<div className="footer-widget widget_whitehall_register_your_complaint">
								<div className="register-widget">
									<div className="inner-box">
										<div className="upper">
											<div className="icon-box"><i className="flaticon-search"></i></div>
											<h4>Explore Our Classifieds</h4>
										</div>
										<p>Discover our classifieds for top deals and opportunities. Explore the latest listings and uncover great opportunities now!</p>
										<a href="#">Browse Classifieds</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<div className="auto-container">
					<div className="bottom-inner clearfix">
						<div className="copyright pull-left"><p>© 2025 By KKMA. All Rights Reserved.</p></div>
						<ul className="footer-nav clearfix pull-right">
							<li><a href="#" className="hvr-underline-from-left1">FAQ’s</a></li>
							<li><a href="#" className="hvr-underline-from-left1">Terms & Conditions</a></li>
							<li><a href="#" className="hvr-underline-from-left1">Privacy Policy</a></li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
} 