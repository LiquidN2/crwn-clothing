import styled from 'styled-components';

export const MenuItemContent = styled.div`
  height: 90px;
  padding: 0 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  background-color: rgba(255, 255, 255, 0.75);
  position: absolute;
  transition: background-color 2s;
`;

export const BackgroundImage = styled.div`
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100%;
`;

export const MenuItemTitle = styled.h1`
  font-weight: bold;
  margin-bottom: 6px;
  font-size: 22px;
  color: #4a4a4a;
  text-transform: uppercase;
`;

export const MenuItemSubtitle = styled.span`
  font-weight: lighter;
  font-size: 16px;
  text-transform: uppercase;
`;

export const MenuItemContainer = styled.div`
  min-width: 30%;
  height: 240px;
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  margin: 0 7.5px 15px;
  position: relative;
  overflow: hidden;

  &:first-child {
    margin-right: 7.5px;
  }

  &:last-child {
    margin-left: 7.5px;
  }

  &:hover {
    cursor: pointer;
  }

  &:hover ${BackgroundImage} {
    transform: scale(1.1);
    transition: transform 6s cubic-bezier(0.25, 0.45, 0.45, 0.95);
  }

  &:hover ${MenuItemContent} {
    background-color: rgba(white, 0.9);
  }

  &.large {
    height: 380px !important;
  }
`;
