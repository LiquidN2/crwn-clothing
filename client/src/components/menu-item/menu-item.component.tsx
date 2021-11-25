import React, { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  MenuItemContainer,
  BackgroundImage,
  MenuItemContent,
  MenuItemTitle,
  MenuItemSubtitle,
} from './menu-item.styles';

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
  const onClick: MouseEventHandler<HTMLDivElement> = () => {
    navigate(`${linkUrl}`);
  };

  return (
    <MenuItemContainer className={size ? size : ''} onClick={onClick}>
      <BackgroundImage
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <MenuItemContent>
        <MenuItemTitle>{title}</MenuItemTitle>
        <MenuItemSubtitle>Shop Now</MenuItemSubtitle>
      </MenuItemContent>
    </MenuItemContainer>
  );
};

export default MenuItem;
