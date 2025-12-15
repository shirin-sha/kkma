import React, { useEffect, useMemo, useState } from 'react'

type Post = {
  _id?: string
  title: string
  href: string
  img?: string
  date?: { day: string; monthYear: string }
  publishedDate?: string
  category: string
  author: string
  comments: number
  imagePath?: string
}

export default function NewsAndUpdates(): React.JSX.Element {
  // const fallbackPosts: Post[] = [
  //   {
  //     title: 'കെ.കെ.എം.എ മുലാഖാത് 2025',
  //     href: 'https://kkma.net/mulaqat-2025/',
  //     img: '/images/news/2025/09/MULAQAT-3-370x270.jpg',
  //     date: { day: '10', monthYear: "Sep’25" },
  //     category: 'All News & Updates',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  //   {
  //     title: 'കെ.കെ.എം എ. വയനാട് ജില്ലാ വിദ്യാഭ്യാസ അവാർഡ് വിതരണം ചെയ്തു.',
  //     href: 'https://kkma.net/wayanad-education-award-2025/',
  //     img: undefined,
  //     date: { day: '07', monthYear: "Sep’25" },
  //     category: 'All News & Updates',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  //   {
  //     title: 'ഇഷ്‌ഖേ റസൂൽ 2025: പ്രവാചക സ്നേഹത്തിന്റെ നിറവിൽ ഒരു സായാഹ്നം.',
  //     href: 'https://kkma.net/ishqe-rasool-2025-2/',
  //     img: '/images/news/2025/09/Ishqe-rqsool-25-1-370x270.jpg',
  //     date: { day: '31', monthYear: "Aug’25" },
  //     category: 'All News & Updates',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  //   {
  //     title: 'മുനീർ കോടി സാഹിബ്‌  പ്രസ്ഥാനംവീഥിയിലെ കർമ്മയോഗി :  കെ കെ. എം എ',
  //     href: 'https://kkma.net/muneer-kodi-sahib/',
  //     img: '/images/news/2025/08/Muneer-kodi-370x270.jpg',
  //     date: { day: '27', monthYear: "Aug’25" },
  //     category: 'All News & Updates',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  //   {
  //     title: 'തൃശൂർ ജില്ലാ വിദ്യാർത്ഥികൾക്കൾക്കായി കെ.കെ.എം.എ വിദ്യാഭാസ അവാർഡ് ദാനവും അനുമോദനവും സംഘടിപ്പിച്ചു.',
  //     href: 'https://kkma.net/trissur-edu-award-2025/',
  //     img: '/images/news/2025/08/trissur-student-award-1-370x270.jpg',
  //     date: { day: '27', monthYear: "Aug’25" },
  //     category: 'All News & Updates',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  //   {
  //     title: 'കെ കെ എം എ ഇഷ്‌ഖേ റസൂൽ ഓഗസ്റ്റ് 29 ന്',
  //     href: 'https://kkma.net/ishqe-rasool-2025/',
  //     img: '/images/news/2025/08/Ishq-rasool-1-370x270.jpg',
  //     date: { day: '23', monthYear: "Aug’25" },
  //     category: 'All News & Updates',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  //   {
  //     title: 'കെ കെ എം എ യൂത്ത് വിംഗ് നിലവിൽ വന്നു',
  //     href: 'https://kkma.net/youthwing/',
  //     img: '/images/news/2025/08/kkma-youth-wing-370x270.jpg',
  //     date: { day: '20', monthYear: "Aug’25" },
  //     category: 'All News & Updates',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  //   {
  //     title: 'കെ. കെ. എം. എ  വിദ്യാർത്ഥികൾക്ക് അനുമോദനവും അവാർഡ് ദാനവും സംഘടിപ്പിച്ചു.',
  //     href: 'https://kkma.net/students-awards-2025/',
  //     img: '/images/news/2025/08/kkma-student-award-2025-370x270.jpg',
  //     date: { day: '18', monthYear: "Aug’25" },
  //     category: 'All News & Updates',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  //   {
  //     title: 'കുവൈത്തിൽ മാനുഷിക സേവനത്തിന്റെ പ്രതീകമായ മാഗ്നെറ്റിനു ആദരവ്.',
  //     href: 'https://kkma.net/magnet-humanitarian-service/',
  //     img: '/images/news/2025/08/KKMA-Magnet-2025-1-370x270.jpg',
  //     date: { day: '10', monthYear: "Aug’25" },
  //     category: 'All News & Updates',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  //   {
  //     title: 'കെ.കെ.എം.എ. ‘മർഹബ യാ ശഹ്റു റമദാൻ’ മത പ്രഭാഷണം സംഘടിപ്പിച്ചു.',
  //     href: 'https://kkma.net/marhaban-ya-shahru-ramadan/',
  //     img: '/images/news/2025/02/kkma2-370x270.jpeg',
  //     date: { day: '16', monthYear: "Feb’25" },
  //     category: 'All News & Updates, KKMA UPDATES, News Kuwait',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  //   {
  //     title: 'പ്രവാസിയും മാനസിക പ്രശ്നങ്ങളും കെ. കെ. എം. എ. വെബിനാർ സംഘടിപ്പിച്ചു',
  //     href: 'https://kkma.net/kkma-webinar-2025/',
  //     img: '/images/news/2025/02/WhatsApp-Image-2025-02-03-at-11.28.52-AM-370x270.jpeg',
  //     date: { day: '04', monthYear: "Feb’25" },
  //     category: 'All News & Updates, KKMA UPDATES',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  //   {
  //     title: 'കെ.കെ.എം.എ. വിദ്യാഭാസ സ്കോളർഷിപ്പ് 2025 വിതരണം ചെയ്തു.',
  //     href: 'https://kkma.net/education-scholorship-2025/',
  //     img: '/images/news/2025/01/WhatsApp-Image-2025-01-29-at-9.18.33-AM-1-370x270.jpeg',
  //     date: { day: '30', monthYear: "Jan’25" },
  //     category: 'All News & Updates, KKMA UPDATES',
  //     author: 'kadmin',
  //     comments: 0,
  //   },
  // ]

  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const baseUrl = useMemo(() => (import.meta as any).env?.VITE_API_URL || '', [])

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${baseUrl}/api/news`)
        const data = await res.json()
        if (res.ok && data?.ok && Array.isArray(data.items)) {
          setPosts(data.items.length > 0 ? data.items : [])
        }
      } catch {
        setError('')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [baseUrl])


  return (
    <div>
      <section className="page-title" style={{ backgroundImage: 'url(/images/page-title/KKMA-page-title.jpg)' }}>
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
          {loading ? (
            <div className="row clearfix">
              <div className="col-12" style={{ textAlign: 'center', padding: '40px 0' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 12,
                    color: '#4b5563',
                    fontSize: 14,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '3px solid #e5e7eb',
                      borderTopColor: '#83b253',
                      animation: 'spin 0.8s linear infinite',
                    }}
                  />
                  <span>Loading news...</span>
                </div>
              </div>
            </div>
          ) : posts.length === 0 ? (
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
                        <div className="post-date">
                          <h3>
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
                                  {dayStr}<span>{monthYearStr}</span>
                                </>
                              )
                            })()}
                          </h3>
                        </div>
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







