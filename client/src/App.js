import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import PropTypes from 'prop-types';

// ROUTER
import PublicRoute from './routers/publicRoute';

// COMPONENTS
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import NotFound from './pages/not-found/not-found.component';

// REDUX SELECTORS
import { checkUserSession } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';

// STYLES
import './App.scss';

const App = ({ currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession();

    const testAsync = async () => {
      try {
        const res = await axios.get('test');
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };

    testAsync();
  }, [checkUserSession]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <PublicRoute
          exact
          path="/signin"
          currentUser={currentUser}
          component={SignInAndSignUpPage}
        />
        <Route exact path="/checkout" component={CheckoutPage} />
        <Route path="/*" component={NotFound} />
        {/* <Route
          exact
          path="/signin"
          render={() =>
            currentUser ? (
              <Redirect to="/" />
            ) : (
              <SignInAndSignUpPage />
            )
          }
        /> */}
      </Switch>
    </div>
  );
};

App.propTypes = {
  currentUser: PropTypes.object,
  checkUserSession: PropTypes.func,
};

// const mapStateToProps = state => ({
//   currentUser: selectCurrentUser(state),
// });
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = {
  checkUserSession,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
