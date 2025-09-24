import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function HeaderWP(): React.JSX.Element {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	return (
		<>
		{/* Main Header */}
		<header className="main-header style-one">
		  {/* Header Top */}
		  <div className="header-top">
			<div className="auto-container">
			  <div className="top-inner clearfix">
				<div className="left-column pull-left clearfix">
				  <ul className="links-box clearfix"></ul>
				</div>
				<div className="right-column pull-right clearfix">
				  <ul className="info-list clearfix">
					<li>
					  <i className="flaticon-phone-with-wire"></i>
					  <a href="tel:96550649506">+965 506 49506</a>
					</li>
				  </ul>
				</div>
			  </div>
			</div>
		  </div>
  
		  {/* Header Lower */}
		  <div className="header-lower">
			<div className="auto-container">
			  <div className="outer-box clearfix">
				{/* Logo */}
				<div className="logo-box pull-left">
				  <figure className="logo">
					<NavLink to="/" title="KKMA">
					  <img
						src="https://kkma.net/wp-content/uploads/2024/08/KKMA-LOGO-WITH-TEXT-1.png"
						alt="logo"
					  />
					</NavLink>
				  </figure>
				</div>
  
				{/* Navigation */}
				<div className="menu-area clearfix pull-right">
				  {/* Mobile Nav Toggler */}
				  <div
					className="mobile-nav-toggler"
					onClick={() => setMobileMenuOpen(true)}
				  >
					<i className="icon-bar"></i>
					<i className="icon-bar"></i>
					<i className="icon-bar"></i>
				  </div>
  
				  <nav className="main-menu navbar-expand-md navbar-light">
					<div
					  className="collapse navbar-collapse show clearfix"
					  id="navbarSupportedContent"
					>
					  <ul className="navigation clearfix">
						<li className="active">
						  <NavLink to="/">Home</NavLink>
						</li>
						<li className="dropdown">
						  <a href="#">About Us</a>
						  <ul className="submenu">
															<li>
								  <NavLink to="/about/overview">
									Overview
								  </NavLink>
								</li>
							<li>
							  <NavLink to="/about/people-behind">
								People Behind
							  </NavLink>
							</li>
							<li>
							  <NavLink to="/about/kkma-history">
								KKMA History
							  </NavLink>
							</li>
						  </ul>
						</li>
						<li className="dropdown">
						  <a href="#">Our Initiatives</a>
						  <ul className="submenu">
							<li>
							  <NavLink to="/initiatives/social-projects">
								Social Projects
							  </NavLink>
							</li>
							<li>
							  <NavLink to="/initiatives/magnet-club">
								Magnet Club
							  </NavLink>
							</li>
						  </ul>
						</li>
						<li className="dropdown">
						  <a href="#">Membership</a>
						  <ul className="submenu">
							<li>
							  <NavLink to="/membership/membership-information">
								Membership Information
							  </NavLink>
							</li>
							<li>
							  <NavLink to="/membership/member-privileges">
								Member Privileges
							  </NavLink>
							</li>
							<li>
							  <a href="http://database.kkma.net">Members Area</a>
							</li>
						  </ul>
						</li>
						<li className="dropdown">
						  <a href="#">Classifieds</a>
						  <ul className="submenu">
							<li>
							  <NavLink to="/classifieds/view-classifieds">
								View Classifieds
							  </NavLink>
							</li>
							<li>
							  <NavLink to="/classifieds/view-categories">
								View Categories
							  </NavLink>
							</li>
							<li>
							  <NavLink to="/classifieds/quick-search">
								Quick Search
							  </NavLink>
							</li>
							<li>
							  <a href="https://kkma.net/add-listing/">
								Add Your Post
							  </a>
							</li>
							<li>
							  <a href="https://kkma.net/dashboard/">
								Your Dashboard
							  </a>
							</li>
						  </ul>
						</li>
						<li className="dropdown">
						  <a href="#">Media</a>
						  <ul className="submenu">
							<li>
							  <NavLink to="/media/news-and-updates">
								News & Updates
							  </NavLink>
							</li>
							<li>
							  <NavLink to="/media/events-and-programs">
								Events & Programs
							  </NavLink>
							</li>
							<li>
							  <a href="#">Downloads</a>
							</li>
							<li>
							  <a href="#">Privilege Partner Offers</a>
							</li>
						  </ul>
						</li>
						<li>
						  <NavLink to="/contact">Contact</NavLink>
						</li>
					  </ul>
					</div>
				  </nav>
  
				  {/* Right Menu Content */}
				  <div className="menu-right-content clearfix">
					<ul className="other-option clearfix">
					  <li className="nav-box">
						<div className="nav-toggler navSidebar-button">
						  <i className="fas fa-th-large"></i>
						</div>
					  </li>
					</ul>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
  
		  {/* Sticky Header */}
		  <div className="sticky-header">
			<div className="auto-container">
			  <div className="outer-box clearfix">
				<div className="logo-box pull-left">
				  <figure className="logo">
					<NavLink to="/" title="KKMA">
					  <img
						src="https://kkma.net/wp-content/uploads/2024/08/KKMA-LOGO-WITH-TEXT-1.png"
						alt="logo"
					  />
					</NavLink>
				  </figure>
				</div>
				<div className="menu-area clearfix pull-right">
				  <nav className="main-menu clearfix">{/* Filled dynamically */}</nav>
				  <div className="menu-right-content clearfix">
					<ul className="other-option clearfix">
					  <li className="nav-box">
						<div className="nav-toggler navSidebar-button">
						  <i className="fas fa-th-large"></i>
						</div>
					  </li>
					</ul>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</header>
  
		{/* Mobile Menu */}
		{mobileMenuOpen && (
		  <div className="mobile-menu active">
			<div
			  className="menu-backdrop"
			  onClick={() => setMobileMenuOpen(false)}
			></div>
			<div className="close-btn" onClick={() => setMobileMenuOpen(false)}>
			  <i className="fas fa-times"></i>
			</div>
  
			<nav className="menu-box">
			  <div className="nav-logo">
				<NavLink to="/" title="KKMA">
				  <img
					src="https://kkma.net/wp-content/uploads/2024/08/KKMA-LOGO-WITH-TEXT-1.png"
					alt="logo"
				  />
				</NavLink>
			  </div>
			  <div className="menu-outer">{/* Same menu links go here */}</div>
  
			  <div className="contact-info">
				<h4>Contact Info</h4>
				<ul>
				  <li>
					<a href="tel:96550649506">+965 506 49506</a>
				  </li>
				  <li>
					<a href="mailto:info@kkma.net">info@kkma.net</a>
				  </li>
				</ul>
			  </div>
			  <div className="social-links"></div>
			</nav>
		  </div>
		)}
	  </>
	);
} 