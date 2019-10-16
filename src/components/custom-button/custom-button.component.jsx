import React from 'react';
import PropTypes from 'prop-types';

import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignedIn, ...rest }) => (
  <button
    className={`${isGoogleSignedIn ? 'google-signed-in' : ''} custom-button`}
    {...rest}
  >
    {children}
  </button>
);

CustomButton.propTypes = {
  children: PropTypes.elementType,
  isGoogleSignedIn: PropTypes.bool,
};

export default CustomButton;
