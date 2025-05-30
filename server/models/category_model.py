from datetime import datetime

class Category:
    """
    Model class for categories in Aling Jackie's POS system.
    """

    def __init__(self, category_id=None, category_name=None, parent_category_id=None, created_at=None):
        """
        Initialize a new Category object

        Args:
            category_id (int, optional): The category's unique identifier
            category_name (str, optional): The name of the category
            parent_category_id (int, optional): The parent category's ID (if any)
            created_at (str, optional): Creation timestamp
        """
        self.id = category_id
        self.category_name = category_name
        self.parent_category_id = parent_category_id
        self.created_at = created_at if created_at else datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    @classmethod
    def from_dict(cls, data):
        """
        Create a Category from a dictionary

        Args:
            data (dict): Dictionary containing category data

        Returns:
            Category: A new Category instance
        """
        return cls(
            category_id=data.get('id'),
            category_name=data.get('category_name'),
            parent_category_id=data.get('parent_category_id'),
            created_at=data.get('created_at')
        )

    def to_dict(self):
        """
        Convert the Category to a dictionary

        Returns:
            dict: Dictionary representation of the Category
        """
        return {
            'id': self.id,
            'category_name': self.category_name,
            'parent_category_id': self.parent_category_id,
            'created_at': self.created_at
        }

    def validate(self):
        """
        Validate the Category data

        Returns:
            tuple: (is_valid, error_message)
        """
        if not self.category_name or not isinstance(self.category_name, str) or len(self.category_name) < 1:
            return False, "Category name is required and must be a non-empty string"

        # parent_category_id is optional, but if provided must be an int
        if self.parent_category_id is not None and not isinstance(self.parent_category_id, int):
            return False, "Parent category ID must be an integer"

        return True, None

    def __str__(self):
        """String representation of the Category"""
        return f"Category(id={self.id}, name={self.category_name})"

    def __repr__(self):
        """Detailed representation of the Category"""
        return (f"Category(id={self.id}, name={self.category_name}, "
                f"parent_category_id={self.parent_category_id}, "
                f"created_at={self.created_at})")