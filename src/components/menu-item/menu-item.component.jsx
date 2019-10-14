import React from 'react';
import PropTypes from 'prop-types';
import './menu-item.styles.scss';

// const MenuItemBackgroundImageStyle = {
//   backgroundImage:
// };

const MenuItem = ({ title, imageUrl, size }) => {
  const MenuItemBackgroundImageStyle = {
    backgroundImage: `url(${imageUrl})`,
  };

  return (
    <div className={`${size} menu-item`}>
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
};

export default MenuItem;
