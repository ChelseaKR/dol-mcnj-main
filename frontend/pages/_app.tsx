import React, { ReactElement, useReducer, useState, useMemo, useEffect, Suspense } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import ReactGA from "react-ga";
import * as Sentry from "@sentry/react";
import { HelmetProvider } from "react-helmet-async";

// Styles
import "@newjersey/njwds/dist/css/styles.css";
import "../styles/index.scss";

// Contexts
import { initialFilterState, filterReducer, FilterContext } from "../src/filtering/FilterContext";
import { sortReducer, initialSortState, SortContext } from "../src/sorting/SortContext";
import {
  initialComparisonState,
  comparisonReducer,
  ComparisonContext,
} from "../src/comparison/ComparisonContext";
import {
  ContextualInfo,
  ContextualInfoContext,
  initialContextualInfoState,
} from "../src/contextual-info/ContextualInfoContext";

// Components
import { ContextualInfoPanel } from "../src/components/ContextualInfoPanel";
import { LanguageSwitchButton } from "../src/components/LanguageSwitchButton";

// i18n
import "../src/i18n";

// Sentry configuration
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [
    new Sentry.BrowserTracing({
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay(),
  ],
  tracesSampleRate: 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

// Google Analytics setup
const GA_TRACKING_ID = "G-THV625FWWB";

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const router = useRouter();
  
  // Context states
  const [sortState, sortDispatch] = useReducer(sortReducer, initialSortState);
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);
  const [comparisonState, comparisonDispatch] = useReducer(
    comparisonReducer,
    initialComparisonState,
  );
  const [contextualInfo, setContextualInfo] = useState<ContextualInfo>(initialContextualInfoState);

  // Initialize Google Analytics
  useEffect(() => {
    ReactGA.initialize(GA_TRACKING_ID, { testMode: process.env.NODE_ENV === "test" });
  }, []);

  // Track page views
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag("config", GA_TRACKING_ID, { page_path: url });
        ReactGA.initialize(GA_TRACKING_ID, {});
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Context values
  const sortContextValue = useMemo(
    () => ({ state: sortState, dispatch: sortDispatch }),
    [sortState],
  );
  const filterContextValue = useMemo(
    () => ({ state: filterState, dispatch: filterDispatch }),
    [filterState],
  );
  const comparisonContextValue = useMemo(
    () => ({ state: comparisonState, dispatch: comparisonDispatch }),
    [comparisonState],
  );
  const contextualInfoValue = useMemo(
    () => ({ contextualInfo, setContextualInfo }),
    [contextualInfo],
  );

  return (
    <HelmetProvider>
      <ComparisonContext.Provider value={comparisonContextValue}>
        <SortContext.Provider value={sortContextValue}>
          <FilterContext.Provider value={filterContextValue}>
            <ContextualInfoContext.Provider value={contextualInfoValue}>
              <Suspense fallback={<div>Loading...</div>}>
                <Component {...pageProps} />
              </Suspense>
              {process.env.NEXT_PUBLIC_FEATURE_MULTILANG === "true" && <LanguageSwitchButton />}
              <ContextualInfoPanel />
            </ContextualInfoContext.Provider>
          </FilterContext.Provider>
        </SortContext.Provider>
      </ComparisonContext.Provider>
    </HelmetProvider>
  );
}

export default MyApp;