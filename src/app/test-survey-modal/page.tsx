import { LinkObject } from "@components/modules/LinkObject";

export default function TestSurveyModal() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">SurveyMonkey Modal Test Page</h1>
      
      <div className="space-y-4">
        <p>Click on any of these navigation links to test the SurveyMonkey modal:</p>
        
        <div className="space-y-2">
          <div>
            <LinkObject url="/faq">FAQ Page (should show modal)</LinkObject>
          </div>
          
          <div>
            <LinkObject url="/contact">Contact Page (should show modal)</LinkObject>
          </div>
          
          <div>
            <LinkObject url="/training">Training Page (should show modal)</LinkObject>
          </div>
          
          <div>
            <LinkObject url="#test-anchor">Same-page anchor link (should NOT show modal)</LinkObject>
          </div>
          
          <div>
            <LinkObject url="https://www.nj.gov">External link (should show modal)</LinkObject>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">How to test:</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Click on any navigation link above (except the anchor link)</li>
            <li>The SurveyMonkey modal should appear</li>
            <li>Close the modal using the X button, clicking outside, or pressing Escape</li>
            <li>The modal should not appear again for subsequent navigation clicks</li>
            <li>Clear localStorage and refresh to reset the dismissal state</li>
          </ol>
        </div>
        
        <div className="mt-4">
          <button 
            onClick={() => {
              localStorage.removeItem("surveyMonkeyModalDismissed");
              window.location.reload();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reset Modal State
          </button>
        </div>
        
        <div id="test-anchor" className="mt-16 p-4 bg-yellow-100 rounded">
          <h3>Test Anchor Target</h3>
          <p>This is the target of the anchor link above. The page should scroll here smoothly without showing the modal.</p>
        </div>
      </div>
    </div>
  );
}