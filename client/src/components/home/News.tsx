import { Star } from 'lucide-react'
import React, { useState, useEffect, useMemo } from 'react'

type NewsItem = {
    id: number
    date: string
    month: string
    link: string
    title: string
    excerpt: string
    author: string
    comments: string
    commentsLink: string
    img: string | null
}

export default function News(): React.JSX.Element {
    const [newsItems, setNewsItems] = useState<NewsItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Resolve API base once for render (used for image URLs too)
    const envBase = (import.meta as any)?.env?.VITE_API_BASE
    const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'
    const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])
    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true)
                // Resolve API base from env; default to backend port in dev
                const envBase = (import.meta as any)?.env?.VITE_API_BASE
                const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost'
                const API_BASE = envBase || (isLocalhost ? 'http://localhost:4001' : '')
                const url = `${API_BASE}/api/news/latest`
                const response = await fetch(url)
                
                if (!response.ok) {
                    throw new Error('Failed to fetch news')
                }

                const contentType = response.headers.get('content-type') || ''
                if (!contentType.includes('application/json')) {
                    const text = await response.text()
                    throw new Error(`Unexpected response (content-type: ${contentType}). First chars: ${text.slice(0, 80)}`)
                }

                const data = await response.json()
                // Accept either an array or wrapped payload
                const items = Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : []
                setNewsItems(items as any)
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
                console.error('Error fetching news:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchNews()
    }, [])

    if (loading) {
        return (
            <section className="news-section bg-color-1">
                <div className="auto-container">
                    <div className="sec-title centred">
                        <h6>
                            <Star fill='currentColor' size={14} />
                            <span>News &amp; Blog</span>
                            <Star fill='currentColor' size={14} />
                        </h6>
                        <h2>Latest From Our Newsroom</h2>
                        <div className="title-shape"></div>
                    </div>
                    <div className="text-center">
                        <p>Loading news...</p>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="news-section bg-color-1">
                <div className="auto-container">
                    <div className="sec-title centred">
                        <h6>
                            <Star fill='currentColor' size={14} />
                            <span>News &amp; Blog</span>
                            <Star fill='currentColor' size={14} />
                        </h6>
                        <h2>Latest From Our Newsroom</h2>
                        <div className="title-shape"></div>
                    </div>
                    <div className="text-center">
                        <p>Error loading news: {error}</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="news-section bg-color-1">
            <div className="auto-container">
                <div className="sec-title centred">
                    <h6>
                        <Star fill='currentColor' size={14} />
                        <span>News &amp; Blog</span>
                        <Star fill='currentColor' size={14} />
                    </h6>
                    <h2>Latest From Our Newsroom</h2>
                    <div className="title-shape"></div>
                </div>

                <div className="row clearfix">
                    {newsItems.map((item, index) => (
                        <div className="col-lg-4 col-md-6 col-sm-12 news-block" key={item.id || index}>
                            <div
                                className="news-block-one wow fadeInUp animated"
                                data-wow-delay="300ms"
                                data-wow-duration="1500ms"
                            >
                                <div className="inner-box">
                                    <div className="image-box">
                                    <figure className="image">
                          <a href={item.id ? `/media/news-and-updates/${item.id}` : item.link}><i className="fas fa-link"></i></a>
                          {item.img ? (
                            <img 
                              src={`${baseUrl}${item.img}`} 
                              alt={item.title}
                              style={{ 
                                width: '100%', 
                                height: '250px', 
                                objectFit: 'contain',
                                objectPosition: 'center',
                                backgroundColor: '#f8f9fa'
                              }}
                            />
                          ) : item.img ? (
                            <img 
                              src={item.img} 
                              alt={item.title}
                              style={{ 
                                width: '100%', 
                                height: '250px', 
                                objectFit: 'contain',
                                objectPosition: 'center',
                                backgroundColor: '#f8f9fa'
                              }}
                            />
                          ) : (
                            <div style={{ 
                              width: '100%', 
                              height: '250px', 
                              background: '#f0f0f0', 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center', 
                              color: '#666',
                              fontSize: '14px',
                              fontWeight: '500'
                            }}>
                              No Image
                            </div>
                          )}
                        </figure>
                                        <div className="post-date">
                                            <h3>
                                                {item.date}
                                                <span>{item.month}</span>
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="lower-content">
                                        <div className="category">
                                            <a href="javascript:;">
                                                <i className="flaticon-star"></i> All News &amp; Updates
                                            </a>
                                        </div>
                                        <h4>
                                            <a href={item.link}>{item.title}</a>
                                        </h4>
                                        <p>{item.excerpt}</p>
                                        <ul className="post-info clearfix">
                                            <li>
                                                <i className="far fa-user"></i>
                                                <a href="https://kkma.net/author/kadmin/">{item.author}</a>
                                            </li>
                                            <li>
                                                <i className="far fa-comment"></i>
                                                <a href={item.commentsLink}>{item.comments}</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 