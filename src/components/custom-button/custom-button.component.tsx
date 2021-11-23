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
  ...otherProps
}) => (
  <button type={type ? type : 'button'} {...otherProps}>
    {children}
  </button>
);
export default CustomButton;
