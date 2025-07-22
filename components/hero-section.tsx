import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <div className="relative">
      {/* Image Background */}
      <Image
        src="/hero.png"
        alt="Hero background"
        fill
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Content */}
      <div className="relative h-[70vh] flex items-center justify-start">
        <div className="container px-4 mx-auto">
          <div className="max-w-lg space-y-6 text-white">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Reborn with Purpose</h1>
            <p className="text-lg md:text-xl">
            Discover our latest upcycled creations — where discarded denim and wool are transformed into timeless, eco-conscious accessories.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-white text-black hover:bg-white/90">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10 bg-transparent"
              >
                <Link href="/products/new">New Arrivals</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
