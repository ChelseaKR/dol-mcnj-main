"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "@phosphor-icons/react";
import { Button } from "@components/modules/Button";
import { SupportedLanguages } from "@utils/types/types";
import { SURVEYMONKEY_MODAL as contentData } from "@data/global/surveyMonkeyModal";

export interface SurveyMonkeyModalProps {
  lang: SupportedLanguages;
  surveyId?: string;
  autoTrigger?: boolean;
  triggerDelay?: number;
}

export const SurveyMonkeyModal = ({ 
  lang, 
  surveyId,
  autoTrigger = true,
  triggerDelay = 5000 
}: SurveyMonkeyModalProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const modalRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Get survey ID from environment variable if not provided
  const effectiveSurveyId = surveyId || process.env.REACT_APP_SURVEYMONKEY_SURVEY_ID;

  const updateTabIndex = (enable: boolean) => {
    if (modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
      );
      focusableElements.forEach((element) => {
        element.setAttribute("tabindex", enable ? "0" : "-1");
      });
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setError("");
  };

  const handleOpen = () => {
    if (!effectiveSurveyId) {
      setError(contentData[lang].error.noSurveyId);
      return;
    }
    setIsOpen(true);
    setIsLoading(true);
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setError(contentData[lang].error.loadFailed);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    updateTabIndex(isOpen);
    return () => updateTabIndex(false);
  }, [isOpen]);

  useEffect(() => {
    if (autoTrigger && effectiveSurveyId) {
      const timer = setTimeout(() => {
        // Check if user hasn't already dismissed the survey (localStorage check)
        const hasSeenSurvey = localStorage.getItem('mycareer-nj-survey-seen');
        if (!hasSeenSurvey) {
          handleOpen();
          localStorage.setItem('mycareer-nj-survey-seen', 'true');
        }
      }, triggerDelay);

      return () => clearTimeout(timer);
    }
  }, [autoTrigger, effectiveSurveyId, triggerDelay]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    const overlay = document.querySelector(".surveyMonkeyModal .overlay");
    const handleOverlayClick = () => handleClose();
    overlay?.addEventListener("click", handleOverlayClick);

    return () => {
      window.removeEventListener("keydown", handleEsc);
      overlay?.removeEventListener("click", handleOverlayClick);
    };
  }, []);

  if (!effectiveSurveyId) {
    return null; // Don't render anything if no survey ID is configured
  }

  return (
    <>
      {/* Manual trigger button (can be hidden if using autoTrigger) */}
      {!autoTrigger && (
        <Button
          {...contentData[lang].triggerButton}
          iconPrefix="ChartBar"
          iconWeight="bold"
          onClick={handleOpen}
        />
      )}

      <div
        ref={modalRef}
        className={`surveyMonkeyModal${isOpen ? " open" : ""}`}
        aria-hidden={!isOpen}
        role="dialog"
        aria-labelledby="surveymonkey-modal-title"
        aria-describedby="surveymonkey-modal-description"
      >
        <div className="overlay" />
        <div className="modal">
          <button 
            onClick={handleClose} 
            className="close"
            aria-label={contentData[lang].closeButtonLabel}
          >
            <X size={20} weight="bold" />
            <div className="sr-only">{contentData[lang].closeButtonLabel}</div>
          </button>
          
          <h2 id="surveymonkey-modal-title" className="heading">
            {contentData[lang].heading}
          </h2>
          
          <p id="surveymonkey-modal-description">
            {contentData[lang].description}
          </p>

          {error ? (
            <div className="error-message" role="alert">
              <p>{error}</p>
              <Button
                type="button"
                defaultStyle="primary"
                onClick={handleClose}
              >
                {contentData[lang].closeButton}
              </Button>
            </div>
          ) : (
            <div className="survey-container">
              {isLoading && (
                <div className="loading-message" aria-live="polite">
                  {contentData[lang].loading}
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={`https://www.surveymonkey.com/r/${effectiveSurveyId}?iframe=true`}
                title={contentData[lang].iframeTitle}
                width="100%"
                height="600"
                style={{ border: 'none', display: isLoading ? 'none' : 'block' }}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};