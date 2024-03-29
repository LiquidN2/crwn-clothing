import styled from 'styled-components';

// import CollectionItem from '../../../components/collection-item/collection-item.component';

export const CollectionPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CollectionTitle = styled.h2`
  font-size: 38px;
  margin: 0 auto 30px;
  text-transform: uppercase;
`;

// const StyledItem = styled(CollectionItem);

export const CollectionItems = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-row-gap: 10px;
  grid-column-gap: 50px;

  & > * {
    width: 100%;
    margin-bottom: 30px;
  }
`;
