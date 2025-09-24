import React from 'react'

type Category = {
  name: string
  href: string
  count: number
}

export default function ClassifiedsCategories(): React.JSX.Element {
  const categories: Category[] = [
    { name: 'Education', href: 'https://kkma.net/single-category/education/', count: 2 },
    { name: 'Furniture', href: 'https://kkma.net/single-category/furniture/', count: 4 },
    { name: 'Car for Sale', href: 'https://kkma.net/single-category/car-for-sale/', count: 5 },
    { name: 'Electronics', href: 'https://kkma.net/single-category/electronics/', count: 1 },
    { name: 'Flat for Rent', href: 'https://kkma.net/single-category/flat-for-rent/', count: 0 },
    { name: 'Jobs', href: 'https://kkma.net/single-category/jobs/', count: 0 },
    { name: 'Part Time Jobs', href: 'https://kkma.net/single-category/part-time-jobs/', count: 0 },
    { name: 'Transportation Services', href: 'https://kkma.net/single-category/transportation-services/', count: 0 },
    { name: 'Computers & Accessories', href: 'https://kkma.net/single-category/computers-accessories/', count: 0 },
    { name: 'Business Opportunities', href: 'https://kkma.net/single-category/business-opportunities/', count: 0 },
    { name: 'Pets & Animals', href: 'https://kkma.net/single-category/pets-animals/', count: 0 },
    { name: 'Training and Courses', href: 'https://kkma.net/single-category/training-and-courses/', count: 0 },
  ]

  return (
    <div className="boxed_wrapper">
      {/* Page Title */}
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred"><h1>All Categories</h1></div>
            <ul className="bread-crumb clearfix"><li><a href="/">Home</a></li><li>All Categories</li></ul>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="sidebar-page-container sec-pad-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="content-side col-xs-12 col-sm-12 col-md-12">
              <div id="directorist" className="atbd_wrapper directorist-w-100">
                <div className="directorist-container-fluid">
                  <div className="directorist-categories" data-attrs='{"view":"grid","columns":4}'>
                    <div className="directorist-row taxonomy-category-wrapper" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                      {categories.map((cat) => (
                        <div key={cat.name} className="directorist-col-3" style={{ marginBottom: 0 }}>
                          <div 
                            className="directorist-categories__single directorist-categories__single--style-one" 
                            style={{ 
                              background: '#fff',
                              border: '1px solid #f0f0f0',
                              borderRadius: '12px',
                              padding: '24px',
                              textAlign: 'center',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                              transition: 'box-shadow 0.2s ease',
                              cursor: 'pointer',
                              height: '100%',
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
                            }}
                          >
                            <div className="directorist-categories__single__content">
                              <a 
                                href={cat.href} 
                                className="directorist-categories__single__name"
                                style={{ 
                                  color: '#000',
                                  fontWeight: '600',
                                  fontSize: '16px',
                                  textDecoration: 'none',
                                  display: 'block',
                                  marginBottom: '8px'
                                }}
                              >
                                {cat.name}
                              </a>
                              <div className="directorist-categories__single__total" style={{ color: '#666', fontSize: '14px' }}>
                                <span className='directorist-category-count'>{cat.count}</span> <span className="directorist-category-term">{cat.count === 1 ? 'listing' : 'listings'}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
