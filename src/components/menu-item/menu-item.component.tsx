import React from 'react';
import './menu-item.styles.scss';

export interface MenuItemProps {
  id?: number;
  title: string;
  linkUrl: string;
  imageUrl: string;
  size?: 'large' | 'medium' | 'small';
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  linkUrl,
  imageUrl,
  size,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className={`${size ? size : ''} menu-item`}
    >
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="content">
        <h1 className="title">{title}</h1>
        <span className="subtitle">Shop Now</span>
      </div>
    </div>
  );
};

export default MenuItem;
