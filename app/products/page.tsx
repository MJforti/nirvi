"use client"

import { useEffect, useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import { getProducts, mapDatabaseToComponent } from "@/lib/database"

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        setError(null)
        const results = await getProducts()
        const mappedResults = results.map(mapDatabaseToComponent)
        setProducts(mappedResults)
      } catch (err) {
        console.error("Error fetching products:", err)
        setError("Failed to load products. Please try again.")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center text-center space-y-2 mb-12">
          <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
          <p className="text-muted-foreground max-w-[600px]">Loading products...</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-muted rounded-lg mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Error Loading Products</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex flex-col items-center text-center space-y-2 mb-12">
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="text-muted-foreground max-w-[600px]">Explore Nirvi's full range of thoughtfully crafted, upcycled fashion.</p>
      </div>
      <ProductGrid products={products} />
    </div>
  )
}
