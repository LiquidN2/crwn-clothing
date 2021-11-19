import './custom-button.styles.scss';
import React, { MouseEventHandler } from 'react';

interface CustomButtonProps {
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
}) => {
  const btnClassName = `${inverted ? 'inverted' : ''} ${
    isGoogleSignIn ? 'google-sign-in' : ''
  } custom-button`;

  return (
    <button
      className={btnClassName}
      type={type ? type : 'button'}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default CustomButton;
