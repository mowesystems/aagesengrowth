import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import CookieBanner from '@/components/ui/CookieBanner';
import Home from '@/pages/Home';

/*
 * The homepage ships in the entry chunk because it is what most first visits
 * land on and it carries the LCP. Everything else is split out, so a visitor
 * who never opens the pricing page never downloads it.
 */
const Services = lazy(() => import('@/pages/Services'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const Cases = lazy(() => import('@/pages/Cases'));
const CaseDetail = lazy(() => import('@/pages/CaseDetail'));
const About = lazy(() => import('@/pages/About'));
const Contact = lazy(() => import('@/pages/Contact'));
const Book = lazy(() => import('@/pages/Book'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/** Holds roughly a screen open while a route chunk arrives. */
const RouteFallback = () => <div className="min-h-[80svh]" aria-hidden="true" />;

/*
 * The footer sits inside the same Suspense boundary as the routes on purpose.
 * With it outside, a lazy route paints in two steps — fallback plus footer,
 * then the real page — and the footer visibly jumps down the screen. That
 * measured 0.25 CLS on every split route. Suspending both together means the
 * page below the header paints exactly once.
 *
 * `id="main"` lives on the wrapper rather than on <main> so the skip link has a
 * target even during that first frame.
 */
const App: React.FC = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <ScrollToTop />
    <Header />
    <div id="main">
      <Suspense fallback={<RouteFallback />}>
        <main>
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
      </Suspense>
    </div>
    <CookieBanner />
  </BrowserRouter>
);

export default App;
