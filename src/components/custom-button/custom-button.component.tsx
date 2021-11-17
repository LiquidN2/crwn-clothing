import './custom-button.styles.scss';
import React, { MouseEventHandler } from 'react';

interface CustomButtonProps {
  type?: 'submit' | 'reset' | 'button';
  isGoogleSignIn?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  type,
  isGoogleSignIn,
  handleClick,
  ...otherProps
}) => (
  <button
    className={`${isGoogleSignIn ? 'google-sign-in' : ''} custom-button`}
    type={type ? type : 'button'}
    onClick={handleClick}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
