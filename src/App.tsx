import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import CookieBanner from '@/components/ui/CookieBanner';
import Home from '@/pages/Home';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { localePath, locales, type RouteKey } from '@/i18n/config';

/*
 * The homepage ships in the entry chunk because it is what most first visits
 * land on and it carries the LCP. Everything else is split out, so a visitor
 * who never opens the pricing page never downloads it.
 */
const Pricing = lazy(() => import('@/pages/Pricing'));
const Work = lazy(() => import('@/pages/Work'));
const CaseDetail = lazy(() => import('@/pages/CaseDetail'));
const Contact = lazy(() => import('@/pages/Contact'));
const FAQPage = lazy(() => import('@/pages/FAQPage'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'));
const NotFound = lazy(() => import('@/pages/NotFound'));

/** Holds roughly a screen open while a route chunk arrives. */
const RouteFallback = () => <div className="min-h-[80svh]" aria-hidden="true" />;

const pageFor: Record<RouteKey, React.ReactNode> = {
  home: <Home />,
  pricing: <Pricing />,
  work: <Work />,
  contact: <Contact />,
  faq: <FAQPage />,
  privacy: <Privacy />,
  cookies: <CookiePolicy />,
};

/**
 * Every route, in every language.
 *
 * Generated from the slug table rather than written out three times, so
 * adding a page means adding one entry to `routeSlugs` and one component
 * here — the Danish, English and Swedish addresses then exist by
 * construction, and none of them can drift apart.
 */
const localeRoutes = locales.flatMap((locale) => {
  const keys = Object.keys(pageFor) as RouteKey[];
  return keys.flatMap((key) => {
    const path = localePath(locale, key);
    const routes = [<Route key={`${locale}-${key}`} path={path} element={pageFor[key]} />];

    // The work index also owns the case detail pages beneath it.
    if (key === 'work') {
      routes.push(
        <Route key={`${locale}-case`} path={`${path}/:slug`} element={<CaseDetail />} />
      );
    }
    return routes;
  });
});

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
    <LocaleProvider>
      <ScrollToTop />
      <Header />
      <div id="main">
        <Suspense fallback={<RouteFallback />}>
          <main>
            <Routes>
              {localeRoutes}
              {/* Renders a real 404 instead of silently serving the homepage. */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Suspense>
      </div>
      <CookieBanner />
    </LocaleProvider>
  </BrowserRouter>
);

export default App;
