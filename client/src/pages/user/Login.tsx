import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { setUserToken, setUserData } from '../../utils/userAuth';
import { API_URL } from '../../utils/config';

export default function UserLogin(): React.JSX.Element {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? '/api/user/login' : '/api/user/register';
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      setUserToken(data.token);
      setUserData(data.user);
      navigate('/user/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="boxed_wrapper">
      {/* Page Title */}
      <section
        className="page-title"
        style={{
          backgroundImage: 'url(/images/page-title/KKMA-page-title.jpg)',
        }}
      >
        <div className="auto-container">
          <div className="content-box">
            <div className="title centred">
              <h1>{isLogin ? 'User Login' : 'Create Account'}</h1>
            </div>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>{isLogin ? 'Login' : 'Register'}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Login/Register Form */}
      <section className="sidebar-page-container sec-pad-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-8 col-sm-12 mx-auto">
              <div
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '40px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                  <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#000', marginBottom: '8px' }}>
                    {isLogin ? 'Welcome Back!' : 'Create Your Account'}
                  </h2>
                  <p style={{ color: '#666', fontSize: '15px' }}>
                    {isLogin
                      ? 'Login to manage your classifieds'
                      : 'Sign up to post and manage classifieds'}
                  </p>
                </div>

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
                  {!isLogin && (
                    <div style={{ marginBottom: '20px' }}>
                      <label
                        htmlFor="name"
                        style={{
                          display: 'block',
                          marginBottom: '8px',
                          color: '#333',
                          fontSize: '14px',
                          fontWeight: '600',
                        }}
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required={!isLogin}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
                        onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                      />
                    </div>
                  )}

                  <div style={{ marginBottom: '20px' }}>
                    <label
                      htmlFor="email"
                      style={{
                        display: 'block',
                        marginBottom: '8px',
                        color: '#333',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '15px',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
                      onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                    />
                  </div>

                  <div style={{ marginBottom: '20px' }}>
                    <label
                      htmlFor="password"
                      style={{
                        display: 'block',
                        marginBottom: '8px',
                        color: '#333',
                        fontSize: '14px',
                        fontWeight: '600',
                      }}
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      required
                      minLength={6}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        fontSize: '15px',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
                      onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                    />
                  </div>

                  {!isLogin && (
                    <div style={{ marginBottom: '20px' }}>
                      <label
                        htmlFor="phone"
                        style={{
                          display: 'block',
                          marginBottom: '8px',
                          color: '#333',
                          fontSize: '14px',
                          fontWeight: '600',
                        }}
                      >
                        Phone Number (Optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '12px 16px',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                          fontSize: '15px',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#4f46e5')}
                        onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: loading ? '#999' : '#4f46e5',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => !loading && (e.currentTarget.style.background = '#4338ca')}
                    onMouseLeave={(e) => !loading && (e.currentTarget.style.background = '#4f46e5')}
                  >
                    {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
                  </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', color: '#666', fontSize: '14px' }}>
                  {isLogin ? "Don't have an account? " : 'Already have an account? '}
                  <button
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError('');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#4f46e5',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textDecoration: 'underline',
                    }}
                  >
                    {isLogin ? 'Sign Up' : 'Login'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

