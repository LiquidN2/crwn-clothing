import './collection-preview.styles.scss';
import React from 'react';
import CollectionItem, {
  CollectionItemProps,
} from '../collection-item/collection-item.component';

export interface CollectionPreviewProps {
  id: number;
  title: string;
  routeName: string;
  items: CollectionItemProps[];
}

const CollectionPreview: React.FC<CollectionPreviewProps> = ({
  title,
  items,
}) => (
  <div className="collection-preview">
    <h1 className="title">{title}</h1>
    <div className="preview">
      {items
        .filter((item, index) => index < 4)
        .map(item => (
          <CollectionItem key={item.id} {...item} />
        ))}
    </div>
  </div>
);

export default CollectionPreview;
