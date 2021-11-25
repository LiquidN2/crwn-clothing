import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

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
import CollectionsOverview from './pages/shop/collections-overview/collections-overview.container';
import Collection from './pages/shop/collection/collection.container';

// ROUTING COMPONENT
import PublicRoute from './routes/public-route.component';

// REDUX HOOKS
import { useActions } from './hooks';

// STYLES
import './App.scss';

const App: React.FC = () => {
  const { checkUserSessionAsync } = useActions();

  useEffect(() => {
    checkUserSessionAsync();
  }, [checkUserSessionAsync]);

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
