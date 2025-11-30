# Modal Width Bug - Critical Issue Report

## Problem Description
Dialog modals (Radix UI) are displaying as narrow vertical strips (~40-50px wide) instead of proper width (500-700px). This affects all modals across the site:
- WhitepaperChoiceModal (Homepage)
- EmailCaptureModal (One-Pagers page)
- Protocol download modals

## Root Cause Analysis
The modal is NOT being portaled to `document.body` despite using Radix DialogPortal. It remains trapped inside parent flex containers with width constraints, inheriting those constraints and displaying as a narrow strip.

## Symptoms
- Modal appears as tall, narrow vertical strip (40-50px wide, full viewport height)
- Content is compressed and unreadable
- Background overlay works correctly
- Modal is centered horizontally but extremely narrow

## Attempted Fixes (All Failed)
1. ✗ Added `container={document.body}` prop to DialogPortal
2. ✗ Moved modals outside flex containers using React Fragment
3. ✗ Simplified DialogContent className to canonical Radix pattern
4. ✗ Used DialogPrimitive.Portal directly instead of wrapper
5. ✗ Applied inline styles with explicit width values
6. ✗ Replaced Radix Portal with React's createPortal directly

## Technical Environment
- React: 19.1.1
- @radix-ui/react-dialog: 1.1.15
- Next.js: 14
- TypeScript: 5.9.3
- Tailwind CSS: 4

## Code Locations
- Dialog component: `client/src/components/ui/dialog.tsx`
- WhitepaperChoiceModal: `client/src/components/WhitepaperChoiceModal.tsx`
- EmailCaptureModal: `client/src/components/EmailCaptureModal.tsx`
- Home page: `client/src/pages/Home.tsx`
- One-Pagers page: `client/src/pages/OnePagers.tsx`

## Current DialogContent Structure
```tsx
<DialogPrimitive.Portal>
  <DialogOverlay />
  <DialogPrimitive.Content
    className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-6 bg-background rounded-md shadow-xl"
  >
    {children}
  </DialogPrimitive.Content>
</DialogPrimitive.Portal>
```

## Possible Causes to Investigate
1. **React 19 compatibility issue** - Radix Dialog may not be fully compatible with React 19.1.1
2. **Tailwind 4 conflict** - New Tailwind version may have CSS that interferes with Radix Portal
3. **SSR/hydration issue** - Portal may not be rendering correctly during hydration
4. **CSS cascade issue** - Global CSS may be overriding portal styles
5. **Vite configuration** - Build tool may be affecting how Portal renders

## Recommended Solutions
1. **Upgrade Radix packages** - Check for React 19 compatible versions
2. **Test with vanilla Radix example** - Create minimal reproduction case
3. **Inspect DOM in browser** - Use DevTools to see where modal is actually rendering
4. **Check for CSS overrides** - Search for any global styles affecting fixed positioning
5. **Try alternative modal library** - Consider headlessui or shadcn/ui alternatives

## Testing Checklist
- [ ] Modal renders at proper width (500-700px)
- [ ] Modal is centered on screen
- [ ] Background overlay covers entire viewport
- [ ] Modal content is readable and properly formatted
- [ ] Close button appears in top-right corner
- [ ] Modal scrolls if content is long
- [ ] Works on mobile, tablet, and desktop viewports

## Last Working Checkpoint
- Checkpoint ID: `ee7e341b`
- Date: 2025-01-29
- Note: This checkpoint has the modal bug present but all other features working

## Priority
**CRITICAL** - Blocks user interaction with key lead generation features (whitepaper downloads, email capture, case study downloads)
