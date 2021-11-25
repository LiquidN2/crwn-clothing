import React, { MouseEventHandler } from 'react';

export interface CustomButtonProps {
  type?: 'submit' | 'reset' | 'button';
  isGoogleSignIn?: boolean;
  inverted?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  type,
  isGoogleSignIn,
  inverted,
  disabled,
  ...otherProps
}) => (
  <button type={type ? type : 'button'} {...otherProps} disabled={disabled}>
    {children}
  </button>
);
export default CustomButton;
