import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { watchCollection } from '../../firebase/firebase.firestore';
import { useActions } from '../../hooks';

const ShopPage: React.FC = () => {
  const { updateCollections } = useActions();

  useEffect(() => {
    watchCollection().then(collections => updateCollections(collections));
  }, []);

  return (
    <div className="shop-page">
      <Outlet />
    </div>
  );
};

export default ShopPage;
