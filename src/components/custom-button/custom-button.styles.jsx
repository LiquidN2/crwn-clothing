import styled, { css } from 'styled-components';

const customButtonStyle = css`
  background-color: black;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

const invertedButtonStyles = css`
  background-color: white;
  color: black;
  border: 1px solid black;

  &:hover {
    background-color: black;
    color: white;
    border: 1px solid transparent;
  }
`;

const googleSignInButtonStyles = css`
  background-color: #4285f4;

  &:hover {
    background-color: #fff;
    color: #4285f4;
    border: 1px solid #4285f4;
  }
`;

const getButtonStyles = props => {
  if (props.isGoogleSignedIn) {
    return googleSignInButtonStyles;
  } else if (props.inverted) {
    return invertedButtonStyles;
  } else {
    return customButtonStyle;
  }
};

const addToCartStyles = props => {
  if (props.isAddToCartStyled) {
    return css`
      width: 80%;
      opacity: 0.7;
      position: absolute;
      top: 255px;
      display: none;
    `;
  }
};

export const CustomButtonContainer = styled.button`
  min-width: 165px;
  width: auto;
  height: 50px;
  letter-spacing: 0.5px;
  line-height: 50px;
  padding: 0 35px 0 35px;
  font-size: 15px;
  text-transform: uppercase;
  font-family: 'Open Sans Condensed';
  font-weight: bolder;
  cursor: pointer;
  display: flex;
  justify-content: center;
  color: white;
  border: 1px solid transparent;

  ${getButtonStyles}

  ${addToCartStyles}
`;
