import { ProductGrid } from "@/components/product-grid";
import { notFound } from "next/navigation";

const products = [
  {
    id: 1,
    name: "Plain Tote Bag",
    price: 200,
    image: "/plain_tote_1.jpg",
    category: "denim",
    isNew: true,
    description: "A simple, stylish tote bag made from upcycled denim.",
  },
  {
    id: 2,
    name: "Double pocket customized denim tote",
    price: 600,
    image: "/double_pocket_customized_denim_tote_bag_2.jpg",
    category: "denim",
    isNew: true,
    description: "A tote bag with custom embroidery and patches.",
  },
  {
    id: 3,
    name: "Laptop Sleeve",
    price: 350,
    image: "/laptop_sleeve_3.jpg",
    category: "denim",
    isNew: true,
    description: "Protect your laptop in style with this upcycled denim sleeve.",
  },
  {
    id: 4,
    name: "Customised Laptop Sleeve",
    price: 600,
    image: "/customised_laptop_sleeve_4.jpg",
    category: "denim",
    isNew: false,
    description: "A laptop sleeve with unique customizations.",
  },
  {
    id: 5,
    name: "Keychain",
    price: 100,
    image: "/keychain_5.jpg",
    category: "denim",
    isNew: true,
    description: "A fun, upcycled denim keychain.",
  },
  {
    id: 6,
    name: "Watermelon Bag Charm",
    price: 70,
    image: "/watermelon_bag_charm_6.jpg",
    category: "wool",
    isNew: false,
    description: "A colorful wool bag charm.",
  },
  {
    id: 7,
    name: "Pouch",
    price: 150,
    image: "/pouch_7.jpg",
    category: "denim",
    isNew: true,
    description: "A handy pouch made from upcycled denim.",
  },
  {
    id: 8,
    name: "Wool Bracelet",
    price: 100,
    image: "/wool_bracelet_8.jpg",
    category: "wool",
    isNew: false,
    description: "A soft, stylish wool bracelet.",
  },
  {
    id: 9,
    name: "Bead Bracelet",
    price: 100,
    image: "/bead_bracelet_9.jpg",
    category: "wool",
    isNew: true,
    description: "A beaded bracelet with wool accents.",
  },
  {
    id: 10,
    name: "Lace Bracelet",
    price: 150,
    image: "/lace_bracelet_10.jpg",
    category: "accessories",
    isNew: false,
    description: "A delicate lace and wool bracelet.",
  },
  {
      id: 11,
      name: "Double pocket denim tote bag",
      price: 250,
      image: "/double_pocket_denim_tote_bag_11.jpg",
      category: "denim",
      isNew: true,
    description: "A delicate lace and wool bracelet.",
  },
  {
    id: 12,
    name: "Sunflower bag charms",
    price: 600,
    image: "/sunflower_bag_charms_12.jpg",
    category: "wool",
    isNew: true,
    description: "A delicate lace and wool bracelet.",
  },
  {
    id: 13,
    name: "No pocket denim tote bag",
    price: 400,
    image: "/no_pocket_denim_tote_bag_13.jpg",
    category: "denim",
    isNew: true,
    description: "A delicate lace and wool bracelet.",
  },
];

export default function SlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Try to match as a category
  const filteredProducts = products.filter(
    (product) => product.category === slug
  );
  if (filteredProducts.length > 0) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <h1 className="text-3xl font-bold mb-8 capitalize">{slug} Collection</h1>
        <ProductGrid products={filteredProducts} />
      </div>
    );
  }

  // Try to match as a product id
  const product = products.find(
    (product) => product.id.toString() === slug
  );
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
            <p className="text-muted-foreground">{product.description}</p>
            {/* Add more product details here if needed */}
          </div>
        </div>
      </div>
    );
  }

  // Not found
  return notFound();
} 