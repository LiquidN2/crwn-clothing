import React, { MouseEventHandler } from 'react';
import './menu-item.styles.scss';
import history from 'history/browser';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { location } = history;
  const onClick: MouseEventHandler<HTMLDivElement> = () => {
    // console.log(`${history.location.pathname}${linkUrl}`);
    navigate(`${linkUrl}`);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className={`${size ? size : ''} menu-item`}
      onClick={onClick}
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
