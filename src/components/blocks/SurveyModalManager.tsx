"use client";

import { SurveyMonkeyModal } from "./SurveyMonkeyModal";
import { useSurveyModal } from "@components/contexts/SurveyModalContext";

export const SurveyModalManager = () => {
  const { isModalOpen, targetUrl, closeModal } = useSurveyModal();

  return (
    <SurveyMonkeyModal
      isOpen={isModalOpen}
      onClose={closeModal}
      targetUrl={targetUrl}
    />
  );
};