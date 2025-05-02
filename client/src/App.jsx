import { useState, useEffect } from 'react';
import './App.css';
import KitchenView from './pages/KitchenView';
import Index from './pages/Index';
import OrderView from './pages/OrderView';
import OrderHistory from './pages/OrderHistory';
import { Routes, Route } from 'react-router';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/order-now/:mode" element={<OrderView />} />
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/kitchen/:mode" element={<KitchenView />} />
    </Routes>
  );
}

export default App;
