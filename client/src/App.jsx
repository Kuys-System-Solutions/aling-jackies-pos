// src/App.jsx
import './App.css';
import KitchenView from './pages/KitchenView';
import Index from './pages/Index';
import OrderView from './pages/OrderView';
import OrderHistory from './pages/OrderHistory';
import StudioView from './pages/StudioView'; // Add this import
import POS from './pages/POS';  
import CrudPage from './pages/CrudPage/CrudPage';
import { Routes, Route } from 'react-router';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Index />} /> {/* Done */}
      <Route path="/order-history" element={<OrderHistory />} /> {/* Done (sorta) */}
      <Route path="/kitchen" element={<KitchenView />} /> {/* Done */}
      <Route path="/studio" element={<StudioView />} /> {/* Done */}
      <Route path="/pos/:mode" element={<POS />} />  {/* Add this new route */}
      <Route path="/pos/crud-page" element={<CrudPage />} />
    </Routes>
  );
}

export default App;
