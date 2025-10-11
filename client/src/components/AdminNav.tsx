import React from "react"

export default function AdminNav(): React.JSX.Element {
  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    window.location.href = "/admin/login"
  }

  return (
    <nav style={{
      background: "#fff",
      borderBottom: "1px solid #e5e7eb",
      padding: "16px 0",
      marginBottom: "20px"
    }}>
      <div className="auto-container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <a href="/admin/contacts" style={{ color: "#000", textDecoration: "none", fontWeight: "600" }}>
              Admin Dashboard
            </a>
            <a href="/admin/contacts" style={{ color: "#666", textDecoration: "none" }}>
              Listings
            </a>
            <a href="/admin/categories" style={{ color: "#666", textDecoration: "none" }}>
              Categories
            </a>
            <a href="/admin/users" style={{ color: "#666", textDecoration: "none" }}>
              Users
            </a>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "#dc2626",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "8px 16px",
              cursor: "pointer",
              fontSize: "14px"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}



