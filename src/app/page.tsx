"use client";

import { useState, useEffect, useRef } from "react";
import { FancyBanner } from "@components/blocks/FancyBanner";
import globalOgImage from "@images/globalOgImage.jpeg";
import { HOMEPAGE_DATA as pageData } from "@data/pages/home";
import { SupportedLanguages, ThemeColors } from "@utils/types/types";
import { Card } from "@components/modules/Card";
import { X } from "@phosphor-icons/react";

export const revalidate = 86400;

export async function generateMetadata({}) {
  return {
    title: process.env.REACT_APP_SITE_NAME,
    description: pageData.seo.pageDescription,
    keywords: pageData.seo.keywords,
    icons: {
      icon: "/favicon.ico",
    },
    openGraph: {
      images: [globalOgImage.src],
    },
  };
}

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

export default function Home() {
  const [lang, setLang] = useState<SupportedLanguages>("en");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const surveyUrl = "https://www.surveymonkey.com/r/GK6PZRQ";

  // Get language from cookies on client side
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const langCookie = cookies.find(cookie => cookie.trim().startsWith('lang='));
    if (langCookie) {
      const langValue = langCookie.split('=')[1] as SupportedLanguages;
      setLang(langValue);
    }
  }, []);

  const shouldShowModal = (): boolean => {
    if (typeof window === "undefined") return false;
    const dismissed = localStorage.getItem("surveyMonkeyModalDismissed");
    return dismissed !== "true";
  };

  const handleClose = () => {
    localStorage.setItem("surveyMonkeyModalDismissed", "true");
    setIsModalOpen(false);
    
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const interceptNavigation = (event: Event) => {
    if (!shouldShowModal()) return;

    const target = event.target as HTMLElement;
    if (!target) return;

    // Find the closest link element
    const link = target.closest('a[href]') as HTMLAnchorElement;
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Skip hash links and external links
    if (href.startsWith('#') || href.startsWith('http')) return;
    
    // Skip same page navigation
    if (href === '/') return;

    // Intercept the navigation
    event.preventDefault();
    event.stopPropagation();
    
    setTargetUrl(href);
    setIsModalOpen(true);
  };

  useEffect(() => {
    // Add event listener to intercept clicks on the entire landing page
    const landingPage = document.querySelector('.page.home');
    if (landingPage) {
      landingPage.addEventListener('click', interceptNavigation, true);
      
      return () => {
        landingPage.removeEventListener('click', interceptNavigation, true);
      };
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isModalOpen) {
        handleClose();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [isModalOpen]);

  return (
    <>
      <div className="page home">
        <FancyBanner {...pageData[lang].banner} />
        <div className="container flex-col flex gap-24">
          <div className="flex flex-col gap-6 text-primaryDark mt-4">
            <h2 className="font-extrabold text-[32px] m-0">
              {pageData[lang].topTools.heading}
            </h2>
            <div className="flex flex-col tablet:flex-row gap-6">
              {pageData[lang].topTools.items.map((tool: any) => (
                <Card
                  key={tool.title}
                  {...tool}
                  theme={tool.theme as ThemeColors}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 text-primaryDark mb-16">
            <div className="flex flex-col gap-2">
              <h2 className="font-extrabold text-[32px] m-0 leading-[1.2]">
                {pageData[lang].toolLinks.heading}
              </h2>
              <p className="m-0 text-lrg">
                {pageData[lang].toolLinks.subheading}
              </p>
            </div>
            <div className="grid mobileLg:grid-cols-2 tabletLg:grid-cols-4 gap-6">
              {pageData[lang].toolLinks.items.map((tool: any) => (
                <Card
                  key={tool.title}
                  {...tool}
                  theme={tool.theme as ThemeColors}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Survey Modal */}
      {isModalOpen && (
        <div
          ref={modalRef}
          className={`surveyMonkeyModal open`}
          aria-hidden={!isModalOpen}
          aria-modal="true"
          aria-labelledby="survey-modal-title"
          role="dialog"
        >
          <div className="overlay" onClick={handleOverlayClick} />
          <div className="modal">
            <button 
              onClick={handleClose} 
              className="close"
              aria-label="Close survey modal"
            >
              <X size={20} weight="bold" />
              <div className="sr-only">Close</div>
            </button>
            <h2 id="survey-modal-title" className="sr-only">
              My Career NJ Survey
            </h2>
            <iframe
              src={surveyUrl}
              title="My Career NJ Survey"
              className="survey-iframe"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
