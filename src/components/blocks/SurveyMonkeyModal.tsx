"use client";

import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";

interface SurveyMonkeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
}

export const SurveyMonkeyModal = ({ isOpen, onClose, targetUrl }: SurveyMonkeyModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const surveyUrl = "https://www.surveymonkey.com/r/GK6PZRQ";

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
    // Set dismissal flag in localStorage
    localStorage.setItem("surveyMonkeyModalDismissed", "true");
    onClose();
    
    // Navigate to target URL after closing
    if (targetUrl) {
      window.location.href = targetUrl;
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
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
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className={`surveyMonkeyModal${isOpen ? " open" : ""}`}
      aria-hidden={!isOpen}
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
  );
};