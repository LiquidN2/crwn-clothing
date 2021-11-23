import React, { MouseEventHandler } from 'react';

export interface CustomButtonProps {
  type?: 'submit' | 'reset' | 'button';
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  type,
  isGoogleSignIn,
  inverted,
  ...otherProps
}) => (
  <button type={type ? type : 'button'} {...otherProps}>
    {children}
  </button>
);
export default CustomButton;
