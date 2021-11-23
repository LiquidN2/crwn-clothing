import styled from 'styled-components';

import { StyledCustomButton } from '../custom-button/custom-button.styles';

export const ItemFooter = styled.div`
  width: 100%;
  height: 7%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  z-index: 1;
`;

export const ItemImage = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
`;

export const ItemPrice = styled.span`
  width: 10%;
`;

export const ItemName = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const ItemButton = styled(StyledCustomButton)`
  width: 80%;
  opacity: 0.7;
  position: absolute;
  top: 255px;
  display: none;
`;

export const CollectionItemContainer = styled.div`
  width: 22%;
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  overflow: hidden;
  position: relative;

  &:hover ${ItemImage} {
    opacity: 0.8;
  }

  &:hover ${ItemButton} {
    display: inline-block;
  }
`;
