import './collection-item.styles.scss';
import React, { MouseEventHandler } from 'react';
import { ShopItem } from '../../models/ShopItem';

import CustomButton from '../custom-button/custom-button.component';

import { useActions } from '../../hooks';

export interface CollectionItemProps extends ShopItem {}

const CollectionItem: React.FC<CollectionItemProps> = ({
  id,
  name,
  imageUrl,
  price,
}) => {
  const { addItem } = useActions();

  const handleAddItemClick: MouseEventHandler<HTMLButtonElement> = () => {
    const item = { id, name, imageUrl, price };
    addItem(item);
  };

  return (
    <div className="collection-item">
      <div
        className="image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="collection-footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <CustomButton inverted={true} onClick={handleAddItemClick}>
        add to card
      </CustomButton>
    </div>
  );
};

export default CollectionItem;
