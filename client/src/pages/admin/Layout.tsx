import React, { useEffect, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

export default function AdminLayout(): React.JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token !== 'admin-authenticated') {
      window.location.href = '/admin'
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    window.location.href = '/admin'
  }

  const location = useLocation()
  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <div className="admin__layout" style={{ display: 'flex', background: '#f6f7fb', minHeight: '100vh' }}>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="admin__overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 998,
            display: 'block',
          }}
        />
      )}

      {/* Responsive Sidebar */}
      <aside
        className="admin__sidebar"
        style={{
          position: 'fixed',
          top: 0,
          left: sidebarOpen ? 0 : -260,
          width: 260,
          height: '100vh',
          background: '#fff',
          borderRight: '1px solid #e5e7eb',
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          transition: 'left 0.3s ease',
          zIndex: 999,
          overflowY: 'auto',
        }}
      >
        <div className="admin__brand" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 8, borderBottom: '1px solid #f1f5f9' }}>
          <Link to="/admin/contacts" className="admin__brand-link" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#000', textDecoration: 'none' }}>
            <img src="/images/logo/KKMA-LOGO-WITH-TEXT-1.png" alt="KKMA" className="admin__brand-logo"  style={{ height: '50px' }}  />
          </Link>
        </div>

        <nav className="admin__nav" style={{ display: 'grid', gap: 6 }}>
       
          <Link className="admin__nav-link" to="/admin/contacts" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#111827', textDecoration: 'none', padding: '10px 12px', borderRadius: 6, background: isActive('/admin/contacts') ? '#eef2ff' : 'transparent' }}>
            <span style={{ width: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16v16H4z" fill="none"></path>
                <path d="M22 6l-10 7L2 6"></path>
              </svg>
            </span>
            <span className="admin__nav-text">Contacts</span>
          </Link>
          <Link className="admin__nav-link" to="/admin/news" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#111827', textDecoration: 'none', padding: '10px 12px', borderRadius: 6, background: isActive('/admin/news') ? '#eef2ff' : 'transparent' }}>
            <span style={{ width: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 19h16a2 2 0 0 0 2-2V5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"></path>
                <line x1="16" y1="3" x2="16" y2="8"></line>
                <line x1="8" y1="3" x2="8" y2="8"></line>
                <line x1="4" y1="11" x2="20" y2="11"></line>
              </svg>
            </span>
            <span className="admin__nav-text">News & Updates</span>
          </Link>
          <Link className="admin__nav-link" to="/admin/events" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#111827', textDecoration: 'none', padding: '10px 12px', borderRadius: 6, background: isActive('/admin/events') ? '#eef2ff' : 'transparent' }}>
            <span style={{ width: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </span>
            <span className="admin__nav-text">Events & Programs</span>
          </Link>
          <Link className="admin__nav-link" to="/admin/classifieds" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#111827', textDecoration: 'none', padding: '10px 12px', borderRadius: 6, background: isActive('/admin/classifieds') ? '#eef2ff' : 'transparent' }}>
            <span style={{ width: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="4" x2="16" y2="8"></line>
                <line x1="8" y1="4" x2="8" y2="8"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
                <circle cx="8" cy="14" r="2"></circle>
                <path d="M18.5 13h.01"></path>
                <path d="M15 16h.01"></path>
              </svg>
            </span>
            <span className="admin__nav-text">Classifieds</span>
          </Link>
          <Link className="admin__nav-link" to="/admin/memberships" style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#111827', textDecoration: 'none', padding: '10px 12px', borderRadius: 6, background: isActive('/admin/memberships') ? '#eef2ff' : 'transparent' }}>
            <span style={{ width: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </span>
            <span className="admin__nav-text">Membership Applications</span>
          </Link>
        </nav>
        <button onClick={handleLogout} className="admin__nav-link admin__logout" style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280', textDecoration: 'none', padding: '8px 10px', borderRadius: 6, background: 'transparent', border: 'none', cursor: 'pointer' }}>
          <span style={{ width: 16, textAlign: 'center' }}>⎋</span>
          <span className="admin__nav-text">Logout</span>
        </button>
      </aside>

      {/* Content */}
      <main className="admin__content" style={{ marginLeft: 0, width: '100%' }}>
        <div className="admin__topbar" style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 100 }}>
          <div style={{ height: 60, display: 'flex', alignItems: 'center', padding: '0 16px', gap: 12 }}>
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="admin__hamburger"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                width: 32,
                height: 32,
              }}
              aria-label="Toggle sidebar"
            >
              <span style={{ width: '100%', height: 2, background: '#111827', borderRadius: 2 }}></span>
              <span style={{ width: '100%', height: 2, background: '#111827', borderRadius: 2 }}></span>
              <span style={{ width: '100%', height: 2, background: '#111827', borderRadius: 2 }}></span>
            </button>
            <h4 className="admin__title" style={{ margin: 0, color: '#111827', fontSize: 16, fontWeight: 600 }}>KKMA Admin</h4>
          </div>
        </div>
        <div className="admin__page" style={{ padding: '16px' }}>
          <Outlet />
        </div>
      </main>

      {/* Responsive CSS */}
      <style>{`
        @media (min-width: 768px) {
          .admin__sidebar {
            left: 0 !important;
          }
          .admin__content {
            margin-left: 260px !important;
          }
          .admin__overlay {
            display: none !important;
          }
          .admin__hamburger {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
} 