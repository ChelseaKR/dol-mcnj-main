# SurveyMonkey Modal Integration

This document describes the SurveyMonkey modal implementation for My Career NJ.

## Overview

The SurveyMonkey modal provides a way to collect user feedback through an embedded SurveyMonkey survey. The modal automatically appears after a user has spent time on the landing page and can be configured to show different surveys based on environment variables.

## Configuration

### Environment Variables

Add the following environment variable to configure the SurveyMonkey survey:

```bash
REACT_APP_SURVEYMONKEY_SURVEY_ID=your_survey_id_here
```

**Where to find your Survey ID:**
1. Log into your SurveyMonkey account
2. Open your survey
3. Go to Collect Responses → Web Link
4. The Survey ID is the alphanumeric code at the end of the URL (e.g., `ABC123DEF`)

### Content Security Policy

The implementation includes CSP headers that whitelist all necessary SurveyMonkey domains:

- **Script sources**: `widget.surveymonkey.com`, `*.surveymonkey.com`, `*.surveymonkey.net`, etc.
- **Style sources**: `prod.smassets.net`, `cdn.smassets.net`, `*.smassets.net`
- **Font sources**: `cdn.smassets.net`, `*.smassets.net`
- **Image sources**: All SurveyMonkey domains plus S3 assets
- **Connect sources**: SurveyMonkey API endpoints
- **Frame sources**: SurveyMonkey domains for iframe embedding

## Usage

### Basic Implementation

The modal is automatically added to the landing page (`/src/app/page.tsx`):

```tsx
<SurveyMonkeyModal 
  lang={lang} 
  autoTrigger={true}
  triggerDelay={10000}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `lang` | `SupportedLanguages` | Required | Language for modal content (en/es) |
| `surveyId` | `string` | `process.env.REACT_APP_SURVEYMONKEY_SURVEY_ID` | Override survey ID |
| `autoTrigger` | `boolean` | `true` | Whether to auto-show the modal |
| `triggerDelay` | `number` | `5000` | Delay in milliseconds before showing |

### Manual Trigger

To use as a manual trigger (button-activated) instead of auto-trigger:

```tsx
<SurveyMonkeyModal 
  lang="en" 
  autoTrigger={false}
/>
```

This will show a "Take Survey" button that users can click to open the modal.

## Features

### User Experience
- **Auto-trigger**: Appears after specified delay on landing page
- **One-time display**: Uses localStorage to prevent repeated showings
- **Responsive design**: Works on mobile and desktop
- **Loading states**: Shows loading message while survey loads
- **Error handling**: Graceful fallback if survey fails to load

### Accessibility
- **ARIA labels**: Proper screen reader support
- **Keyboard navigation**: Escape key closes modal
- **Focus management**: Tab index management for modal state
- **Semantic markup**: Proper heading hierarchy and landmarks

### Internationalization
- **Bilingual support**: English and Spanish content
- **Configurable text**: All text stored in data files for easy modification

## Customization

### Content

Modify survey content in `/src/data/global/surveyMonkeyModal.ts`:

```typescript
export const SURVEYMONKEY_MODAL = {
  en: {
    heading: "Your Custom Heading",
    description: "Your custom description...",
    // ... other text
  },
  es: {
    heading: "Su Encabezado Personalizado",
    description: "Su descripción personalizada...",
    // ... other text
  },
};
```

### Styling

Modal styles are in `/src/styles/blocks/_surveyMonkeyModal.scss`. Key customization points:

- `.modal`: Main modal container
- `.heading`: Modal title styling
- `.survey-container`: Survey iframe container
- `.loading-message`: Loading state styling

### Timing

Adjust auto-trigger timing in the page component:

```tsx
<SurveyMonkeyModal 
  lang={lang} 
  autoTrigger={true}
  triggerDelay={15000} // 15 seconds
/>
```

## Development

### Testing

Run tests specific to the SurveyMonkey modal:

```bash
npm test -- --testPathPattern=SurveyMonkeyModal
```

The test suite covers:
- Component rendering
- Modal open/close behavior
- Accessibility features
- Error states
- Internationalization
- localStorage behavior

### Local Development

1. Set the environment variable in your local environment
2. Start the development server: `npm run dev`
3. Visit the landing page and wait for the auto-trigger (or disable auto-trigger for immediate testing)

## Troubleshooting

### Modal doesn't appear
- Check that `REACT_APP_SURVEYMONKEY_SURVEY_ID` is set
- Verify localStorage hasn't been set (clear `mycareer-nj-survey-seen`)
- Check browser console for CSP violations

### Survey doesn't load
- Verify the Survey ID is correct
- Check that the survey is published and public
- Ensure network connectivity to SurveyMonkey

### CSP Issues
- Review browser console for blocked requests
- Verify CSP headers include all necessary SurveyMonkey domains
- Check if additional domains need to be whitelisted

## Security Considerations

- The iframe uses `sandbox` attributes to limit capabilities
- CSP headers prevent unauthorized script execution
- Survey ID is exposed client-side but this is expected for public surveys
- localStorage is used for user preferences (non-sensitive data)