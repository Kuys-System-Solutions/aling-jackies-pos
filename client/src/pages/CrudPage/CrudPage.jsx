import React, { useState, useEffect } from 'react';
import './CrudPage.css';

const CrudPage = () => {
  // State management
  const [items, setItems] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [logs, setLogs] = useState([]);
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedFormType, setSelectedFormType] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form states
  const [mainCategoryForm, setMainCategoryForm] = useState({ name: '' });
  const [subCategoryForm, setSubCategoryForm] = useState({ name: '', mainCategoryId: '' });
  const [itemForm, setItemForm] = useState({
    name: '',
    price: '',
    imagePath: '',
    mainCategoryId: '',
    subCategoryId: ''
  });

  // Edit states
  const [editingItem, setEditingItem] = useState(null);
  const [editingMainCategory, setEditingMainCategory] = useState(null);
  const [editingSubCategory, setEditingSubCategory] = useState(null);

  // Add search state
  const [searchQuery, setSearchQuery] = useState('');

  // Image loading state
  const [imageLoaded, setImageLoaded] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedMainCategories = localStorage.getItem('mainCategories');
    const savedSubCategories = localStorage.getItem('subCategories');
    const savedItems = localStorage.getItem('items');
    const savedLogs = localStorage.getItem('logs');

    if (savedMainCategories) setMainCategories(JSON.parse(savedMainCategories));
    if (savedSubCategories) setSubCategories(JSON.parse(savedSubCategories));
    if (savedItems) setItems(JSON.parse(savedItems));
    if (savedLogs) setLogs(JSON.parse(savedLogs));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('mainCategories', JSON.stringify(mainCategories));
  }, [mainCategories]);

  useEffect(() => {
    localStorage.setItem('subCategories', JSON.stringify(subCategories));
  }, [subCategories]);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    localStorage.setItem('logs', JSON.stringify(logs));
  }, [logs]);

  // Logging function
  const addLog = (action, details) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      action,
      details
    };
    setLogs(prevLogs => {
      const updatedLogs = [newLog, ...prevLogs];
      const trimmedLogs = updatedLogs.slice(0, 100);
      return trimmedLogs;
    });
  };

  // Helper functions
  const getMainCategoryName = (id) => {
    const category = mainCategories.find(cat => cat.id === id);
    return category ? category.name : 'Unknown';
  };

  const getSubCategoryName = (id) => {
    const category = subCategories.find(cat => cat.id === id);
    return category ? category.name : 'Unknown';
  };

  const getFilteredSubCategories = (mainCategoryId) => {
    return subCategories.filter(sub => sub.mainCategoryId === parseInt(mainCategoryId));
  };

  const resetItemForm = () => {
    setItemForm({
      name: '',
      price: '',
      imagePath: '',
      mainCategoryId: '',
      subCategoryId: ''
    });
    setIsEditing(false);
  };

  // Format price for display
  const formatPrice = (price) => {
    return `₱${parseFloat(price).toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Handle price input
  const handlePriceInput = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setItemForm({ ...itemForm, price: value });
    }
  };

  // CRUD Operations with logging
  const createItem = () => {
    if (!itemForm.name.trim() || !itemForm.price || !itemForm.mainCategoryId) return;
    
    const newItem = {
      id: isEditing ? itemForm.id : Date.now(),
      name: itemForm.name,
      price: parseFloat(itemForm.price),
      imagePath: itemForm.imagePath,
      mainCategoryId: parseInt(itemForm.mainCategoryId),
      subCategoryId: itemForm.subCategoryId ? parseInt(itemForm.subCategoryId) : null,
      createdAt: isEditing ? itemForm.createdAt : new Date().toLocaleString()
    };
    
    if (isEditing) {
      setItems(items.map(item => item.id === newItem.id ? newItem : item));
      addLog('EDIT_ITEM', `Item "${newItem.name}" was updated`);
    } else {
      setItems([...items, newItem]);
      addLog('CREATE_ITEM', `New item "${newItem.name}" was created`);
    }
    
    resetItemForm();
    setIsFormModalOpen(false);
  };

  const createMainCategory = () => {
    if (!mainCategoryForm.name.trim()) return;
    
    const newCategory = {
      id: Date.now(),
      name: mainCategoryForm.name,
      createdAt: new Date().toLocaleString()
    };
    
    setMainCategories([...mainCategories, newCategory]);
    addLog('CREATE_CATEGORY', `New main category "${newCategory.name}" was created`);
    setMainCategoryForm({ name: '' });
    setIsFormModalOpen(false);
  };

  const createSubCategory = () => {
    if (!subCategoryForm.name.trim() || !subCategoryForm.mainCategoryId) return;
    
    const newSubCategory = {
      id: Date.now(),
      name: subCategoryForm.name,
      mainCategoryId: parseInt(subCategoryForm.mainCategoryId),
      createdAt: new Date().toLocaleString()
    };
    
    setSubCategories([...subCategories, newSubCategory]);
    const mainCatName = getMainCategoryName(newSubCategory.mainCategoryId);
    addLog('CREATE_SUBCATEGORY', `New sub-category "${newSubCategory.name}" was created under "${mainCatName}"`);
    setSubCategoryForm({ name: '', mainCategoryId: '' });
    setIsFormModalOpen(false);
  };

  const startEditItem = (item) => {
    setItemForm({
      id: item.id,
      name: item.name,
      price: item.price,
      imagePath: item.imagePath || '',
      mainCategoryId: item.mainCategoryId,
      subCategoryId: item.subCategoryId,
      createdAt: item.createdAt
    });
    setIsEditing(true);
    setSelectedFormType('item');
    setIsFormModalOpen(true);
  };

  const confirmDelete = (item) => {
    setItemToDelete(item);
    setIsDeleteModalOpen(true);
  };

  const deleteItem = () => {
    addLog('DELETE_ITEM', `Item "${itemToDelete.name}" was deleted`);
    setItems(items.filter(item => item.id !== itemToDelete.id));
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  // Modal handlers
  const handleCreateClick = () => {
    resetItemForm();
    setIsCreateModalOpen(true);
  };

  const handleOptionSelect = (type) => {
    setSelectedFormType(type);
    setIsCreateModalOpen(false);
    setIsFormModalOpen(true);
  };

  // Random name generators
  const generateRandomFood = () => {
    const adjectives = ['Crispy', 'Spicy', 'Sweet', 'Sour', 'Grilled', 'Fried', 'Steamed', 'Roasted', 'Fresh', 'Hot'];
    const foods = ['Chicken', 'Pork', 'Fish', 'Rice', 'Noodles', 'Vegetables', 'Beef', 'Tofu', 'Eggs', 'Soup'];
    const styles = ['Adobo', 'Sinigang', 'Curry', 'Stir-Fry', 'BBQ', 'Special', 'Express', 'House Style', 'Classic'];
    
    return `${adjectives[Math.floor(Math.random() * adjectives.length)]} ${foods[Math.floor(Math.random() * foods.length)]} ${styles[Math.floor(Math.random() * styles.length)]}`;
  };

  const generateRandomDrink = () => {
    const types = ['Iced', 'Hot', 'Fresh', 'Blended', 'Creamy', 'Sparkling', 'Sweet', 'Sugar-free'];
    const drinks = ['Coffee', 'Tea', 'Juice', 'Shake', 'Smoothie', 'Soda', 'Milk Tea', 'Lemonade'];
    const flavors = ['Mango', 'Chocolate', 'Strawberry', 'Vanilla', 'Caramel', 'Banana', 'Mixed Berry', 'Melon'];
    
    return `${types[Math.floor(Math.random() * types.length)]} ${flavors[Math.floor(Math.random() * flavors.length)]} ${drinks[Math.floor(Math.random() * drinks.length)]}`;
  };

  const generateRandomDessert = () => {
    const types = ['Classic', 'Special', 'Premium', 'Homemade', 'Traditional', 'Modern', 'Signature'];
    const desserts = ['Cake', 'Ice Cream', 'Pudding', 'Pie', 'Cookie', 'Brownie', 'Halo-halo', 'Leche Flan'];
    const flavors = ['Chocolate', 'Vanilla', 'Strawberry', 'Ube', 'Mango', 'Cheese', 'Coffee', 'Caramel'];
    
    return `${types[Math.floor(Math.random() * types.length)]} ${flavors[Math.floor(Math.random() * flavors.length)]} ${desserts[Math.floor(Math.random() * desserts.length)]}`;
  };

  // Generate random price between min and max
  const generateRandomPrice = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Enhanced test data generation
  const generateTestData = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      price: 0,
      mainCategoryId: 0,
      subCategoryId: 0,
      imagePath: '',
      createdAt: new Date().toLocaleString()
    };

    // If no categories exist, create them first
    if (mainCategories.length === 0) {
      const testMainCategories = [
        { id: Date.now(), name: 'Meals', createdAt: new Date().toLocaleString() },
        { id: Date.now() + 1, name: 'Drinks', createdAt: new Date().toLocaleString() },
        { id: Date.now() + 2, name: 'Desserts', createdAt: new Date().toLocaleString() }
      ];
      setMainCategories(testMainCategories);
      addLog('CREATE_CATEGORY', 'Generated main categories');

      const testSubCategories = [
        { id: Date.now() + 3, name: 'Rice Meals', mainCategoryId: testMainCategories[0].id, createdAt: new Date().toLocaleString() },
        { id: Date.now() + 4, name: 'Noodles', mainCategoryId: testMainCategories[0].id, createdAt: new Date().toLocaleString() },
        { id: Date.now() + 5, name: 'Cold Drinks', mainCategoryId: testMainCategories[1].id, createdAt: new Date().toLocaleString() },
        { id: Date.now() + 6, name: 'Hot Drinks', mainCategoryId: testMainCategories[1].id, createdAt: new Date().toLocaleString() },
        { id: Date.now() + 7, name: 'Ice Cream', mainCategoryId: testMainCategories[2].id, createdAt: new Date().toLocaleString() },
        { id: Date.now() + 8, name: 'Cakes', mainCategoryId: testMainCategories[2].id, createdAt: new Date().toLocaleString() }
      ];
      setSubCategories(testSubCategories);
      addLog('CREATE_SUBCATEGORY', 'Generated sub categories');
    }

    // Randomly select category
    const categoryIndex = Math.floor(Math.random() * mainCategories.length);
    const mainCategory = mainCategories[categoryIndex];
    const relatedSubs = subCategories.filter(sub => sub.mainCategoryId === mainCategory.id);
    const subCategory = relatedSubs[Math.floor(Math.random() * relatedSubs.length)];

    // Generate name based on category
    let itemName;
    switch(mainCategory.name) {
      case 'Meals':
        itemName = generateRandomFood();
        newItem.price = generateRandomPrice(80, 300);
        break;
      case 'Drinks':
        itemName = generateRandomDrink();
        newItem.price = generateRandomPrice(25, 150);
        break;
      case 'Desserts':
        itemName = generateRandomDessert();
        newItem.price = generateRandomPrice(35, 200);
        break;
      default:
        itemName = generateRandomFood();
        newItem.price = generateRandomPrice(50, 250);
    }

    newItem.name = itemName;
    newItem.mainCategoryId = mainCategory.id;
    newItem.subCategoryId = subCategory.id;
    newItem.imagePath = `https://via.placeholder.com/150?text=${encodeURIComponent(itemName)}`;

    setItems(prev => [...prev, newItem]);
    addLog('CREATE_ITEM', `Added new item "${itemName}"`);
  };

  // Filter items based on search query
  const filteredItems = items.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(searchLower) ||
      getMainCategoryName(item.mainCategoryId).toLowerCase().includes(searchLower) ||
      getSubCategoryName(item.subCategoryId).toLowerCase().includes(searchLower) ||
      item.price.toString().includes(searchQuery)
    );
  });

  return (
    <div className="crud-page">
      <header className="main-header">
        <div className="header-container">
          <div className="header-brand">
            <img src="/logo.png" alt="Aling Jackie's Logo" className="header-logo" />
            <h1 className="header-title" style={{ color: '#ffffff', margin: 0 }}>Aling Jackie's</h1>
          </div>
        </div>
      </header>

      <div className="crud-page-content">
        <div className="dashboard-summary">
          <div className="summary-card">
            <div className="summary-title">
              <span>📦</span>
              Total Items
            </div>
            <div className="summary-value">{items.length}</div>
            <div className="summary-subtitle">Available in inventory</div>
          </div>
          <div className="summary-card">
            <div className="summary-title">
              <span>📑</span>
              Main Categories
            </div>
            <div className="summary-value">{mainCategories.length}</div>
            <div className="summary-subtitle">Primary classifications</div>
          </div>
          <div className="summary-card">
            <div className="summary-title">
              <span>🏷️</span>
              Sub Categories
            </div>
            <div className="summary-value">{subCategories.length}</div>
            <div className="summary-subtitle">Secondary classifications</div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div className="list-section">
            <div className="table-header">
              <div className="table-title-section">
                <button className="btn-create" onClick={handleCreateClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                  Create New
                </button>
              </div>
              <div className="table-controls">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="table-container">
              {filteredItems.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Item Name</th>
                      <th>Price</th>
                      <th>Image</th>
                      <th>Category</th>
                      <th>Created Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map(item => (
                      <tr key={item.id}>
                        <td>#{item.id}</td>
                        <td>{item.name}</td>
                        <td className="price-display">{formatPrice(item.price)}</td>
                        <td>
                          {item.imagePath ? (
                            <img 
                              src={item.imagePath} 
                              alt={item.name} 
                              className={`item-thumbnail ${imageLoaded ? 'loaded' : 'loading'}`}
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/50?text=No+Image';
                                e.target.classList.remove('loading');
                                e.target.classList.add('loaded');
                              }}
                              onLoad={(e) => {
                                e.target.classList.remove('loading');
                                e.target.classList.add('loaded');
                              }}
                            />
                          ) : (
                            <img 
                              src="https://via.placeholder.com/50?text=No+Image"
                              alt="No image"
                              className="item-thumbnail loaded"
                            />
                          )}
                        </td>
                        <td>{getMainCategoryName(item.mainCategoryId)}{item.subCategoryId ? ` / ${getSubCategoryName(item.subCategoryId)}` : ''}</td>
                        <td>{item.createdAt}</td>
                        <td>
                          <div className="table-actions">
                            <button onClick={() => startEditItem(item)} className="btn-edit">Edit</button>
                            <button onClick={() => confirmDelete(item)} className="btn-delete">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="empty-state">
                  <h4>No items found</h4>
                  <p>{searchQuery ? 'Try different search terms' : 'Start by adding your first item to the inventory'}</p>
                </div>
              )}
            </div>
          </div>

          {/* Activity Logs */}
          <div className="logs-section">
            <div className="logs-header">
              <h3>Activity Logs</h3>
            </div>
            <div className="logs-container">
              {logs.length > 0 ? (
                <div className="logs-list">
                  {logs.map(log => (
                    <div key={log.id} className="log-item">
                      <div 
                        className={`log-indicator ${
                          log.action.includes('CREATE') ? 'create' :
                          log.action.includes('EDIT') ? 'edit' :
                          log.action.includes('DELETE') ? 'delete' : ''
                        }`}
                      />
                      <div className="log-content">
                        <p className="log-details">{log.details}</p>
                        <span className="log-timestamp">{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <h4>No activity yet</h4>
                  <p>Actions will be logged here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Create Options Modal */}
      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>What would you like to create?</h2>
            <div className="modal-options">
              <button onClick={() => handleOptionSelect('item')} className="btn-option">
                Add Item
              </button>
              <button onClick={() => handleOptionSelect('mainCategory')} className="btn-option">
                Add Main Category
              </button>
              <button onClick={() => handleOptionSelect('subCategory')} className="btn-option">
                Add Sub Category
              </button>
            </div>
            <button onClick={() => setIsCreateModalOpen(false)} className="btn-close">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {isFormModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            {selectedFormType === 'item' && (
              <>
                <h2>{isEditing ? 'Edit Item' : 'Add New Item'}</h2>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={itemForm.name}
                    onChange={(e) => setItemForm({...itemForm, name: e.target.value})}
                  />
                  <div className="price-input-container">
                    <input
                      type="text"
                      className="price-input"
                      placeholder="0.00"
                      value={itemForm.price}
                      onChange={handlePriceInput}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={itemForm.imagePath}
                    onChange={(e) => setItemForm({...itemForm, imagePath: e.target.value})}
                  />
                  {itemForm.imagePath && (
                    <div className="image-preview">
                      <img 
                        src={itemForm.imagePath} 
                        alt="Preview" 
                        className={`preview-image ${imageLoaded ? 'loaded' : 'loading'}`}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/200?text=Invalid+Image';
                          e.target.classList.remove('loading');
                          e.target.classList.add('loaded');
                        }}
                        onLoad={(e) => {
                          e.target.classList.remove('loading');
                          e.target.classList.add('loaded');
                        }}
                      />
                    </div>
                  )}
                  <select
                    value={itemForm.mainCategoryId}
                    onChange={(e) => setItemForm({...itemForm, mainCategoryId: e.target.value, subCategoryId: ''})}
                  >
                    <option value="">Select Main Category</option>
                    {mainCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                  <select
                    value={itemForm.subCategoryId}
                    onChange={(e) => setItemForm({...itemForm, subCategoryId: e.target.value})}
                  >
                    <option value="">Select Sub Category (Optional)</option>
                    {getFilteredSubCategories(itemForm.mainCategoryId).map(sub => (
                      <option key={sub.id} value={sub.id}>{sub.name}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-actions">
                  <button onClick={createItem} className="btn-primary">
                    {isEditing ? 'Update Item' : 'Add Item'}
                  </button>
                  <button 
                    onClick={() => {
                      resetItemForm();
                      setIsFormModalOpen(false);
                    }} 
                    className="btn-cancel"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {selectedFormType === 'mainCategory' && (
              <>
                <h2>Add Main Category</h2>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Category Name"
                    value={mainCategoryForm.name}
                    onChange={(e) => setMainCategoryForm({...mainCategoryForm, name: e.target.value})}
                  />
                </div>
                <div className="modal-actions">
                  <button onClick={createMainCategory} className="btn-primary">Add Category</button>
                  <button onClick={() => setIsFormModalOpen(false)} className="btn-cancel">Cancel</button>
                </div>
              </>
            )}

            {selectedFormType === 'subCategory' && (
              <>
                <h2>Add Sub Category</h2>
                <div className="form-grid">
                  <input
                    type="text"
                    placeholder="Sub Category Name"
                    value={subCategoryForm.name}
                    onChange={(e) => setSubCategoryForm({...subCategoryForm, name: e.target.value})}
                  />
                  <select
                    value={subCategoryForm.mainCategoryId}
                    onChange={(e) => setSubCategoryForm({...subCategoryForm, mainCategoryId: e.target.value})}
                  >
                    <option value="">Select Main Category</option>
                    {mainCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="modal-actions">
                  <button onClick={createSubCategory} className="btn-primary">Add Sub Category</button>
                  <button onClick={() => setIsFormModalOpen(false)} className="btn-cancel">Cancel</button>
                </div>
              </>
            )}
            <button onClick={() => setIsFormModalOpen(false)} className="btn-close">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content delete-confirmation">
            <h2>Confirm Delete</h2>
            <p>Are you sure you want to delete <strong>{itemToDelete?.name}</strong>?</p>
            <p className="warning">This action cannot be undone.</p>
            <div className="modal-actions">
              <button onClick={deleteItem} className="btn-delete">
                Yes, Delete Item
              </button>
              <button 
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setItemToDelete(null);
                }} 
                className="btn-cancel"
              >
                Cancel
              </button>
            </div>
            <button 
              onClick={() => {
                setIsDeleteModalOpen(false);
                setItemToDelete(null);
              }} 
              className="btn-close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrudPage;