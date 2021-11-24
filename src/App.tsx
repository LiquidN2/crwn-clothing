import React, { useEffect, useState } from 'react';
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
import withSpinner from './components/with-spinner/with-spinner.component';

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
import { useActions } from './hooks';

import { getCollections } from './firebase/firebase.firestore';

// STYLES
import './App.scss';

const CollectionsOverviewWithSpinner = withSpinner(CollectionsOverview);
const CollectionWithSpinner = withSpinner(Collection);

const App: React.FC = () => {
  const [loadingCollections, setLoadingCollections] = useState<boolean>(false);
  const { setCurrentUser } = useActions();
  const { updateCollections } = useActions();

  useEffect(() => {
    // subscribe to Firebase auth state change
    return auth.onAuthStateChanged(async (user: User | null) => {
      if (!user) {
        setCurrentUser(null);
        return;
      }

      try {
        const userDocRef = await createUserProfileDocument(user);
        if (!userDocRef) throw Error('unable to get user doc ref');

        const userData = await getUserById(userDocRef.id);
        if (!userData) throw Error('unable to fetch user data');

        setCurrentUser({
          ...userData,
          createdAt: userData.createdAt.toLocaleString(),
        });
      } catch (err) {
        console.error(err);
      }
    });
  }, [setCurrentUser]);

  useEffect(() => {
    setLoadingCollections(true);
    getCollections().then(collections => {
      updateCollections(collections);
      setLoadingCollections(false);
    });
  }, []);

  return (
    <div className="app">
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="checkout" element={<CheckoutPage />} />

          <Route path="shop" element={<ShopPage />}>
            <Route
              index
              element={
                <CollectionsOverviewWithSpinner
                  isLoading={loadingCollections}
                />
              }
            />
            <Route
              path=":collectionRouteName"
              element={<CollectionWithSpinner isLoading={loadingCollections} />}
            />
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
