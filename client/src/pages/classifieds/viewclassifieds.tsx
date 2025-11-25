import React, { useMemo, useState, useEffect } from 'react';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001';

type ClassifiedListing = {
  _id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  phone?: string;
  email?: string;
  images: string[];
  views: number;
  likes: number;
  status: string;
  createdAt: string;
  userId?: { name: string; email: string };
};

export default function ViewClassifieds(): React.JSX.Element {
  const [sortBy, setSortBy] = useState<string>('latest');
  const [listings, setListings] = useState<ClassifiedListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [priceRange, setPriceRange] = useState<'all' | 'low' | 'mid' | 'high'>('all');
  const [selectedItem, setSelectedItem] = useState<ClassifiedListing | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchClassifieds();
  }, []);

  const fetchClassifieds = async () => {
    try {
      const response = await fetch(`${API_URL}/api/classifieds`);
      if (!response.ok) throw new Error('Failed to fetch classifieds');
      
      const data = await response.json();
      setListings(data.classifieds || []);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { name: 'All Categories', value: 'all', icon: '🏷️' },
    { name: 'Education', value: 'Education', icon: '📚' },
    { name: 'Furniture', value: 'Furniture', icon: '🛋️' },
    { name: 'Car for Sale', value: 'Car for Sale', icon: '🚗' },
    { name: 'Electronics', value: 'Electronics', icon: '📱' },
    { name: 'Flat for Rent', value: 'Flat for Rent', icon: '🏠' },
    { name: 'Jobs', value: 'Jobs', icon: '💼' },
    { name: 'Part Time Jobs', value: 'Part Time Jobs', icon: '⏰' },
    { name: 'Transportation', value: 'Transportation Services', icon: '🚌' },
    { name: 'Computers', value: 'Computers & Accessories', icon: '💻' },
    { name: 'Business', value: 'Business Opportunities', icon: '💰' },
    { name: 'Pets & Animals', value: 'Pets & Animals', icon: '🐾' },
    { name: 'Training', value: 'Training and Courses', icon: '🎓' },
  ];

  const filteredListings = useMemo(() => {
    let filtered = [...listings];
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query)
      );
    }
    
    // Filter by price range
    if (priceRange !== 'all') {
      filtered = filtered.filter(item => {
        const price = Number(item.price);
        if (priceRange === 'low') return price < 100;
        if (priceRange === 'mid') return price >= 100 && price < 500;
        if (priceRange === 'high') return price >= 500;
        return true;
      });
    }
    
    return filtered;
  }, [listings, selectedCategory, searchQuery, priceRange]);

  const sortedListings = useMemo(() => {
    const arr = [...filteredListings];
    
    switch (sortBy) {
      case 'latest':
        return arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return arr.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      case 'price-low':
        return arr.sort((a, b) => Number(a.price) - Number(b.price));
      case 'price-high':
        return arr.sort((a, b) => Number(b.price) - Number(a.price));
      case 'popular':
        return arr.sort((a, b) => b.views - a.views);
      case 'title-az':
        return arr.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return arr;
    }
  }, [filteredListings, sortBy]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const handleViewItem = (item: ClassifiedListing) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleContactSeller = (item: ClassifiedListing, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedItem(item);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedItem(null);
  };

  return (
    <div className="boxed_wrapper" style={{ background: '#f9fafb' }}>
      {/* Hero Section */}
      {/* Page Title */}
      <section className="page-title" style={{ backgroundImage: 'url(https://kkma.net/wp-content/uploads/2024/08/KKMA-page-title.jpg)' }}>
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred"><h1>View Classifieds</h1></div>
            <ul className="bread-crumb clearfix"><li><a href="/">Home</a></li><li>View Classifieds</li></ul>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '40px 0 80px' }}>
          <div className="auto-container">
          {/* Categories Filter - Horizontal Scroll */}
          <div style={{ marginBottom: 32, overflowX: 'auto', paddingBottom: 8 }}>
            <div style={{ display: 'flex', gap: 12, minWidth: 'max-content' }}>
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value)}
              style={{
                    background: selectedCategory === cat.value ? '#83B253' : '#fff',
                    color: selectedCategory === cat.value ? '#fff' : '#374151',
                    border: selectedCategory === cat.value ? 'none' : '1px solid #e5e7eb',
                    borderRadius: 50,
                    padding: '12px 24px',
                    fontSize: 15,
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                    gap: 8,
                    boxShadow: selectedCategory === cat.value ? '0 4px 12px rgba(131, 178, 83, 0.4)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (selectedCategory !== cat.value) {
                      e.currentTarget.style.background = '#f3f4f6';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedCategory !== cat.value) {
                      e.currentTarget.style.background = '#fff';
                    }
                    }}
                  >
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                  </button>
              ))}
            </div>
          </div>

          {/* Filters & Sort Bar */}
          <div style={{
            background: '#fff',
            borderRadius: 16,
            padding: '20px 24px',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div>
                <span style={{ fontSize: 14, color: '#6b7280', marginRight: 8 }}>Price:</span>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value as any)}
                    style={{
                      border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 14,
                    color: '#374151',
                    cursor: 'pointer',
                    outline: 'none'
                    }}
                  >
                  <option value="all">All Prices</option>
                  <option value="low">Under KD 100</option>
                  <option value="mid">KD 100 - 500</option>
                  <option value="high">Above KD 500</option>
                </select>
              </div>
              
              <div>
                <span style={{ fontSize: 14, color: '#6b7280', marginRight: 8 }}>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  style={{
                    border: '1px solid #e5e7eb',
                    borderRadius: 8,
                    padding: '8px 12px',
                    fontSize: 14,
                    color: '#374151',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="latest">Latest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                  <option value="title-az">Title: A to Z</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 16, color: '#111827', fontWeight: 600 }}>
                {sortedListings.length}
              </span>
              <span style={{ fontSize: 14, color: '#6b7280' }}>
                {sortedListings.length === 1 ? 'listing' : 'listings'} found
              </span>
          </div>
        </div>

          {/* Loading State */}
              {loading && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{
                width: 50,
                height: 50,
                border: '4px solid #f3f4f6',
                borderTop: '4px solid #83B253',
                borderRadius: '50%',
                margin: '0 auto 16px',
                animation: 'spin 1s linear infinite'
              }} />
              <p style={{ color: '#6b7280', fontSize: 16 }}>Loading classifieds...</p>
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
                </div>
              )}

          {/* Error State */}
              {error && (
            <div style={{
              background: '#fee2e2',
              border: '1px solid #fecaca',
              borderRadius: 12,
              padding: 20,
              color: '#dc2626',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: 32, marginBottom: 8, display: 'block' }}>⚠️</span>
                  {error}
                </div>
              )}

          {/* Empty State */}
          {!loading && sortedListings.length === 0 && !error && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <span style={{ fontSize: 64, marginBottom: 16, display: 'block' }}>🔍</span>
              <h3 style={{ fontSize: 24, color: '#111827', marginBottom: 8 }}>No classifieds found</h3>
              
                </div>
              )}

          {/* Grid of Classifieds */}
          {!loading && sortedListings.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: 24
            }}>
              {sortedListings.map((item) => (
                <article
                          key={item._id}
                  onClick={() => handleViewItem(item)}
                  style={{
                    background: '#fff',
                    borderRadius: 16,
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                    border: '1px solid #e5e7eb',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Image */}
                  <div style={{ 
                                    position: 'relative',
                    height: 250, 
                    overflow: 'hidden',
                    background: '#f3f4f6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <img
                      src={item.images[0]
                        ? `${API_URL}${item.images[0]}`
                        : 'https://kkma.net/wp-content/uploads/2024/09/KKMA-CLASSIFIEDS.jpg'}
                      alt={item.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    />
                    
                    {/* Date Badge */}
                    <span style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(8px)',
                      color: '#fff',
                      padding: '6px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 500,
                      zIndex: 2
                    }}>
                      {formatDate(item.createdAt)}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: 20, display: 'flex', flexDirection: 'column', flex: 1 }}>
                    {/* Category */}
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      background: '#f3f4f6',
                      padding: '6px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#83B253',
                      marginBottom: 12,
                      width: 'fit-content'
                    }}>
                      📁 {item.category}
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: '#111827',
                      marginBottom: 8,
                      lineHeight: 1.4,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontSize: 14,
                      color: '#6b7280',
                      lineHeight: 1.6,
                      marginBottom: 16,
                                    overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical'
                    }}>
                      {item.description}
                    </p>

                    {/* Location */}
                    {item.location && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 14,
                        color: '#6b7280',
                        marginBottom: 16
                      }}>
                        <span>📍</span>
                        <span>{item.location}</span>
                      </div>
                    )}

                    {/* Footer */}
                    <div style={{
                      marginTop: 'auto',
                      paddingTop: 16,
                      borderTop: '1px solid #f3f4f6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}>
                      {/* Price */}
                      <div>
                        <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 2 }}>Price</div>
                        <div style={{
                          fontSize: 24,
                          fontWeight: 700,
                          color: '#83B253'
                        }}>
                          KD {Number(item.price).toFixed(2)}
                        </div>
                      </div>
                    </div>

                    {/* Contact Button */}
                    {(item.phone || item.email) && (
                      <button 
                        onClick={(e) => handleContactSeller(item, e)}
                        style={{
                          marginTop: 16,
                          background: '#83B253',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 10,
                          padding: '12px 24px',
                          fontSize: 15,
                          fontWeight: 600,
                          cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                          width: '100%'
                        }}
                            onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#6a9944';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 8px 16px rgba(131, 178, 83, 0.3)';
                            }}
                            onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#83B253';
                          e.currentTarget.style.transform = 'translateY(0)';
                              e.currentTarget.style.boxShadow = 'none';
                        }}>
                        📞 Contact Seller
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      {showModal && selectedItem && (
        <div 
          onClick={closeModal}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            overflow: 'auto'
                            }}
                          >
                            <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              borderRadius: 16,
              maxWidth: 800,
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative'
            }}
                            >
            {/* Close Button */}
            <button
              onClick={closeModal}
                                  style={{
                                    position: 'absolute',
                top: 16,
                right: 16,
                background: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 20,
                color: '#6b7280',
                zIndex: 10,
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                  }}
                                >
              ✕
            </button>

            {/* Image Gallery */}
            {selectedItem.images && selectedItem.images.length > 0 && (
              <div style={{ 
                position: 'relative', 
                background: '#f3f4f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 400,
                maxHeight: 500
              }}>
                <img 
                  src={`${API_URL}${selectedItem.images[0]}`}
                  alt={selectedItem.title}
                                style={{
                                  width: '100%',
                    height: '100%',
                    maxHeight: 500,
                    objectFit: 'contain'
                                }}
                              />
                            </div>
            )}

            {/* Content */}
            <div style={{ padding: 32 }}>
              {/* Category */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#f3f4f6',
                padding: '8px 16px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                color: '#83B253',
                marginBottom: 16
              }}>
                📁 {selectedItem.category}
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: 32,
                fontWeight: 700,
                color: '#111827',
                marginBottom: 16,
                lineHeight: 1.3
              }}>
                {selectedItem.title}
                                    </h2>

              {/* Price */}
              <div style={{
                fontSize: 36,
                fontWeight: 700,
                color: '#83B253',
                marginBottom: 24
              }}>
                KD {Number(selectedItem.price).toFixed(2)}
                                      </div>

              {/* Meta Info */}
              <div style={{
                display: 'flex',
                gap: 24,
                marginBottom: 24,
                paddingBottom: 24,
                borderBottom: '1px solid #e5e7eb',
                flexWrap: 'wrap'
              }}>
                {selectedItem.location && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280' }}>
                    <span>📍</span>
                    <span>{selectedItem.location}</span>
                                        </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280' }}>
                  <span>📅</span>
                  <span>{formatDate(selectedItem.createdAt)}</span>
                                </div>
                              </div>

              {/* Description */}
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ 
                  fontSize: 18, 
                  fontWeight: 600, 
                  color: '#111827', 
                  marginBottom: 12 
                }}>
                  Description
                </h3>
                <p style={{
                  fontSize: 16,
                  lineHeight: 1.8,
                  color: '#4b5563',
                  whiteSpace: 'pre-wrap'
                }}>
                  {selectedItem.description}
                </p>
              </div>

              {/* Contact Information */}
              {(selectedItem.phone || selectedItem.email) && (
                <div style={{
                  background: '#f9fafb',
                  borderRadius: 12,
                  padding: 24,
                  marginBottom: 24
                }}>
                  <h3 style={{ 
                    fontSize: 18, 
                    fontWeight: 600, 
                    color: '#111827', 
                    marginBottom: 16 
                  }}>
                    Contact Seller
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {selectedItem.phone && (
                      <a 
                        href={`tel:${selectedItem.phone}`}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                          gap: 12,
                          padding: '12px 16px',
                          background: '#fff',
                          borderRadius: 8,
                          textDecoration: 'none',
                          color: '#111827',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#83B253';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fff';
                          e.currentTarget.style.color = '#111827';
                        }}
                      >
                        <span style={{ fontSize: 20 }}>📞</span>
                        <span style={{ fontSize: 16, fontWeight: 500 }}>{selectedItem.phone}</span>
                      </a>
                    )}
                    {selectedItem.email && (
                      <a 
                        href={`mailto:${selectedItem.email}`}
                                      style={{
                          display: 'flex',
                                        alignItems: 'center',
                          gap: 12,
                          padding: '12px 16px',
                          background: '#fff',
                          borderRadius: 8,
                          textDecoration: 'none',
                          color: '#111827',
                          border: '1px solid #e5e7eb',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#83B253';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fff';
                          e.currentTarget.style.color = '#111827';
                        }}
                                >
                        <span style={{ fontSize: 20 }}>✉️</span>
                        <span style={{ fontSize: 16, fontWeight: 500 }}>{selectedItem.email}</span>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
