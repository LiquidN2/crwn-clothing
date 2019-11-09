import React from 'react';
import PropTypes from 'prop-types';

import { CustomButtonContainer } from './custom-button.styles';

// const CustomButton = ({ children, isGoogleSignedIn, inverted, ...rest }) => (
//   <button
//     className={`
//       ${inverted ? 'inverted' : ''}
//       ${isGoogleSignedIn ? 'google-signed-in' : ''}
//       custom-button
//     `}
//     {...rest}
//   >
//     {children}
//   </button>
// );

const CustomButton = ({ children, ...rest }) => (
  <CustomButtonContainer {...rest}>{children}</CustomButtonContainer>
);

CustomButton.propTypes = {
  children: PropTypes.elementType,
  isGoogleSignedIn: PropTypes.bool,
  inverted: PropTypes.bool,
};

export default CustomButton;
