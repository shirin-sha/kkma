export const isAdminAuthenticated = (): boolean => {
  const token = localStorage.getItem("adminToken")
  return token === "admin-authenticated"
}

export const getAdminUser = (): string | null => {
  return localStorage.getItem("adminUser")
}

export const logoutAdmin = (): void => {
  localStorage.removeItem("adminToken")
  localStorage.removeItem("adminUser")
}


