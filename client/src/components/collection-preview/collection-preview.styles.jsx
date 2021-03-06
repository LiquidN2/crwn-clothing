import styled from 'styled-components';

export const CollectionPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;

  &:hover {
    color: #bbb;
  }
`;

export const Preview = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const SeeMoreLink = styled.div`
  cursor: pointer;
  align-self: flex-end;
  margin-top: 20px;

  &:hover {
    color: #bbb;
  }
`;
