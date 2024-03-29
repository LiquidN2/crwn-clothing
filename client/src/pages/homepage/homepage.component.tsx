import React from 'react';

import Directory from '../../components/directory/directory.component';
import { HomePageContainer } from './homepage.styles';

const HomePage: React.FC = () => {
  return (
    <HomePageContainer>
      <Directory />
    </HomePageContainer>
  );
};

export default HomePage;
