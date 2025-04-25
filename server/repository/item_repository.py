# server/repository/menu_item_repository.py
import sqlite3
import logging
from datetime import datetime

# Configure repository logger
logger = logging.getLogger(__name__)

class MenuItemRepository:
    def __init__(self, db_path='pos.db'):
        self.db_path = db_path
    
    def _get_connection(self):
        """Create and return a database connection"""
        return sqlite3.connect(self.db_path)
    
    def get_all_items(self, page=1, per_page=10):
        """
        Get all menu items with pagination
        
        Args:
            page (int): The page number (starting at 1)
            per_page (int): Number of items per page
            
        Returns:
            list: List of menu item dictionaries
        """
        try:
            logger.info(f"Repository: Getting items with page={page}, per_page={per_page}")
            with self._get_connection() as conn:
                cursor = conn.cursor()
                # Calculate offset for pagination
                offset = (page - 1) * per_page
                
                logger.debug(f"SQL: SELECT * FROM items LIMIT {per_page} OFFSET {offset}")
                cursor.execute(
                    "SELECT * FROM items LIMIT ? OFFSET ?", 
                    (per_page, offset)
                )
                items = cursor.fetchall()
                
                # Get total count for pagination metadata
                cursor.execute("SELECT COUNT(*) FROM items")
                total_count = cursor.fetchone()[0]
                
                logger.info(f"Repository: Found {len(items)} items (total in DB: {total_count})")
                
                # Convert to list of dictionaries
                items_list = [
                    {
                        "id": item[0],
                        "item_name": item[1],
                        "price": item[2],
                        "image_path": item[3],
                        "created_at": item[4]
                    } for item in items
                ]
                
                # Return items and pagination metadata
                return {
                    "items": items_list,
                    "pagination": {
                        "total": total_count,
                        "page": page,
                        "per_page": per_page,
                        "pages": (total_count + per_page - 1) // per_page  # Ceiling division
                    }
                }
        except Exception as e:
            logger.error(f"Error in get_all_items: {e}", exc_info=True)
            return None
    
    def get_item_by_id(self, item_id):
        """
        Get a menu item by its ID
        
        Args:
            item_id (int): The ID of the item to retrieve
            
        Returns:
            dict: The menu item as a dictionary or None if not found
        """
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM items WHERE id=?", (item_id,))
                item = cursor.fetchone()
                
                if item:
                    return {
                        "id": item[0],
                        "item_name": item[1],
                        "price": item[2],
                        "image_path": item[3],
                        "created_at": item[4]
                    }
                else:
                    return None
        except Exception as e:
            print(f"Error in get_item_by_id: {e}")
            return None
    
    def create_item(self, item_data):
        """
        Create a new menu item
        
        Args:
            item_data (dict): Dictionary containing item_name, price, and image_path
            
        Returns:
            int: The ID of the newly created item, or None if failed
        """
        try:
            name = item_data.get('item_name')
            price = item_data.get('price')
            image = item_data.get('image_path')
            created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            
            logger.info(f"Repository: Creating new item '{name}' with price {price}")
            
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO items (item_name, price, image_path, created_at) VALUES (?, ?, ?, ?)",
                    (name, price, image, created_at)
                )
                conn.commit()
                new_id = cursor.lastrowid
                logger.info(f"Repository: Item created successfully with ID {new_id}")
                return new_id
        except Exception as e:
            logger.error(f"Error in create_item: {e}", exc_info=True)
            return None
    
    def update_item(self, item_id, item_data):
        """
        Update an existing menu item
        
        Args:
            item_id (int): The ID of the item to update
            item_data (dict): Dictionary containing fields to update
            
        Returns:
            bool: True if updated successfully, False otherwise
        """
        try:
            # Extract fields from the data
            fields = {key: value for key, value in item_data.items() 
                     if key in ["item_name", "price", "image_path"] and value is not None}
            
            if not fields:
                return False  # Nothing to update
            
            # Build the SQL query
            set_clause = ", ".join(f"{key}=?" for key in fields.keys())
            query = f"UPDATE items SET {set_clause} WHERE id=?"
            
            with self._get_connection() as conn:
                cursor = conn.cursor()
                # Execute the query with all values plus the item_id
                cursor.execute(query, list(fields.values()) + [item_id])
                conn.commit()
                
                # Check if any row was affected
                return cursor.rowcount > 0
        except Exception as e:
            print(f"Error in update_item: {e}")
            return False
    
    def delete_item(self, item_id):
        """
        Delete a menu item
        
        Args:
            item_id (int): The ID of the item to delete
            
        Returns:
            bool: True if deleted successfully, False otherwise
        """
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM items WHERE id=?", (item_id,))
                conn.commit()
                
                # Check if any row was affected
                return cursor.rowcount > 0
        except Exception as e:
            print(f"Error in delete_item: {e}")
            return False
    
    def search_items(self, search_term):
        """
        Search for menu items by name
        
        Args:
            search_term (str): Term to search for in item names
            
        Returns:
            list: List of matching menu items
        """
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "SELECT * FROM items WHERE item_name LIKE ?", 
                    (f"%{search_term}%",)
                )
                items = cursor.fetchall()
                
                return [
                    {
                        "id": item[0],
                        "item_name": item[1],
                        "price": item[2],
                        "image_path": item[3],
                        "created_at": item[4]
                    } for item in items
                ]
        except Exception as e:
            print(f"Error in search_items: {e}")
            return []
    
    def get_items_by_price_range(self, min_price, max_price):
        """
        Get menu items within a price range
        
        Args:
            min_price (float): Minimum price
            max_price (float): Maximum price
            
        Returns:
            list: List of menu items within the price range
        """
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "SELECT * FROM items WHERE price BETWEEN ? AND ?",
                    (min_price, max_price)
                )
                items = cursor.fetchall()
                
                return [
                    {
                        "id": item[0],
                        "item_name": item[1],
                        "price": item[2],
                        "image_path": item[3],
                        "created_at": item[4]
                    } for item in items
                ]
        except Exception as e:
            print(f"Error in get_items_by_price_range: {e}")
            return []
    
    def item_exists(self, item_name):
        """
        Check if a menu item already exists with the given name
        
        Args:
            item_name (str): The name to check
            
        Returns:
            bool: True if an item with the name exists, False otherwise
        """
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT 1 FROM items WHERE item_name=? LIMIT 1", (item_name,))
                return cursor.fetchone() is not None
        except Exception as e:
            print(f"Error in item_exists: {e}")
            return False