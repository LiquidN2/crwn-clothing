import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import CollectionItem from 'components/collection-item/collection-item.component';

import './collection-preview.styles.scss';

const CollectionPreview = ({ title, items, routeName, history, match }) => {
  // only show the first 4 items
  const filteredItems = items.filter((item, index) => index < 4);

  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {filteredItems.map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
      <div
        className="see-more-link"
        onClick={() => history.push(`${match.path}/${routeName}`)}
      >
        See more {title.toLowerCase()} &#8594;
      </div>
    </div>
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
