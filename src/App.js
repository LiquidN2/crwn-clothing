import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// FIREBASE AUTH
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

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
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     currentUser: null,
  //   };
  // }

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
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

App.propTypes = {
  setCurrentUser: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
});

export default connect(
  null,
  mapDispatchToProps
)(App);
