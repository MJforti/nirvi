"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import { Search } from "lucide-react"
import { ProductGrid } from "@/components/product-grid"
import { searchProducts } from "@/lib/database"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function performSearch() {
      if (!query.trim()) {
        setProducts([])
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError(null)
        const results = await searchProducts(query)
        setProducts(results)
      } catch (err) {
        console.error("Search error:", err)
        setError("Failed to search products. Please try again.")
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    performSearch()
  }, [query])

  if (loading) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center text-center space-y-2 mb-12">
          <h1 className="text-3xl font-bold tracking-tight">Searching...</h1>
          <p className="text-muted-foreground">Looking for products matching "{query}"</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Search Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex flex-col items-center text-center space-y-2 mb-12">
        <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
        <p className="text-muted-foreground">
          {products.length > 0 
            ? `Found ${products.length} product${products.length === 1 ? '' : 's'} for "${query}"`
            : `No products found for "${query}"`
          }
        </p>
      </div>
      
      {products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Search className="h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold">No products found</h2>
          <p className="text-muted-foreground mt-2">
            Try searching with different keywords or browse our full collection.
          </p>
        </div>
      )}
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center text-center space-y-2 mb-12">
          <h1 className="text-3xl font-bold tracking-tight">Searching...</h1>
          <p className="text-muted-foreground">Loading search results...</p>
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
    }>
      <SearchResults />
    </Suspense>
  )
} 