# server/models/menu_item_model.py
from datetime import datetime

class Item:
    """
    Model class for menu items in Aling Jackie's POS system.
    """
    
    def __init__(self, item_id=None, item_name=None, price=None, image_path=None, category_id=None, created_at=None):
        """
        Initialize a new Item object
        
        Args:
            item_id (int, optional): The item's unique identifier
            item_name (str, optional): The name of the menu item
            price (float, optional): The price of the menu item
            image_path (str, optional): Path to the item's image
            created_at (str, optional): Creation timestamp
        """
        self.id = item_id
        self.item_name = item_name
        self.price = price
        self.image_path = image_path
        self.category_id = category_id
        self.created_at = created_at if created_at else datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    
    @classmethod
    def from_dict(cls, data):
        """
        Create a Item from a dictionary
        
        Args:
            data (dict): Dictionary containing item data
            
        Returns:
            Item: A new Item instance
        """
        return cls(
            item_id=data.get('id'),
            item_name=data.get('item_name'),
            price=data.get('price'),
            image_path=data.get('image_path'),
            category_id=data.get('category_id'),
            created_at=data.get('created_at')
        )
    
    def to_dict(self):
        """
        Convert the Item to a dictionary
        
        Returns:
            dict: Dictionary representation of the Item
        """
        return {
            'id': self.id,
            'item_name': self.item_name,
            'price': self.price,
            'image_path': self.image_path,
            'category_id': self.category_id,
            'created_at': self.created_at
        }
    
    def validate(self):
        """
        Validate the Item data
        
        Returns:
            tuple: (is_valid, error_message)
        """
        if not self.item_name or not isinstance(self.item_name, str) or len(self.item_name) < 1:
            return False, "Item name is required and must be a non-empty string"
        
        print(isinstance(self.price, (int, float)))

        if self.price is None or not (isinstance(self.price, (int, float)) and self.price >= 0):
            return False, "Price is required and must be a non-negative number"
        
        # Image path is optional, but if provided must be a string
        if self.image_path is not None and not isinstance(self.image_path, str):
            return False, "Image path must be a string"
        
        return True, None
    
    def __str__(self):
        """String representation of the Item"""
        return f"Item(id={self.id}, name={self.item_name}, price={self.price})"
    
    def __repr__(self):
        """Detailed representation of the Item"""
        return (f"Item(id={self.id}, name={self.item_name}, "
                f"price={self.price}, image_path={self.image_path}, "
                f"created_at={self.created_at})")