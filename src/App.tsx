import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import CookieBanner from '@/components/ui/CookieBanner';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Pricing from '@/pages/Pricing';
import Cases from '@/pages/Cases';
import CaseDetail from '@/pages/CaseDetail';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Book from '@/pages/Book';
import FAQPage from '@/pages/FAQPage';
import Privacy from '@/pages/Privacy';
import CookiePolicy from '@/pages/CookiePolicy';
import NotFound from '@/pages/NotFound';

const App: React.FC = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ScrollToTop />
    <Header />
    <main id="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ydelser" element={<Services />} />
        <Route path="/priser" element={<Pricing />} />
        <Route path="/projekter" element={<Cases />} />
        <Route path="/projekter/:slug" element={<CaseDetail />} />
        <Route path="/om" element={<About />} />
        <Route path="/kontakt" element={<Contact />} />
        <Route path="/book-moede" element={<Book />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privatlivspolitik" element={<Privacy />} />
        <Route path="/cookiepolitik" element={<CookiePolicy />} />
        {/* Renders a real 404 instead of silently serving the homepage. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <CookieBanner />
  </BrowserRouter>
);

export default App;
