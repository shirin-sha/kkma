import React, { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

type Category = {
  _id: string;
  count: number;
};

export default function ClassifiedsCategories(): React.JSX.Element {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/classifieds/meta/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      
      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fallback categories with icons and colors
  const categoryConfig: Record<string, { icon: string; color: string; bg: string }> = {
    'Education': { icon: '📚', color: '#3b82f6', bg: '#eff6ff' },
    'Furniture': { icon: '🛋️', color: '#8b5cf6', bg: '#f5f3ff' },
    'Car for Sale': { icon: '🚗', color: '#ef4444', bg: '#fef2f2' },
    'Electronics': { icon: '📱', color: '#f59e0b', bg: '#fffbeb' },
    'Flat for Rent': { icon: '🏠', color: '#10b981', bg: '#f0fdf4' },
    'Jobs': { icon: '💼', color: '#06b6d4', bg: '#ecfeff' },
    'Part Time Jobs': { icon: '⏰', color: '#14b8a6', bg: '#f0fdfa' },
    'Transportation Services': { icon: '🚌', color: '#f97316', bg: '#fff7ed' },
    'Computers & Accessories': { icon: '💻', color: '#6366f1', bg: '#eef2ff' },
    'Business Opportunities': { icon: '💰', color: '#84cc16', bg: '#f7fee7' },
    'Pets & Animals': { icon: '🐾', color: '#ec4899', bg: '#fdf2f8' },
    'Training and Courses': { icon: '🎓', color: '#a855f7', bg: '#faf5ff' },
  };

  const defaultCategories = [
    { _id: 'Education', count: 0 },
    { _id: 'Furniture', count: 0 },
    { _id: 'Car for Sale', count: 0 },
    { _id: 'Electronics', count: 0 },
    { _id: 'Flat for Rent', count: 0 },
    { _id: 'Jobs', count: 0 },
    { _id: 'Part Time Jobs', count: 0 },
    { _id: 'Transportation Services', count: 0 },
    { _id: 'Computers & Accessories', count: 0 },
    { _id: 'Business Opportunities', count: 0 },
    { _id: 'Pets & Animals', count: 0 },
    { _id: 'Training and Courses', count: 0 },
  ];

  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <div className="boxed_wrapper">
      {/* Page Title */}
      <section
        className="page-title"
        style={{
          backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)',
        }}
      >
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>All Categories</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>All Categories</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="sidebar-page-container sec-pad-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="content-side col-xs-12 col-sm-12 col-md-12">
              {loading && (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#666' }}>
                  <p>Loading categories...</p>
                </div>
              )}

              {!loading && (
                <div id="directorist" className="atbd_wrapper directorist-w-100">
                  <div className="directorist-container-fluid">
                    <div className="directorist-categories" data-attrs='{"view":"grid","columns":4}'>
                      <div
                        className="directorist-row taxonomy-category-wrapper"
                        style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                          gap: '20px',
                        }}
                      >
                        {displayCategories.map((cat) => {
                          const config = categoryConfig[cat._id] || { icon: '📁', color: '#6b7280', bg: '#f9fafb' };
                          return (
                          <div key={cat._id} className="directorist-col-3" style={{ marginBottom: 0 }}>
                            <a
                              href={`/classifieds/view-classifieds?category=${cat._id}`}
                              style={{ textDecoration: 'none' }}
                            >
                              <div
                                className="directorist-categories__single directorist-categories__single--style-one"
                                style={{
                                  background: '#fff',
                                  border: '2px solid',
                                  borderColor: config.bg,
                                  borderRadius: '16px',
                                  padding: '32px 24px',
                                  textAlign: 'center',
                                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer',
                                  height: '100%',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  gap: '16px',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                                  e.currentTarget.style.transform = 'translateY(-4px)';
                                  e.currentTarget.style.borderColor = config.color;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
                                  e.currentTarget.style.transform = 'translateY(0)';
                                  e.currentTarget.style.borderColor = config.bg;
                                }}
                              >
                                <div
                                  style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    background: config.bg,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '40px',
                                    marginBottom: '8px',
                                  }}
                                >
                                  {config.icon}
                                </div>
                                <div className="directorist-categories__single__content">
                                  <div
                                    className="directorist-categories__single__name"
                                    style={{
                                      color: '#1f2937',
                                      fontWeight: '700',
                                      fontSize: '18px',
                                      display: 'block',
                                      marginBottom: '8px',
                                    }}
                                  >
                                    {cat._id}
                                  </div>
                                  <div
                                    className="directorist-categories__single__total"
                                    style={{
                                      color: '#6b7280',
                                      fontSize: '14px',
                                      fontWeight: '500',
                                    }}
                                  >
                                    <span className="directorist-category-count" style={{ color: config.color, fontWeight: '700' }}>
                                      {cat.count}
                                    </span>{' '}
                                    <span className="directorist-category-term">
                                      {cat.count === 1 ? 'listing' : 'listings'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </a>
                          </div>
                        );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
