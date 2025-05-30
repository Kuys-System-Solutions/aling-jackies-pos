import sqlite3
import os
import sys

def init_db():
    conn = sqlite3.connect('pos.db')
    c = conn.cursor()
    
    # Create categories table
    c.execute('''
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_name TEXT,
            parent_category_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (parent_category_id) REFERENCES categories(id)
        )
    ''')

    # Create items table
    c.execute('''
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_name TEXT,
            price REAL,
            image_path TEXT,
            category_id INTEGER NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        )
    ''')
    
    # Create orders table with all required columns
    c.execute('''
        CREATE TABLE IF NOT EXISTS orders (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            daily_customer_number INTEGER,
            monthly_customer_number INTEGER,
            items TEXT,
            total_amount REAL,
            discounted_total REAL,
            order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'pending',
            synced BOOLEAN DEFAULT FALSE,
            table_num INTEGER DEFAULT 1,
            order_type BOOLEAN DEFAULT 1
        )
    ''')

    # Check if table_num exists before adding
    c.execute("PRAGMA table_info(orders)")
    columns = [column[1] for column in c.fetchall()]
    if 'table_num' not in columns:
        c.execute('''
            ALTER TABLE orders ADD table_num INTEGER
                  ''')
    # Check if order_type exists before adding
    if 'order_type' not in columns:
        c.execute('''
            ALTER TABLE orders ADD order_type BOOLEAN
                    ''')
   
    conn.commit()
    conn.close()

def main():
    if '/server' not in os.getcwd():
        os.chdir('server')

    init_db()
    print("Database initialized successfully.")

if __name__ == "__main__":
    main()