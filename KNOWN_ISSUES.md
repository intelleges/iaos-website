# Known Issues - Intelleges Marketing Site

## Issue #1: Modal Width Bug (CRITICAL)

### Problem
All Dialog modals render as narrow vertical strips (~40-50px wide) instead of proper width (500-700px).

### Affected Components
- `WhitepaperChoiceModal` (Homepage - "Download Whitepaper" button)
- `EmailCaptureModal` (One-Pagers page - all download buttons)
- Protocol download modals (Homepage - protocol cards)

### Symptoms
- Modal appears as tall, narrow vertical strip (40-50px wide, full viewport height)
- Content is compressed and unreadable
- Background overlay works correctly
- Modal is centered horizontally but extremely narrow

### Root Cause
The Radix UI DialogPortal is NOT properly portaling content to `document.body`. The modal remains trapped inside parent flex containers with width constraints, inheriting those constraints.

### Attempted Fixes (All Failed)
1. ✗ Added `container={document.body}` prop to DialogPortal
2. ✗ Moved modals outside flex containers using React Fragment
3. ✗ Simplified DialogContent className to canonical Radix pattern
4. ✗ Used DialogPrimitive.Portal directly instead of wrapper component
5. ✗ Applied inline styles with explicit width values (width: '90vw', maxWidth: '672px')
6. ✗ Replaced Radix Portal with React's createPortal directly to document.body

**None of these standard fixes worked**, suggesting a deeper compatibility or configuration issue.

### Technical Environment
- React: 19.1.1
- @radix-ui/react-dialog: 1.1.15
- Vite: 6.2.2
- TypeScript: 5.9.3
- Tailwind CSS: 4.0.0

### Possible Root Causes
1. **React 19 compatibility** - Radix Dialog 1.1.15 may not be fully compatible with React 19.1.1
2. **Tailwind 4 conflict** - New Tailwind version may have CSS that interferes with Radix Portal
3. **SSR/hydration issue** - Portal may not be rendering correctly during hydration
4. **CSS cascade issue** - Global CSS may be overriding portal styles with higher specificity
5. **Vite configuration** - Build tool may be affecting how Portal renders in production

### Recommended Investigation Steps
1. **Check Radix compatibility** - Search Radix UI GitHub issues for React 19 compatibility
2. **Test minimal reproduction** - Create standalone Radix Dialog example outside this project
3. **Inspect DOM in browser DevTools** - Check where modal is actually being rendered in DOM tree
4. **Check for CSS overrides** - Search for any global styles affecting `position: fixed` or `z-index`
5. **Try alternative modal library** - Test with headlessui or another React 19 compatible modal
6. **Downgrade React** - Temporarily test with React 18 to isolate compatibility issue

### Code Locations
- Dialog component: `client/src/components/ui/dialog.tsx`
- WhitepaperChoiceModal: `client/src/components/WhitepaperChoiceModal.tsx`
- EmailCaptureModal: `client/src/components/EmailCaptureModal.tsx`
- Home page: `client/src/pages/Home.tsx`
- One-Pagers page: `client/src/pages/OnePagers.tsx`

### Detailed Documentation
See `MODAL_WIDTH_BUG_REPORT.md` for complete technical analysis.

---

## Issue #2: TypeScript Cache Error (NON-BLOCKING)

### Problem
TypeScript shows persistent error claiming `protocolCaseStudies` has type `{ filename: string; title: string }` when the actual file clearly defines `{ s3Key: string; title: string }`.

### Error Message
```
client/src/pages/Home.tsx(27,40): error TS2339: Property 's3Key' does not exist on type '{ filename: string; title: string; }'.
```

### Actual vs Expected
**TypeScript thinks:**
```typescript
{ filename: string; title: string }
```

**Actual file content:**
```typescript
export const protocolCaseStudies: Record<string, { s3Key: string; title: string }> = {
  "Annual Reps & Certifications": {
    s3Key: "pdfs/case-studies/Case_Study_01_...",
    title: "Annual Representations & Certifications - Defense Contracting"
  },
  // ...
}
```

### Impact
- **Runtime:** None - code works correctly
- **Development:** TypeScript error shows in IDE and build logs
- **Build:** Does not block compilation or production builds

### Attempted Fixes (All Failed)
1. ✗ Added explicit type annotation to variable in Home.tsx
2. ✗ Deleted `.tsbuildinfo` cache file
3. ✗ Deleted `node_modules/.vite` cache directory
4. ✗ Restarted dev server multiple times
5. ✗ Touched `protocolCaseStudies.ts` to force reanalysis
6. ✗ Added comment to file to trigger TypeScript recompilation

### Root Cause
TypeScript language server is caching an old type definition from a previous checkpoint and refusing to update despite file changes. This is likely a TypeScript language server bug or Vite/tsx watch mode issue.

### Recommended Fixes
1. **Full clean rebuild**
   ```bash
   rm -rf node_modules
   rm -rf .vite
   rm -rf dist
   rm -rf .tsbuildinfo
   pnpm install
   pnpm run dev
   ```

2. **Restart IDE** - VSCode or other IDE may be caching TypeScript server state

3. **Check for duplicate type definitions** - Search for any other files defining similar types:
   ```bash
   grep -r "filename.*string.*title.*string" client/src/
   ```

4. **Explicit type export** - Export the type separately:
   ```typescript
   export type ProtocolCaseStudy = { s3Key: string; title: string };
   export const protocolCaseStudies: Record<string, ProtocolCaseStudy> = {
     // ...
   };
   ```

5. **Rename variable** - Sometimes renaming forces TypeScript to re-analyze:
   ```typescript
   export const protocolCaseStudiesMap = { ... }
   ```

### Workaround
The error is cosmetic only. The code compiles and runs correctly. You can:
- Ignore the error temporarily
- Add `// @ts-expect-error` comment above the line
- Use type assertion: `(caseStudy as { s3Key: string; title: string })`

---

## Priority

**Issue #1 (Modal Bug):** CRITICAL - Blocks user interaction with key lead generation features
**Issue #2 (TypeScript Error):** LOW - Cosmetic only, does not affect functionality

## Last Working Checkpoint

- Checkpoint ID: `ee7e341b`
- Date: 2025-01-29
- Note: This checkpoint has both issues present but all runtime features working correctly

## Next Steps

1. Focus on Issue #1 (Modal Bug) first as it blocks user functionality
2. Consider upgrading/downgrading React or Radix packages to test compatibility
3. If modal bug persists, consider switching to alternative modal library
4. Issue #2 can be addressed later as it's non-blocking
