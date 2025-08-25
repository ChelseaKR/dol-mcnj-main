import { render, screen, fireEvent } from "@testing-library/react";
import { SurveyMonkeyModal } from "../SurveyMonkeyModal";
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

describe("SurveyMonkeyModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  it("renders modal when isOpen is true", () => {
    const mockOnClose = jest.fn();
    render(
      <SurveyMonkeyModal isOpen={true} onClose={mockOnClose} targetUrl="/test" />
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByTitle("My Career NJ Survey")).toBeInTheDocument();
  });

  it("does not render modal when isOpen is false", () => {
    const mockOnClose = jest.fn();
    render(
      <SurveyMonkeyModal isOpen={false} onClose={mockOnClose} targetUrl="/test" />
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const mockOnClose = jest.fn();
    render(
      <SurveyMonkeyModal isOpen={true} onClose={mockOnClose} targetUrl="/test" />
    );

    const closeButton = screen.getByLabelText("Close survey modal");
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  it("includes the correct survey URL in iframe", () => {
    const mockOnClose = jest.fn();
    render(
      <SurveyMonkeyModal isOpen={true} onClose={mockOnClose} targetUrl="/test" />
    );

    const iframe = screen.getByTitle("My Career NJ Survey");
    expect(iframe).toHaveAttribute("src", "https://www.surveymonkey.com/r/GK6PZRQ");
  });

  it("has proper accessibility attributes", () => {
    const mockOnClose = jest.fn();
    render(
      <SurveyMonkeyModal isOpen={true} onClose={mockOnClose} targetUrl="/test" />
    );

    const modal = screen.getByRole("dialog");
    expect(modal).toHaveAttribute("aria-modal", "true");
    expect(modal).toHaveAttribute("aria-labelledby", "survey-modal-title");
  });
});