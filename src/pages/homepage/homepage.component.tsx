import './homepage.styles.scss';
import React from 'react';
import history from 'history/browser';

import Directory from '../../components/directory/directory.component';

const HomePage: React.FC = props => {
  const location = history.location;
  console.log(location);

  return (
    <div className="homepage">
      <Directory />
    </div>
  );
};

export default HomePage;
