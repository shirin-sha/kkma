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
  date: { day: string; monthYear: string }
  category: string
  author: string
  comments: number
  publishedAt?: string
  createdAt?: string
  updatedAt?: string
}

export default function ArchiveNews(): React.JSX.Element {
  const { archiveKey } = useParams()
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [archives, setArchives] = useState<{ key: string; label: string; count: number }[]>([])
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [limit] = useState(10)
  const [archiveLabel, setArchiveLabel] = useState('')
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])

  async function fetchAllNews(): Promise<Post[]> {
    const all: Post[] = []
    let pageIdx = 1
    const limitPerPage = 100
    // Safety cap to avoid infinite loops
    const maxPages = 100
    let totalFromApi = Infinity
    while (pageIdx <= maxPages && all.length < totalFromApi) {
      const res = await fetch(`${baseUrl}/api/news?page=${pageIdx}&limit=${limitPerPage}`)
      const data = await res.json()
      if (!(res.ok && data?.ok && Array.isArray(data.items))) {
        break
      }
      if (typeof data.total === 'number') {
        totalFromApi = data.total
      }
      all.push(...data.items)
      if (data.items.length < limitPerPage) {
        // Last page reached
        break
      }
      pageIdx += 1
    }
    return all
  }

  function objectIdToDate(_id?: string): Date | undefined {
    if (!_id || typeof _id !== 'string' || _id.length < 8) return undefined
    const hex = _id.slice(0, 8)
    const ts = parseInt(hex, 16)
    if (!Number.isFinite(ts)) return undefined
    return new Date(ts * 1000)
  }

  function parseLegacyMonthYear(monthYear?: string): { year: number; monthIndex: number } | undefined {
    if (!monthYear) return undefined
    const cleaned = monthYear.replace(/’/g, "'").trim()
    const m = cleaned.match(/(\w+)'(\d{2})/)
    if (!m) return undefined
    const raw = m[1]
    const yy = parseInt(m[2])
    if (!Number.isFinite(yy)) return undefined
    const year = 2000 + yy
    const map: Record<string, number> = { jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11 }
    const key = raw.slice(0,3).toLowerCase()
    const monthIndex = map[key]
    if (typeof monthIndex !== 'number') return undefined
    return { year, monthIndex }
  }

  useEffect(() => {
    const loadPosts = async () => {
      if (!archiveKey) return
      setLoading(true)
      setError('')
      try {
        // Parse archive key (e.g., "2024-09") to get year and month
        const [year, month] = archiveKey.split('-')
        const startDate = new Date(parseInt(year), parseInt(month) - 1, 1)
        const endDate = new Date(parseInt(year), parseInt(month), 0)
        
        // Set archive label for display
        setArchiveLabel(startDate.toLocaleString('en-US', { month: 'long', year: 'numeric' }))
        
        // Get all posts and filter client-side using publishedAt (admin date), with fallbacks
        const items: Post[] = await fetchAllNews()
        if (Array.isArray(items)) {
          // Filter posts by archive month/year
          const filteredPosts = items.filter((post: Post) => {
            let postDate: Date | undefined = undefined
            if (post.publishedAt) {
              postDate = new Date(post.publishedAt)
            }
            if (!postDate && post.createdAt) {
              postDate = new Date(post.createdAt)
            }
            if (!postDate) {
              const legacy = parseLegacyMonthYear(post.date?.monthYear)
              if (legacy) postDate = new Date(legacy.year, legacy.monthIndex, 1)
            }
            if (!postDate) {
              postDate = objectIdToDate(post._id)
            }
            
            if (postDate && !isNaN(postDate.getTime())) {
              return postDate.getFullYear() === parseInt(year) && postDate.getMonth() === (parseInt(month) - 1)
            }
            
            return false
          })
          
          // Sort by publish date desc before applying pagination
          filteredPosts.sort((a: Post, b: Post) => {
            const toTime = (p: Post) => {
              if (p.publishedAt) { const d = new Date(p.publishedAt); if (!isNaN(d.getTime())) return d.getTime() }
              if (p.createdAt) { const d = new Date(p.createdAt); if (!isNaN(d.getTime())) return d.getTime() }
              const legacy = parseLegacyMonthYear(p.date?.monthYear)
              if (legacy) return new Date(legacy.year, legacy.monthIndex, 1).getTime()
              const oid = objectIdToDate(p._id)
              return oid ? oid.getTime() : 0
            }
            return toTime(b) - toTime(a)
          })

          // Apply pagination to filtered results
          const startIndex = (page - 1) * limit
          const endIndex = startIndex + limit
          const paginatedPosts = filteredPosts.slice(startIndex, endIndex)
          
          setPosts(paginatedPosts)
          setTotal(filteredPosts.length)
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
  }, [archiveKey, page, limit, baseUrl])

  useEffect(() => {
    const loadSidebar = async () => {
      try {
        const items: Post[] = await fetchAllNews()
        if (Array.isArray(items)) {
          const monthKeyToCount = new Map<string, { count: number; date: Date }>()
          const categoryToCount = new Map<string, number>()

          items.forEach((p) => {
            let created: Date | undefined = undefined
            if ((p as any).publishedAt) {
              created = new Date((p as any).publishedAt as string)
            }
            if (!created && p.createdAt) {
              created = new Date(p.createdAt)
            }
            if (!created) {
              const legacy = parseLegacyMonthYear(p.date?.monthYear)
              if (legacy) created = new Date(legacy.year, legacy.monthIndex, 1)
            }
            if (!created) {
              created = objectIdToDate(p._id)
            }
            
            if (created && !isNaN(created.getTime())) {
              const key = `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}`
              const prev = monthKeyToCount.get(key)
              monthKeyToCount.set(key, { count: (prev?.count || 0) + 1, date: created })
            }

            if (p.category) {
              p.category.split(',').map((s) => s.trim()).filter(Boolean).forEach((cat) => {
                categoryToCount.set(cat, (categoryToCount.get(cat) || 0) + 1)
              })
            }
          })

          const archivesArr = Array.from(monthKeyToCount.entries())
            .sort((a, b) => b[1].date.getTime() - a[1].date.getTime())
            .map(([key, val]) => ({ key, label: val.date.toLocaleString('en-US', { month: 'long', year: 'numeric' }), count: val.count }))

          const categoriesArr = Array.from(categoryToCount.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([name, count]) => ({ name, count }))

          setArchives(archivesArr)
          setCategories(categoriesArr)
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

  return (
    <div>
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>Archive: {archiveLabel}</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/media/news-and-updates">News & Updates</Link></li>
              <li>Archive: {archiveLabel}</li>
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
                  No posts found in "{archiveLabel}" archive.
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
                            // Use publishedAt if available for the badge
                            const d = post.publishedAt ? new Date(post.publishedAt) : (post.createdAt ? new Date(post.createdAt) : undefined)
                            const showLegacy = !d || isNaN(d.getTime())
                            if (showLegacy) {
                              return (
                                <>
                                  <div style={{ fontSize: '24px', fontWeight: '700', lineHeight: 1 }}>
                                    {post.date.day}
                                  </div>
                                  <div style={{ fontSize: '12px', fontWeight: '500', opacity: 0.9 }}>
                                    {post.date.monthYear}
                                  </div>
                                </>
                              )
                            }
                            const day = String(d.getDate()).padStart(2, '0')
                            const monthAbbrev = d.toLocaleString('en-US', { month: 'short' })
                            const yearShort = String(d.getFullYear()).slice(-2)
                            return (
                              <>
                                <div style={{ fontSize: '24px', fontWeight: '700', lineHeight: 1 }}>
                                  {day}
                                </div>
                                <div style={{ fontSize: '12px', fontWeight: '500', opacity: 0.9 }}>
                                  {`${monthAbbrev}'${yearShort}`}
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
                      <li key={a.key}>
                        <Link 
                          to={`/media/archive/${a.key}`}
                          style={{ 
                            color: a.key === archiveKey ? '#83b253' : 'inherit',
                            fontWeight: a.key === archiveKey ? '600' : 'normal'
                          }}
                        >
                          {a.label}
                        </Link>
                      </li>
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
                        <Link to={`/media/category/${encodeURIComponent(c.name)}`}>
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
