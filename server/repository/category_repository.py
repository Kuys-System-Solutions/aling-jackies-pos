# server/repository/category_repository.py
import sqlite3
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class CategoryRepository:
    def __init__(self, db_path='pos.db'):
        self.db_path = db_path
    
    def _get_connection(self):
        return sqlite3.connect(self.db_path)

    def get_all_categories(self, page=1, per_page=10):
        """
        Get all categories with pagination
        Args:
            page (int): The page number (starting at 1)
            per_page (int): Number of categories per page
        Returns:
            dict: List of category dicts and pagination metadata
        """
        try:
            logger.info(f"Repository: Getting categories with page={page}, per_page={per_page}")
            with self._get_connection() as conn:
                cursor = conn.cursor()
                offset = (page - 1) * per_page
                cursor.execute(
                    "SELECT * FROM categories LIMIT ? OFFSET ?",
                    (per_page, offset)
                )
                categories = cursor.fetchall()
                cursor.execute("SELECT COUNT(*) FROM categories")
                total_count = cursor.fetchone()[0]
                categories_list = [
                    {
                        "id": cat[0],
                        "category_name": cat[1],
                        "parent_category_id": cat[2],
                        "created_at": cat[3]
                    } for cat in categories
                ]
                return {
                    "categories": categories_list,
                    "pagination": {
                        "total": total_count,
                        "page": page,
                        "per_page": per_page,
                        "pages": (total_count + per_page - 1) // per_page
                    }
                }
        except Exception as e:
            logger.error(f"Error in get_all_categories: {e}", exc_info=True)
            return None

    def get_category_by_id(self, category_id):
        """
        Get a category by its ID
        Args:
            category_id (int): The ID of the category
        Returns:
            dict: The category as a dictionary or None if not found
        """
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT * FROM categories WHERE id=?", (category_id,))
                cat = cursor.fetchone()
                if cat:
                    return {
                        "id": cat[0],
                        "category_name": cat[1],
                        "parent_category_id": cat[2],
                        "created_at": cat[3]
                    }
                else:
                    return None
        except Exception as e:
            logger.error(f"Error in get_category_by_id: {e}", exc_info=True)
            return None

    def create_category(self, category_data):
        """
        Create a new category
        Args:
            category_data (dict): Dictionary with category_name and optional parent_category_id
        Returns:
            int: The ID of the newly created category, or None if failed
        """
        try:
            name = category_data.get('category_name')
            parent_id = category_data.get('parent_category_id')
            created_at = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            logger.info(f"Repository: Creating new category '{name}'")
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "INSERT INTO categories (category_name, parent_category_id, created_at) VALUES (?, ?, ?)",
                    (name, parent_id, created_at)
                )
                conn.commit()
                new_id = cursor.lastrowid
                logger.info(f"Repository: Category created successfully with ID {new_id}")
                return new_id
        except Exception as e:
            logger.error(f"Error in create_category: {e}", exc_info=True)
            return None

    def update_category(self, category_id, category_data):
        """
        Update an existing category
        Args:
            category_id (int): The ID of the category to update
            category_data (dict): Fields to update
        Returns:
            bool: True if updated successfully, False otherwise
        """
        try:
            fields = {key: value for key, value in category_data.items() if key in ["category_name", "parent_category_id"] and value is not None}
            if not fields:
                return False
            set_clause = ", ".join(f"{key}=?" for key in fields.keys())
            query = f"UPDATE categories SET {set_clause} WHERE id=?"
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(query, list(fields.values()) + [category_id])
                conn.commit()
                return cursor.rowcount > 0
        except Exception as e:
            logger.error(f"Error in update_category: {e}", exc_info=True)
            return False

    def delete_category(self, category_id):
        """
        Delete a category
        Args:
            category_id (int): The ID of the category to delete
        Returns:
            bool: True if deleted successfully, False otherwise
        """
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("DELETE FROM categories WHERE id=?", (category_id,))
                conn.commit()
                return cursor.rowcount > 0
        except Exception as e:
            logger.error(f"Error in delete_category: {e}", exc_info=True)
            return False

    def search_categories(self, search_term):
        """
        Search for categories by name
        Args:
            search_term (str): Term to search for in category names
        Returns:
            list: List of matching categories
        """
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "SELECT * FROM categories WHERE category_name LIKE ?",
                    (f"%{search_term}%",)
                )
                cats = cursor.fetchall()
                return [
                    {
                        "id": cat[0],
                        "category_name": cat[1],
                        "parent_category_id": cat[2],
                        "created_at": cat[3]
                    } for cat in cats
                ]
        except Exception as e:
            logger.error(f"Error in search_categories: {e}", exc_info=True)
            return []

    def category_exists(self, category_name):
        """
        Check if a category already exists with the given name
        Args:
            category_name (str): The name to check
        Returns:
            bool: True if a category with the name exists, False otherwise
        """
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute("SELECT 1 FROM categories WHERE category_name=? LIMIT 1", (category_name,))
                return cursor.fetchone() is not None
        except Exception as e:
            logger.error(f"Error in category_exists: {e}", exc_info=True)
            return False

    def get_subcategories(self, parent_category_id):
        """
        Get all subcategories for a given parent category ID
        Args:
            parent_category_id (int): The parent category ID
        Returns:
            list: List of subcategory dictionaries
        """
        try:
            with self._get_connection() as conn:
                cursor = conn.cursor()
                cursor.execute(
                    "SELECT * FROM categories WHERE parent_category_id=?",
                    (parent_category_id,)
                )
                subcats = cursor.fetchall()
                return [
                    {
                        "id": cat[0],
                        "category_name": cat[1],
                        "parent_category_id": cat[2],
                        "created_at": cat[3]
                    } for cat in subcats
                ]
        except Exception as e:
            logger.error(f"Error in get_subcategories: {e}", exc_info=True)
            return []
