import React, { useEffect, useMemo, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

type Post = {
  _id?: string
  title: string
  href: string
  img?: string
  imagePath?: string
  content?: string
  contentHtml?: string
  excerpt?: string
  slug?: string
  featuredAlt?: string
  featuredCaption?: string
  galleryPaths?: string[]
  tags?: string[]
  seoTitle?: string
  seoDescription?: string
  date?: { day: string; monthYear: string }
  publishedDate?: string
  category: string
  author: string
  comments: number
  createdAt?: string
  updatedAt?: string
}

export default function CategoryNews(): React.JSX.Element {
  const { categoryName } = useParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [archives, setArchives] = useState<{ key: string; label: string; count: number }[]>([])
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(10)
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])

  const decodedCategoryName = categoryName ? decodeURIComponent(categoryName) : ''

  useEffect(() => {
    const loadPosts = async () => {
      if (!decodedCategoryName) return
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${baseUrl}/api/news?category=${encodeURIComponent(decodedCategoryName)}`)
        const data = await res.json()
        if (res.ok && data?.ok && Array.isArray(data.items)) {
          setPosts(data.items)
          setTotal(data.items.length)
        } else {
          setError('Failed to load posts')
        }
      } catch {
        setError('Network error')
      } finally {
        setLoading(false)
      }
    }
    loadPosts()
  }, [decodedCategoryName, page, limit, baseUrl])

  useEffect(() => {
    const loadSidebar = async () => {
      try {
        const [archivesRes, categoriesRes] = await Promise.all([
          fetch(`${baseUrl}/api/news/archives`),
          fetch(`${baseUrl}/api/news/categories`)
        ])
        const [archivesData, categoriesData] = await Promise.all([
          archivesRes.json(),
          categoriesRes.json()
        ])
        if (archivesRes.ok && archivesData?.ok && Array.isArray(archivesData.items)) {
          setArchives(archivesData.items)
        }
        if (categoriesRes.ok && categoriesData?.ok && Array.isArray(categoriesData.items)) {
          setCategories(categoriesData.items)
        }
      } catch {
        // ignore sidebar errors
      }
    }
    loadSidebar()
  }, [baseUrl])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  function openPopupShare(url: string) {
    const w = 680
    const h = 540
    const y = window.top ? (window.top.outerHeight - h) / 2 : 0
    const x = window.top ? (window.top.outerWidth - w) / 2 : 0
    window.open(url, 'share', `width=${w},height=${h},left=${x},top=${y},noopener,noreferrer`)
  }

  function buildShareUrls(post: Post): { fb: string; tw: string; li: string; pin: string } {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const url = post._id ? `${origin}/media/news-and-updates/${post._id}` : (post.href || origin)
    const text = encodeURIComponent(post.title)
    const img = encodeURIComponent(post.imagePath ? `${baseUrl}${post.imagePath}` : (post.img || ''))
    return {
      fb: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      tw: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${text}`,
      li: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      pin: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${img}&description=${text}`
    }
  }

  return ( <div>
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>{decodedCategoryName || 'Category'}</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/media/news-and-updates">News & Updates</Link></li>
              <li>{decodedCategoryName || 'Category'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sidebar-page-container sec-pad-2">
        <div className="auto-container">
          {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 16 }}>{error}</div>}
          
          <div className="row clearfix">
            {/* Left Content Section */}
            <div className="content-side col-lg-8 col-md-12 col-sm-12">
              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
                  Loading posts...
                </div>
              ) : posts.length === 0 ? (
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e3a8a', padding: 20, borderRadius: 8, textAlign: 'center' }}>
                  No posts found in "{decodedCategoryName}" category.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
                  {posts.map((post, idx) => (
                    <article key={post._id || idx} style={{
                      background: '#fff',
                      borderRadius: 12,
                      overflow: 'hidden',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                      transition: 'all 0.3s ease',
                      border: '1px solid #f3f4f6'
                    }}>
                      {/* Image and Date Badge */}
                      <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                        {(post.imagePath || post.img) && (
                          <img 
                            src={post.imagePath ? `${baseUrl}${post.imagePath}` : post.img} 
                            alt={post.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center'
                            }}
                          />
                        )}
                        
                        {/* Date Badge */}
                        <div style={{
                          position: 'absolute',
                          top: 20,
                          right: 20,
                          background: '#83b253',
                          color: '#fff',
                          padding: '12px 16px',
                          borderRadius: 8,
                          textAlign: 'center',
                          minWidth: '60px',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                        }}>
                          {(() => {
                            let dayStr = ''
                            let monthYearStr = ''
                            if (post.date?.day && post.date?.monthYear) {
                              dayStr = post.date.day
                              monthYearStr = post.date.monthYear
                            } else if (post.publishedDate) {
                              const d = new Date(post.publishedDate)
                              if (!isNaN(d.getTime())) {
                                dayStr = String(d.getDate()).padStart(2, '0')
                                const mm = String(d.getMonth() + 1).padStart(2, '0')
                                const yy = String(d.getFullYear()).slice(-2)
                                monthYearStr = `${mm}/${yy}`
                              }
                            }
                            return (
                              <>
                                <div style={{ fontSize: '24px', fontWeight: '700', lineHeight: 1 }}>
                                  {dayStr}
                                </div>
                                <div style={{ fontSize: '12px', fontWeight: '500', opacity: 0.9 }}>
                                  {monthYearStr}
                                </div>
                              </>
                            )
                          })()}
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{ padding: '24px' }}>
                        {/* Category Button */}
                        <div style={{ marginBottom: 16 }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            background: '#83b253',
                            color: '#fff',
                            padding: '8px 16px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: '500'
                          }}>
                            <i className="flaticon-star" style={{ fontSize: '14px' }}></i>
                            {post.category}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 style={{
                          fontSize: '24px',
                          fontWeight: '700',
                          color: '#83b253',
                          lineHeight: '1.3',
                          margin: '0 0 16px 0'
                        }}>
                          <Link to={post._id ? `/media/news-and-updates/${post._id}` : post.href} style={{ color: 'inherit', textDecoration: 'none' }}>
                            {post.title}
                          </Link>
                        </h2>

                        {/* Author and Comments */}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 12, 
                          color: '#6b7280', 
                          fontSize: '14px',
                          marginBottom: 16
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <i className="far fa-user" style={{ fontSize: '14px' }}></i>
                            <span>{post.author}</span>
                          </div>
                          
                          <div style={{ 
                            width: '1px', 
                            height: '14px', 
                            background: '#d1d5db' 
                          }}></div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <i className="far fa-comment" style={{ fontSize: '14px' }}></i>
                            <span>{post.comments} Comment{post.comments !== 1 ? 's' : ''}</span>
                          </div>
                        </div>

                        {/* Excerpt */}
                        {post.excerpt && (
                          <div style={{ 
                            fontSize: '16px', 
                            lineHeight: '1.6', 
                            color: '#374151',
                            marginBottom: 20
                          }}>
                            {post.excerpt}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'space-between', 
                          alignItems: 'center',
                          paddingTop: 16,
                          borderTop: '1px solid #f3f4f6'
                        }}>
                          <Link 
                            to={post._id ? `/media/news-and-updates/${post._id}` : post.href}
                            style={{
                              background: '#fff',
                              color: '#374151',
                              border: '2px solid #e5e7eb',
                              padding: '10px 20px',
                              borderRadius: '6px',
                              textDecoration: 'none',
                              fontWeight: '600',
                              fontSize: '14px',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#83b253'
                              e.currentTarget.style.color = '#fff'
                              e.currentTarget.style.borderColor = '#83b253'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#fff'
                              e.currentTarget.style.color = '#374151'
                              e.currentTarget.style.borderColor = '#e5e7eb'
                            }}
                          >
                            READ MORE
                          </Link>
                          
                          <div
                            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}
                            onMouseLeave={(e) => {
                              const menu = (e.currentTarget.querySelector('.share-menu') as HTMLDivElement)
                              if (menu) menu.style.display = 'none'
                            }}
                          >
                            <span style={{ color: '#6b7280', fontSize: '14px' }}>Share This Post</span>
                            <button
                              aria-label="Share"
                              onMouseEnter={(e) => {
                                const menu = (e.currentTarget.parentElement?.querySelector('.share-menu') as HTMLDivElement)
                                if (menu) menu.style.display = 'flex'
                              }}
                              style={{
                                width: 36,
                                height: 36,
                                borderRadius: 999,
                                background: '#f3f4f6',
                                border: '1px solid #e5e7eb',
                                color: '#374151',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <i className="far fa-share-alt" style={{ fontSize: 16 }}></i>
                            </button>

                            {/* Hover share menu */}
                            <div
                              className="share-menu"
                              style={{
                                display: 'none',
                                position: 'absolute',
                                right: 0,
                                top: '110%',
                                background: '#fff',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                                borderRadius: 10,
                                padding: 8,
                                gap: 8,
                                zIndex: 10,
                                alignItems: 'center'
                              }}
                              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.display = 'flex' }}
                            >
                              {(() => {
                                const share = buildShareUrls(post)
                                return (
                                  <>
                                    <button aria-label="Share on Facebook" onClick={() => openPopupShare(share.fb)} title="Facebook" style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', color: '#1877f2' }}>
                                      <i className="fab fa-facebook-f"></i>
                                    </button>
                                    <button aria-label="Share on Twitter" onClick={() => openPopupShare(share.tw)} title="Twitter/X" style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', color: '#1da1f2' }}>
                                      <i className="fab fa-twitter"></i>
                                    </button>
                                    <button aria-label="Share on LinkedIn" onClick={() => openPopupShare(share.li)} title="LinkedIn" style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', color: '#0a66c2' }}>
                                      <i className="fab fa-linkedin-in"></i>
                                    </button>
                                    <button aria-label="Share on Pinterest" onClick={() => openPopupShare(share.pin)} title="Pinterest" style={{ width: 36, height: 36, borderRadius: 999, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', color: '#bd081c' }}>
                                      <i className="fab fa-pinterest-p"></i>
                                    </button>
                                  </>
                                )
                              })()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {posts.length > 0 && totalPages > 1 && (
                <div style={{ marginTop: 40, textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    {page > 1 && (
                      <button
                        onClick={() => setPage(page - 1)}
                        style={{
                          padding: '10px 16px',
                          background: '#83b253',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        Previous
                      </button>
                    )}
                    
                    <span style={{
                      padding: '10px 16px',
                      background: '#f3f4f6',
                      color: '#374151',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      Page {page} of {totalPages}
                    </span>
                    
                    {page < totalPages && (
                      <button
                        onClick={() => setPage(page + 1)}
                        style={{
                          padding: '10px 16px',
                          background: '#83b253',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: '600'
                        }}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
              <div className="blog-sidebar">
                <div className="widget sidebar-widget">
                  <h2 className="wp-block-heading">Archives</h2>
                  <ul className="wp-block-archives-list wp-block-archives">
                    {archives.length === 0 ? (
                      <li><span>No archives</span></li>
                    ) : archives.map((a) => (
                      <li key={a.key}><Link to={`/media/archive/${a.key}`}>{a.label}</Link></li>
                    ))}
                  </ul>
                </div>

                <div className="widget sidebar-widget">
                  <h2 className="wp-block-heading">Categories</h2>
                  <ul className="wp-block-categories-list wp-block-categories">
                    {categories.length === 0 ? (
                      <li><span>No categories</span></li>
                    ) : categories.map((c) => (
                      <li key={c.name}>
                        <Link 
                          to={`/media/category/${encodeURIComponent(c.name)}`}
                          style={{ 
                            color: c.name === decodedCategoryName ? '#83b253' : 'inherit',
                            fontWeight: c.name === decodedCategoryName ? '600' : 'normal'
                          }}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
