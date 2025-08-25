import { LinkObject } from "@components/modules/LinkObject";

export default function TestSurveyModal() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">SurveyMonkey Modal Test Page</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-blue-100 rounded mb-6">
          <h2 className="text-lg font-semibold mb-2">⚠️ Important Note:</h2>
          <p>The SurveyMonkey modal will <strong>only show when leaving the landing page (/) to go to another page</strong>.</p>
          <p>Since you are currently on the test page (/test-survey-modal), the modal will <strong>NOT</strong> appear when clicking these links.</p>
          <p>To test the modal:</p>
          <ol className="list-decimal list-inside mt-2">
            <li>Go to the <LinkObject url="/">landing page (/)</LinkObject></li>
            <li>Click on any navigation link from there</li>
            <li>The modal should appear</li>
          </ol>
        </div>
        
        <p>These links are for testing navigation from this non-landing page (modal should NOT show):</p>
        
        <div className="space-y-2">
          <div>
            <LinkObject url="/faq">FAQ Page (modal will NOT show from this page)</LinkObject>
          </div>
          
          <div>
            <LinkObject url="/contact">Contact Page (modal will NOT show from this page)</LinkObject>
          </div>
          
          <div>
            <LinkObject url="/training">Training Page (modal will NOT show from this page)</LinkObject>
          </div>
          
          <div>
            <LinkObject url="#test-anchor">Same-page anchor link (should NOT show modal)</LinkObject>
          </div>
          
          <div>
            <LinkObject url="https://www.nj.gov">External link (modal will NOT show from this page)</LinkObject>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h2 className="text-lg font-semibold mb-2">How to test the modal properly:</h2>
          <ol className="list-decimal list-inside space-y-1">
            <li>Go to the <LinkObject url="/">landing page (/)</LinkObject></li>
            <li>Click on any navigation link from the landing page</li>
            <li>The SurveyMonkey modal should appear</li>
            <li>Close the modal using the X button, clicking outside, or pressing Escape</li>
            <li>You'll be navigated to your intended destination</li>
            <li>The modal should not appear again for subsequent navigation clicks from any page</li>
            <li>Use the reset button below to clear localStorage and test again</li>
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