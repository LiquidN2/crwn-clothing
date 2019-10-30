import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PublicRoute = ({ currentUser, component: Component, ...rest }) => {
  const PublicComponent = props => {
    // if is authenticated, redirect to a Private route
    if (currentUser) {
      console.log('redirecting to home...');
      return <Redirect to="/" />;
    } else {
      // render public component
      return <Component {...props} />;
    }
  };

  return <Route {...rest} component={PublicComponent} />;
};

PublicRoute.propTypes = {
  currentUser: PropTypes.object,
  component: PropTypes.elementType,
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PublicRoute);
