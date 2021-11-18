import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { User } from 'firebase/auth';
import {
  auth,
  // getCollections,
  createUserProfileDocument,
  getUserById,
} from './firebase/firebase.utils';

import './App.scss';
import Header from './components/header/header.component';
import PublicRoute from './routes/public-route.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import ContactPage from './pages/contact/contact.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { UserDocData } from './models/User';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserDocData | null>(null);

  useEffect(() => {
    // subscribe to Firebase auth state change
    return auth.onAuthStateChanged(async (user: User | null) => {
      console.log('auth state changed');

      if (!user) {
        setCurrentUser(null);
        return;
      }

      try {
        const userDocRef = await createUserProfileDocument(user);
        if (!userDocRef) throw Error('unable to get user doc ref');
        const userData = await getUserById(userDocRef.id);
        if (!userData) throw Error('unable to fetch user data');
        setCurrentUser(userData);
      } catch (err) {
        console.error(err);
      }
    });
  }, []);

  useEffect(() => {
    console.log('currentUser', currentUser);
  }, [currentUser]);

  // getCollections().then();

  return (
    <div>
      <Header currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route
          path="signin"
          element={
            <PublicRoute currentUser={currentUser}>
              <SignInAndSignUpPage />
            </PublicRoute>
          }
        />
        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>404! Page not found</p>
            </main>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
