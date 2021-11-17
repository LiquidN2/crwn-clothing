import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { User } from 'firebase/auth';
import { auth } from './firebase/firebase.utils';

import './App.scss';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import ContactPage from './pages/contact/contact.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      console.log(user);

      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // unsubscribe up on component unmount
    return () => {
      unsubscribe();
    };
  }, []);

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
