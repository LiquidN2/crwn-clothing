import React from 'react';
import MenuItem from '../menu-item/menu-item.component';
import { useAppSelector } from '../../hooks';
import { selectDirectorySections } from '../../redux/directory/directory.selectors';

import { DirectoryContainer } from './directory.styles';

const Directory: React.FC = () => {
  const sections = useAppSelector(selectDirectorySections);

  return (
    <DirectoryContainer>
      {sections.map(({ id, ...props }) => (
        <MenuItem key={id} {...props} />
      ))}
    </DirectoryContainer>
  );
};

export default Directory;
