import React, { Fragment, useState, useEffect } from 'react';
import CategoryBar from '../../components/categoryBar';
import Header from '../../components/header';
import ItemView from '../../components/ItemView';
import OrderList from '../../components/OrderList';
import { useParams } from 'react-router';

// import OrderList from "../../components/OrderList";

export default function POS() {
  const [orderType, setOrderType] = useState(''); // State to hold the order type
  const [orderItems, setOrderItems] = useState([]); // State to hold the orders
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const params = useParams();

  // sets the order type based on the URL parameter
  useEffect(() => {
    const mode = params.mode;
    if (mode === 'dine-in') {
      setOrderType('Dine-In');
    } else if (mode === 'take-out') {
      setOrderType('Take-Out');
    } else {
      setOrderType('Unknown');
    }
  }, [params]);

  // temporary (we should add a different indicator for mode)
  useEffect(() => {
    if (!orderType) return;

    alert(`You are in the interface for ${orderType} orders!`);
  }, [orderType]);

  // Handler for search input changes
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Function to handle item selection and add to order
  // TODO ?

  return (
    <div>
      <CategoryBar />
      <Header onSearch={handleSearch} />
      <ItemView 
        orderItems={orderItems} 
        setOrderItems={setOrderItems} 
        searchTerm={searchTerm}
      />
      <OrderList orderItems={orderItems} setOrderItems={setOrderItems} />
    </div>
  );
}
