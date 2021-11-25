import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useActions } from '../../hooks';

import { ShopContainer } from './shop.styles';

const ShopPage: React.FC = () => {
  const { fetchCollectionsAsync } = useActions();

  useEffect(() => {
    fetchCollectionsAsync();
  }, []);

  return (
    <ShopContainer>
      <Outlet />
    </ShopContainer>
  );
};

export default ShopPage;
