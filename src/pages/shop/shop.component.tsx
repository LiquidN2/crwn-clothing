import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useActions } from '../../hooks';

import { ShopContainer } from './shop.styles';

const ShopPage: React.FC = () => {
  const { fetchCollections } = useActions();

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <ShopContainer>
      <Outlet />
    </ShopContainer>
  );
};

export default ShopPage;
