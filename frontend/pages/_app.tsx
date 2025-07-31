import React, { useReducer, useState, useMemo, useEffect } from "react";
import type { AppProps } from "next/app";
import { HelmetProvider } from "react-helmet-async";
import { createTheme, ThemeProvider } from "@material-ui/core";
import * as Sentry from "@sentry/react";
import ReactGA from "react-ga";

// Styles
import "@newjersey/njwds/dist/css/styles.css";
import "../styles/index.scss";

// Contexts
import { initialFilterState, filterReducer, FilterContext } from "../lib/filtering/FilterContext";
import { sortReducer, initialSortState, SortContext } from "../lib/sorting/SortContext";
import {
  initialComparisonState,
  comparisonReducer,
  ComparisonContext,
} from "../lib/comparison/ComparisonContext";
import {
  ContextualInfo,
  ContextualInfoContext,
  initialContextualInfoState,
} from "../lib/contextual-info/ContextualInfoContext";

// Components
import { ContextualInfoPanel } from "../components/ContextualInfoPanel";
import { LanguageSwitchButton } from "../components/LanguageSwitchButton";

// Initialize i18n
import "../lib/i18n";

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

const theme = createTheme({
  palette: {
    primary: {
      main: "#12263A",
    },
    secondary: {
      main: "#1668B4",
    },
  },
});

// eslint-disable-next-line
declare const window: any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GA_TRACKING_ID = "G-THV625FWWB";

function MyApp({ Component, pageProps }: AppProps) {
  const [sortState, sortDispatch] = useReducer(sortReducer, initialSortState);
  const [filterState, filterDispatch] = useReducer(filterReducer, initialFilterState);
  const [comparisonState, comparisonDispatch] = useReducer(
    comparisonReducer,
    initialComparisonState,
  );
  const [contextualInfo, setContextualInfo] = useState<ContextualInfo>(initialContextualInfoState);

  useEffect(() => {
    ReactGA.initialize("G-THV625FWWB", { testMode: process.env.NODE_ENV === "test" });
  }, []);

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
      <ThemeProvider theme={theme}>
        <ComparisonContext.Provider value={comparisonContextValue}>
          <SortContext.Provider value={sortContextValue}>
            <FilterContext.Provider value={filterContextValue}>
              <ContextualInfoContext.Provider value={contextualInfoValue}>
                <Component {...pageProps} />
                {process.env.NEXT_PUBLIC_FEATURE_MULTILANG === "true" && <LanguageSwitchButton />}
                <ContextualInfoPanel />
              </ContextualInfoContext.Provider>
            </FilterContext.Provider>
          </SortContext.Provider>
        </ComparisonContext.Provider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default MyApp;