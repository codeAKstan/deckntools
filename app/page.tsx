"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Hammer, Zap, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReviewsPreview } from "@/components/reviews-preview"

const featuredProducts = [
  {
    id: 1,
    name: "Premium Composite Decking Boards",
    price: 45.99,
    image: "/composite-decking-boards.jpg",
    category: "Decking Materials",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Pressure-Treated Joists (2x8x12)",
    price: 28.5,
    image: "/wooden-joists-beams.jpg",
    category: "Decking Materials",
    rating: 4.6,
  },
  {
    id: 3,
    name: "Stainless Steel Deck Screws (5lb)",
    price: 34.99,
    image: "/stainless-steel-fasteners.jpg",
    category: "Fasteners",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Professional Circular Saw",
    price: 189.99,
    image: "/circular-saw-power-tool.jpg",
    category: "Tools",
    rating: 4.7,
  },
]

const heroSlides = [
  {
    id: 1,
    title: "STRUCTURAL",
    subtitle: "TIMBER",
    description: "Quality Beams, Boards & Building Supplies",
    image: "/wooden-joists-beams.jpg",
  },
  {
    id: 2,
    title: "PREMIUM",
    subtitle: "DECKING",
    description: "Transform Your Outdoor Space",
    image: "/composite-decking-boards.jpg",
  },
  {
    id: 3,
    title: "PROFESSIONAL",
    subtitle: "TOOLS",
    description: "Everything You Need for Success",
    image: "/circular-saw-power-tool.jpg",
  },
]

const showcaseCards = [
  {
    id: 1,
    title: "CUSTOM",
    subtitle: "CUTTING",
    image: "/composite-decking-boards.jpg",
    badge: "OFFER ENDS MIDNIGHT 27TH OCTOBER",
  },
  {
    id: 2,
    title: "DOORS AND",
    subtitle: "JOINERY",
    image: "/wooden-joists-beams.jpg",
    badge: "OFFER ENDS MIDNIGHT 27TH OCTOBER",
  },
  {
    id: 3,
    title: "BLACK PAINTED",
    subtitle: "FEATHEREDGE",
    image: "/stainless-steel-fasteners.jpg",
    badge: "OFFER ENDS MIDNIGHT 27TH OCTOBER",
  },
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-12 lg:px-20">
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-2 text-balance">{slide.title}</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-accent mb-4 text-balance">{slide.subtitle}</h3>
              <p className="text-lg md:text-xl text-white/90 text-balance max-w-md">{slide.description}</p>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? "bg-accent w-8" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-12 md:py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {showcaseCards.map((card) => (
              <div key={card.id} className="relative h-64 md:h-80 overflow-hidden rounded-lg group cursor-pointer">
                <img
                  src={card.image || "/placeholder.svg"}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                <div className="absolute inset-0 flex flex-col justify-center items-start p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-1 text-balance">{card.title}</h3>
                  <p className="text-xl md:text-2xl font-bold text-accent mb-4 text-balance">{card.subtitle}</p>
                </div>

                {card.badge && (
                  <div className="absolute top-4 right-4 bg-[#2f5233] text-accent-foreground px-3 py-1 rounded text-xs md:text-sm font-semibold">
                    {card.badge}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/premium-quality-materials-timber-decking.jpg"
                alt="Premium Quality"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                <div className="bg-secondary/80 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Hammer className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Premium Quality</h3>
                <p className="text-white/90 text-sm">
                  Only the finest materials from trusted manufacturers, tested for durability and performance.
                </p>
              </div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/fast-shipping-delivery-truck-logistics.jpg"
                alt="Fast Shipping"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                <div className="bg-secondary/80 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Fast Shipping</h3>
                <p className="text-white/90 text-sm">
                  Quick delivery to get your project started. Free shipping on orders over £500.
                </p>
              </div>
            </div>

            <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="/expert-support-customer-service-team.jpg"
                alt="Expert Support"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors" />
              <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
                <div className="bg-secondary/80 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Expert Support</h3>
                <p className="text-white/90 text-sm">
                  Our team of professionals is ready to help with advice and custom quotes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-balance">Featured Products</h2>
            <Link href="/products">
              <Button variant="outline">View All</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-balance">Need a Custom Quote?</h2>
          <p className="text-lg mb-8 opacity-95 text-balance">
            Get personalized recommendations and pricing for your specific project needs.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Request a Quote
            </Button>
          </Link>
        </div>
      </section>

      <ReviewsPreview />

      <Footer />
    </div>
  )
}
