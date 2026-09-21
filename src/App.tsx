import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import CookieBanner from '@/components/ui/CookieBanner';
import Home from '@/pages/Home';
import { LocaleProvider } from '@/i18n/LocaleContext';
import { ScanProvider } from '@/components/scan/ScanContext';
import { localePath, locales, type RouteKey } from '@/i18n/config';

/*
 * The homepage ships in the entry chunk because it is what nearly every visit
 * lands on and it carries the LCP. Everything else is split out.
 */
const Review = lazy(() => import('@/pages/Review'));
const Work = lazy(() => import('@/pages/Work'));
const CaseDetail = lazy(() => import('@/pages/CaseDetail'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const CookiePolicy = lazy(() => import('@/pages/CookiePolicy'));
const NotFound = lazy(() => import('@/pages/NotFound'));

const RouteFallback = () => <div className="min-h-[80svh]" aria-hidden="true" />;

const pageFor: Record<RouteKey, React.ReactNode> = {
  home: <Home />,
  review: <Review />,
  work: <Work />,
  privacy: <Privacy />,
  cookies: <CookiePolicy />,
};

const localeRoutes = locales.flatMap((locale) => {
  const keys = Object.keys(pageFor) as RouteKey[];
  return keys.flatMap((key) => {
    const path = localePath(locale, key);
    const routes = [<Route key={`${locale}-${key}`} path={path} element={pageFor[key]} />];
    if (key === 'work') {
      routes.push(<Route key={`${locale}-case`} path={`${path}/:slug`} element={<CaseDetail />} />);
    }
    return routes;
  });
});

/*
 * The footer sits inside the same Suspense boundary as the routes so a lazy
 * route paints once, not in two steps with the footer jumping (0.25 CLS).
 */
const App: React.FC = () => (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <LocaleProvider>
      <ScanProvider>
        <ScrollToTop />
        <Header />
        <div id="main">
          <Suspense fallback={<RouteFallback />}>
            <main>
              <Routes>
                {localeRoutes}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </Suspense>
        </div>
        <CookieBanner />
      </ScanProvider>
    </LocaleProvider>
  </BrowserRouter>
);

export default App;
