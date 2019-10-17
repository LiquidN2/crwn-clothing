import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

import './App.css';

const getSnapshotData = docRef => {
  return new Promise((resolve, reject) => {
    docRef.onSnapshot(doc => {
      if (!doc.exists) {
        return reject(null);
      }
      resolve({ id: doc.id, ...doc.data() });
    });
  });
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  // componentDidMount() {
  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  //     let currentUser = null;

  //     if (userAuth) {
  //       const userRef = await createUserProfileDocument(userAuth);

  //       currentUser = await getSnapshotData(userRef);
  //     }

  //     this.setState({ currentUser });
  //   });
  // }

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(doc => {
          const userData = doc.data();
          this.setState({
            currentUser: {
              id: doc.id,
              ...userData,
            },
          });
          console.log(this.state);
        });
      }

      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
