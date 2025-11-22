import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isUserAuthenticated, getUserToken } from '../../utils/userAuth';

const API_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001';

const categories = [
  'Education',
  'Furniture',
  'Car for Sale',
  'Electronics',
  'Flat for Rent',
  'Jobs',
  'Part Time Jobs',
  'Transportation Services',
  'Computers & Accessories',
  'Business Opportunities',
  'Pets & Animals',
  'Training and Courses',
];

const locations = [
  'Mahboula',
  'Farwaniya',
  'Salmiya',
  'Jleeb Al Shuyouk',
  'Hawally',
  'Ahmadi',
  'Jabriya',
  'Mangaf',
  'Kuwait City',
  'Salwa',
];

export default function AddPost(): React.JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    location: '',
    phone: '',
    email: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isUserAuthenticated()) {
      navigate('/user');
    }
  }, [navigate]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (filesArray.length + images.length > 5) {
        setError('Maximum 5 images allowed');
        return;
      }
      setImages([...images, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);

      images.forEach((image) => {
        formDataToSend.append('images', image);
      });

      const response = await fetch(`${API_URL}/api/classifieds`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
        body: formDataToSend,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create classified');
      }

      alert('Your classified has been submitted for review!');
      navigate('/user/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!isUserAuthenticated()) {
    return (
      <div className="boxed_wrapper">
        <section className="sidebar-page-container sec-pad-2">
          <div className="auto-container">
            <div className="text-center">
              <h2>Please login to add a post</h2>
              <p>
                <a href="/user" style={{ color: '#4f46e5', textDecoration: 'underline' }}>
                  Click here to login
                </a>
              </p>
            </div>
          </div>
        </section>
      </div>
    );
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
              <h1>Add Your Post</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>Add Post</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Add Post Form */}
      <section className="sidebar-page-container sec-pad-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-10 col-md-12 mx-auto">
              <div
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '40px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                }}
              >
                <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#000', marginBottom: '24px' }}>
                  Create New Classified
                </h2>

                {error && (
                  <div
                    style={{
                      background: '#fee',
                      border: '1px solid #fcc',
                      borderRadius: '8px',
                      padding: '12px 16px',
                      marginBottom: '20px',
                      color: '#c33',
                      fontSize: '14px',
                    }}
                  >
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-12" style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
                        Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                        placeholder="e.g., iPhone 13 Pro Max"
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                        }}
                      />
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
                        Category *
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        required
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                        }}
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
                        Price (KD) *
                      </label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        required
                        placeholder=""
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                        }}
                      />
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
                        Location *
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        placeholder=""
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                        }}
                      />
                    </div>

                    <div className="col-md-6" style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                        }}
                      />
                    </div>

                    <div className="col-md-12" style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                        }}
                      />
                    </div>

                    <div className="col-md-12" style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                        rows={6}
                        placeholder="Describe your item in detail..."
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                          fontFamily: 'inherit',
                        }}
                      />
                    </div>

                    <div className="col-md-12" style={{ marginBottom: '24px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', color: '#333', fontWeight: '600' }}>
                        Images (Max 5)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                        }}
                      />
                      {images.length > 0 && (
                        <div style={{ marginTop: '12px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                          {images.map((img, idx) => (
                            <div
                              key={idx}
                              style={{
                                position: 'relative',
                                width: '100px',
                                height: '100px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: '1px solid #ddd',
                              }}
                            >
                              <img
                                src={URL.createObjectURL(img)}
                                alt={`Preview ${idx + 1}`}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                style={{
                                  position: 'absolute',
                                  top: '4px',
                                  right: '4px',
                                  background: 'rgba(0,0,0,0.7)',
                                  color: '#fff',
                                  border: 'none',
                                  borderRadius: '50%',
                                  width: '24px',
                                  height: '24px',
                                  cursor: 'pointer',
                                  fontSize: '16px',
                                  lineHeight: '1',
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="col-md-12">
                      <button
                        type="submit"
                        disabled={loading}
                        style={{
                          padding: '14px 32px',
                          background: loading ? '#999' : '#4f46e5',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '16px',
                          fontWeight: '600',
                          cursor: loading ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {loading ? 'Submitting...' : 'Submit Classified'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

