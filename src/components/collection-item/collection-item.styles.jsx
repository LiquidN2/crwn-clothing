import styled from 'styled-components';

export const ItemImage = styled.div`
  width: 100%;
  height: 95%;
  background-size: cover;
  background-position: center;
  margin-bottom: 5px;
  background-image: ${props => {
    return 'url(' + props.imageUrl + ')';
  }};
`;

export const CollectionItemContainer = styled.div`
  width: ${props => (props.collectionPage ? '95%' : '22%')}
  margin-bottom: ${props => (props.collectionPage ? '30px' : 'auto')};
  display: flex;
  flex-direction: column;
  height: 350px;
  align-items: center;
  position: relative;

  &:hover {
    ${ItemImage} {
      opacity: 0.8;
    }

    button {
      opacity: 0.85;
      display: flex;
    }
  }
`;

export const CollectionFooter = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: space-between;
  font-size: 18px;
`;

export const ItemName = styled.span`
  width: 90%;
  margin-bottom: 15px;
`;

export const ItemPrice = styled.span`
  width: 10%;
`;
