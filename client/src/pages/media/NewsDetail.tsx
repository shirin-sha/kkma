import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import 'react-quill/dist/quill.snow.css'

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

export default function NewsDetail(): React.JSX.Element {
  const { id } = useParams()
  const [item, setItem] = useState<Post | null>(null)
  const [error, setError] = useState('')
  const [archives, setArchives] = useState<{ key: string; label: string; count: number }[]>([])
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([])
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || '', [])

  useEffect(() => {
    const load = async () => {
      if (!id) return
      try {
        const res = await fetch(`${baseUrl}/api/news/${id}`)
        const data = await res.json()
        if (res.ok && data?.ok) setItem(data.item)
        else setError('Not found')
      } catch {
        setError('Network error')
      }
    }
    load()
  }, [id, baseUrl])

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

  const imgSrc = item?.imagePath ? `${baseUrl}${item.imagePath}` : item?.img
  const isHtmlContent = !!item?.contentHtml || (!!item?.content && /<\/?[a-z][\s\S]*>/i.test(item.content))
  const gallery = Array.isArray(item?.galleryPaths) ? item!.galleryPaths! : []
  const hasGallery = gallery.length > 0

  return (
    <div>
      <section className="page-title" style={{ backgroundImage: 'url(/images/page-title/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              {/* <h1>{item?.title || 'News'}</h1> */}
            </div>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li>{'Media News & Updates'}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sidebar-page-container sec-pad-2">
        <div className="auto-container">
          {error && <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#b91c1c', padding: 12, borderRadius: 8, marginBottom: 16 }}>{error}</div>}
          {!item ? (
            <div style={{ color: '#6b7280' }}>Loading...</div>
          ) : (
            <div className="row clearfix">
              <div className="content-side col-lg-8 col-md-12 col-sm-12">
                <div className="thm-unit-test">
                  <div>
                    <div className="inner-box">
                      {imgSrc && (
                        <figure className="image-box" style={{ marginBottom: 24 }}>
                          <img 
                            src={imgSrc} 
                            alt={item.featuredAlt || item.title || ''}
                            style={{ 
                              width: '100%', 
                              objectFit: 'contain',
                              objectPosition: 'center',
                              borderRadius: 12,
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                              backgroundColor: '#f8f9fa'
                            }}
                          />
                          {item.featuredCaption && (
                            <figcaption style={{ 
                              marginTop: 12, 
                              fontSize: '14px', 
                              color: '#6b7280', 
                              fontStyle: 'italic',
                              textAlign: 'center'
                            }}>
                              {item.featuredCaption}
                            </figcaption>
                          )}
                        </figure>
                      )}

                      <div style={{ marginBottom: 16 }}>
                        {/* Category Button */}
                        <div style={{ marginBottom: 12 }}>
                          <a href="javascript:;" style={{ 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: 8, 
                            background: '#83b253', 
                            color: '#fff', 
                            padding: '8px 16px', 
                            borderRadius: '6px', 
                            textDecoration: 'none', 
                            fontSize: '14px', 
                            fontWeight: '500',
                            border: 'none',
                            cursor: 'pointer'
                          }}>
                            <i className="flaticon-star" style={{ fontSize: '14px' }}></i>
                            {item.category}
                          </a>
                        </div>
                        
                        {/* Author and Comment Info */}
                        <div style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 12, 
                          color: '#6b7280', 
                          fontSize: '14px',
                          marginBottom: 12
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <i className="far fa-user" style={{ fontSize: '14px' }}></i>
                            <span>{item.author}</span>
                          </div>
                          
                          <div style={{ 
                            width: '1px', 
                            height: '14px', 
                            background: '#d1d5db' 
                          }}></div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <i className="far fa-comment" style={{ fontSize: '14px' }}></i>
                            <span>{item.comments} Comment{item.comments !== 1 ? 's' : ''}</span>
                          </div>
                        </div>
                        
                        {/* Divider Line */}
                        <div style={{ 
                          width: '100%', 
                          height: '1px', 
                          background: '#e5e7eb',
                          marginBottom: 20
                        }}></div>
                        
                        {/* Article Heading */}
                        <div style={{ marginBottom: 20 }}>
                          <h2 style={{ 
                            fontSize: '24px', 
                            fontWeight: '700', 
                            color: '#83b253', 
                            lineHeight: '1.3',
                            margin: '0 0 16px 0'
                          }}>
                            {item.title}
                          </h2>
                          
                          {/* Article Description/Excerpt */}
                          {item.excerpt && (
                            <div style={{ 
                              fontSize: '16px', 
                              lineHeight: '1.6', 
                              color: '#374151',
                              marginBottom: 16
                            }}>
                              {item.excerpt}
                        </div>
                      )}
                        </div>
                      </div>
                      {isHtmlContent ? (
                        <div 
                          data-elementor-type="wp-post" 
                          className="elementor"
                          style={{
                            fontSize: '16px',
                            lineHeight: '1.8',
                            color: '#374151',
                            wordWrap: 'break-word',
                            fontFamily: "'DM Sans', 'Noto Sans Malayalam', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif"
                          }}
                        >
                          <div 
                            className="ql-editor news-content-editor"
                            dangerouslySetInnerHTML={{ __html: item.contentHtml || item.content || '' }}
                            style={{
                              padding: 0,
                              fontFamily: "'DM Sans', 'Noto Sans Malayalam', system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif",
                              fontSize: 'inherit',
                              lineHeight: 'inherit',
                              color: 'inherit'
                            }}
                          />
                        </div>
                      ) : (
                        item.content ? (
                          <div style={{ 
                            whiteSpace: 'pre-wrap',
                            fontSize: '16px',
                            lineHeight: '1.8',
                            color: '#374151'
                          }}>
                            {item.content}
                          </div>
                        ) : null
                      )}

                  {hasGallery && (
                        <div style={{ marginTop: 32 }}>
                          {/* Gallery Heading */}
                          <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: 12, 
                            marginBottom: 16,
                            paddingBottom: 12,
                            borderBottom: '2px solid #e5e7eb'
                          }}>
                            <div style={{
                              width: 4,
                              height: 24,
                              background: '#83b253',
                              borderRadius: 2
                            }}></div>
                            <h3 style={{
                              margin: 0,
                              fontSize: '20px',
                              fontWeight: '700',
                              color: '#1f2937',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8
                            }}>
                              <span style={{ fontSize: '18px' }}>📸</span>
                              Gallery
                              <span style={{ 
                                fontSize: '14px', 
                                fontWeight: '500', 
                                color: '#6b7280',
                                background: '#f3f4f6',
                                padding: '2px 8px',
                                borderRadius: '12px'
                              }}>
                                {gallery.length} {gallery.length === 1 ? 'image' : 'images'}
                              </span>
                            </h3>
                          </div>
                          
                          {/* Gallery Container */}
                          <div 
                            onClick={() => setLightboxOpen(true)}
                            style={{ 
                              position: 'relative', 
                              width: '100%',
                              borderRadius: 12,
                              overflow: 'hidden',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                              background: '#f8f9fa',
                              cursor: 'pointer'
                            }}
                          >
                            {/* Main Image */}
                            <img 
                              src={`${baseUrl}${gallery[galleryIndex]}`} 
                              alt={`Gallery ${galleryIndex + 1}`}
                              style={{ 
                                width: '100%',
                                height: 'auto',
                                display: 'block',
                                transition: 'opacity 0.3s ease-in-out'
                              }} 
                            />
                            
                            {/* Navigation Buttons - Only show if more than one image */}
                            {gallery.length > 1 && (
                              <>
                            <button 
                              aria-label="Previous image" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length);
                              }}
                              style={{ 
                                position: 'absolute', 
                                top: '50%', 
                                left: 12, 
                                transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.7)', 
                                color: '#fff', 
                                border: 'none', 
                                borderRadius: '50%', 
                                width: 44, 
                                height: 44, 
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                transition: 'all 0.2s ease',
                                backdropFilter: 'blur(4px)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(0,0,0,0.9)'
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0,0,0,0.7)'
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                              }}
                            >
                              ‹
                            </button>
                            
                            <button 
                              aria-label="Next image" 
                              onClick={(e) => {
                                e.stopPropagation();
                                setGalleryIndex((i) => (i + 1) % gallery.length);
                              }}
                              style={{ 
                                position: 'absolute', 
                                top: '50%', 
                                right: 12, 
                                transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.7)', 
                                color: '#fff', 
                                border: 'none', 
                                borderRadius: '50%', 
                                width: 44, 
                                height: 44, 
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                transition: 'all 0.2s ease',
                                backdropFilter: 'blur(4px)'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = 'rgba(0,0,0,0.9)'
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = 'rgba(0,0,0,0.7)'
                                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
                              }}
                            >
                              ›
                            </button>
                            </>
                            )}
                            
                            {/* Image Counter - Only show if more than one image */}
                            {gallery.length > 1 && (
                              <div style={{
                                position: 'absolute',
                                top: 12,
                                right: 12,
                                background: 'rgba(0,0,0,0.7)',
                                color: '#fff',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                fontSize: '14px',
                                fontWeight: '500',
                                backdropFilter: 'blur(4px)'
                              }}>
                                {galleryIndex + 1} / {gallery.length}
                              </div>
                            )}
                          </div>
                          
                          {/* Thumbnail Navigation */}
                          {gallery.length > 1 && (
                            <div style={{ 
                              display: 'flex', 
                              gap: 8, 
                              justifyContent: 'center', 
                              marginTop: 16,
                              flexWrap: 'wrap'
                            }}>
                              {gallery.map((g, idx) => (
                                <button 
                                  key={idx} 
                                  onClick={() => setGalleryIndex(idx)} 
                                  aria-label={`View image ${idx + 1}`}
                                  style={{ 
                                    width: 60, 
                                    height: 60, 
                                    borderRadius: 8,
                                    border: idx === galleryIndex ? '3px solid #83b253' : '2px solid #e5e7eb',
                                    overflow: 'hidden',
                                    cursor: 'pointer',
                                    background: 'none',
                                    padding: 0,
                                    transition: 'all 0.2s ease',
                                    opacity: idx === galleryIndex ? 1 : 0.7
                                  }}
                                  onMouseEnter={(e) => {
                                    if (idx !== galleryIndex) {
                                      e.currentTarget.style.opacity = '1'
                                      e.currentTarget.style.transform = 'scale(1.05)'
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (idx !== galleryIndex) {
                                      e.currentTarget.style.opacity = '0.7'
                                      e.currentTarget.style.transform = 'scale(1)'
                                    }
                                  }}
                                >
                                  <img 
                                    src={`${baseUrl}${g}`} 
                                    alt={`Thumbnail ${idx + 1}`}
                                    style={{ 
                                      width: '100%',
                                      height: '100%',
                                      objectFit: 'cover',
                                      objectPosition: 'center'
                                    }}
                                  />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}


                      {Array.isArray(item.tags) && item.tags.length > 0 && (
                        <div style={{ marginTop: 16 }}>
                          <strong>Tags: </strong>
                          {item.tags.map((t, i) => (
                            <span key={t} style={{ marginRight: 8 }}>
                              {t}{i < item.tags!.length - 1 ? ',' : ''}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lightbox Modal for Gallery Images */}
              {lightboxOpen && hasGallery && (
                <div
                  style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.95)',
                    zIndex: 10000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => setLightboxOpen(false)}
                >
                  {/* Close Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxOpen(false);
                    }}
                    style={{
                      position: 'absolute',
                      top: 20,
                      right: 20,
                      background: 'rgba(255, 255, 255, 0.2)',
                      border: 'none',
                      borderRadius: '50%',
                      width: 50,
                      height: 50,
                      color: '#fff',
                      fontSize: '28px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 10001,
                      transition: 'all 0.2s ease',
                      lineHeight: 1
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                    }}
                  >
                    ×
                  </button>

                  {/* Left Navigation Button - Fixed Position */}
                  {gallery.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length);
                      }}
                      style={{
                        position: 'fixed',
                        left: 20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 50,
                        height: 50,
                        color: '#fff',
                        fontSize: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        zIndex: 10001
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      ‹
                    </button>
                  )}

                  {/* Right Navigation Button - Fixed Position */}
                  {gallery.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setGalleryIndex((i) => (i + 1) % gallery.length);
                      }}
                      style={{
                        position: 'fixed',
                        right: 20,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 50,
                        height: 50,
                        color: '#fff',
                        fontSize: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                        zIndex: 10001
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      ›
                    </button>
                  )}

                  {/* Image Container */}
                  <div
                    style={{
                      maxWidth: '90%',
                      maxHeight: '90%',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={`${baseUrl}${gallery[galleryIndex]}`}
                      alt={`Gallery ${galleryIndex + 1}`}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '90vh',
                        height: 'auto',
                        borderRadius: 8,
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                      }}
                    />
                  </div>

                  {/* Image Counter - Fixed Position */}
                  <div
                    style={{
                      position: 'fixed',
                      bottom: 30,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: '#fff',
                      padding: '10px 20px',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: '500',
                      whiteSpace: 'nowrap',
                      zIndex: 10001
                    }}
                  >
                    {galleryIndex + 1} / {gallery.length}
                  </div>
                </div>
              )}

              <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                <div className="blog-sidebar">
                  <div className="widget sidebar-widget">
                    <h2 className="wp-block-heading">Archives</h2>
                    <ul className="wp-block-archives-list wp-block-archives">
                      {archives.length === 0 ? (
                        <li><span>No archives</span></li>
                      ) : archives.map((a) => (
                        <li key={a.key}><a href={`/media/archive/${a.key}`}>{a.label}</a></li>
                      ))}
                    </ul>
                  </div>

                  <div className="widget sidebar-widget">
                    <h2 className="wp-block-heading">Categories</h2>
                    <ul className="wp-block-categories-list wp-block-categories">
                      {categories.length === 0 ? (
                        <li><span>No categories</span></li>
                      ) : categories.map((c) => (
                        <li key={c.name}><a href={`/media/category/${encodeURIComponent(c.name)}`}>{c.name}</a></li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}