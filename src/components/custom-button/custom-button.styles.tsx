import styled, { css } from 'styled-components';

// Styling CustomButton instead of button to ensure custom props are passed
import CustomButton, { CustomButtonProps } from './custom-button.component';

const googleSignInStyles = css`
  border: 1px solid #4285f4;
  background-color: #4285f4;

  &:hover {
    background-color: white;
    color: #4285f4;
  }
`;

const invertedStyles = css`
  background-color: white;
  color: black;

  &:hover {
    background-color: black;
    color: white;
    border: none;
  }
`;

const getButtonStyles = (props: CustomButtonProps) => {
  if (props.isGoogleSignIn) {
    return googleSignInStyles;
  }

  if (props.inverted) {
    return invertedStyles;
  }

  return '';
};

export const StyledCustomButton = styled(CustomButton)<CustomButtonProps>`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  background-color: black;
  // background-color: ${props => (props.isGoogleSignIn ? '#4285f4' : 'black')};
  color: white;
  text-transform: uppercase;
  font-family: inherit;
  font-weight: bolder;
  border: 1px solid black;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: white;
    color: black;
    //border: 1px solid black;
  }

  ${getButtonStyles}
`;
