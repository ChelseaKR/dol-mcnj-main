import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SurveyMonkeyModal } from "./SurveyMonkeyModal";

// Mock environment variable
const mockSurveyId = "TEST123";
const originalEnv = process.env;

beforeEach(() => {
  process.env = {
    ...originalEnv,
    REACT_APP_SURVEYMONKEY_SURVEY_ID: mockSurveyId,
  };
  
  // Clear localStorage
  localStorage.clear();
});

afterEach(() => {
  process.env = originalEnv;
});

describe("SurveyMonkeyModal", () => {
  it("renders without crashing", () => {
    render(<SurveyMonkeyModal lang="en" autoTrigger={false} />);
  });

  it("does not render if no survey ID is provided", () => {
    delete process.env.REACT_APP_SURVEYMONKEY_SURVEY_ID;
    render(<SurveyMonkeyModal lang="en" autoTrigger={false} />);
    
    // Should not render the modal trigger button
    expect(screen.queryByText("Take Survey")).not.toBeInTheDocument();
  });

  it("renders trigger button when autoTrigger is false", () => {
    render(<SurveyMonkeyModal lang="en" autoTrigger={false} />);
    
    expect(screen.getByText("Take Survey")).toBeInTheDocument();
  });

  it("opens modal when trigger button is clicked", () => {
    render(<SurveyMonkeyModal lang="en" autoTrigger={false} />);
    
    const triggerButton = screen.getByText("Take Survey");
    fireEvent.click(triggerButton);
    
    expect(screen.getByText("Help Us Improve My Career NJ")).toBeInTheDocument();
  });

  it("closes modal when close button is clicked", () => {
    render(<SurveyMonkeyModal lang="en" autoTrigger={false} />);
    
    // Open modal
    const triggerButton = screen.getByText("Take Survey");
    fireEvent.click(triggerButton);
    
    // Verify modal is open
    const modal = screen.getByRole("dialog", { hidden: true });
    expect(modal).toHaveAttribute("aria-hidden", "false");
    
    // Close modal
    const closeButton = screen.getByLabelText("Close survey");
    fireEvent.click(closeButton);
    
    // Modal should be closed (aria-hidden should be true)
    expect(modal).toHaveAttribute("aria-hidden", "true");
  });

  it("closes modal when Escape key is pressed", () => {
    render(<SurveyMonkeyModal lang="en" autoTrigger={false} />);
    
    // Open modal
    const triggerButton = screen.getByText("Take Survey");
    fireEvent.click(triggerButton);
    
    // Verify modal is open
    const modal = screen.getByRole("dialog", { hidden: true });
    expect(modal).toHaveAttribute("aria-hidden", "false");
    
    // Press Escape key
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    
    // Modal should be closed
    expect(modal).toHaveAttribute("aria-hidden", "true");
  });

  it("renders Spanish content when lang is 'es'", () => {
    render(<SurveyMonkeyModal lang="es" autoTrigger={false} />);
    
    expect(screen.getByText("Tomar Encuesta")).toBeInTheDocument();
  });

  it("includes correct iframe src with survey ID", () => {
    render(<SurveyMonkeyModal lang="en" autoTrigger={false} />);
    
    // Open modal
    const triggerButton = screen.getByText("Take Survey");
    fireEvent.click(triggerButton);
    
    // Check iframe src
    const iframe = screen.getByTitle("My Career NJ User Feedback Survey");
    expect(iframe).toHaveAttribute("src", `https://www.surveymonkey.com/r/${mockSurveyId}?iframe=true`);
  });

  it("sets localStorage flag when auto-triggered", async () => {
    render(<SurveyMonkeyModal lang="en" autoTrigger={true} triggerDelay={100} />);
    
    // Wait for auto trigger
    await waitFor(() => {
      expect(localStorage.getItem("mycareer-nj-survey-seen")).toBe("true");
    }, { timeout: 200 });
  });

  it("does not auto-trigger if localStorage flag is set", () => {
    localStorage.setItem("mycareer-nj-survey-seen", "true");
    
    render(<SurveyMonkeyModal lang="en" autoTrigger={true} triggerDelay={100} />);
    
    // Wait a bit to ensure it doesn't trigger
    setTimeout(() => {
      const modal = screen.getByRole("dialog", { hidden: true });
      expect(modal).toHaveAttribute("aria-hidden", "true");
    }, 200);
  });

  it("has proper accessibility attributes", () => {
    render(<SurveyMonkeyModal lang="en" autoTrigger={false} />);
    
    // Open modal
    const triggerButton = screen.getByText("Take Survey");
    fireEvent.click(triggerButton);
    
    const modal = screen.getByRole("dialog", { hidden: true });
    expect(modal).toHaveAttribute("aria-labelledby", "surveymonkey-modal-title");
    expect(modal).toHaveAttribute("aria-describedby", "surveymonkey-modal-description");
    
    const iframe = screen.getByTitle("My Career NJ User Feedback Survey");
    expect(iframe).toHaveAttribute("sandbox", "allow-scripts allow-same-origin allow-forms allow-popups");
  });
});