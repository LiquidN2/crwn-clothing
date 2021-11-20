import React from 'react';
import { Outlet } from 'react-router-dom';

const ShopPage: React.FC = () => {
  return (
    <div className="shop-page">
      <Outlet />
    </div>
  );
};

export default ShopPage;
