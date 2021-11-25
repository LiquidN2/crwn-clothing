import React, { MouseEventHandler } from 'react';
import { ShopItem } from '../../models/ShopItem';

import {
  CollectionItemContainer,
  ItemFooter,
  ItemPrice,
  ItemName,
  ItemImage,
  ItemButton,
} from './collection-item.styles';

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
    <CollectionItemContainer>
      <ItemImage
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <ItemFooter>
        <ItemName>{name}</ItemName>
        <ItemPrice>${price}</ItemPrice>
      </ItemFooter>
      <ItemButton inverted={true} onClick={handleAddItemClick}>
        add to card
      </ItemButton>
    </CollectionItemContainer>
  );
};

export default CollectionItem;
