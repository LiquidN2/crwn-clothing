import './directory.styles.scss';
import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import { useAppSelector } from '../../hooks';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

const Directory: React.FC = () => {
  const sections = useAppSelector(selectDirectorySections);

  return (
    <div className="directory-menu">
      {sections.map(({ id, ...props }) => (
        <MenuItem key={id} {...props} />
      ))}
    </div>
  );
};

export default Directory;
