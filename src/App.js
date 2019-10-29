import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// FIREBASE AUTH
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import PublicRoute from './routers/publicRoute';

// COMPONENTS
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

// REDUX ACTIONS
import { setCurrentUser } from './redux/user/user.actions';

// STYLES
import './App.css';

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        return userRef.onSnapshot(doc => {
          const userData = doc.data();

          const currentUser = {
            id: doc.id,
            ...userData,
          };

          this.props.setCurrentUser(currentUser);
        });
      }

      this.props.setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <PublicRoute component={SignInAndSignUpPage} />
          {/* <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          /> */}
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  currentUser: PropTypes.object,
  setCurrentUser: PropTypes.func,
};

const mapStateToProps = state => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
