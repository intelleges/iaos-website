# Modal Width Issue - Needs Fix

## Problem
All Dialog modals (WhitepaperChoiceModal, EmailCaptureModal) render as narrow vertical strips instead of full-width modals.

## Current State
- **Checkpoint:** ee7e341b
- **Status:** All functionality works EXCEPT modal display
- **Affected Components:**
  - `client/src/components/WhitepaperChoiceModal.tsx`
  - `client/src/components/EmailCaptureModal.tsx`
  - Base component: `client/src/components/ui/dialog.tsx`

## What's Been Tried
1. ❌ Tailwind class overrides (`!max-w-2xl`, `w-full`)
2. ❌ Inline styles on individual modals
3. ❌ Changing base Dialog component CSS
4. ❌ Replacing Tailwind classes with inline styles in Dialog component

## Root Cause (Suspected)
- CSS specificity issue where base Dialog classes override custom widths
- Possible global CSS rule constraining width
- Dialog Portal or Overlay positioning conflict

## Next Steps for Fix
1. **Inspect rendered DOM** - Use browser dev tools to see actual computed CSS
2. **Check for global CSS** - Look for rules affecting `[data-slot="dialog-content"]`
3. **Try CSS custom properties** - Override width using CSS variables instead of classes
4. **Consider component replacement** - Use different modal library if shadcn Dialog is fundamentally broken

## Testing
1. Click "Download Whitepaper" button on homepage
2. Modal should open at ~672px width (currently renders as ~100px narrow strip)
3. Click any service on /one-pagers page
4. Email capture modal should open at ~512px width (currently narrow strip)

## Contact
- Issue documented: Nov 30, 2025
- Checkpoint: ee7e341b
- Manus project: intelleges-marketing-site
