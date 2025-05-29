import React, { Fragment, useState, useEffect } from 'react';
import CategoryBar from '../../components/categoryBar';
import Header from '../../components/header';
import ItemView from '../../components/ItemView';
import OrderList from "../../components/OrderList";
import { useParams } from 'react-router';

// import OrderList from "../../components/OrderList";

export default function POS() {
  const [orderType, setOrderType] = useState(''); // State to hold the order type
  const params = useParams();

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

  useEffect(() => {
    if (!orderType) return;

    alert(`You are in the interface for ${orderType} orders!`);
  }, [orderType]);

  // Function to handle item selection and add to order
  // TODO ?

  return (
    <div>
      <CategoryBar />
      <Header />
      <ItemView />
      <OrderList />
    </div>
  );
}
