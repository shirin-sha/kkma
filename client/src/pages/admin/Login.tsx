import React, { useState } from "react"

interface LoginFormData {
  username: string
  password: string
}

export default function AdminLogin(): React.JSX.Element {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const baseUrl = (import.meta as any).env?.VITE_API_URL || 'http://localhost:4001'
      const res = await fetch(`${baseUrl}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: formData.username, password: formData.password }),
      })
      const data = await res.json()

      if (res.ok && data?.ok) {
        localStorage.setItem("adminToken", "admin-authenticated")
        localStorage.setItem("adminUser", formData.username)
        window.location.href = "/admin/contacts"
      } else {
        setError(data?.error || "Invalid username or password")
      }
    } catch (err) {
      setError("Login failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="boxed_wrapper">
      {/* Admin Login (lightweight) */}

      {/* Login Form */}
      <section className="sidebar-page-container sec-pad-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="content-side col-xs-12 col-sm-12 col-md-8 col-lg-6" style={{ margin: "0 auto" }}>
              <div style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                padding: "24px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                maxWidth: "380px",
                margin: "0 auto"
              }}>
                <h2 style={{ textAlign: "center", marginBottom: "16px", color: "#000", fontSize: "20px" }}>Admin Login</h2>
                
                {error && (
                  <div style={{
                    background: "#fee2e2",
                    border: "1px solid #fecaca",
                    color: "#dc2626",
                    padding: "10px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    fontSize: "14px"
                  }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "14px" }}>
                    <label style={{ display: "block", marginBottom: "6px", color: "#000", fontWeight: "500", fontSize: "14px" }}>
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        color: "#000",
                        backgroundColor: "#fff"
                      }}
                      placeholder="Enter username"
                    />
                  </div>

                  <div style={{ marginBottom: "18px" }}>
                    <label style={{ display: "block", marginBottom: "6px", color: "#000", fontWeight: "500", fontSize: "14px" }}>
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: "100%",
                        padding: "10px",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontSize: "14px",
                        color: "#000",
                        backgroundColor: "#fff"
                      }}
                      placeholder="Enter password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      width: "100%",
                      padding: "12px",
                      background: isLoading ? "#9ca3af" : "#000",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: isLoading ? "not-allowed" : "pointer",
                      transition: "background-color 0.2s ease"
                    }}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </button>
                </form>

                <div style={{ marginTop: "12px", textAlign: "center", fontSize: "12px", color: "#666" }}>
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
