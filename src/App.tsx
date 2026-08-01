import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import Cases from '@/pages/Cases';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Book from '@/pages/Book';
import FAQPage from '@/pages/FAQPage';

const App: React.FC = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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
        <Route path="*" element={<Home />} />
      </Routes>
    </main>
    <Footer />
  </BrowserRouter>
);

export default App;
