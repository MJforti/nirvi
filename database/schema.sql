-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    category VARCHAR(100) NOT NULL,
    is_new BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_new ON products(is_new);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample products
INSERT INTO products (name, description, price, image_url, category, is_new) VALUES
('Customised Laptop Sleeve', 'Handcrafted laptop sleeve made from upcycled denim', 600.00, '/customised_laptop_sleeve_4.jpg', 'denim', false),
('Lace Bracelet', 'Elegant bracelet crafted from recycled wool and lace', 150.00, '/lace_bracelet_10.jpg', 'wool', false),
('No pocket denim tote bag', 'Sustainable tote bag made from upcycled denim', 400.00, '/no_pocket_denim_tote_bag_13.jpg', 'denim', true),
('Keychain', 'Unique keychain made from recycled materials', 100.00, '/keychain_5.jpg', 'denim', true),
('Bead Bracelet', 'Colorful bracelet made from recycled beads', 120.00, '/bead_bracelet_9.jpg', 'wool', false),
('Double Pocket Customized Denim Tote Bag', 'Spacious tote with double pockets', 450.00, '/double_pocket_customized_denim_tote_bag_2.jpg', 'denim', false),
('Single Pocket Customized Denim Tote Bag', 'Versatile tote with single pocket', 380.00, '/single_pocket_customized_denim_tote_bag_14.jpg', 'denim', false),
('Sunflower Bag Charms', 'Adorable sunflower charms for your bags', 80.00, '/sunflower_bag_charms_12.jpg', 'accessories', false),
('Watermelon Bag Charm', 'Cute watermelon charm for bags', 75.00, '/watermelon_bag_charm_6.jpg', 'accessories', false),
('Wool Bracelet', 'Comfortable bracelet made from recycled wool', 90.00, '/wool_bracelet_8.jpg', 'wool', false),
('Pouch', 'Practical pouch made from upcycled materials', 200.00, '/pouch_7.jpg', 'accessories', false),
('Plain Tote', 'Simple and elegant plain tote bag', 350.00, '/plain_tote_1.jpg', 'denim', false),
('Laptop Sleeve', 'Protective laptop sleeve', 550.00, '/laptop_sleeve_3.jpg', 'denim', false); 