import { ButtonProps } from "@utils/types";

export const SURVEYMONKEY_MODAL = {
  en: {
    triggerButton: {
      type: "button",
      outlined: true,
      className: "survey-trigger",
      label: "Take Survey",
    } as ButtonProps,
    heading: "Help Us Improve My Career NJ",
    description:
      "Your feedback is important to us! Please take a few minutes to share your experience and help us improve our services.",
    loading: "Loading survey...",
    closeButton: "Close",
    closeButtonLabel: "Close survey",
    iframeTitle: "My Career NJ User Feedback Survey",
    error: {
      noSurveyId: "Survey is currently unavailable. Please try again later.",
      loadFailed: "Unable to load the survey. Please check your connection and try again.",
    },
  },
  es: {
    triggerButton: {
      type: "button",
      outlined: true,
      className: "survey-trigger",
      label: "Tomar Encuesta",
    } as ButtonProps,
    heading: "Ayúdanos a Mejorar My Career NJ",
    description:
      "¡Tus comentarios son importantes para nosotros! Por favor, tómate unos minutos para compartir tu experiencia y ayudarnos a mejorar nuestros servicios.",
    loading: "Cargando encuesta...",
    closeButton: "Cerrar",
    closeButtonLabel: "Cerrar encuesta",
    iframeTitle: "Encuesta de Comentarios de Usuario de My Career NJ",
    error: {
      noSurveyId: "La encuesta no está disponible actualmente. Por favor, inténtalo más tarde.",
      loadFailed: "No se pudo cargar la encuesta. Por favor, verifica tu conexión e inténtalo de nuevo.",
    },
  },
};