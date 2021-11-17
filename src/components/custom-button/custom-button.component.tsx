import './custom-button.styles.scss';
import React from 'react';

interface CustomButtonProps {
  type?: 'submit' | 'reset' | 'button';
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  type,
  ...otherProps
}) => (
  <button
    className="custom-button"
    type={type ? type : 'button'}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
