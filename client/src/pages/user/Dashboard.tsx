import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserAuthenticated, getUserToken, getUserData, logout } from '../../utils/userAuth';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001';

interface Classified {
  _id: string;
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  phone?: string;
  email?: string;
  images: string[];
  status: 'active' | 'inactive' | 'pending';
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

export default function UserDashboard(): React.JSX.Element {
  const navigate = useNavigate();
  const [classifieds, setClassifieds] = useState<Classified[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Classified>>({});
  const userData = getUserData();

  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate('/user');
      return;
    }
    fetchClassifieds();
  }, [navigate]);

  const fetchClassifieds = async () => {
    try {
      const response = await fetch(`${API_URL}/api/classifieds/user/my-posts`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch classifieds');
      }

      const data = await response.json();
      setClassifieds(data.classifieds);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this classified?')) return;

    try {
      const response = await fetch(`${API_URL}/api/classifieds/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete classified');
      }

      setClassifieds(classifieds.filter((c) => c._id !== id));
      alert('Classified deleted successfully');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to delete');
    }
  };

  const startEdit = (classified: Classified) => {
    setEditingId(classified._id);
    setEditData({
      title: classified.title,
      description: classified.description,
      price: classified.price,
      category: classified.category,
      location: classified.location,
      phone: classified.phone,
      email: classified.email,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/api/classifieds/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error('Failed to update classified');
      }

      const data = await response.json();
      setClassifieds(classifieds.map((c) => (c._id === id ? data.classified : c)));
      setEditingId(null);
      setEditData({});
      alert('Classified updated successfully');
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to update');
    }
  };

  if (!isUserAuthenticated()) {
    return null;
  }

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
              <h1>My Dashboard</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Dashboard</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Dashboard Section */}
      <section className="sidebar-page-container sec-pad-2">
        <div className="auto-container">
          <div className="row clearfix">
            {/* Sidebar */}
            <div className="col-lg-3 col-md-4 col-sm-12">
              <div
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '24px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                  <div
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 12px',
                      color: '#fff',
                      fontSize: '32px',
                      fontWeight: '700',
                    }}
                  >
                    {userData?.name?.charAt(0).toUpperCase()}
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#000', marginBottom: '4px' }}>
                    {userData?.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#666' }}>{userData?.email}</p>
                </div>

                <nav>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ marginBottom: '8px' }}>
                      <a
                        href="/user/dashboard"
                        style={{
                          display: 'block',
                          padding: '12px 16px',
                          background: '#f3f4f6',
                          borderRadius: '8px',
                          color: '#000',
                          textDecoration: 'none',
                          fontWeight: '600',
                          transition: 'background 0.2s',
                        }}
                      >
                        📋 My Classifieds
                      </a>
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                      <a
                        href="/classifieds/add-post"
                        style={{
                          display: 'block',
                          padding: '12px 16px',
                          background: '#fff',
                          borderRadius: '8px',
                          color: '#000',
                          textDecoration: 'none',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                      >
                        ➕ Add New Post
                      </a>
                    </li>
                    <li style={{ marginBottom: '8px' }}>
                      <a
                        href="/classifieds/view-classifieds"
                        style={{
                          display: 'block',
                          padding: '12px 16px',
                          background: '#fff',
                          borderRadius: '8px',
                          color: '#000',
                          textDecoration: 'none',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f3f4f6')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#fff')}
                      >
                        🔍 Browse All
                      </a>
                    </li>
                    <li style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
                      <button
                        onClick={logout}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          background: '#fee',
                          borderRadius: '8px',
                          color: '#c33',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: '600',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#fdd')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = '#fee')}
                      >
                        🚪 Logout
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-lg-9 col-md-8 col-sm-12">
              {/* Stats Cards */}
              {!loading && classifieds.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      borderRadius: '12px',
                      padding: '24px',
                      color: '#fff',
                    }}
                  >
                    <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                      {classifieds.length}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Posts</div>
                  </div>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                      borderRadius: '12px',
                      padding: '24px',
                      color: '#fff',
                    }}
                  >
                    <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                      {classifieds.filter((c) => c.status === 'active').length}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Active</div>
                  </div>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                      borderRadius: '12px',
                      padding: '24px',
                      color: '#fff',
                    }}
                  >
                    <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                      {classifieds.reduce((sum, c) => sum + c.views, 0)}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Views</div>
                  </div>
                  <div
                    style={{
                      background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                      borderRadius: '12px',
                      padding: '24px',
                      color: '#fff',
                    }}
                  >
                    <div style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
                      {classifieds.reduce((sum, c) => sum + c.likes, 0)}
                    </div>
                    <div style={{ fontSize: '14px', opacity: 0.9 }}>Total Likes</div>
                  </div>
                </div>
              )}

              <div
                style={{
                  background: '#fff',
                  borderRadius: '12px',
                  padding: '32px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#000', margin: 0 }}>
                    My Classifieds
                  </h2>
                  <a
                    href="/classifieds/add-post"
                    style={{
                      padding: '10px 20px',
                      background: '#4f46e5',
                      color: '#fff',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '14px',
                    }}
                  >
                    + Add New
                  </a>
                </div>

                {loading && <p>Loading your classifieds...</p>}

                {error && (
                  <div
                    style={{
                      background: '#fee',
                      border: '1px solid #fcc',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      color: '#c33',
                    }}
                  >
                    {error}
                  </div>
                )}

                {!loading && classifieds.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <p style={{ fontSize: '16px', color: '#666', marginBottom: '16px' }}>
                      You haven't posted any classifieds yet.
                    </p>
                    <a
                      href="/classifieds/add-post"
                      style={{
                        display: 'inline-block',
                        padding: '12px 24px',
                        background: '#4f46e5',
                        color: '#fff',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontWeight: '600',
                      }}
                    >
                      Create Your First Post
                    </a>
                  </div>
                )}

                {!loading && classifieds.length > 0 && (
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {classifieds.map((classified) => (
                      <div
                        key={classified._id}
                        style={{
                          border: '1px solid #e5e7eb',
                          borderRadius: '12px',
                          padding: '20px',
                          background: '#fafafa',
                        }}
                      >
                        {editingId === classified._id ? (
                          // Edit Mode
                          <div>
                            <div style={{ marginBottom: '16px' }}>
                              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
                                Title
                              </label>
                              <input
                                type="text"
                                value={editData.title || ''}
                                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  border: '1px solid #ddd',
                                  borderRadius: '6px',
                                }}
                              />
                            </div>
                            <div style={{ marginBottom: '16px' }}>
                              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
                                Description
                              </label>
                              <textarea
                                value={editData.description || ''}
                                onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                rows={4}
                                style={{
                                  width: '100%',
                                  padding: '8px 12px',
                                  border: '1px solid #ddd',
                                  borderRadius: '6px',
                                  fontFamily: 'inherit',
                                }}
                              />
                            </div>
                            <div className="row">
                              <div className="col-md-6" style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
                                  Price
                                </label>
                                <input
                                  type="text"
                                  value={editData.price || ''}
                                  onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                  }}
                                />
                              </div>
                              <div className="col-md-6" style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '600' }}>
                                  Location
                                </label>
                                <input
                                  type="text"
                                  value={editData.location || ''}
                                  onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                  style={{
                                    width: '100%',
                                    padding: '8px 12px',
                                    border: '1px solid #ddd',
                                    borderRadius: '6px',
                                  }}
                                />
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                              <button
                                onClick={() => saveEdit(classified._id)}
                                style={{
                                  padding: '8px 16px',
                                  background: '#10b981',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontWeight: '600',
                                }}
                              >
                                Save
                              </button>
                              <button
                                onClick={cancelEdit}
                                style={{
                                  padding: '8px 16px',
                                  background: '#6b7280',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  fontWeight: '600',
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                              <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#000', marginBottom: '8px' }}>
                                  {classified.title}
                                </h3>
                                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666', marginBottom: '8px' }}>
                                  <span>
                                    <strong>Category:</strong> {classified.category}
                                  </span>
                                  <span>
                                    <strong>Price:</strong> KD {classified.price}
                                  </span>
                                  <span>
                                    <strong>Location:</strong> {classified.location}
                                  </span>
                                </div>
                                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#666' }}>
                                  <span>👁️ {classified.views} views</span>
                                  <span>❤️ {classified.likes} likes</span>
                                  <span
                                    style={{
                                      padding: '2px 8px',
                                      borderRadius: '4px',
                                      background:
                                        classified.status === 'active'
                                          ? '#d1fae5'
                                          : classified.status === 'pending'
                                          ? '#fef3c7'
                                          : '#fee',
                                      color:
                                        classified.status === 'active'
                                          ? '#065f46'
                                          : classified.status === 'pending'
                                          ? '#92400e'
                                          : '#991b1b',
                                      fontWeight: '600',
                                    }}
                                  >
                                    {classified.status.toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: '8px' }}>
                                <button
                                  onClick={() => startEdit(classified)}
                                  style={{
                                    padding: '8px 16px',
                                    background: '#3b82f6',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDelete(classified._id)}
                                  style={{
                                    padding: '8px 16px',
                                    background: '#ef4444',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                  }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                            <p style={{ color: '#333', fontSize: '15px', lineHeight: '1.6' }}>
                              {classified.description}
                            </p>
                            {classified.images.length > 0 && (
                              <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                                {classified.images.slice(0, 3).map((img, idx) => (
                                  <img
                                    key={idx}
                                    src={`${API_URL}${img}`}
                                    alt={`${classified.title} ${idx + 1}`}
                                    style={{
                                      width: '80px',
                                      height: '80px',
                                      objectFit: 'cover',
                                      borderRadius: '6px',
                                      border: '1px solid #ddd',
                                    }}
                                  />
                                ))}
                                {classified.images.length > 3 && (
                                  <div
                                    style={{
                                      width: '80px',
                                      height: '80px',
                                      background: '#f3f4f6',
                                      borderRadius: '6px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      color: '#666',
                                      fontSize: '14px',
                                      fontWeight: '600',
                                    }}
                                  >
                                    +{classified.images.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

