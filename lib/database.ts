import { supabase } from './supabase'
import type { Database } from './supabase'

type Product = Database['public']['Tables']['products']['Row']
type Order = Database['public']['Tables']['orders']['Row']
type OrderItem = Database['public']['Tables']['order_items']['Row']

// Product operations
export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products:', error)
    throw error
  }

  return data || []
}

export async function getProductById(id: number): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return null
  }

  return data
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching products by category:', error)
    throw error
  }

  return data || []
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_new', true)
    .order('created_at', { ascending: false })
    .limit(4)

  if (error) {
    console.error('Error fetching featured products:', error)
    throw error
  }

  return data || []
}

// Order operations
export async function createOrder(userId: string, totalAmount: number): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .insert({
      user_id: userId,
      status: 'pending',
      total_amount: totalAmount,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating order:', error)
    return null
  }

  return data
}

export async function createOrderItems(orderId: number, items: Array<{ product_id: number; quantity: number; price: number }>): Promise<OrderItem[]> {
  const orderItems = items.map(item => ({
    order_id: orderId,
    product_id: item.product_id,
    quantity: item.quantity,
    price: item.price,
  }))

  const { data, error } = await supabase
    .from('order_items')
    .insert(orderItems)
    .select()

  if (error) {
    console.error('Error creating order items:', error)
    throw error
  }

  return data || []
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    throw error
  }

  return data || []
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error searching products:', error)
    throw error
  }

  return data || []
} 