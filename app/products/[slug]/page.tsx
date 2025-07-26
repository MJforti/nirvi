"use client"

import { useEffect, useState } from "react"
import { ProductGrid } from "@/components/product-grid"
import { notFound } from "next/navigation"
import { getProducts, getProductsByCategory, getProductById, mapDatabaseToComponent } from "@/lib/database"

export default function SlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const [products, setProducts] = useState<any[]>([])
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        // First try to match as a category
        const categoryProducts = await getProductsByCategory(slug)
        if (categoryProducts.length > 0) {
          const mappedProducts = categoryProducts.map(mapDatabaseToComponent)
          setProducts(mappedProducts)
          setLoading(false)
          return
        }

        // If no category match, try to match as a product id
        const productId = parseInt(slug)
        if (!isNaN(productId)) {
          const singleProduct = await getProductById(productId)
          if (singleProduct) {
            const mappedProduct = mapDatabaseToComponent(singleProduct)
            setProduct(mappedProduct)
            setLoading(false)
            return
          }
        }

        // If neither category nor product found
        setLoading(false)
        setError("Not found")
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("Failed to load data. Please try again.")
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  if (loading) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Loading...</h1>
          <p className="text-muted-foreground">Please wait while we load the content.</p>
        </div>
      </div>
    )
  }

  if (error === "Not found") {
    return notFound()
  }

  if (error) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Error</h1>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    )
  }

  // If we have category products
  if (products.length > 0) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <h1 className="text-3xl font-bold mb-8 capitalize">{slug} Collection</h1>
        <ProductGrid products={products} />
      </div>
    )
  }

  // If we have a single product
  if (product) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-bold mt-2">₹{product.price.toFixed(2)}</p>
            <p className="text-muted-foreground">{product.description || "No description available."}</p>
            {/* Add more product details here if needed */}
          </div>
        </div>
      </div>
    )
  }

  return notFound()
} 