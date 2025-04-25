import sqlite3
import os
import sys

def init_db():
    conn = sqlite3.connect('pos.db')
    c = conn.cursor()
    
    # Create items table
    c.execute('''
        CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            item_name TEXT,
            price REAL,
            image_path TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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

def wipe_db():
    try:
        os.remove('pos.db')
    except Exception as e:
        print(f"An error occured: {e}")

def main():
    #     confirm = input("Are you sure you want to wipe the database? (yes/no)")
    #     wipe_db() if confirm == 'yes' else print("Operation cancelled.")
    #     print("DB wiped successfully.")
    
    init_db()
    print("Database initialized successfully.")

if __name__ == "__main__":
    main()