import React, { useMemo, useState } from 'react'

// Extend listing type to support UI elements shown in the live design
type ClassifiedListing = {
  title: string
  permalink: string
  thumb: string
  price?: string
  location?: string
  phone?: string
  email?: string
  category?: { name: string; href: string }
  views?: number
  authorAvatar?: string
  isPopular?: boolean
  rating?: number
  ratingCount?: number
  likes?: number
}

export default function ViewClassifieds(): React.JSX.Element {
  const [view, setView] = useState<'list' | 'grid'>('list')
  const [sortLabel, setSortLabel] = useState<string>('Sort By')
  const [sortOpen, setSortOpen] = useState<boolean>(false)
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false)

  const originalListings: ClassifiedListing[] = [
    {
      title: 'Demo Listing 1',
      permalink: 'https://kkma.net/directory/demo-listing-1/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Mahboula',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Electronics', href: 'https://kkma.net/single-category/electronics/?directory_type=general' },
      views: 111,
      likes: 111,
      isPopular: true,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
    {
      title: 'Demo Listing 2',
      permalink: 'https://kkma.net/directory/demo-listing-2/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Farwaniya',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Car for Sale', href: 'https://kkma.net/single-category/car-for-sale/?directory_type=general' },
      views: 116,
      likes: 116,
      isPopular: true,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
    {
      title: 'Demo Listing 3',
      permalink: 'https://kkma.net/directory/demo-listing-3/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Farwaniya',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Car for Sale', href: 'https://kkma.net/single-category/car-for-sale/?directory_type=general' },
      views: 133,
      likes: 133,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
    {
      title: 'Demo Listing 4',
      permalink: 'https://kkma.net/directory/demo-listing-4/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Farwaniya',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Car for Sale', href: 'https://kkma.net/single-category/car-for-sale/?directory_type=general' },
      views: 116,
      likes: 116,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
    {
      title: 'Demo Listing 5',
      permalink: 'https://kkma.net/directory/demo-listing-5/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Farwaniya',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Car for Sale', href: 'https://kkma.net/single-category/car-for-sale/?directory_type=general' },
      views: 112,
      likes: 112,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
    {
      title: 'Demo Listing 6',
      permalink: 'https://kkma.net/directory/demo-listing-6/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Farwaniya',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Car for Sale', href: 'https://kkma.net/single-category/car-for-sale/?directory_type=general' },
      views: 113,
      likes: 113,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
    {
      title: 'Demo Listing 7',
      permalink: 'https://kkma.net/directory/demo-listing-7/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Jleeb Al Shuyouk',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Furniture', href: 'https://kkma.net/single-category/furniture/?directory_type=general' },
      views: 101,
      likes: 101,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
    {
      title: 'Demo Listing 8',
      permalink: 'https://kkma.net/directory/demo-listing-8/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Jleeb Al Shuyouk',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Furniture', href: 'https://kkma.net/single-category/furniture/?directory_type=general' },
      views: 111,
      likes: 111,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
    {
      title: 'Demo Listing 9',
      permalink: 'https://kkma.net/directory/demo-listing-9/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Jleeb Al Shuyouk',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Furniture', href: 'https://kkma.net/single-category/furniture/?directory_type=general' },
      views: 108,
      likes: 108,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
    {
      title: 'Demo Listing 10',
      permalink: 'https://kkma.net/directory/demo-listing-10/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Jleeb Al Shuyouk',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Furniture', href: 'https://kkma.net/single-category/furniture/?directory_type=general' },
      views: 111,
      likes: 111,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
    {
      title: 'Demo Listing 11',
      permalink: 'https://kkma.net/directory/demo-listing-11/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Salmiya',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Education', href: 'https://kkma.net/single-category/education/?directory_type=general' },
      views: 112,
      likes: 112,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
    {
      title: 'Demo Listing 12',
      permalink: 'https://kkma.net/directory/demo-listing-12/',
      thumb: 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg',
      price: 'KD2,525.00',
      location: 'Salmiya',
      phone: '59589585298',
      email: 'example@gmail.com',
      category: { name: 'Education', href: 'https://kkma.net/single-category/education/?directory_type=general' },
      views: 102,
      likes: 102,
      rating: 0,
      ratingCount: 0,
      authorAvatar:
        'https://secure.gravatar.com/avatar/c888a6aa706d56eca97f8e346d420dcba106b657e3cb6a5e43c7b4bd10827998?s=32&d=mm&r=g',
    },
  ]

  const displayListings = useMemo(() => {
    const arr = [...originalListings]
    const parsePrice = (price?: string): number => {
      if (!price) return NaN
      const num = Number(price.replace(/[^0-9.]/g, ''))
      return isNaN(num) ? NaN : num
    }
    switch (sortLabel) {
      case 'A to Z (title)':
        return arr.sort((a, b) => a.title.localeCompare(b.title))
      case 'Z to A (title)':
        return arr.sort((a, b) => b.title.localeCompare(a.title))
      case 'Latest listings':
        return arr.reverse()
      case 'Oldest listings':
        return arr
      case 'Popular listings':
        return arr.sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
      case 'Price (low to high)':
        return arr.sort((a, b) => (parsePrice(a.price) || Infinity) - (parsePrice(b.price) || Infinity))
      case 'Price (high to low)':
        return arr.sort((a, b) => (parsePrice(b.price) || -Infinity) - (parsePrice(a.price) || -Infinity))
      case 'Random listings':
        return arr.sort(() => Math.random() - 0.5)
      default:
        return arr
    }
  }, [sortLabel, originalListings])

  const sortOptions = [
    { label: 'A to Z (title)' },
    { label: 'Z to A (title)' },
    { label: 'Latest listings' },
    { label: 'Oldest listings' },
    { label: 'Popular listings' },
    { label: 'Price (low to high)' },
    { label: 'Price (high to low)' },
    { label: 'Random listings' },
  ]

  return (
    <div className="boxed_wrapper">
      {/* Page Title */}
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred"><h1>All Listings</h1></div>
            <ul className="bread-crumb clearfix"><li><a href="/">Home</a></li><li>All Listings</li></ul>
          </div>
        </div>
      </section>

      

      {/* Listings */}
      <section className="sidebar-page-container sec-pad-2">
      <div className="directorist-header-bar">
        <div className="auto-container">
          <div className="directorist-listings-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <div className="directorist-listings-header__left" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <button className="directorist-btn directorist-btn-sm directorist-filter-btn" aria-label="Filters" onClick={() => setFiltersOpen(true)} style={{ color: '#000', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 9999, padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: 8 }}><span className="directorist-icon-filter" style={{ marginRight: 6 }}></span>Filters</button>
              <div className="directorist-dropdown directorist-dropdown-js directorist-sortby-dropdown">
                <button className="directorist-dropdown__toggle directorist-dropdown__toggle-js directorist-btn directorist-btn-sm directorist-toggle-has-icon" aria-expanded={sortOpen} onClick={(e) => { e.preventDefault(); setSortOpen(!sortOpen) }} style={{ color: '#000', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 9999, padding: '8px 14px' }}>{sortLabel}<span className="directorist-icon-caret"></span></button>
                <div className="directorist-dropdown__links directorist-dropdown__links-js directorist-dropdown__links__right" style={{ display: sortOpen ? 'block' : 'none', position: 'relative', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 8, marginTop: 8, boxShadow: '0 8px 20px rgba(0,0,0,0.08)' }}>
                  <form>
                    {sortOptions.map((opt) => (
                      <a key={opt.label} href="#" className="directorist-dropdown__links__single directorist-dropdown__links__single-js" onClick={(e) => { e.preventDefault(); setSortLabel(opt.label); setSortOpen(false) }} style={{ color: '#000' }}>{opt.label}</a>
                    ))}
                  </form>
                </div>
              </div>
            </div>
            <div className="directorist-listings-header__right" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span className='directorist-header-found-title' style={{ color: '#000' }}><span>{displayListings.length}</span> Items Found</span>
              <div className="directorist-viewas">
                <a className={`directorist-viewas__item directorist-viewas__item--grid ${view === 'grid' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setView('grid') }} aria-label="grid view"/>
                <a className={`directorist-viewas__item directorist-viewas__item--list ${view === 'list' ? 'active' : ''}`} href="#" onClick={(e) => { e.preventDefault(); setView('list') }} aria-label="list view"/>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* {filtersOpen && (
        <div role="dialog" aria-modal="true" aria-label="Filters Panel">
          <div onClick={() => setFiltersOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)' }} />
          <aside style={{ position: 'fixed', top: 0, right: 0, height: '100%', width: 320, background: '#fff', boxShadow: '0 0 0 1px rgba(0,0,0,0.05), -8px 0 24px rgba(0,0,0,0.15)', padding: 16, zIndex: 1000 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h3 style={{ margin: 0, color: '#000' }}>Filters</h3>
              <button className="directorist-btn directorist-btn-sm" onClick={() => setFiltersOpen(false)} aria-label="Close filters" style={{ color: '#000' }}>Close</button>
            </div>
            <div style={{ color: '#000' }}>Filter controls coming soon.</div>
          </aside>
        </div>
      )} */}

        <div className="auto-container">
          <div className="row clearfix">
            <div className="content-side col-xs-12 col-sm-12 col-md-12">
              <div className={`directorist-archive-items ${view === 'list' ? 'directorist-archive-list-view' : 'directorist-archive-grid-view'}`}>
                <div className="directorist-container-fluid">
                  <div className="directorist-row">
                    {displayListings.map((item, idx) => (
                      <div key={idx} className="directorist-col-12 directorist-all-listing-col" style={{ marginBottom: 16 }}>
                        <article
                          className={`directorist-listing-single directorist-listing-single--bg ${view === 'list' ? 'directorist-listing-list' : 'directorist-listing-grid'} directorist-listing-has-thumb`}
                          style={view === 'list' ? { position: 'relative', display: 'grid', gridTemplateColumns: '300px 1fr', columnGap: 16, alignItems: 'stretch', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fff', padding: 12 } : { position: 'relative', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden', background: '#fff', padding: 12 }}
                        >
                          {/* top-right favorite like live design */}
                          <a href="#" className="directorist-favorite-action directorist-favorite-top" onClick={(e) => e.preventDefault()} aria-label="Save to favorites" style={{ position: 'absolute', right: 16, top: 12 }}>
                            <i className="directorist-icon-heart" aria-hidden="true" style={{ color: '#000' }}></i>
                          </a>
                          <div className="directorist-listing-single__thumb" style={view === 'list' ? { margin: 0, position: 'relative', height: '100%', borderRadius: 8, overflow: 'hidden' } : { position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                            {item.isPopular && (
                              <span
                                className="directorist-badge directorist-badge-popular"
                                style={{
                                  position: 'absolute',
                                  top: 8,
                                  left: 8,
                                  backgroundColor: '#dc2626',
                                  color: '#fff',
                                  padding: '4px 10px',
                                  borderRadius: 4,
                                  fontWeight: 600,
                                  fontSize: 12,
                                  lineHeight: 1,
                                  zIndex: 2,
                                  boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                                }}
                              >
                                POPULAR
                              </span>
                            )}
                            <a href={item.permalink}>
                              <figure
                                style={{
                                  backgroundImage: item.thumb ? `url(${item.thumb})` : undefined,
                                  backgroundColor: '#eee',
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                  backgroundRepeat: 'no-repeat',
                                  width: '100%',
                                  height: view === 'list' ? '100%' : 160,
                                }}
                                aria-label={item.title}
                              />
                            </a>
                          </div>
                          <section className="directorist-listing-single__content" style={{ color: '#000' }}>
                            <div className="directorist-listing-single__info">
                              <div className="directorist-listing-single__info__top-right">
                                <header className="directorist-listing-single__info__top">
                                  <h2 className="directorist-listing-title"><a href={item.permalink} style={{ color: '#000' }}>{item.title}</a></h2>
                                  <div className="directorist-listing-top-meta">
                                    <div className="directorist-rating">
                                      <span className="directorist-rating-stars">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                          <i key={i} className="directorist-icon-star" aria-hidden="true" style={{ color: '#000' }}></i>
                                        ))}
                                      </span>
                                      <span className="directorist-rating__review" style={{ color: '#000' }}>{(item.rating ?? 0).toFixed(1)} ({item.ratingCount ?? 0})</span>
                                      <span className="directorist-listing-meta-sep" style={{ color: '#000' }}> • </span>
                                  {item.price && (
                                    <span className="directorist-info-item directorist-pricing-meta"><span className="directorist-listing-price" style={{ color: '#000' }}>{item.price}</span></span>
                                  )}
                                    </div>
                               
                                  </div>
                                </header>
                                <ul className="directorist-listing-single__info__list">
                                  {item.location && (
                                    <li className="directorist-listing-card-location">
                                      <i className="directorist-icon-mask" aria-hidden="true" style={{ color: '#000' }}></i>
                                      <div className="directorist-listing-card-location-list" style={{ color: '#000' }}><span>{item.location}</span></div>
                                    </li>
                                  )}
                                  {item.phone && (
                                    <li className="directorist-listing-card-phone">
                                      <i className="directorist-icon-phone" aria-hidden="true" style={{ color: '#000' }}></i>
                                      <a href={`tel:${item.phone}`} style={{ color: '#000' }}>{item.phone}</a>
                                    </li>
                                  )}
                                  {item.email && (
                                    <li className="directorist-listing-card-email">
                                      <i className="directorist-icon-mail" aria-hidden="true" style={{ color: '#000' }}></i>
                                      <a href={`mailto:${item.email}`} style={{ color: '#000' }}>{item.email}</a>
                                    </li>
                                  )}
                                </ul>
                              </div>
                            </div>

                            <footer className="directorist-listing-single__meta" style={{ borderTop: '1px solid #eee', paddingTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <div className="directorist-listing-single__meta__left">
                                {item.category && (
                                  <div className="directorist-listing-category" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#f7f7f7', padding: '6px 10px', borderRadius: 20 }}>
                                    <i className="directorist-icon-folder" aria-hidden="true" style={{ color: '#000' }}></i>
                                    <a href={item.category.href} style={{ color: '#000' }}>{item.category.name}</a>
                                  </div>
                                )}
                              </div>
                              <div className="directorist-listing-single__meta__right" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                <a href="#" className="directorist-favorite-action" onClick={(e) => e.preventDefault()} aria-label="Save to favorites" style={{ color: '#000' }}>
                                  <i className="directorist-icon-heart" aria-hidden="true"></i>
                                  <span className="directorist-favorite-count">{item.likes ?? 0}</span>
                                </a>
                                {item.authorAvatar && (
                                  <div className="directorist-thumb-listing-author directorist-alignment-center">
                                    <img alt='author' src={item.authorAvatar} className='avatar avatar-32 photo' height={32} width={32} />
                                  </div>
                                )}
                              </div>
                            </footer>
                          </section>
                        </article>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Listings */}
    </div>
  )
}
