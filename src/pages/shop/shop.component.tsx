import React from 'react';
import { Outlet } from 'react-router-dom';

import { ShopContainer } from './shop.styles';

const ShopPage: React.FC = () => {
  return (
    <ShopContainer>
      <Outlet />
    </ShopContainer>
  );
};

export default ShopPage;
