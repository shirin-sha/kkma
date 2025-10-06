import React, { useEffect, useMemo, useState } from 'react'

type Post = {
  _id?: string
  title: string
  href: string
  img?: string
  date: { day: string; monthYear: string }
  category: string
  author: string
  comments: number
  imagePath?: string
}

export default function NewsAndUpdates(): React.JSX.Element {
 
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState('')
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001', [])

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/news?limit=1000`)
        const data = await res.json()
        if (res.ok && data?.ok && Array.isArray(data.items)) {
          setPosts(data.items.length > 0 ? data.items.reverse() : [])
        }
      } catch {
        setError('')
      }
    }
    load()
  }, [baseUrl])


  return (
    <div>
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>  News &amp; Updates</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li>News &amp; Updates</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="news-section blog-grid sec-pad-2">
        <div className="auto-container">
          {posts.length === 0 ? (
            <div className="row clearfix">
              <div className="col-12">
                <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e3a8a', padding: 12, borderRadius: 8 }}>
                  No news available yet. Please check back later.
                </div>
              </div>
            </div>
          ) : (
            <div className="row clearfix">
              {posts.map((post, idx) => (
                <div key={post._id || idx} className="col-lg-4 col-md-6 col-sm-12 news-block">
                  <div className="news-block-one wow fadeInUp" data-wow-delay="300ms" data-wow-duration="1500ms">
                    <div className="inner-box">
                      <div className="image-box">
                        <figure className="image">
                          <a href={post._id ? `/media/news-and-updates/${post._id}` : post.href}><i className="fas fa-link"></i></a>
                          {post.imagePath ? (
                            <img 
                              src={`${baseUrl}${post.imagePath}`} 
                              alt={post.title}
                              style={{ 
                                width: '100%', 
                                height: '250px', 
                                objectFit: 'contain',
                                objectPosition: 'center',
                                backgroundColor: '#f8f9fa'
                              }}
                            />
                          ) : post.img ? (
                            <img 
                              src={post.img} 
                              alt={post.title}
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
                        <div className="post-date"><h3>{post.date.day}<span>{post.date.monthYear}</span></h3></div>
                      </div>
                      <div className="lower-content">
                        <div className="category"><a href="#"><i className="flaticon-star"></i>{post.category}</a></div>
                        <h4><a href={post._id ? `/media/news-and-updates/${post._id}` : post.href}>{post.title}</a></h4>
                        {/* <h4>{post.title}</h4> */}
                        <ul className="post-info clearfix">
                          <li><i className="far fa-user"></i><a href="#">{post.author}</a></li>
                          <li><i className="far fa-comment"></i><a href="#">{post.comments} Comments</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* pagination removed */}
        </div>
      </section>
    </div>
  )
}







