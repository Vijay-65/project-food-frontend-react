import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import CategorySection from './components/CategorySection';
import { TrustSection, Footer } from './components/Footer';
import AboutPage from './components/AboutPage';
import MenuPage from './components/MenuPage';
import OffersPage from './components/OffersPage';
import MenuSection from './components/MenuSection';

import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CartPage from './components/CartPage';

import OrdersPage from './components/OrdersPage';
import { Toaster } from 'react-hot-toast';

const HomePage: React.FC = () => (
  <>
    <Hero />
    <CategorySection />
    <MenuSection limit={8} featuredOnly={true} title="Today's Special Deals" />
    <TrustSection />
  </>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Toaster position="top-right" />
        <Router>
          <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/offers" element={<OffersPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/orders" element={<OrdersPage />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};


export default App;
