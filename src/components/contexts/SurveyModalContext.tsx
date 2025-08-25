"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SurveyModalContextType {
  showModal: (targetUrl: string) => void;
  isModalOpen: boolean;
  targetUrl: string;
  closeModal: () => void;
  shouldShowModal: () => boolean;
}

const SurveyModalContext = createContext<SurveyModalContextType | undefined>(undefined);

export const useSurveyModal = () => {
  const context = useContext(SurveyModalContext);
  if (!context) {
    throw new Error("useSurveyModal must be used within a SurveyModalProvider");
  }
  return context;
};

interface SurveyModalProviderProps {
  children: ReactNode;
}

export const SurveyModalProvider = ({ children }: SurveyModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");

  const shouldShowModal = (): boolean => {
    // Check if running on client side
    if (typeof window === "undefined") return false;
    
    // Check if modal has been dismissed
    const dismissed = localStorage.getItem("surveyMonkeyModalDismissed");
    return dismissed !== "true";
  };

  const showModal = (url: string) => {
    if (shouldShowModal()) {
      setTargetUrl(url);
      setIsModalOpen(true);
    } else {
      // If modal shouldn't be shown, navigate directly
      window.location.href = url;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTargetUrl("");
  };

  const value = {
    showModal,
    isModalOpen,
    targetUrl,
    closeModal,
    shouldShowModal,
  };

  return (
    <SurveyModalContext.Provider value={value}>
      {children}
    </SurveyModalContext.Provider>
  );
};