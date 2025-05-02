import React, { Fragment } from "react";
import CategoryBar from "../../components/categoryBar";
import Header from "../../components/header";
import ItemView from '../../components/ItemView';
// import OrderList from "../../components/OrderList";

export default function POS() {
  // Function to handle item selection and add to order
  

  return (
<<<<<<< Updated upstream
    <div>
      <CategoryBar />
      <Header />
    </div>
=======
    <Fragment>
      {/* Main header */}
      <Header />
      
      {/* Main content with side-by-side panels */}
      <div style={{ 
        display: 'flex', 
        height: 'calc(100vh - 60px)', // Adjust based on your header height
        overflow: 'hidden'
      }}>
        {/* Left sidebar - Category bar */}
        <CategoryBar />
        
        {/* Main content - Item View */}
        {/* <ItemView onSelectItem={handleSelectItem} /> */}
        
        {/* Right sidebar would be OrderList if needed */}
      </div>
    </Fragment>
>>>>>>> Stashed changes
  );
}