import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    REACT_APP_BASE_URL: process.env.REACT_APP_BASE_URL,
    REACT_APP_DELIVERY_API: process.env.REACT_APP_DELIVERY_API,
    REACT_APP_ENVIRONMENT: process.env.REACT_APP_ENVIRONMENT,
    REACT_APP_PREVIEW_API: process.env.REACT_APP_PREVIEW_API,
    REACT_APP_SPACE_ID: process.env.REACT_APP_SPACE_ID,
    REACT_APP_FEATURE_CAREER_PATHWAYS:
      process.env.REACT_APP_FEATURE_CAREER_PATHWAYS,
    REACT_APP_FEATURE_MULTILANG: process.env.REACT_APP_FEATURE_MULTILANG,
    REACT_APP_FEATURE_PINPOINT: process.env.REACT_APP_FEATURE_PINPOINT,
    REACT_APP_FEATURE_SHOW_PINPOINT_SEGMENTS:
      process.env.REACT_APP_FEATURE_SHOW_PINPOINT_SEGMENTS,
    REACT_APP_SITE_NAME: process.env.REACT_APP_SITE_NAME,
    REACT_APP_SITE_URL: process.env.REACT_APP_SITE_URL,
    REACT_APP_SURVEYMONKEY_SURVEY_ID: process.env.REACT_APP_SURVEYMONKEY_SURVEY_ID,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:8080/:path*", // Proxy all API calls to backend
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://tagmanager.google.com https://www.google-analytics.com https://analytics.google.com https://www.google.com https://adservice.google.com https://pagead2.googlesyndication.com https://*.doubleclick.net https://widget.surveymonkey.com https://*.surveymonkey.com https://*.surveymonkey.net https://*.surveymk.com https://*.research.net https://*.outbound.surveymonkey.com https://*.surveymonkeyuser.com https://*.smassets.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://www.googletagmanager.com https://tagmanager.google.com https://prod.smassets.net https://cdn.smassets.net https://*.smassets.net", 
              "font-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com https://cdn.smassets.net https://*.smassets.net data:",
              "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com https://ssl.gstatic.com https://www.gstatic.com https://fonts.gstatic.com https://*.ctfassets.net https://pagead2.googlesyndication.com https://www.googleadservices.com https://*.doubleclick.net https://widget.surveymonkey.com https://*.surveymonkey.com https://*.surveymonkey.net https://*.surveymk.com https://*.research.net https://*.outbound.surveymonkey.com https://*.surveymonkeyuser.com https://*.smassets.net https://*.amazonaws.com",
              "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.googleadservices.com https://*.ctfassets.net https://api.surveymonkey.com https://*.surveymonkey.com https://*.surveymonkey.net https://*.surveymk.com https://*.research.net",
              "frame-src 'self' https://www.googletagmanager.com https://tagmanager.google.com https://www.youtube.com https://www.youtube-nocookie.com https://widget.surveymonkey.com https://*.surveymonkey.com https://*.surveymonkey.net https://*.surveymk.com https://*.research.net",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'self'"
            ].join("; "),
          },
        ],
      },
    ];
  },
  sassOptions: {
    // Silences the 'legacy-js-api' deprecation warning
    silenceDeprecations: ["legacy-js-api"],
  },
};

export default nextConfig;
