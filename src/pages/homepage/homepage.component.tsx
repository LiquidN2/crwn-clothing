import './homepage.styles.scss';
import React from 'react';

import Directory from '../../components/directory/directory.component';

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <Directory />
    </div>
  );
};

export default HomePage;
