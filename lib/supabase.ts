import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for TypeScript
export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          description: string | null
          price: number
          image_url: string
          category: string
          is_new: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          price: number
          image_url: string
          category: string
          is_new?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          price?: number
          image_url?: string
          category?: string
          is_new?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: number
          user_id: string
          status: string
          total_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          user_id: string
          status?: string
          total_amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          user_id?: string
          status?: string
          total_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: number
          order_id: number
          product_id: number
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: number
          order_id: number
          product_id: number
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: number
          order_id?: number
          product_id?: number
          quantity?: number
          price?: number
          created_at?: string
        }
      }
    }
  }
} 