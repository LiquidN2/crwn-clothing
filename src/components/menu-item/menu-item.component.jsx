import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';

// const MenuItemBackgroundImageStyle = {
//   backgroundImage:
// };

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  const MenuItemBackgroundImageStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  const handleRedirect = () => {
    history.push(`${match.url}${linkUrl}`);
  };

  return (
    <div className={`${size} menu-item`} onClick={handleRedirect}>
      <div
        className="background-image"
        style={MenuItemBackgroundImageStyle}
      ></div>
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
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
