import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// STYLES
import {
  MenuItemContainer,
  BackgroundImage,
  Content,
  Title,
  Subtitle,
} from './menu-item.styles';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  const handleRedirect = () => {
    history.push(`${match.url}${linkUrl}`);
  };

  return (
    <MenuItemContainer large={size === 'large'} onClick={handleRedirect}>
      <BackgroundImage imageUrl={imageUrl} />
      <Content>
        <Title>{title.toUpperCase()}</Title>
        <Subtitle>SHOP NOW</Subtitle>
      </Content>
    </MenuItemContainer>
  );
};

MenuItem.propTypes = {
  title: PropTypes.string,
  imageUrl: PropTypes.string,
  size: PropTypes.string,
  linkUrl: PropTypes.string,
  history: PropTypes.object,
  match: PropTypes.object,
};

export default withRouter(MenuItem);
