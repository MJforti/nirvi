# Supabase Setup Guide for Nirvi

This guide will help you set up Supabase as your database for the Nirvi e-commerce application.

## 🚀 Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `nirvi-ecommerce`
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
5. Click "Create new project"

## 🔧 Step 2: Get Your API Keys

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **Anon public key** (starts with `eyJ`)

## 📝 Step 3: Configure Environment Variables

1. Create a `.env.local` file in your project root
2. Add the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 🗄️ Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the contents of `database/schema.sql`
3. Paste and run the SQL script
4. This will create:
   - `products` table with sample data
   - `orders` table for order management
   - `order_items` table for order details
   - Proper indexes and triggers

## 🔐 Step 5: Configure Row Level Security (RLS)

Run these SQL commands in the Supabase SQL Editor:

```sql
-- Enable RLS on tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read access)
CREATE POLICY "Products are viewable by everyone" ON products
    FOR SELECT USING (true);

-- Create policies for orders (users can only see their own orders)
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid()::text = user_id);

-- Create policies for order_items
CREATE POLICY "Users can view own order items" ON order_items
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()::text
        )
    );

CREATE POLICY "Users can insert own order items" ON order_items
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM orders 
            WHERE orders.id = order_items.order_id 
            AND orders.user_id = auth.uid()::text
        )
    );
```

## 🖼️ Step 6: Set Up Storage (Optional)

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `product-images`
3. Set the bucket to public
4. Upload your product images to this bucket
5. Update the `image_url` in the products table to use Supabase storage URLs

## 🧪 Step 7: Test the Connection

1. Start your development server: `pnpm dev`
2. Visit your application
3. Check the browser console for any connection errors
4. Verify that products are loading from the database

## 🔍 Step 8: Verify Setup

You can test the database connection by:

1. Going to **Table Editor** in Supabase
2. Checking that the `products` table has data
3. Running a test query in the **SQL Editor**:

```sql
SELECT * FROM products LIMIT 5;
```

## 🚀 Step 9: Deploy to Production

1. Add your environment variables to Vercel:
   - Go to your Vercel project settings
   - Add the same environment variables
2. Redeploy your application

## 📊 Monitoring

- **Supabase Dashboard**: Monitor database performance and usage
- **Logs**: Check for any errors in the Supabase logs
- **Analytics**: Track API usage and performance

## 🔧 Troubleshooting

### Common Issues:

1. **Environment variables not working**
   - Make sure `.env.local` is in the project root
   - Restart your development server

2. **CORS errors**
   - Check your Supabase project settings
   - Ensure your domain is in the allowed origins

3. **RLS errors**
   - Verify that RLS policies are correctly set up
   - Check that user authentication is working

4. **Connection errors**
   - Verify your API keys are correct
   - Check your internet connection
   - Ensure Supabase project is active

## 📚 Next Steps

- [ ] Implement user authentication
- [ ] Add real-time subscriptions
- [ ] Set up image upload functionality
- [ ] Add admin dashboard
- [ ] Implement payment processing

## 🆘 Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Issues](https://github.com/MJforti/nirvi/issues) 