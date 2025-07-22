import { ProductGrid } from "@/components/product-grid"

const products = [
  {
    id: 1,
    name: "Plain Tote Bag",
    price: 200,
    image: "plain_tote_1.jpg",
    category: "denim",
    isNew: true,
  },
  {
    id: 2,
    name: "Double pocket customized denim tote",
    price: 600,
    image: "double_pocket_customized_denim_tote_bag_2.jpg",
    category: "denim",
    isNew: true,
  },
  {
    id: 3,
    name: "Laptop Sleeve",
    price: 350,
    image: "laptop_sleeve_3.jpg",
    category: "denim",
    isNew: true,
  },
  {
    id: 4,
    name: "Customised Laptop Sleeve",
    price: 600,
    image: "customised_laptop_sleeve_4.jpg",
    category: "denim",
    isNew: false,
  },
  {
    id: 5,
    name: "Keychain",
    price: 100,
    image: "keychain_5.jpg",
    category: "denim",
    isNew: true,
  },
  {
    id: 6,
    name: "Watermelon Bag Charm",
    price: 70,
    image: "watermelon_bag_charm_6.jpg",
    category: "wool",
    isNew: false,
  },
  {
    id: 7,
    name: "Pouch",
    price: 150,
    image: "pouch_7.jpg",
    category: "denim",
    isNew: true,
  },
  {
    id: 8,
    name: "Wool Bracelet",
    price: 100,
    image: "wool_bracelet_8.jpg",
    category: "wool",
    isNew: false,
  },
  {
    id: 9,
    name: "Bead Bracelet",
    price: 100,
    image: "bead_bracelet_9.jpg",
    category: "wool",
    isNew: true,
  },
  {
    id: 10,
    name: "Lace Bracelet",
    price: 150,
    image: "lace_bracelet_10.jpg",
    category: "accessories",
    isNew: false,
  },
  {
    id: 11,
    name: "Double pocket denim tote bag",
    price: 250,
    image: "double_pocket_denim_tote_bag_11.jpg",
    category: "denim",
    isNew: true,
  },
  {
    id: 12,
    name: "Sunflower bag charms",
    price: 600,
    image: "sunflower_bag_charms_12.jpg",
    category: "wool",
    isNew: true,
  },
  {
    id: 13,
    name: "No pocket denim tote bag",
    price: 400,
    image: "no_pocket_denim_tote_bag_13.jpg",
    category: "denim",
    isNew: true,
  },
]

export default function ProductsPage() {
  return (
    <div className="container px-4 py-12 mx-auto">
      <div className="flex flex-col items-center text-center space-y-2 mb-12">
        <h1 className="text-3xl font-bold tracking-tight">All Products</h1>
        <p className="text-muted-foreground max-w-[600px]">Explore Nirvi's full range of thoughtfully crafted, upcycled fashion.</p>
      </div>
      <ProductGrid products={products} />
    </div>
  )
}
