import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header(): React.JSX.Element {
	return (
		<header className="site-header">
			<div className="topbar">
				<div className="container topbar-inner">
					<div className="contact-info">
						<a href="tel:+96550649506">+965 506 49506</a>
						<span className="divider">|</span>
						<a href="mailto:info@kkma.net">info@kkma.net</a>
					</div>
				</div>
			</div>
			<div className="nav-wrap">
				<div className="container nav-inner">
					<div className="branding">
						<NavLink to="/" className="logo">KKMA</NavLink>
					</div>
					<nav className="primary-nav">
						<NavLink to="/">Home</NavLink>
						<NavLink to="/about">About Us</NavLink>
						<NavLink to="/initiatives">Our Initiatives</NavLink>
						<NavLink to="/membership">Membership</NavLink>
						<NavLink to="/classifieds">Classifieds</NavLink>
						<NavLink to="/media">Media</NavLink>
						<NavLink to="/contact">Contact</NavLink>
					</nav>
				</div>
			</div>
		</header>
	);
} 