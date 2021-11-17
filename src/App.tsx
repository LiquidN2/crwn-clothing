import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.scss';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import ContactPage from './pages/contact/contact.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

function App() {
  return (
    <div>
      <Header />
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
}

export default App;
