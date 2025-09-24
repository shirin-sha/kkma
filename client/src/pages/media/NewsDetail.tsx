import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

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
  createdAt?: string
  updatedAt?: string
}

export default function NewsDetail(): React.JSX.Element {
  const { id } = useParams()
  const [item, setItem] = useState<Post | null>(null)
  const [error, setError] = useState('')
  const [archives, setArchives] = useState<{ key: string; label: string; count: number }[]>([])
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([])
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])

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
        const res = await fetch(`${baseUrl}/api/news?page=1&limit=100`)
        const data = await res.json()
        if (res.ok && data?.ok && Array.isArray(data.items)) {
          const items: Post[] = data.items
          const monthKeyToCount = new Map<string, { count: number; date: Date }>()
          const categoryToCount = new Map<string, number>()

          items.forEach((p) => {
            const created = p.createdAt ? new Date(p.createdAt) : undefined
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

  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = item?.title || 'KKMA News'
  const imgSrc = item?.imagePath ? `${baseUrl}${item.imagePath}` : item?.img
  const isHtmlContent = !!item?.contentHtml || (!!item?.content && /<\/?[a-z][\s\S]*>/i.test(item.content))

  return (
    <div>
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>{item?.title || 'News'}</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li>{item?.title || 'News'}</li>
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
                  <div className="blog-details-content">
                    <div className="inner-box">
                      {imgSrc && (
                        <figure className="image-box">
                          <img src={imgSrc} alt={item.featuredAlt || ''} />
                          {item.featuredCaption && <figcaption>{item.featuredCaption}</figcaption>}
                        </figure>
                      )}
                      <div className="post-date"><h3>{item.date?.day}<span>{item.date?.monthYear}</span></h3></div>
                      <div className="lower-content">
                        <div className="category"><a href="javascript:;"><i className="flaticon-star"></i>{item.category}</a></div>
                        <ul className="post-info clearfix">
                          <li><i className="far fa-user"></i><a href="#">{item.author}</a></li>
                          <li><i className="far fa-comment"></i><a href="#">{item.comments} Comment</a></li>
                        </ul>
                      </div>

                      {item.excerpt && (
                        <p>{item.excerpt}</p>
                      )}
                      {isHtmlContent ? (
                        <div data-elementor-type="wp-post" className="elementor">
                          <div dangerouslySetInnerHTML={{ __html: item.contentHtml || item.content || '' }} />
                        </div>
                      ) : (
                        item.content ? <div style={{ whiteSpace: 'pre-wrap' }}>{item.content}</div> : null
                      )}

                      {Array.isArray(item.galleryPaths) && item.galleryPaths.length > 0 && (
                        <div className="row clearfix" style={{ marginTop: 24 }}>
                          {item.galleryPaths.map((p, i) => (
                            <div key={i} className="col-md-6 col-sm-12" style={{ marginBottom: 16 }}>
                              <img src={`${baseUrl}${p}`} alt="" style={{ width: '100%', borderRadius: 8 }} />
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="share-option">
                        <h6>Share This Post</h6>
                        <a href="javascript:;" className="share-icon"><i className="flaticon-share"></i></a>
                        <ul className="social-links clearfix">
                          <li><a href={`http://www.facebook.com/sharer.php?u=${encodeURIComponent(pageUrl)}`} className="fab fa-facebook-f" target="_blank"></a></li>
                          <li><a href={`https://twitter.com/share?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`} className="fab fa-twitter" target="_blank"></a></li>
                          <li><a href={`http://www.linkedin.com/shareArticle?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(shareText)}`} className="fab fa-linkedin" target="_blank"></a></li>
                          <li><a href={`https://pinterest.com/pin/create/bookmarklet/?url=${encodeURIComponent(pageUrl)}&description=${encodeURIComponent(shareText)}`} className="fab fa-pinterest"></a></li>
                        </ul>
                      </div>

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

              <div className="col-lg-4 col-md-12 col-sm-12 sidebar-side">
                <div className="blog-sidebar">
                  <div className="widget sidebar-widget">
                    <h2 className="wp-block-heading">Archives</h2>
                    <ul className="wp-block-archives-list wp-block-archives">
                      {archives.length === 0 ? (
                        <li><span>No archives</span></li>
                      ) : archives.map((a) => (
                        <li key={a.key}><a href="#">{a.label}</a></li>
                      ))}
                    </ul>
                  </div>

                  <div className="widget sidebar-widget">
                    <h2 className="wp-block-heading">Categories</h2>
                    <ul className="wp-block-categories-list wp-block-categories">
                      {categories.length === 0 ? (
                        <li><span>No categories</span></li>
                      ) : categories.map((c) => (
                        <li key={c.name}><a href="#">{c.name}</a></li>
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