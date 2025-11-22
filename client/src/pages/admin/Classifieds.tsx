import React, { useEffect, useState } from 'react'

type ClassifiedItem = {
  _id: string
  title: string
  description: string
  price: number
  category: string
  location: string
  phone?: string
  email?: string
  images: string[]
  status: 'pending' | 'active' | 'inactive'
  views: number
  likes: number
  userId: {
    _id: string
    name: string
    email: string
    phone?: string
  }
  createdAt: string
}

type ApiResponse = {
  ok: boolean
  classifieds: ClassifiedItem[]
}

export default function AdminClassifieds(): React.JSX.Element {
  const [classifieds, setClassifieds] = useState<ClassifiedItem[]>([])
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'active' | 'inactive'>('pending')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [viewModal, setViewModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ClassifiedItem | null>(null)
  const [processing, setProcessing] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (token !== 'admin-authenticated') {
      window.location.href = '/admin'
    }
  }, [])

  useEffect(() => {
    fetchClassifieds()
  }, [filterStatus])

  const fetchClassifieds = async () => {
    setLoading(true)
    setError('')
    try {
      const baseUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001'
      const url = filterStatus === 'all' 
        ? `${baseUrl}/api/admin/classifieds`
        : `${baseUrl}/api/admin/classifieds?status=${filterStatus}`
      
      const res = await fetch(url)
      const data: ApiResponse = await res.json()
      if (res.ok && data.ok) {
        setClassifieds(data.classifieds)
      } else {
        setError('Failed to load classifieds')
      }
    } catch {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id: string) => {
    if (!confirm('Are you sure you want to approve this classified?')) return
    
    setProcessing(id)
    try {
      const baseUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001'
      const res = await fetch(`${baseUrl}/api/admin/classifieds/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      })
      
      const data = await res.json()
      if (res.ok && data.ok) {
        alert('Classified approved successfully!')
        fetchClassifieds()
        if (viewModal) setViewModal(false)
      } else {
        alert(data.error || 'Failed to approve classified')
      }
    } catch {
      alert('Network error')
    } finally {
      setProcessing(null)
    }
  }

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to reject this classified?')) return
    
    setProcessing(id)
    try {
      const baseUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001'
      const res = await fetch(`${baseUrl}/api/admin/classifieds/${id}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      })
      
      const data = await res.json()
      if (res.ok && data.ok) {
        alert('Classified rejected')
        fetchClassifieds()
        if (viewModal) setViewModal(false)
      } else {
        alert(data.error || 'Failed to reject classified')
      }
    } catch {
      alert('Network error')
    } finally {
      setProcessing(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this classified?')) return
    
    setProcessing(id)
    try {
      const baseUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001'
      const res = await fetch(`${baseUrl}/api/admin/classifieds/${id}`, {
        method: 'DELETE'
      })
      
      const data = await res.json()
      if (res.ok && data.ok) {
        alert('Classified deleted successfully')
        fetchClassifieds()
        if (viewModal) setViewModal(false)
      } else {
        alert(data.error || 'Failed to delete classified')
      }
    } catch {
      alert('Network error')
    } finally {
      setProcessing(null)
    }
  }

  const onView = (item: ClassifiedItem) => {
    setSelectedItem(item)
    setViewModal(true)
  }

  const onClose = () => {
    setViewModal(false)
    setSelectedItem(null)
  }

  const formatDate = (iso?: string): string => {
    if (!iso) return '-'
    try {
      return new Intl.DateTimeFormat('en-GB', { 
        day: '2-digit', 
        month: '2-digit', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(new Date(iso))
    } catch {
      return '-'
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: { background: '#fef3c7', color: '#92400e', border: '1px solid #fde68a' },
      active: { background: '#d1fae5', color: '#065f46', border: '1px solid #a7f3d0' },
      inactive: { background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca' }
    }
    return (
      <span style={{ 
        ...styles[status as keyof typeof styles], 
        padding: '4px 10px', 
        borderRadius: 12, 
        fontSize: 12, 
        fontWeight: 600,
        textTransform: 'uppercase'
      }}>
        {status}
      </span>
    )
  }

  const pendingCount = classifieds.filter(c => c.status === 'pending').length

  return (
    <div>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ margin: 0, marginBottom: 4, color: '#111827', fontSize: 18, fontWeight: 600 }}>
            Classifieds Management
            {filterStatus === 'pending' && pendingCount > 0 && (
              <span style={{ 
                marginLeft: 8, 
                background: '#dc2626', 
                color: '#fff', 
                padding: '2px 8px', 
                borderRadius: 12, 
                fontSize: 12,
                fontWeight: 600
              }}>
                {pendingCount}
              </span>
            )}
          </h3>
          <div style={{ color: '#6b7280', fontSize: 14 }}>{classifieds.length} classifieds</div>
        </div>
        
        <div style={{ display: 'flex', gap: 8 }}>
          <button 
            onClick={() => setFilterStatus('all')}
            style={{ 
              padding: '8px 16px', 
              border: '1px solid #e5e7eb', 
              borderRadius: 6, 
              background: filterStatus === 'all' ? '#2563eb' : '#fff',
              color: filterStatus === 'all' ? '#fff' : '#374151',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            All
          </button>
          <button 
            onClick={() => setFilterStatus('pending')}
            style={{ 
              padding: '8px 16px', 
              border: '1px solid #e5e7eb', 
              borderRadius: 6, 
              background: filterStatus === 'pending' ? '#2563eb' : '#fff',
              color: filterStatus === 'pending' ? '#fff' : '#374151',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Pending
          </button>
          <button 
            onClick={() => setFilterStatus('active')}
            style={{ 
              padding: '8px 16px', 
              border: '1px solid #e5e7eb', 
              borderRadius: 6, 
              background: filterStatus === 'active' ? '#2563eb' : '#fff',
              color: filterStatus === 'active' ? '#fff' : '#374151',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Active
          </button>
          <button 
            onClick={() => setFilterStatus('inactive')}
            style={{ 
              padding: '8px 16px', 
              border: '1px solid #e5e7eb', 
              borderRadius: 6, 
              background: filterStatus === 'inactive' ? '#2563eb' : '#fff',
              color: filterStatus === 'inactive' ? '#fff' : '#374151',
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 500
            }}
          >
            Inactive
          </button>
        </div>
      </div>

      {error && (
        <div style={{ 
          background: '#fee2e2', 
          border: '1px solid #fecaca', 
          color: '#b91c1c', 
          padding: 12, 
          borderRadius: 8, 
          marginBottom: 16, 
          fontSize: 14 
        }}>
          {error}
        </div>
      )}

      <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 800, borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f9fafb' }}>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Title</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Category</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Price (KD)</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>User</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Status</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Date</th>
                    <th style={{ textAlign: 'left', borderBottom: '1px solid #e5e7eb', padding: '10px 12px', fontWeight: 600, whiteSpace: 'nowrap' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7} style={{ padding: 12, color: '#6b7280' }}>Loading...</td></tr>
                  ) : classifieds.length === 0 ? (
                    <tr><td colSpan={7} style={{ padding: 12, color: '#6b7280' }}>No classifieds found.</td></tr>
                  ) : (
                    classifieds.map((item) => (
                      <tr key={item._id}>
                        <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: 500, color: '#111827' }}>{item.title}</div>
                          <div style={{ fontSize: 12, color: '#6b7280' }}>{item.location}</div>
                        </td>
                        <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap', color: '#111827' }}>{item.category}</td>
                        <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap', color: '#111827', fontWeight: 500 }}>{Number(item.price).toFixed(2)}</td>
                        <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap' }}>
                          <div style={{ fontSize: 14, color: '#111827' }}>{item.userId?.name || 'Unknown'}</div>
                          <div style={{ fontSize: 12, color: '#6b7280' }}>{item.userId?.email || ''}</div>
                        </td>
                        <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap' }}>{getStatusBadge(item.status)}</td>
                        <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap', fontSize: 13, color: '#6b7280' }}>
                          {formatDate(item.createdAt)}
                        </td>
                        <td style={{ borderBottom: '1px solid #f3f4f6', padding: '10px 12px', whiteSpace: 'nowrap' }}>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button 
                              onClick={() => onView(item)}
                              style={{ 
                                background: '#f3f4f6', 
                                border: '1px solid #e5e7eb', 
                                borderRadius: 6, 
                                padding: '6px 12px', 
                                cursor: 'pointer', 
                                color: '#2563eb', 
                                fontSize: 13,
                                fontWeight: 600
                              }}
                            >
                              View
                            </button>
                            {item.status === 'pending' && (
                              <>
                                <button 
                                  onClick={() => handleApprove(item._id)}
                                  disabled={processing === item._id}
                                  style={{ 
                                    background: '#10b981', 
                                    border: 'none', 
                                    borderRadius: 6, 
                                    padding: '6px 12px', 
                                    cursor: processing === item._id ? 'not-allowed' : 'pointer', 
                                    color: '#fff', 
                                    fontSize: 13,
                                    fontWeight: 500,
                                    opacity: processing === item._id ? 0.6 : 1
                                  }}
                                >
                                  ✓
                                </button>
                                <button 
                                  onClick={() => handleReject(item._id)}
                                  disabled={processing === item._id}
                                  style={{ 
                                    background: '#ef4444', 
                                    border: 'none', 
                                    borderRadius: 6, 
                                    padding: '6px 12px', 
                                    cursor: processing === item._id ? 'not-allowed' : 'pointer', 
                                    color: '#fff', 
                                    fontSize: 13,
                                    fontWeight: 500,
                                    opacity: processing === item._id ? 0.6 : 1
                                  }}
                                >
                                  ✕
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

        {viewModal && selectedItem && (
        <div style={{ 
          position: 'fixed', 
          inset: 0, 
          background: 'rgba(17,24,39,0.5)', 
          display: 'grid', 
          placeItems: 'center',
          zIndex: 9999,
          overflow: 'auto',
          padding: 20
        }}>
          <div style={{ 
            width: 'min(700px, 92%)', 
            background: '#fff', 
            border: '1px solid #e5e7eb', 
            borderRadius: 10, 
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: 16, 
              borderBottom: '1px solid #e5e7eb',
              position: 'sticky',
              top: 0,
              background: '#fff',
              zIndex: 1
            }}>
              <h6 style={{ margin: 0, color: '#111827', fontSize: 18, fontWeight: 600 }}>Classified Details</h6>
              <button 
                onClick={onClose}
                style={{ 
                  background: 'transparent', 
                  border: 'none', 
                  cursor: 'pointer', 
                  fontSize: 24,
                  color: '#6b7280',
                  padding: 4
                }}
              >
                ✕
              </button>
            </div>
            
            <div style={{ padding: 20 }}>
              {/* Images */}
              {selectedItem.images && selectedItem.images.length > 0 && (
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
                    {selectedItem.images.map((img, idx) => (
                      <img 
                        key={idx}
                        src={`${(import.meta as any).env?.VITE_API_URL || 'http://localhost:4001'}${img}`}
                        alt={`Image ${idx + 1}`}
                        style={{ 
                          width: 150, 
                          height: 150, 
                          objectFit: 'cover', 
                          borderRadius: 8,
                          border: '1px solid #e5e7eb'
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Title and Status */}
              <div style={{ marginBottom: 16 }}>
                <h4 style={{ margin: 0, marginBottom: 8, color: '#111827', fontSize: 20 }}>{selectedItem.title}</h4>
                {getStatusBadge(selectedItem.status)}
              </div>

              {/* Details Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: 16, 
                marginBottom: 16,
                padding: 16,
                background: '#f9fafb',
                borderRadius: 8
              }}>
                <div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Category</div>
                  <div style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>{selectedItem.category}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Price</div>
                  <div style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>KD {Number(selectedItem.price).toFixed(2)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Location</div>
                  <div style={{ fontSize: 14, color: '#111827' }}>{selectedItem.location}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Views / Likes</div>
                  <div style={{ fontSize: 14, color: '#111827' }}>{selectedItem.views} / {selectedItem.likes}</div>
                </div>
                {selectedItem.phone && (
                  <div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Phone</div>
                    <div style={{ fontSize: 14, color: '#111827' }}>{selectedItem.phone}</div>
                  </div>
                )}
                {selectedItem.email && (
                  <div>
                    <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 4 }}>Email</div>
                    <div style={{ fontSize: 14, color: '#111827' }}>{selectedItem.email}</div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: 600 }}>Description</div>
                <div style={{ fontSize: 14, color: '#111827', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
                  {selectedItem.description}
                </div>
              </div>

              {/* User Info */}
              <div style={{ 
                padding: 16, 
                background: '#f9fafb', 
                borderRadius: 8,
                marginBottom: 16
              }}>
                <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8, fontWeight: 600 }}>Posted By</div>
                <div style={{ fontSize: 14, color: '#111827', fontWeight: 500 }}>{selectedItem.userId?.name || 'Unknown'}</div>
                <div style={{ fontSize: 13, color: '#6b7280' }}>{selectedItem.userId?.email || ''}</div>
                {selectedItem.userId?.phone && (
                  <div style={{ fontSize: 13, color: '#6b7280' }}>{selectedItem.userId.phone}</div>
                )}
                <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 4 }}>
                  Posted on {formatDate(selectedItem.createdAt)}
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid #e5e7eb' }}>
                {selectedItem.status === 'pending' && (
                  <>
                    <button 
                      onClick={() => handleApprove(selectedItem._id)}
                      disabled={processing === selectedItem._id}
                      style={{ 
                        padding: '10px 20px', 
                        background: '#10b981', 
                        color: '#fff',
                        border: 'none', 
                        borderRadius: 6, 
                        cursor: processing === selectedItem._id ? 'not-allowed' : 'pointer',
                        fontSize: 14,
                        fontWeight: 500,
                        opacity: processing === selectedItem._id ? 0.6 : 1
                      }}
                    >
                      ✓ Approve
                    </button>
                    <button 
                      onClick={() => handleReject(selectedItem._id)}
                      disabled={processing === selectedItem._id}
                      style={{ 
                        padding: '10px 20px', 
                        background: '#ef4444', 
                        color: '#fff',
                        border: 'none', 
                        borderRadius: 6, 
                        cursor: processing === selectedItem._id ? 'not-allowed' : 'pointer',
                        fontSize: 14,
                        fontWeight: 500,
                        opacity: processing === selectedItem._id ? 0.6 : 1
                      }}
                    >
                      ✕ Reject
                    </button>
                  </>
                )}
                <button 
                  onClick={() => handleDelete(selectedItem._id)}
                  disabled={processing === selectedItem._id}
                  style={{ 
                    padding: '10px 20px', 
                    background: '#dc2626', 
                    color: '#fff',
                    border: 'none', 
                    borderRadius: 6, 
                    cursor: processing === selectedItem._id ? 'not-allowed' : 'pointer',
                    fontSize: 14,
                    fontWeight: 500,
                    opacity: processing === selectedItem._id ? 0.6 : 1
                  }}
                >
                  Delete
                </button>
                <button 
                  onClick={onClose}
                  style={{ 
                    padding: '10px 20px', 
                    border: '1px solid #e5e7eb', 
                    background: '#fff', 
                    borderRadius: 6, 
                    cursor: 'pointer',
                    fontSize: 14,
                    color: '#374151'
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

