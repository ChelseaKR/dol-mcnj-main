import { render, screen, fireEvent } from "@testing-library/react";
import { SurveyModalProvider, useSurveyModal } from "../SurveyModalContext";
import "@testing-library/jest-dom";

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock as any;

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
  });

  it("provides modal state and functions", () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <SurveyModalProvider>
        <TestComponent />
      </SurveyModalProvider>
    );

    expect(screen.getByTestId("modal-state")).toHaveTextContent("closed");
    expect(screen.getByTestId("should-show")).toHaveTextContent("yes");
  });

  it("shows modal when showModal is called and not dismissed", () => {
    localStorageMock.getItem.mockReturnValue(null);

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
    localStorageMock.getItem.mockReturnValue("true");

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
    localStorageMock.getItem.mockReturnValue(null);

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