import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { isUserAuthenticated, getUserData, logout } from '../utils/userAuth';

export default function HeaderWP(): React.JSX.Element {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [userName, setUserName] = useState('');
	const navigate = useNavigate();
	const [enquiryForm, setEnquiryForm] = useState({
		name: '',
		email: '',
		contactNumber: '',
		text: ''
	});

	useEffect(() => {
		setIsAuthenticated(isUserAuthenticated());
		const userData = getUserData();
		if (userData) {
			setUserName(userData.name);
		}
	}, []);

	const handleAddPost = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!isAuthenticated) {
			alert('Please login to add a post');
			navigate('/user');
		} else {
			navigate('/classifieds/add-post');
		}
	};

	const handleDashboard = (e: React.MouseEvent) => {
		e.preventDefault();
		if (!isAuthenticated) {
			alert('Please login to access your dashboard');
			navigate('/user');
		} else {
			navigate('/user/dashboard');
		}
	};

	const handleEnquirySubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Enquiry submitted:', enquiryForm);
		alert('Thank you for your enquiry! We will contact you soon.');
		setEnquiryForm({ name: '', email: '', contactNumber: '', text: '' });
		setSidebarOpen(false);
	};

	return (
		<>
		{/* Mobile Responsive Styles */}
		<style>
		  {`
			@media (max-width: 991px) {
			  .header-lower .outer-box {
				display: flex !important;
				align-items: center !important;
				justify-content: space-between !important;
				padding: 15px 0 !important;
			  }
			  
			  .header-lower .logo-box {
				float: none !important;
				flex-shrink: 0;
			  }
			  
			  .header-lower .logo-box .logo {
				margin: 0 !important;
			  }
			  
			  .header-lower .logo-box img {
				max-height: 50px !important;
				width: auto !important;
			  }
			  
			  .header-lower .menu-area {
				float: none !important;
				display: flex !important;
				align-items: center !important;
			  }
			  
			  .header-lower .main-menu {
				display: none !important;
			  }
			  
			  .header-lower .mobile-nav-toggler {
				display: flex !important;
				flex-direction: column;
				gap: 4px;
				cursor: pointer;
			  }
			}
			
			@media (min-width: 992px) {
			  .header-lower .mobile-nav-toggler {
				display: none !important;
			  }
			}
		  `}
		</style>
		
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
					<a href="/" title="KKMA">
					  <img
						src="https://kkma.net/wp-content/uploads/2024/08/KKMA-LOGO-WITH-TEXT-1.png"
						alt="logo"
					  />
					</a>
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
						  <a href="/">Home</a>
						</li>
						<li className="dropdown">
						  <a href="#">About Us +</a>
						  <ul className="submenu">
															<li>
								  <NavLink to="/about/overview">
									Overview
								  </NavLink>
								</li>
							<li>
							  <a href="/about/people-behind">
								People Behind
							  </a>
							</li>
							<li>
							  <a href="/about/kkma-history">
								KKMA History
							  </a>
							</li>
						  </ul>
						</li>
						<li className="dropdown">
						  <a href="#">Our Initiatives +</a>
						  <ul className="submenu">
							<li>
							  <a href="/initiatives/social-projects">
								Social Projects
							  </a>
							</li>
							<li>
							  <a href="/initiatives/magnet-club">
								Magnet Club
							  </a>
							</li>
						  </ul>
						</li>
						<li className="dropdown">
						  <a href="#">Membership +</a>
						  <ul className="submenu">
							<li>
							  <a href="/membership/membership-information">
								Membership Information
							  </a>
							</li>
							<li>
							  <a href="/membership/member-privileges">
								Member Privileges
							  </a>
							</li>
							<li>
							  <a href="http://database.kkma.net">Members Area</a>
							</li>
						  </ul>
						</li>
						<li className="dropdown">
						  <a href="#">Classifieds +</a>
						  <ul className="submenu">
							<li>
							  <NavLink to="/classifieds/view-classifieds">
								View Classifieds
							  </NavLink>
							</li>
							
							<li>
							  <a href="#" onClick={handleAddPost}>
								Add Your Post
							  </a>
							</li>
							<li>
							  <a href="#" onClick={handleDashboard}>
								{isAuthenticated ? `Dashboard (${userName})` : 'Your Dashboard'}
							  </a>
							</li>
						  </ul>
						</li>
						<li className="dropdown">
						  <a href="#">Media +</a>
						  <ul className="submenu">
							<li>
							  <a href="/media/news-and-updates">
								News & Updates
							  </a>
							</li>
							<li>
							  <a href="/media/events-and-programs">
								Events & Programs
							  </a>
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
						  <a href="/contact/">Contact</a>
						</li>
					  </ul>
					</div>
				  </nav>
  
				  {/* Right Menu Content */}
				  <div className="menu-right-content clearfix">
					<ul className="other-option clearfix">
					  <li className="nav-box">
						<div className="nav-toggler navSidebar-button" onClick={() => setSidebarOpen(true)} style={{ cursor: 'pointer' }}>
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
					<a href="https://kkma.net/" title="KKMA">
					  <img
						src="https://kkma.net/wp-content/uploads/2024/08/KKMA-LOGO-WITH-TEXT-1.png"
						alt="logo"
					  />
					</a>
				  </figure>
				</div>
				<div className="menu-area clearfix pull-right">
				  <nav className="main-menu clearfix">{/* Filled dynamically */}</nav>
				  <div className="menu-right-content clearfix">
					<ul className="other-option clearfix">
					  <li className="nav-box">
						<div className="nav-toggler navSidebar-button" onClick={() => setSidebarOpen(true)} style={{ cursor: 'pointer' }}>
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

		{/* Mobile Menu Drawer */}
		{mobileMenuOpen && (
		  <div 
			style={{
			  position: 'fixed',
			  top: 0,
			  left: 0,
			  width: '100%',
			  height: '100%',
			  zIndex: 9999,
			}}
		  >
			{/* Backdrop */}
			<div
			  style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				background: 'rgba(0, 0, 0, 0.5)',
				cursor: 'pointer',
			  }}
			  onClick={() => setMobileMenuOpen(false)}
			></div>

			{/* Menu Box */}
			<div 
			  style={{
				position: 'absolute',
				top: 0,
				right: 0,
				width: '280px',
				maxWidth: '85%',
				height: '100%',
				background: '#fff',
				boxShadow: '-2px 0 10px rgba(0,0,0,0.1)',
				overflowY: 'auto',
				zIndex: 10000,
				animation: 'slideInRight 0.3s ease-out',
			  }}
			>
			  {/* Close Button */}
			  <div 
				style={{
				  position: 'absolute',
				  top: '15px',
				  right: '15px',
				  width: '35px',
				  height: '35px',
				  display: 'flex',
				  alignItems: 'center',
				  justifyContent: 'center',
				  cursor: 'pointer',
				  background: '#f3f4f6',
				  borderRadius: '50%',
				  fontSize: '18px',
				  color: '#333',
				}}
				onClick={() => setMobileMenuOpen(false)}
			  >
			  <i className="fas fa-times"></i>
			</div>
			
			  {/* Logo */}
			  <div style={{ padding: '30px 20px 20px', borderBottom: '1px solid #e5e7eb' }}>
				<a href="/" title="KKMA">
				  <img
					src="https://kkma.net/wp-content/uploads/2024/08/KKMA-LOGO-WITH-TEXT-1.png"
					alt="logo"
					style={{ width: '150px', display: 'block' }}
				  />
				</a>
			  </div>

			  {/* Menu Items */}
			  <div style={{ padding: '20px 0' }}>
				<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
				  <li style={{ borderBottom: '1px solid #e5e7eb' }}>
					<a 
					  href="/" 
					  style={{ 
						display: 'block', 
						padding: '15px 20px', 
						color: '#333', 
						textDecoration: 'none',
						fontSize: '15px',
						fontWeight: '500',
					  }}
					>
					  Home
					</a>
				  </li>
				  
				  <li style={{ borderBottom: '1px solid #e5e7eb' }}>
					<details style={{ cursor: 'pointer' }}>
					  <summary style={{ 
						display: 'block', 
						padding: '15px 20px', 
						color: '#333',
						fontSize: '15px',
						fontWeight: '500',
					  }}>
						About Us
					  </summary>
					  <ul style={{ listStyle: 'none', padding: 0, margin: 0, background: '#f9fafb' }}>
						<li>
						  <NavLink 
							to="/about/overview" 
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={() => setMobileMenuOpen(false)}
						  >
							Overview
						  </NavLink>
						</li>
						<li>
						  <a 
							href="/about/people-behind"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={() => setMobileMenuOpen(false)}
						  >
							People Behind
						  </a>
						</li>
						<li>
						  <a 
							href="/about/kkma-history"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={() => setMobileMenuOpen(false)}
						  >
							KKMA History
						  </a>
						</li>
					  </ul>
					</details>
				  </li>

				  <li style={{ borderBottom: '1px solid #e5e7eb' }}>
					<details style={{ cursor: 'pointer' }}>
					  <summary style={{ 
						display: 'block', 
						padding: '15px 20px', 
						color: '#333',
						fontSize: '15px',
						fontWeight: '500',
					  }}>
						Our Initiatives
					  </summary>
					  <ul style={{ listStyle: 'none', padding: 0, margin: 0, background: '#f9fafb' }}>
						<li>
						  <a 
							href="/initiatives/social-projects"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={() => setMobileMenuOpen(false)}
						  >
							Social Projects
						  </a>
						</li>
						<li>
						  <a 
							href="/initiatives/magnet-club"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={() => setMobileMenuOpen(false)}
						  >
							Magnet Club
						  </a>
						</li>
					  </ul>
					</details>
				  </li>

				  <li style={{ borderBottom: '1px solid #e5e7eb' }}>
					<details style={{ cursor: 'pointer' }}>
					  <summary style={{ 
						display: 'block', 
						padding: '15px 20px', 
						color: '#333',
						fontSize: '15px',
						fontWeight: '500',
					  }}>
						Membership
					  </summary>
					  <ul style={{ listStyle: 'none', padding: 0, margin: 0, background: '#f9fafb' }}>
						<li>
						  <a 
							href="/membership/membership-information"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={() => setMobileMenuOpen(false)}
						  >
							Membership Information
						  </a>
						</li>
						<li>
						  <a 
							href="/membership/member-privileges"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={() => setMobileMenuOpen(false)}
						  >
							Member Privileges
						  </a>
						</li>
						<li>
						  <a 
							href="http://database.kkma.net"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
						  >
							Members Area
						  </a>
						</li>
					  </ul>
					</details>
				  </li>

				  <li style={{ borderBottom: '1px solid #e5e7eb' }}>
					<details style={{ cursor: 'pointer' }}>
					  <summary style={{ 
						display: 'block', 
						padding: '15px 20px', 
						color: '#333',
						fontSize: '15px',
						fontWeight: '500',
					  }}>
						Classifieds
					  </summary>
					  <ul style={{ listStyle: 'none', padding: 0, margin: 0, background: '#f9fafb' }}>
						<li>
						  <NavLink 
							to="/classifieds/view-classifieds"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={() => setMobileMenuOpen(false)}
						  >
							View Classifieds
						  </NavLink>
						</li>
						<li>
						  <a 
							href="#"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={(e) => {
							  handleAddPost(e);
							  setMobileMenuOpen(false);
							}}
						  >
							Add Your Post
						  </a>
						</li>
						<li>
						  <a 
							href="#"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={(e) => {
							  handleDashboard(e);
							  setMobileMenuOpen(false);
							}}
						  >
							{isAuthenticated ? `Dashboard (${userName})` : 'Your Dashboard'}
						  </a>
						</li>
					  </ul>
					</details>
				  </li>

				  <li style={{ borderBottom: '1px solid #e5e7eb' }}>
					<details style={{ cursor: 'pointer' }}>
					  <summary style={{ 
						display: 'block', 
						padding: '15px 20px', 
						color: '#333',
						fontSize: '15px',
						fontWeight: '500',
					  }}>
						Media
					  </summary>
					  <ul style={{ listStyle: 'none', padding: 0, margin: 0, background: '#f9fafb' }}>
						<li>
						  <a 
							href="/media/news-and-updates"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={() => setMobileMenuOpen(false)}
						  >
							News & Updates
						  </a>
						</li>
						<li>
						  <a 
							href="/media/events-and-programs"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
							onClick={() => setMobileMenuOpen(false)}
						  >
							Events & Programs
						  </a>
						</li>
						<li>
						  <a 
							href="#"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
						  >
							Downloads
						  </a>
						</li>
						<li>
						  <a 
							href="#"
							style={{ 
							  display: 'block', 
							  padding: '12px 20px 12px 35px', 
							  color: '#666', 
							  textDecoration: 'none',
							  fontSize: '14px',
							}}
						  >
							Privilege Partner Offers
						  </a>
						</li>
					  </ul>
					</details>
				  </li>

				  <li style={{ borderBottom: '1px solid #e5e7eb' }}>
					<a 
					  href="/contact/" 
					  style={{ 
						display: 'block', 
						padding: '15px 20px', 
						color: '#333', 
						textDecoration: 'none',
						fontSize: '15px',
						fontWeight: '500',
					  }}
					  onClick={() => setMobileMenuOpen(false)}
					>
					  Contact
					</a>
				  </li>
				</ul>
			  </div>

			  {/* Contact Info */}
			  <div style={{ padding: '20px', borderTop: '1px solid #e5e7eb', background: '#f9fafb' }}>
				<h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '15px', color: '#333' }}>
				  Contact Info
				</h4>
				<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
				  <li style={{ marginBottom: '10px' }}>
					<a 
					  href="tel:96550649506"
					  style={{ 
						color: '#83B253', 
						textDecoration: 'none',
						fontSize: '14px',
					  }}
					>
					  <i className="fas fa-phone" style={{ marginRight: '8px' }}></i>
					  +965 506 49506
					</a>
				  </li>
				  <li>
					<a 
					  href="mailto:info@kkma.net"
					  style={{ 
						color: '#83B253', 
						textDecoration: 'none',
						fontSize: '14px',
					  }}
					>
					  <i className="fas fa-envelope" style={{ marginRight: '8px' }}></i>
					  info@kkma.net
					</a>
				  </li>
				</ul>
			  </div>
			</div>
		  </div>
		)}

		{/* Sidebar Drawer with Quick Enquiry Form */}
		{sidebarOpen && (
		  <div 
			style={{
			  position: 'fixed',
			  top: 0,
			  left: 0,
			  width: '100%',
			  height: '100%',
			  zIndex: 9999,
			}}
		  >
			{/* Backdrop */}
			<div
			  style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				background: 'rgba(0, 0, 0, 0.5)',
				cursor: 'pointer',
			  }}
			  onClick={() => setSidebarOpen(false)}
			></div>

			{/* Sidebar Box */}
			<div 
			  style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '340px',
				maxWidth: '90%',
				height: '100%',
				background: '#2c3e50',
				boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
				overflowY: 'auto',
				zIndex: 10000,
				animation: 'slideInLeft 0.3s ease-out',
			  }}
			>
			  {/* Close Button */}
			  <div 
				style={{
				  position: 'absolute',
				  top: '15px',
				  right: '15px',
				  width: '35px',
				  height: '35px',
				  display: 'flex',
				  alignItems: 'center',
				  justifyContent: 'center',
				  cursor: 'pointer',
				  background: 'rgba(255, 255, 255, 0.1)',
				  borderRadius: '4px',
				  fontSize: '20px',
				  color: '#fff',
				  transition: 'all 0.3s ease',
				}}
				onClick={() => setSidebarOpen(false)}
				onMouseEnter={(e) => {
				  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
				}}
				onMouseLeave={(e) => {
				  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
				}}
			  >
				<i className="fas fa-times"></i>
			  </div>

			  {/* Logo */}
			  <div style={{ padding: '40px 25px 30px', textAlign: 'center' }}>
				<img
				  src="https://kkma.net/wp-content/uploads/2024/08/KKMA-LOGO-WITH-TEXT-1.png"
				  alt="KKMA Logo"
				  style={{ width: '180px', display: 'inline-block' }}
				/>
			  </div>

			  {/* Quick Enquiry Form */}
			  <div style={{ padding: '0 25px 30px' }}>
				<h3 style={{ 
				  color: '#fff', 
				  fontSize: '18px', 
				  fontWeight: '700',
				  marginBottom: '20px',
				  textTransform: 'uppercase',
				  letterSpacing: '0.5px'
				}}>
				  Quick Enquiry
				</h3>

				<form onSubmit={handleEnquirySubmit}>
				  {/* Name Field */}
				  <div style={{ marginBottom: '15px' }}>
					<input
					  type="text"
					  placeholder="Name"
					  value={enquiryForm.name}
					  onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
					  required
					  style={{
						width: '100%',
						padding: '12px 15px',
						background: 'rgba(255, 255, 255, 0.1)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '4px',
						color: '#fff',
						fontSize: '14px',
						outline: 'none',
						transition: 'all 0.3s ease',
					  }}
					  onFocus={(e) => {
						e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
						e.currentTarget.style.borderColor = '#83B253';
					  }}
					  onBlur={(e) => {
						e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
						e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
					  }}
					/>
				  </div>

				  {/* Email Field */}
				  <div style={{ marginBottom: '15px' }}>
					<input
					  type="email"
					  placeholder="Email"
					  value={enquiryForm.email}
					  onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
					  required
					  style={{
						width: '100%',
						padding: '12px 15px',
						background: 'rgba(255, 255, 255, 0.1)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '4px',
						color: '#fff',
						fontSize: '14px',
						outline: 'none',
						transition: 'all 0.3s ease',
					  }}
					  onFocus={(e) => {
						e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
						e.currentTarget.style.borderColor = '#83B253';
					  }}
					  onBlur={(e) => {
						e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
						e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
					  }}
					/>
				  </div>

				  {/* Contact Number Field */}
				  <div style={{ marginBottom: '15px' }}>
					<input
					  type="tel"
					  placeholder="Contact Number"
					  value={enquiryForm.contactNumber}
					  onChange={(e) => setEnquiryForm({ ...enquiryForm, contactNumber: e.target.value })}
					  required
					  style={{
						width: '100%',
						padding: '12px 15px',
						background: 'rgba(255, 255, 255, 0.1)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '4px',
						color: '#fff',
						fontSize: '14px',
						outline: 'none',
						transition: 'all 0.3s ease',
					  }}
					  onFocus={(e) => {
						e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
						e.currentTarget.style.borderColor = '#83B253';
					  }}
					  onBlur={(e) => {
						e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
						e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
					  }}
					/>
				  </div>

				  {/* Text Field */}
				  <div style={{ marginBottom: '20px' }}>
					<textarea
					  placeholder="Text"
					  value={enquiryForm.text}
					  onChange={(e) => setEnquiryForm({ ...enquiryForm, text: e.target.value })}
					  required
					  rows={4}
					  style={{
						width: '100%',
						padding: '12px 15px',
						background: 'rgba(255, 255, 255, 0.1)',
						border: '1px solid rgba(255, 255, 255, 0.2)',
						borderRadius: '4px',
						color: '#fff',
						fontSize: '14px',
						outline: 'none',
						resize: 'vertical',
						fontFamily: 'inherit',
						transition: 'all 0.3s ease',
					  }}
					  onFocus={(e) => {
						e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
						e.currentTarget.style.borderColor = '#83B253';
					  }}
					  onBlur={(e) => {
						e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
						e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
					  }}
					/>
				  </div>

				  {/* Submit Button */}
				  <button
					type="submit"
					style={{
					  width: '100%',
					  padding: '14px 20px',
					  background: '#e74c3c',
					  border: 'none',
					  borderRadius: '4px',
					  color: '#fff',
					  fontSize: '14px',
					  fontWeight: '700',
					  textTransform: 'uppercase',
					  cursor: 'pointer',
					  transition: 'all 0.3s ease',
					  letterSpacing: '0.5px',
					}}
					onMouseEnter={(e) => {
					  e.currentTarget.style.background = '#c0392b';
					  e.currentTarget.style.transform = 'translateY(-2px)';
					}}
					onMouseLeave={(e) => {
					  e.currentTarget.style.background = '#e74c3c';
					  e.currentTarget.style.transform = 'translateY(0)';
					}}
				  >
					Send Now
				  </button>
				</form>
			  </div>

			  {/* Contact Info Section */}
			  <div style={{ 
				padding: '30px 25px', 
				borderTop: '1px solid rgba(255, 255, 255, 0.1)',
				marginTop: '20px'
			  }}>
				<h4 style={{ 
				  color: '#fff', 
				  fontSize: '16px', 
				  fontWeight: '700',
				  marginBottom: '20px',
				  textTransform: 'uppercase',
				  letterSpacing: '0.5px'
				}}>
				  Contact Info
				</h4>

				<div style={{ marginBottom: '15px' }}>
				  <a 
					href="tel:96550649506"
					style={{ 
					  color: 'rgba(255, 255, 255, 0.8)', 
					  textDecoration: 'none',
					  fontSize: '15px',
					  display: 'flex',
					  alignItems: 'center',
					  transition: 'color 0.3s ease',
					}}
					onMouseEnter={(e) => {
					  e.currentTarget.style.color = '#83B253';
					}}
					onMouseLeave={(e) => {
					  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
					}}
				  >
					<i className="fas fa-phone" style={{ marginRight: '10px', width: '16px' }}></i>
					+965 506 49506
				  </a>
		  </div>
	
				<div>
				  <a 
					href="mailto:info@kkma.net"
					style={{ 
					  color: 'rgba(255, 255, 255, 0.8)', 
					  textDecoration: 'none',
					  fontSize: '15px',
					  display: 'flex',
					  alignItems: 'center',
					  transition: 'color 0.3s ease',
					}}
					onMouseEnter={(e) => {
					  e.currentTarget.style.color = '#83B253';
					}}
					onMouseLeave={(e) => {
					  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
					}}
				  >
					<i className="fas fa-envelope" style={{ marginRight: '10px', width: '16px' }}></i>
					info@kkma.net
				  </a>
				</div>
			  </div>
			</div>
		  </div>
		)}
	  </>
	);
} 