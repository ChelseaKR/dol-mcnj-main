import { render, screen, fireEvent } from "@testing-library/react";
import { SurveyModalProvider, useSurveyModal } from "../SurveyModalContext";
import "@testing-library/jest-dom";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock window.location
delete (window as any).location;
window.location = { href: "" } as any;

// Test component that uses the context
const TestComponent = () => {
  const { showModal, isModalOpen, targetUrl, closeModal, shouldShowModal } = useSurveyModal();

  return (
    <div>
      <button onClick={() => showModal("/test-url")}>Show Modal</button>
      <button onClick={closeModal}>Close Modal</button>
      <div data-testid="modal-state">{isModalOpen ? "open" : "closed"}</div>
      <div data-testid="target-url">{targetUrl}</div>
      <div data-testid="should-show">{shouldShowModal() ? "yes" : "no"}</div>
    </div>
  );
};

describe("SurveyModalContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it("provides modal state and functions", () => {
    render(
      <SurveyModalProvider>
        <TestComponent />
      </SurveyModalProvider>
    );

    expect(screen.getByTestId("modal-state")).toHaveTextContent("closed");
    expect(screen.getByTestId("should-show")).toHaveTextContent("yes");
  });

  it("shows modal when showModal is called and not dismissed", () => {
    render(
      <SurveyModalProvider>
        <TestComponent />
      </SurveyModalProvider>
    );

    fireEvent.click(screen.getByText("Show Modal"));

    expect(screen.getByTestId("modal-state")).toHaveTextContent("open");
    expect(screen.getByTestId("target-url")).toHaveTextContent("/test-url");
  });

  it("does not show modal when previously dismissed", () => {
    // Set the dismissed flag before rendering
    localStorageMock.setItem("surveyMonkeyModalDismissed", "true");

    render(
      <SurveyModalProvider>
        <TestComponent />
      </SurveyModalProvider>
    );

    expect(screen.getByTestId("should-show")).toHaveTextContent("no");
    
    fireEvent.click(screen.getByText("Show Modal"));

    expect(screen.getByTestId("modal-state")).toHaveTextContent("closed");
  });

  it("closes modal when closeModal is called", () => {
    render(
      <SurveyModalProvider>
        <TestComponent />
      </SurveyModalProvider>
    );

    fireEvent.click(screen.getByText("Show Modal"));
    expect(screen.getByTestId("modal-state")).toHaveTextContent("open");

    fireEvent.click(screen.getByText("Close Modal"));
    expect(screen.getByTestId("modal-state")).toHaveTextContent("closed");
    expect(screen.getByTestId("target-url")).toHaveTextContent("");
  });
});