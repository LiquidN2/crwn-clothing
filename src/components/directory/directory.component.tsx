import './directory.styles.scss';
import React, { useState } from 'react';
import MenuItem, { MenuItemProps } from '../menu-item/menu-item.component';
import SECTIONS_DATA from '../../../dev-data/sections.data';

const Directory: React.FC = () => {
  const [sections] = useState<MenuItemProps[]>(SECTIONS_DATA);
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...props }: MenuItemProps) => (
        <MenuItem key={id} {...props} />
      ))}
    </div>
  );
};

export default Directory;
