import React from 'react'

type NewsItem = {
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

export default function News({ items }: { items: NewsItem[] }): React.JSX.Element {
    return (
        <section className="news-section bg-color-1">
      <div className="auto-container">
        <div className="sec-title centred">
          <h6>
            <i className="flaticon-star"></i>
            <span>News &amp; Blog</span>
            <i className="flaticon-star"></i>
          </h6>
          <h2>Latest From Our Newsroom</h2>
          <div className="title-shape"></div>
        </div>

        <div className="row clearfix">
          {items.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 news-block" key={index}>
              <div
                className="news-block-one wow fadeInUp animated"
                data-wow-delay="300ms"
                data-wow-duration="1500ms"
              >
                <div className="inner-box">
                  <div className="image-box">
                    <figure className="image">
                      <a href={item.link}>
                        <i className="fas fa-link"></i>
                      </a>
                      {item.img && (
                        <img
                          loading="lazy"
                          decoding="async"
                          width="370"
                          height="270"
                          src={item.img}
                          alt={item.title}
                        />
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