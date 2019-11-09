import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// CHILD COMPONENTS
import MenuItem from 'components/menu-item/menu-item.component';

// REDUX SELECTORS
import { selectDirectorySections } from 'redux/directory/directory.selectors';

// STYLES
import { DirectoryMenuContainer } from './directory.styles';

const Directory = ({ sections }) => {
  return (
    <DirectoryMenuContainer>
      {sections.map(({ id, ...rest }) => {
        return <MenuItem key={id} {...rest} />;
      })}
    </DirectoryMenuContainer>
  );
};

Directory.propTypes = {
  sections: PropTypes.array,
};

// const mapStateToProps = state => ({
//   sections: state.directory.sections,
// });
const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections,
});

export default connect(mapStateToProps)(Directory);
