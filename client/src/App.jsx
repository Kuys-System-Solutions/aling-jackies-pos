// src/App.jsx
import './App.css';
import KitchenView from './pages/KitchenView';
import Index from './pages/Index';
import OrderView from './pages/OrderView';
import OrderHistory from './pages/OrderHistory';
import StudioView from './pages/StudioView'; // Add this import
import { Routes, Route } from 'react-router';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} /> {/* Done */}
      <Route path="/order-now/:mode" element={<OrderView />} />
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/kitchen" element={<KitchenView />} /> {/* Done */}
      <Route path="/studio" element={<StudioView />} /> {/* Done */}
    </Routes>
  );
}

export default App;
