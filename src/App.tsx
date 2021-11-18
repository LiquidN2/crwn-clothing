import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { User } from 'firebase/auth';

import { auth } from './firebase/firebase.auth';

import {
  createUserProfileDocument,
  getUserById,
} from './firebase/firebase.firestore';

import './App.scss';
import Header from './components/header/header.component';
import PublicRoute from './routes/public-route.component';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import ContactPage from './pages/contact/contact.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import PlaygroundPage from './pages/playground/playground.component';

import { useActions } from './hooks';

const App: React.FC = () => {
  const { SetCurrentUser } = useActions();

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

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route
          path="signin"
          element={
            <PublicRoute>
              <SignInAndSignUpPage />
            </PublicRoute>
          }
        />
        <Route path="playground" element={<PlaygroundPage />} />
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
