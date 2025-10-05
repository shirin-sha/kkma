import React, { useState } from 'react'

type Option = { value: string; label: string }

export default function QuickSearch(): React.JSX.Element {
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false)
  const [query, setQuery] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [location, setLocation] = useState<string>('')

  const categories: Option[] = [
    { value: '', label: 'Select Category' },
    { value: '104', label: 'Business Opportunities' },
    { value: '76', label: 'Car for Sale' },
    { value: '93', label: 'Computers & Accessories' },
    { value: '70', label: 'Education' },
    { value: '79', label: 'Electronics' },
    { value: '89', label: 'Flat for Rent' },
    { value: '73', label: 'Furniture' },
    { value: '90', label: 'Jobs' },
    { value: '91', label: 'Part Time Jobs' },
    { value: '105', label: 'Pets & Animals' },
    { value: '106', label: 'Training and Courses' },
    { value: '92', label: 'Transportation Services' },
  ]

  return (
    <div className="boxed_wrapper">
      {/* Page Title */}
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred"><h1>Quick Search</h1></div>
            <ul className="bread-crumb clearfix"><li><a href="/">Home</a></li><li>Quick Search</li></ul>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="sidebar-page-container sec-pad-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="content-side col-xs-12 col-sm-12 col-md-12">
              <div className="directorist-search-contents directorist-contents-wrap" data-atts='{"show_title_subtitle":"yes"}'>
                <div className="directorist-container-fluid">
                  <div className="directorist-search-top">
                    <h2 className="directorist-search-top__title">Search here</h2>
                    <p className="directorist-search-top__subtitle">Find the best match of your interest</p>
                  </div>

                  <form action="/search-result/" className="directorist-search-form">
                    <div className="directorist-search-form-wrap directorist-search-form__wrap directorist-with-search-border">
                      <input type="hidden" name="directory_type" className="listing_type" value="general" />

                      <div className="directorist-search-form__box">
                        <div className="directorist-search-form-top directorist-flex directorist-align-center directorist-search-form-inline directorist-search-form__top directorist-search-modal directorist-search-modal--basic">
                          <div className="directorist-search-modal__overlay"></div>
                          <div className="directorist-search-adv-filter directorist-advanced-filter directorist-search-modal__contents">
                            <span className="directorist-search-modal__minimizer"></span>
                            <div className="directorist-search-modal__contents__body">
                              {/* Query */}
                              <div className="directorist-search-modal__input ">
                                <div className="directorist-search-field directorist-form-group directorist-search-query ">
                                  <label className="directorist-search-field__label" htmlFor="listing_title">What are you looking for?</label>
                                  <input className="directorist-form-element directorist-search-field__input" id="listing_title" type="text" name="q" value={query} placeholder="What are you looking for?" onChange={(e) => setQuery(e.target.value)} />
                                  <div className="directorist-search-field__btn directorist-search-field__btn--clear" onClick={() => setQuery('')}></div>
                                </div>
                              </div>
                              {/* Category */}
                              <div className="directorist-search-modal__input ">
                                <div className="directorist-search-field directorist-form-group ">
                                  <div className="directorist-select directorist-search-category directorist-search-field__input">
                                    <label className="directorist-search-field__label">Category</label>
                                    <select name="in_cat" className="search_fields bdas-category-search directorist-category-select" value={category} onChange={(e) => setCategory(e.target.value)}>
                                      {categories.map((c) => (
                                        <option key={c.value} value={c.value}>{c.label}</option>
                                      ))}
                                    </select>
                                  </div>
                                  <div className="directorist-search-field__btn directorist-search-field__btn--clear" onClick={() => setCategory('')}></div>
                                </div>
                              </div>
                              {/* Location */}
                              <div className="directorist-search-modal__input ">
                                <div className="directorist-search-field directorist-form-group directorist-search-location directorist-icon-right">
                                  <label className="directorist-search-field__label" htmlFor="addressId">Location</label>
                                  <span className="directorist-input-icon directorist-filter-location-icon"></span>
                                  <input type="text" name="address" id="addressId" value={location} placeholder="Location" autoComplete="off" className="directorist-form-element directorist-location-js location-name directorist-search-field__input" onChange={(e) => setLocation(e.target.value)} />
                                  <div className="directorist-search-field__btn directorist-search-field__btn--clear" onClick={() => setLocation('')}></div>
                                </div>
                              </div>
                            </div>
                            {/* Inline submit on small screens */}
                            <div className="directorist-search-form-action__modal">
                              <button type="submit" className="directorist-btn directorist-btn-light directorist-search-form-action__modal__btn-search">Search Listing</button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom actions */}
                      <div className="directorist-search-form-action">
                        <div className="directorist-search-form-action__filter">
                          <a href="#" className="directorist-btn directorist-btn-lg directorist-filter-btn" onClick={(e) => { e.preventDefault(); setShowAdvanced((s) => !s) }}>More Filters</a>
                        </div>
                        <div className="directorist-search-form-action__submit">
                          <button type="submit" className="directorist-btn directorist-btn-lg directorist-btn-primary directorist-btn-search">Search Listing</button>
                        </div>
                      </div>

                      {/* Advanced Filters */}
                      {showAdvanced && (
                        <div className="directorist-search-modal directorist-search-modal--advanced" style={{ display: 'block' }}>
                          <div className="directorist-search-modal__overlay" onClick={() => setShowAdvanced(false)}></div>
                          <div className="directorist-search-adv-filter directorist-advanced-filter directorist-search-modal__contents">
                            <div className="directorist-search-modal__contents__header">
                              <h3 className="directorist-search-modal__contents__title">More Filters</h3>
                              <button className="directorist-search-modal__contents__btn directorist-search-modal__contents__btn--close" onClick={(e) => { e.preventDefault(); setShowAdvanced(false) }}>×</button>
                              <span className="directorist-search-modal__minimizer"></span>
                            </div>
                            <div className="directorist-search-modal__contents__body">
                              {/* Pricing */}
                              <div className="directorist-advanced-filter__advanced__element directorist-search-field-pricing">
                                <div className="directorist-search-field directorist-search-form-dropdown directorist-form-group input-has-noLabel">
                                  <div className="directorist-search-basic-dropdown directorist-search-field__input">
                                    <label className="directorist-search-field__label directorist-search-basic-dropdown-label">Pricing</label>
                                    <div className="directorist-search-basic-dropdown-content">
                                      <div className="directorist-price-ranges">
                                        <div className="directorist-price-ranges__item directorist-form-group">
                                          <label className="directorist-price-ranges__label" htmlFor="minPrice">Min</label>
                                          <span className="directorist-price-ranges__currency">KD</span>
                                          <input id="minPrice" type="number" name="price[0]" className="directorist-form-element" min={0} />
                                        </div>
                                        <div className="directorist-price-ranges__item directorist-form-group">
                                          <label className="directorist-price-ranges__label" htmlFor="maxPrice">Max</label>
                                          <span className="directorist-price-ranges__currency">KD</span>
                                          <input id="maxPrice" type="number" name="price[1]" className="directorist-form-element" min={0} />
                                        </div>
                                        <div className="directorist-price-ranges__item directorist-price-ranges__price-frequency">
                                          <label className="directorist-price-ranges__price-frequency__btn"><input type="radio" name="price_range" value="bellow_economy" /><span className="directorist-pf-range">KD</span></label>
                                          <label className="directorist-price-ranges__price-frequency__btn"><input type="radio" name="price_range" value="economy" /><span className="directorist-pf-range">KDKD</span></label>
                                          <label className="directorist-price-ranges__price-frequency__btn"><input type="radio" name="price_range" value="moderate" /><span className="directorist-pf-range">KDKDKD</span></label>
                                          <label className="directorist-price-ranges__price-frequency__btn"><input type="radio" name="price_range" value="skimming" /><span className="directorist-pf-range">KDKDKDKD</span></label>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="directorist-search-field__btn directorist-search-field__btn--clear"></div>
                                </div>
                              </div>
                              {/* Review */}
                              <div className="directorist-advanced-filter__advanced__element directorist-search-field-review">
                                <div className="directorist-search-field directorist-search-field-review directorist-search-form-dropdown directorist-form-group ">
                                  <div className="directorist-search-basic-dropdown directorist-search-field__input">
                                    <label className="directorist-search-field__label directorist-search-basic-dropdown-label">Review</label>
                                    <div className="directorist-search-basic-dropdown-content">
                                      <div className="directorist-search-review directorist-flex">
                                        {[5,4,3,2,1].map((r) => (
                                          <label key={r} className="directorist-checkbox directorist-checkbox-rating">
                                            <input type="checkbox" name="search_by_rating[]" value={r} />
                                            <span className="directorist-checkbox__label">{'★'.repeat(r)}</span>
                                          </label>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="directorist-search-field__btn directorist-search-field__btn--clear"></div>
                                </div>
                              </div>
                              {/* Radius */}
                              <div className="directorist-advanced-filter__advanced__element directorist-search-field-radius_search">
                                <div className="directorist-search-field directorist-search-field-radius_search ">
                                  <label className="directorist-search-field__label">Radius Search</label>
                                  <div className="directorist-custom-range-slider">
                                    <div className="directorist-custom-range-slider__range__wrap"><span className="directorist-custom-range-slider__range__show"></span><span>Miles</span></div>
                                    <input type="range" min={0} max={100} defaultValue={0} className="directorist-custom-range-slider__slide" />
                                    <input type="hidden" name="miles" value="0-0" />
                                  </div>
                                </div>
                              </div>
                              {/* Tags */}
                              <div className="directorist-advanced-filter__advanced__element directorist-search-field-tag">
                                <div className="directorist-search-field directorist-search-form-dropdown directorist-form-group ">
                                  <div className="directorist-search-basic-dropdown directorist-search-field__input">
                                    <label className="directorist-search-field__label directorist-search-basic-dropdown-label">Tag</label>
                                    <div className="directorist-search-basic-dropdown-content">
                                      <div className="directorist-search-tags directorist-flex">
                                        {[
                                          { id: '69', label: 'best food' },
                                          { id: '72', label: 'house' },
                                          { id: '75', label: 'Rent' },
                                        ].map((t) => (
                                          <div key={t.id} className="directorist-checkbox directorist-checkbox-primary">
                                            <input type="checkbox" name="in_tag[]" value={t.id} id={`tag_${t.id}`} />
                                            <label htmlFor={`tag_${t.id}`} className="directorist-checkbox__label">{t.label}</label>
                                          </div>
                                        ))}
                                      </div>
                                      <a href="#" className="directorist-btn-ml" onClick={(e) => e.preventDefault()}>Show More</a>
                                    </div>
                                  </div>
                                  <div className="directorist-search-field__btn directorist-search-field__btn--clear"></div>
                                </div>
                              </div>
                              {/* Contacts */}
                              {[
                                { name: 'zip', label: 'Zip/Post Code', placeholder: 'Zip' },
                                { name: 'phone', label: 'Phone', placeholder: 'Phone' },
                                { name: 'phone2', label: 'Phone 2', placeholder: 'Phone 2' },
                                { name: 'fax', label: 'Fax', placeholder: 'Fax' },
                                { name: 'email', label: 'Email', placeholder: 'Email' },
                                { name: 'website', label: 'Website', placeholder: 'Website' },
                              ].map((f) => (
                                <div key={f.name} className="directorist-advanced-filter__advanced__element">
                                  <div className="directorist-search-field directorist-form-group ">
                                    <label className="directorist-search-field__label" htmlFor={f.name}>{f.label}</label>
                                    <input id={f.name} className="directorist-form-element directorist-search-field__input" type="text" name={f.name} placeholder={f.placeholder} />
                                    <div className="directorist-search-field__btn directorist-search-field__btn--clear"></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <div className="directorist-search-modal__contents__footer">
                              <div className="directorist-advanced-filter__action directorist-flex directorist-align-center directorist-justify-content-between flex-wrap">
                                <button type="submit" className="directorist-btn directorist-btn-sm directorist-btn-submit">Apply Filters</button>
                                <button type="reset" className="directorist-btn-reset-js" onClick={(e) => { /* no-op visual */ }}>Reset Filters</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
















