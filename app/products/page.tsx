"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

const allProducts = [
  // Decking Materials
  {
    id: 1,
    name: "Premium Composite Decking Boards",
    price: 45.99,
    image: "/composite-decking-boards.jpg",
    category: "Decking Materials",
    rating: 4.8,
    description: "Weather-resistant composite boards, 25-year warranty",
  },
  {
    id: 2,
    name: "Pressure-Treated Joists (2x8x12)",
    price: 28.5,
    image: "/wooden-joists-beams.jpg",
    category: "Decking Materials",
    rating: 4.6,
    description: "Durable pressure-treated lumber for deck support",
  },
  {
    id: 3,
    name: "Cedar Decking Boards (1x6x12)",
    price: 52.99,
    image: "/composite-decking-boards.jpg",
    category: "Decking Materials",
    rating: 4.7,
    description: "Premium natural cedar with beautiful grain",
  },
  {
    id: 4,
    name: "PVC Decking Boards",
    price: 62.5,
    image: "/composite-decking-boards.jpg",
    category: "Decking Materials",
    rating: 4.9,
    description: "Maintenance-free PVC boards, 30-year lifespan",
  },
  {
    id: 5,
    name: "Galvanized Steel Posts",
    price: 35.99,
    image: "/wooden-joists-beams.jpg",
    category: "Decking Materials",
    rating: 4.5,
    description: "Corrosion-resistant steel posts for deck foundations",
  },
  {
    id: 6,
    name: "Concrete Mix (80lb Bag)",
    price: 8.99,
    image: "/wooden-joists-beams.jpg",
    category: "Decking Materials",
    rating: 4.4,
    description: "High-strength concrete for post footings",
  },

  // Fasteners
  {
    id: 7,
    name: "Stainless Steel Deck Screws (5lb)",
    price: 34.99,
    image: "/stainless-steel-fasteners.jpg",
    category: "Fasteners",
    rating: 4.9,
    description: "Corrosion-resistant screws, 2.5 inch length",
  },
  {
    id: 8,
    name: "Hot-Dipped Galvanized Nails (10lb)",
    price: 22.5,
    image: "/stainless-steel-fasteners.jpg",
    category: "Fasteners",
    rating: 4.6,
    description: "Heavy-duty galvanized nails for outdoor use",
  },
  {
    id: 9,
    name: "Deck Clips and Brackets (100 pack)",
    price: 45.0,
    image: "/stainless-steel-fasteners.jpg",
    category: "Fasteners",
    rating: 4.7,
    description: "Hidden fastening system for seamless decks",
  },
  {
    id: 10,
    name: "Stainless Steel Bolts Assortment",
    price: 28.99,
    image: "/stainless-steel-fasteners.jpg",
    category: "Fasteners",
    rating: 4.5,
    description: "Complete assortment of bolts and washers",
  },

  // Tools
  {
    id: 11,
    name: "Professional Circular Saw",
    price: 189.99,
    image: "/circular-saw-power-tool.jpg",
    category: "Tools",
    rating: 4.7,
    description: "7.25 inch blade, 15 amp motor, laser guide",
  },
  {
    id: 12,
    name: "Cordless Power Drill (20V)",
    price: 129.99,
    image: "/circular-saw-power-tool.jpg",
    category: "Tools",
    rating: 4.8,
    description: "Compact drill with 2 batteries and charger",
  },
  {
    id: 13,
    name: "Compound Mitre Saw",
    price: 249.99,
    image: "/circular-saw-power-tool.jpg",
    category: "Tools",
    rating: 4.9,
    description: "12 inch blade, dual laser, precision cuts",
  },
  {
    id: 14,
    name: "Measuring Tape (25ft)",
    price: 12.99,
    image: "/circular-saw-power-tool.jpg",
    category: "Tools",
    rating: 4.6,
    description: "Magnetic tape with auto-lock feature",
  },
  {
    id: 15,
    name: "Spirit Level (48 inch)",
    price: 34.99,
    image: "/circular-saw-power-tool.jpg",
    category: "Tools",
    rating: 4.7,
    description: "Professional grade with shock-resistant frame",
  },
  {
    id: 16,
    name: "Post Hole Digger",
    price: 45.99,
    image: "/circular-saw-power-tool.jpg",
    category: "Tools",
    rating: 4.5,
    description: "Manual auger for deck post holes",
  },

  // Finishing
  {
    id: 17,
    name: "Deck Stain (5 gallon)",
    price: 89.99,
    image: "/composite-decking-boards.jpg",
    category: "Finishing",
    rating: 4.8,
    description: "Semi-transparent stain, UV protection",
  },
  {
    id: 18,
    name: "Deck Sealant (1 gallon)",
    price: 54.99,
    image: "/composite-decking-boards.jpg",
    category: "Finishing",
    rating: 4.7,
    description: "Water-based sealant, eco-friendly formula",
  },
  {
    id: 19,
    name: "Deck Oil (5 gallon)",
    price: 79.99,
    image: "/composite-decking-boards.jpg",
    category: "Finishing",
    rating: 4.6,
    description: "Natural oil finish for wood decks",
  },
  {
    id: 20,
    name: "Deck Cleaner Concentrate",
    price: 24.99,
    image: "/composite-decking-boards.jpg",
    category: "Finishing",
    rating: 4.5,
    description: "Biodegradable cleaner, makes 5 gallons",
  },

  // Safety
  {
    id: 21,
    name: "Safety Gear Bundle",
    price: 49.99,
    image: "/circular-saw-power-tool.jpg",
    category: "Safety",
    rating: 4.8,
    description: "Gloves, goggles, ear protection, dust mask",
  },
  {
    id: 22,
    name: "Work Gloves (12 pair)",
    price: 19.99,
    image: "/circular-saw-power-tool.jpg",
    category: "Safety",
    rating: 4.6,
    description: "Durable leather work gloves",
  },
]

const categories = ["All Products", "Decking Materials", "Fasteners", "Tools", "Finishing", "Safety"]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Products")
  const [sortBy, setSortBy] = useState("featured")
  const [priceRange, setPriceRange] = useState([0, 300])
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let filtered = allProducts

    // Filter by category
    if (selectedCategory !== "All Products") {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by price
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating)
    }

    return filtered
  }, [selectedCategory, sortBy, priceRange])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Page Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-2">Products</h1>
          <p className="text-lg opacity-90">Browse our complete selection of decking materials and tools</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h3 className="font-bold text-lg mb-6">Filters</h3>

              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Category</h4>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === cat
                          ? "bg-primary text-primary-foreground"
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-semibold mb-4">Price Range</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Min: £{priceRange[0]}</label>
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value), priceRange[1]])}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Max: £{priceRange[1]}</label>
                    <input
                      type="range"
                      min="0"
                      max="300"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => {
                  setSelectedCategory("All Products")
                  setSortBy("featured")
                  setPriceRange([0, 300])
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground">Showing {filteredProducts.length} products</p>
              <div className="flex gap-4 items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <ChevronDown className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No products found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
