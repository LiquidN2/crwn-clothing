import React, { MouseEventHandler, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { User } from 'firebase/auth';

// FIREBASE
import { auth } from './firebase/firebase.auth';
import {
  createUserProfileDocument,
  getUserById,
} from './firebase/firebase.firestore';

// LAYOUT COMPONENT
import Header from './components/header/header.component';

// PAGE COMPONENTS
import HomePage from './pages/homepage/homepage.component';
import ContactPage from './pages/contact/contact.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/checkout.component';
import PlaygroundPage from './pages/playground/playground.component';
import NotFoundPage from './pages/404/404.component';

// PAGE COMPONENTS - SHOP
import ShopPage from './pages/shop/shop.component';
import CollectionsOverview from './pages/shop/collections-overview/collections-overview.component';
import Collection from './pages/shop/collection/collection.component';

// ROUTING COMPONENT
import PublicRoute from './routes/public-route.component';

// REDUX HOOKS
import { useActions, useAppSelector } from './hooks';
import { selectCartHidden } from './redux/cart/cart.selectors';

// STYLES
import './App.scss';

const App: React.FC = () => {
  const { SetCurrentUser, toggleCartHidden } = useActions();
  const cartHidden = useAppSelector(selectCartHidden);

  useEffect(() => {
    // subscribe to Firebase auth state change
    return auth.onAuthStateChanged(async (user: User | null) => {
      if (!user) {
        SetCurrentUser(null);
        return;
      }

      try {
        const userDocRef = await createUserProfileDocument(user);
        if (!userDocRef) throw Error('unable to get user doc ref');

        const userData = await getUserById(userDocRef.id);
        if (!userData) throw Error('unable to fetch user data');

        SetCurrentUser({
          ...userData,
          createdAt: userData.createdAt.toLocaleString(),
        });
      } catch (err) {
        console.error(err);
      }
    });
  }, [SetCurrentUser]);

  const handleAppBodyClick: MouseEventHandler<HTMLDivElement> = e => {
    console.log(e.currentTarget.querySelector('.cart-icon'));
    // if (cartHidden) return;
    // toggleCartHidden();
  };

  return (
    <div className="app">
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="checkout" element={<CheckoutPage />} />

          <Route path="shop" element={<ShopPage />}>
            <Route index element={<CollectionsOverview />} />
            <Route path=":collectionRouteName" element={<Collection />} />
          </Route>

          <Route
            path="signin"
            element={
              <PublicRoute>
                <SignInAndSignUpPage />
              </PublicRoute>
            }
          />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
