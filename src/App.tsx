import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Cases from '@/pages/Cases';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Book from '@/pages/Book';
import FAQPage from '@/pages/FAQPage';
import Privacy from '@/pages/Privacy';
import CookiePolicy from '@/pages/CookiePolicy';

const App: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ydelser" element={<Services />} />
        <Route path="/projekter" element={<Cases />} />
        <Route path="/om" element={<About />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/book-moede" element={<Book />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privatlivspolitik" element={<Privacy />} />
        <Route path="/cookiepolitik" element={<CookiePolicy />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
    <Footer />
    <CookieBanner />
  </BrowserRouter>
);

export default App;
