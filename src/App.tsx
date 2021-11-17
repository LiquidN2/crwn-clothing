import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { User } from 'firebase/auth';
import {
  auth,
  getCollections,
  createUserProfileDocument,
  getUserById,
} from './firebase/firebase.utils';

import './App.scss';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import ContactPage from './pages/contact/contact.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import { UserType } from './models/User';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    // subscribe to Firebase auth state change
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        createUserProfileDocument(user)
          .then((userDocRef: any) => {
            return getUserById(userDocRef.id);
          })
          .then(userData => setCurrentUser(userData));
      } else {
        setCurrentUser(null);
      }
    });

    // unsubscribe when component unmount
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  // getCollections().then();

  return (
    <div>
      <Header currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="signin" element={<SignInAndSignUpPage />} />
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
