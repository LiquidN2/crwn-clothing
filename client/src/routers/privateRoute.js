import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PrivateRoute = ({ currentUser, component: Component, ...rest }) => {
  const PrivateComponent = props => {
    // if is authenticated, redirect to signin
    if (!currentUser) {
      return <Redirect to="/signin" />;
    } else {
      // render public component
      return <Component {...props} />;
    }
  };

  return <Route {...rest} component={PrivateComponent} />;
};

PrivateRoute.propTypes = {
  currentUser: PropTypes.object,
  component: PropTypes.elementType,
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(PrivateRoute);
