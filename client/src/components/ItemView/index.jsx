import React, { useState } from 'react';
import { Input, Card, Row, Col, Typography, Tag, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Text } = Typography;

const menuItems = [
  {
    id: 1,
    name: 'Beef Pares w/ Garlic Rice',
    price: 90,
    category: 'Special Menu',
    image: '/api/placeholder/150/150'
  },
  {
    id: 2,
    name: 'VM #1',
    price: 120,
    category: 'Value Meal',
    image: '/api/placeholder/150/150'
  },
  {
    id: 3,
    name: 'VM #2',
    price: 120,
    category: 'Value Meal',
    image: '/api/placeholder/150/150'
  },
  {
    id: 4,
    name: 'VM #3',
    price: 120,
    category: 'Value Meal',
    image: '/api/placeholder/150/150'
  },
  {
    id: 5,
    name: 'VM #4',
    price: 120,
    category: 'Value Meal',
    image: '/api/placeholder/150/150'
  },
  {
    id: 6,
    name: 'VM #5',
    price: 120,
    category: 'Value Meal',
    image: '/api/placeholder/150/150'
  },
  {
    id: 7,
    name: 'VM #6',
    price: 120,
    category: 'Value Meal',
    image: '/api/placeholder/150/150'
  },
  {
    id: 8,
    name: 'Grilled Liempo',
    price: 120,
    category: 'Sizzling',
    image: '/api/placeholder/150/150'
  },
  {
    id: 9,
    name: 'Pork Sisig',
    price: 120,
    category: 'Sizzling',
    image: '/api/placeholder/150/150'
  },
  {
    id: 10,
    name: 'Pork Steak',
    price: 120,
    category: 'Sizzling',
    image: '/api/placeholder/150/150'
  },
  {
    id: 11,
    name: 'Baked Rosemary Chicken',
    price: 120,
    category: 'Sizzling',
    image: '/api/placeholder/150/150'
  },
  {
    id: 12,
    name: 'Burger Steak',
    price: 120,
    category: 'Sizzling',
    image: '/api/placeholder/150/150'
  }
];

const categories = ['All', 'Special Menu', 'Value Meal', 'Sizzling', 'Rice Bowls', 'Muffins', 'Brownies'];

const ItemView = ({ onSelectItem }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Fixed size for menu items regardless of how many are displayed
  const itemWidth = { xs: 12, sm: 8, md: 6, lg: 6 };
  
  // Ensure items don't grow to fill available space
  const fixedColStyle = { 
    maxWidth: '25%',  // Ensures 4 items per row
    width: '25%'      // Explicit width setting
  };

  return (
    <div style={{ flex: 1, backgroundColor: '#f5f5f5', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Search Bar */}
      <div style={{ padding: '10px 20px', backgroundColor: '#d694b9', display: 'flex', alignItems: 'center' }}>
        <Input
          prefix={<SearchOutlined style={{ color: '#d694b9' }} />}
          placeholder="Search"
          style={{ borderRadius: '20px', width: '100%' }}
        />
      </div>

      {/* Category Navigation */}
      <div style={{ backgroundColor: '#f0d4e4', borderRadius: '15px', margin: '10px', padding: '5px', overflowX: 'auto', whiteSpace: 'nowrap' }}>
        {categories.map(category => (
          <Button
            key={category}
            type={selectedCategory === category ? 'primary' : 'text'}
            style={{ 
              margin: '0 5px', 
              borderRadius: '15px',
              backgroundColor: selectedCategory === category ? '#d694b9' : 'transparent',
              borderColor: selectedCategory === category ? '#d694b9' : 'transparent',
              color: selectedCategory === category ? 'white' : '#444'
            }}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div style={{ flex: 1, padding: '10px', overflowY: 'auto' }}>
        <Row gutter={[16, 16]} style={{ width: '100%' }}>
          {filteredItems.map(item => (
            <Col 
              key={item.id} 
              {...itemWidth}
              style={fixedColStyle}
            >
              <Card
                hoverable
                style={{ 
                  width: '100%',
                  borderRadius: '10px', 
                  overflow: 'hidden' 
                }}
                cover={
                  <div style={{ height: '150px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      alt={item.name}
                      src={item.image}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <Tag color="#d694b9" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                      {item.category}
                    </Tag>
                  </div>
                }
                bodyStyle={{ padding: '10px' }}
                onClick={() => onSelectItem(item)}
              >
                <div style={{ textAlign: 'center' }}>
                  <Text strong>{item.name}</Text>
                  <div>
                    <Button
                      type="primary"
                      style={{ backgroundColor: '#f0d4e4', borderColor: '#f0d4e4', color: '#333', borderRadius: '15px', width: '100%', marginTop: '10px' }}
                    >
                      P {item.price}
                    </Button>
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default ItemView;