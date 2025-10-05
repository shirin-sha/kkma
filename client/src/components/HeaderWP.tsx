import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown, Phone, X, LayoutGrid } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function HeaderWP(): React.JSX.Element {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
	const [expanded, setExpanded] = useState<Record<string, boolean>>({});
	const toggle = (key: string) => setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
	const openMenu = () => {
		console.log('[HeaderWP] Opening mobile menu');
		setMobileMenuOpen(true);
	};
	const closeMenu = () => {
		console.log('[HeaderWP] Closing mobile menu');
		setMobileMenuOpen(false);
	};
	const openLeft = () => {
		console.log('[HeaderWP] Opening left drawer');
		setLeftDrawerOpen(true);
	};
	const closeLeft = () => {
		console.log('[HeaderWP] Closing left drawer');
		setLeftDrawerOpen(false);
	};
	return (
		<>
		{/* Main Header */}
		<header className="main-header style-one" style={{ position: 'relative', zIndex: 9999 }}>
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
					  <Phone size={16} color="#83b253" className="mr-2" />
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
					onClick={openMenu}
					style={{ position: 'relative', zIndex: 10001, cursor: 'pointer' }}
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
						  <a href="#">About Us <ChevronDown size={12} /></a>
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
						  <a href="#">Our Initiatives <ChevronDown size={12} /></a>
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
						  <a href="#">Membership <ChevronDown size={12} /></a>
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
						  <a href="#">Classifieds <ChevronDown size={12} /></a>
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
							  <NavLink to="#">
								Quick Search
							  </NavLink>
							</li>
							<li>
							  <a href="#">
								Add Your Post
							  </a>
							</li>
							<li>
							  <a href="#">
								Your Dashboard
							  </a>
							</li>
						  </ul>
						</li>
						<li className="dropdown">
						  <a href="#">Media <ChevronDown size={12} /></a>
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
						<div className="nav-toggler navSidebar-button" onClick={openLeft} title="Open quick menu" style={{ cursor: 'pointer' }}>
						  <LayoutGrid fill="#83b253" size={20} color="#83b253" />
						</div>
					  </li>
					</ul>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
  
		  {/* Sticky Header */}
		  <div className="sticky-header" style={{ position: 'sticky', top: 0, zIndex: 9998, display: 'none' }}>
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
  
		{/* Mobile Menu (Portal) */}
		{mobileMenuOpen && createPortal(
		  <div className="kkma-mobile-menu" style={{ position: 'fixed', inset: 0, zIndex: 100000, visibility: 'visible', pointerEvents: 'auto', display: 'block', background: 'transparent' }}>
			<div
			  className="kkma-menu-backdrop"
			  onClick={closeMenu}
			  style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100000 }}
			></div>
			<div className="kkma-close-btn" onClick={closeMenu} style={{ position: 'fixed', top: 14, right: 16, color: '#ffffff', zIndex: 100002, cursor: 'pointer', fontSize: 20 }}>
			  <X size={22} color="#ffffff" />
			</div>
  
			<nav className="kkma-menu-box" style={{ position: 'fixed', right: 0, top: 0, height: '100%', width: 320, maxWidth: '90%', background: '#0b0e17', zIndex: 100001, boxShadow: '-8px 0 24px rgba(0,0,0,0.25)', padding: 20, overflowY: 'auto', display: 'block', color: '#fff' }}>
			  <div className="nav-logo" style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
				<NavLink to="/" title="KKMA" onClick={closeMenu} style={{ display: 'inline-block' }}>
				  <img
					src="https://kkma.net/wp-content/uploads/2024/08/KKMA-LOGO-WITH-TEXT-1.png"
					alt="logo"
					style={{ maxWidth: 140, height: 'auto' }}
				  />
				</NavLink>
			  </div>
			  
			  {/* Collapsible navigation mirroring main header */}
			  <div className="menu-outer" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
				{/* Home */}
				<div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
				  <NavLink to="/" onClick={closeMenu} style={{ display: 'block', padding: '14px 12px', color: '#fff', textDecoration: 'none', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.3 }}>Home</NavLink>
				</div>
				{/* About Us */}
				<div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
				  <button onClick={() => toggle('about')} style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '14px 12px', textAlign: 'left', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span>About Us</span>
					<span style={{ transform: expanded['about'] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>▾</span>
				  </button>
				  {expanded['about'] && (
					<ul style={{ listStyle: 'none', margin: 0, padding: '0 0 10px 16px' }}>
					  <li><NavLink to="/about/overview" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Overview</NavLink></li>
					  <li><NavLink to="/about/people-behind" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>People Behind</NavLink></li>
					  <li><NavLink to="/about/kkma-history" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>KKMA History</NavLink></li>
					</ul>
				  )}
				</div>
				{/* Our Initiatives */}
				<div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
				  <button onClick={() => toggle('initiatives')} style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '14px 12px', textAlign: 'left', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span>Our Initiatives</span>
					<span style={{ transform: expanded['initiatives'] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>▾</span>
				  </button>
				  {expanded['initiatives'] && (
					<ul style={{ listStyle: 'none', margin: 0, padding: '0 0 10px 16px' }}>
					  <li><NavLink to="/initiatives/social-projects" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Social Projects</NavLink></li>
					  <li><NavLink to="/initiatives/magnet-club" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Magnet Club</NavLink></li>
					</ul>
				  )}
				</div>
				{/* Membership */}
				<div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
				  <button onClick={() => toggle('membership')} style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '14px 12px', textAlign: 'left', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span>Membership</span>
					<span style={{ transform: expanded['membership'] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>▾</span>
				  </button>
				  {expanded['membership'] && (
					<ul style={{ listStyle: 'none', margin: 0, padding: '0 0 10px 16px' }}>
					  <li><NavLink to="/membership/membership-information" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Membership Information</NavLink></li>
					  <li><NavLink to="/membership/member-privileges" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Member Privileges</NavLink></li>
					  <li><a href="http://database.kkma.net" style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Members Area</a></li>
					</ul>
				  )}
				</div>
				{/* Classifieds */}
				<div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
				  <button onClick={() => toggle('classifieds')} style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '14px 12px', textAlign: 'left', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span>Classifieds</span>
					<span style={{ transform: expanded['classifieds'] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>▾</span>
				  </button>
				  {expanded['classifieds'] && (
					<ul style={{ listStyle: 'none', margin: 0, padding: '0 0 10px 16px' }}>
					  <li><NavLink to="/classifieds/view-classifieds" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>View Classifieds</NavLink></li>
					  <li><NavLink to="/classifieds/view-categories" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>View Categories</NavLink></li>
					  <li><NavLink to="#" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Quick Search</NavLink></li>
					  <li><a href="#" style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Add Your Post</a></li>
					  <li><a href="#" style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Your Dashboard</a></li>
					</ul>
				  )}
				</div>
				{/* Media */}
				<div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
				  <button onClick={() => toggle('media')} style={{ width: '100%', background: 'transparent', border: 'none', color: '#fff', padding: '14px 12px', textAlign: 'left', textTransform: 'uppercase', fontWeight: 700, letterSpacing: 0.3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<span>Media</span>
					<span style={{ transform: expanded['media'] ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform .2s' }}>▾</span>
				  </button>
				  {expanded['media'] && (
					<ul style={{ listStyle: 'none', margin: 0, padding: '0 0 10px 16px' }}>
					  <li><NavLink to="/media/news-and-updates" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>News & Updates</NavLink></li>
					  <li><NavLink to="/media/events-and-programs" onClick={closeMenu} style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Events & Programs</NavLink></li>
					  <li><a href="#" style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Downloads</a></li>
					  <li><a href="#" style={{ display: 'block', padding: '10px 8px', color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>Privilege Partner Offers</a></li>
					</ul>
				  )}
				</div>
				{/* Contact */}
				<div style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
				  <NavLink to="/contact" onClick={closeMenu} style={{ display: 'block', padding: '14px 12px', color: '#fff', textDecoration: 'none', textTransform: 'uppercase', fontWeight: 600, letterSpacing: 0.3 }}>Contact</NavLink>
				</div>
			  </div>
  
			  <div className="contact-info" style={{ marginTop: 28 }}>
				<h4 style={{ margin: '0 0 10px 0', color: '#fff', fontSize: 18, fontWeight: 700 }}>Contact Info</h4>
				<ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255,255,255,0.9)' }}>
				  <li style={{ marginBottom: 8 }}>
					<a href="tel:96550649506" style={{ color: '#fff', textDecoration: 'none' }}>+965 506 49506</a>
				  </li>
				  <li>
					<a href="mailto:info@kkma.net" style={{ color: '#fff', textDecoration: 'none' }}>info@kkma.net</a>
				  </li>
				</ul>
			  </div>
			  <div className="social-links"></div>
			</nav>
		  </div>, document.body)}

		{/* Left Quick Menu Drawer (Portal) */}
		{leftDrawerOpen && createPortal(
		  <div className="kkma-left-drawer" style={{ position: 'fixed', inset: 0, zIndex: 100000, pointerEvents: 'auto' }}>
			<div onClick={closeLeft} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
			<div style={{ position: 'fixed', left: 0, top: 0, height: '100%', width: 340, maxWidth: '90%', background: '#232534', color: '#fff', boxShadow: '8px 0 24px rgba(0,0,0,0.25)', padding: 20, overflowY: 'auto' }}>
			  {/* Scoped styles for placeholders/text */}
			  <style>{`
				.kkma-left-drawer input, .kkma-left-drawer textarea { color: #ffffff !important; }
				.kkma-left-drawer input::placeholder, .kkma-left-drawer textarea::placeholder { color: rgba(255,255,255,0.9) !important; opacity: 1; }
				.kkma-left-drawer input:-webkit-autofill,
				.kkma-left-drawer textarea:-webkit-autofill { -webkit-text-fill-color: #ffffff !important; box-shadow: 0 0 0px 1000px #232534 inset !important; }
			  `}</style>
			  {/* Header row */}
			  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
				<NavLink to="/" onClick={closeLeft} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
				  <img src="https://kkma.net/wp-content/uploads/2024/08/KKMA-LOGO-WITH-TEXT-1.png" alt="KKMA" style={{ height: 36 }} />
				</NavLink>
				<button onClick={closeLeft} style={{ background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}><X size={22} /></button>
			  </div>
			  
			  {/* Quick Enquiry Form */}
			  <h3 style={{ marginTop: 24, marginBottom: 12, textTransform: 'uppercase', fontSize: 16, letterSpacing: .5, color: '#ffffff' }}>Quick Enquiry</h3>
			  <form onSubmit={(e) => { e.preventDefault(); closeLeft(); }}>
				<div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
				  <input type="text" placeholder="Name" required style={{ width: '100%', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 6, padding: '12px 14px', outline: 'none' }} />
				  <input type="email" placeholder="Email" required style={{ width: '100%', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 6, padding: '12px 14px', outline: 'none' }} />
				  <input type="tel" placeholder="Contact Number" style={{ width: '100%', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 6, padding: '12px 14px', outline: 'none' }} />
				  <textarea placeholder="Text" rows={5} style={{ width: '100%', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 6, padding: '12px 14px', outline: 'none', resize: 'vertical' }} />
				  <button type="submit" style={{ marginTop: 4, background: '#e21e2a', color: '#fff', fontWeight: 700, textTransform: 'uppercase', letterSpacing: .5, border: 'none', borderRadius: 6, padding: '12px 14px', cursor: 'pointer' }}>Send Now</button>
				</div>
			  </form>
			  
			  {/* Contact Info */}
			  <div style={{ marginTop: 28 }}>
				<h4 style={{ margin: '0 0 10px 0', fontSize: 16, color: '#ffffff' }}>Contact Info</h4>
				<ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'rgba(255,255,255,0.9)' }}>
				  <li style={{ marginBottom: 8 }}><a href="tel:96550649506" style={{ color: '#fff', textDecoration: 'none' }}>+965 506 49506</a></li>
				  <li><a href="mailto:info@kkma.net" style={{ color: '#fff', textDecoration: 'none' }}>info@kkma.net</a></li>
				</ul>
			  </div>
			</div>
		  </div>, document.body)}
	  </>
	);
} 