import { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import OrderView from './components/pages/OrderView';
import PendingOrders from './components/pages/PendingOrders';
import OrderHistory from './components/pages/OrderHistory';
import CRUD from './components/pages/CRUD';

function App() {
  return (
    <Routes>
      <Route path='/' element={<h1>Welcome to the POS System!</h1>} />
      <Route path='/pos' element={<HomePOS />} />
      <Route path='/pos/order-now' element={<OrderView />} />
      <Route path='/pos/current-orders/:id' element={<PendingOrders />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/admin/order-history' element={<OrderHistory />} />
      <Route path='/admin/crud' element={<CRUD />} />
      <Route path='/admin/inventory' element={<Inventory />} />
    </Routes>
  );
}

// placeholders
function Admin() {
  return <div>Admin Page</div>;
}
function HomePOS() {
  return <div>Admin Page</div>;
}
function Inventory() {
  return <div>Admin Page</div>;
}

export default App;
