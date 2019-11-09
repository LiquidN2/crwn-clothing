import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// CHILD COMPONENTS
import CollectionItem from 'components/collection-item/collection-item.component';

// STYLES
import {
  CollectionPreviewContainer,
  Title,
  Preview,
  SeeMoreLink,
} from './collection-preview.styles';

const CollectionPreview = ({ title, items, routeName, history, match }) => {
  // only show the first 4 items
  const filteredItems = items.filter((item, index) => index < 4);

  return (
    <CollectionPreviewContainer>
      <Title>{title.toUpperCase()}</Title>
      <Preview>
        {filteredItems.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </Preview>
      <SeeMoreLink onClick={() => history.push(`${match.path}/${routeName}`)}>
        See more {title.toLowerCase()} &#8594;
      </SeeMoreLink>
    </CollectionPreviewContainer>
  );
};

CollectionPreview.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  routeName: PropTypes.string,
  history: PropTypes.object,
  match: PropTypes.object,
};

export default withRouter(CollectionPreview);
