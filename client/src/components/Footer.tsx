import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer(): React.JSX.Element {
	return (
		<footer className="site-footer">
			<div className="container footer-grid">
				<div>
					<h4>Social Projects</h4>
					<ul>
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
				<div>
					<h4>Quick Links</h4>
					<ul>
						<li><NavLink to="/about">About Us</NavLink></li>
						<li><NavLink to="/initiatives">Social Projects</NavLink></li>
						<li><NavLink to="/membership">Membership Information</NavLink></li>
						<li><NavLink to="/media">News & Updates</NavLink></li>
						<li><NavLink to="/media">Events & Programs</NavLink></li>
						<li><NavLink to="/media">Downloads</NavLink></li>
					</ul>
				</div>
				<div>
					<h4>Contact Info</h4>
					<p>Branches: Abuhalifa, Ahmadi, Kuwait City, Abbasiya, Fahahaeel, Farwaniya, Fintas, Hasawi, Hawally, Jahra, Khaitan, Mahbola, Sabhan, Salmiya</p>
					<p>Phone: <a href="tel:+96550649506">+965 506 49506</a></p>
					<p>Email: <a href="mailto:info@kkma.net">info@kkma.net</a></p>
				</div>
			</div>
			<div className="container footer-bottom">
				<p>© 2025 By KKMA. All Rights Reserved.</p>
				<nav className="footer-legal">
					<a href="#">FAQ’s</a>
					<a href="#">Terms & Conditions</a>
					<a href="#">Privacy Policy</a>
				</nav>
			</div>
		</footer>
	);
} 