import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface AdminProduct {
  id: number
  name: string
  category: string
  price: number
  stock: number
  image: string
  description: string
}

interface AdminProductStore {
  products: AdminProduct[]
  addProduct: (product: Omit<AdminProduct, "id">) => void
  updateProduct: (id: number, product: Partial<AdminProduct>) => void
  deleteProduct: (id: number) => void
  getProduct: (id: number) => AdminProduct | undefined
}

export const useAdminProducts = create<AdminProductStore>()(
  persist(
    (set, get) => ({
      products: [
        {
          id: 1,
          name: "Composite Decking Boards",
          category: "Decking Materials",
          price: 45.99,
          stock: 150,
          image: "/composite-decking-boards.jpg",
          description: "Premium composite decking boards with UV protection",
        },
        {
          id: 2,
          name: "Wooden Joists & Beams",
          category: "Decking Materials",
          price: 89.99,
          stock: 80,
          image: "/wooden-joists-beams.jpg",
          description: "High-quality timber joists and beams for structural support",
        },
        {
          id: 3,
          name: "Stainless Steel Fasteners",
          category: "Fasteners",
          price: 12.99,
          stock: 500,
          image: "/stainless-steel-fasteners.jpg",
          description: "Corrosion-resistant stainless steel fasteners",
        },
      ],
      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, { ...product, id: Math.max(...state.products.map((p) => p.id), 0) + 1 }],
        })),
      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) => (p.id === id ? { ...p, ...updates } : p)),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      getProduct: (id) => {
        const state = get()
        return state.products.find((p) => p.id === id)
      },
    }),
    {
      name: "admin-products-storage",
    },
  ),
)
