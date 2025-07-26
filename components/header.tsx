"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Menu, Search, ShoppingCart, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/components/cart-provider"

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { totalItems } = useCart()
  const cartItemCount = totalItems
  const router = useRouter()

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Escape to close search
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false)
        setSearchQuery("")
      }
      
      // Ctrl/Cmd + K to open search
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    document.addEventListener("keydown", handleKeydown)
    return () => document.removeEventListener("keydown", handleKeydown)
  }, [isSearchOpen])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-lg font-medium">
                Home
              </Link>
              <Link href="/products" className="text-lg font-medium">
                All Products
              </Link>
              <Link href="/products/men" className="text-lg font-medium">
                Men
              </Link>
              <Link href="/products/women" className="text-lg font-medium">
                Women
              </Link>
              <Link href="/about" className="text-lg font-medium">
                About
              </Link>
              <Link href="/contact" className="text-lg font-medium">
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        <Link href="/" className="ml-4 md:ml-0 flex items-center gap-2">
          {/* <span className="text-xl font-bold">Nirvi</span> */}
        </Link>

        <nav className="mx-6 hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link href="/products" className="font-medium transition-colors hover:text-primary">
            All Products
          </Link>
          <Link href="/products/denim" className="font-medium transition-colors hover:text-primary">
            Denim
          </Link>
          <Link href="/products/wool" className="font-medium transition-colors hover:text-primary">
            Wool
          </Link>
          <Link href="/products/accessories" className="font-medium transition-colors hover:text-primary">
            Other Accessories
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {isSearchOpen ? (
            <form 
              className="relative flex items-center"
              onSubmit={(e) => {
                e.preventDefault()
                if (searchQuery.trim()) {
                  router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
                  setIsSearchOpen(false)
                  setSearchQuery("")
                }
              }}
            >
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="w-[200px] md:w-[300px]" 
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                variant="ghost" 
                size="icon" 
                className="absolute right-0"
                disabled={!searchQuery.trim()}
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
              <Button 
                type="button"
                variant="ghost" 
                size="icon" 
                className="absolute right-8" 
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery("")
                }}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Close search</span>
              </Button>
            </form>
          ) : (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
              <span className="absolute -bottom-1 -right-1 text-[8px] text-muted-foreground bg-background px-1 rounded">
                ⌘K
              </span>
            </Button>
          )}

          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {cartItemCount}
                </span>
              )}
              <span className="sr-only">Cart</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
