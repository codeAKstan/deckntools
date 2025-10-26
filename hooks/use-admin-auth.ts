import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AdminAuthStore {
  isAuthenticated: boolean
  adminEmail: string | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

// Simple demo credentials - in production, use a real backend
const DEMO_EMAIL = "admin@decking.com"
const DEMO_PASSWORD = "admin123"

export const useAdminAuth = create<AdminAuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      adminEmail: null,
      login: (email: string, password: string) => {
        if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
          set({ isAuthenticated: true, adminEmail: email })
          return true
        }
        return false
      },
      logout: () => set({ isAuthenticated: false, adminEmail: null }),
    }),
    {
      name: "admin-auth-storage",
    },
  ),
)
