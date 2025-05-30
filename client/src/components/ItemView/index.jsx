import React, { useState } from 'react';

const menuItems = [
  {
    id: 1,
    name: 'Beef Pares w/ Garlic Rice',
    price: 90,
    category: 'Special Menu',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
  {
    id: 2,
    name: 'VM #1',
    price: 120,
    category: 'Value Meal',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
  {
    id: 3,
    name: 'VM #2',
    price: 120,
    category: 'Value Meal',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
  {
    id: 4,
    name: 'VM #3',
    price: 120,
    category: 'Value Meal',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
  {
    id: 5,
    name: 'VM #4',
    price: 120,
    category: 'Value Meal',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
  {
    id: 6,
    name: 'VM #5',
    price: 120,
    category: 'Value Meal',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
  {
    id: 7,
    name: 'VM #6',
    price: 120,
    category: 'Value Meal',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
  {
    id: 8,
    name: 'Grilled Liempo',
    price: 120,
    category: 'Sizzling',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
  {
    id: 9,
    name: 'Pork Sisig',
    price: 120,
    category: 'Sizzling',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
  {
    id: 10,
    name: 'Pork Steak',
    price: 120,
    category: 'Sizzling',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
  {
    id: 11,
    name: 'Baked Rosemary Chicken',
    price: 120,
    category: 'Sizzling',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
  {
    id: 12,
    name: 'Burger Steak',
    price: 120,
    category: 'Sizzling',
    image:
      'https://phohoangminh.com/img/placeholders/burger_placeholder.png?v=1',
  },
];

const categories = [
  'All',
  'Special Menu',
  'Value Meal',
  'Sizzling',
  'Rice Bowls',
  'Muffins',
  'Brownies',
];

const ItemView = ({ orderItems, setOrderItems, searchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter items based on category and search term
  const filteredItems = menuItems.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // click handler for items
  function onSelectItem(item) {
    if (!orderItems.some((orderItem) => orderItem.id === item.id)) {
      item.quantity = 1;
      setOrderItems([...orderItems, item]);
    }
  }

  return (
    <div
      style={{
        backgroundColor: 'white',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '62%',
        top: '86px',
        overflow: 'hidden',
        marginLeft: '100px', // Ensure no left margin
        position: 'relative',
      }}
    >
      {/* Category Navigation */}
      <div
        style={{
          backgroundColor: '#f0d4e4',
          borderRadius: '15px',
          margin: '0 0 15px 15px',
          padding: '5px',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {categories.map((category) => (
          <button
            key={category}
            style={{
              margin: '0 5px',
              borderRadius: '15px',
              backgroundColor:
                selectedCategory === category ? '#d694b9' : 'transparent',
              border: 'none',
              padding: '6px 12px',
              color: selectedCategory === category ? 'white' : '#444',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div
        style={{
          flex: 1,
          padding: '0 15px 15px 15px',
          overflowY: 'auto',
          backgroundColor: 'white',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '15px',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: 'white',
                border: '1px solid #eee',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
              }}
              onClick={() => onSelectItem && onSelectItem(item)}
            >
              <div
                style={{
                  height: '150px',
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <img
                  alt={item.name}
                  src={item.image}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    backgroundColor: '#d694b9',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                  }}
                >
                  {item.category}
                </span>
              </div>

              <div
                style={{
                  padding: '10px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontWeight: 'bold',
                    marginBottom: '10px',
                    fontSize: '14px',
                  }}
                >
                  {item.name}
                </div>
                <button
                  style={{
                    backgroundColor: '#f0d4e4',
                    border: 'none',
                    color: '#333',
                    borderRadius: '15px',
                    width: '100%',
                    padding: '8px 0',
                    cursor: 'pointer',
                  }}
                >
                  P {item.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemView;
