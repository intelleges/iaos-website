# Email to Programmer - Modal Width Issue

---

**Subject:** IAOS Website - Modal Width Bug Fix Needed

---

Hi [Programmer Name],

I need your help fixing a CSS issue on the Intelleges IAOS marketing website. The site is fully functional except for one persistent problem: all modal dialogs render as narrow vertical strips instead of displaying at their intended width.

## The Issue

When users click "Download Whitepaper" or try to download any service one-pager, a modal should open at ~500-700px width. Instead, it renders as a ~100px narrow vertical strip, making the content unreadable.

**Affected components:**
- `client/src/components/WhitepaperChoiceModal.tsx`
- `client/src/components/EmailCaptureModal.tsx`
- Base component: `client/src/components/ui/dialog.tsx`

## What's Been Tried

Multiple fix attempts have failed:
- Tailwind class overrides (`!max-w-2xl`, `w-full`)
- Inline styles on individual modals
- Rewriting the base Dialog component CSS
- Replacing Tailwind classes with inline styles

The root cause appears to be a CSS specificity or positioning issue where something is overriding the width settings.

## Repository Access

**GitHub:** https://github.com/intelleges/iaos-website  
**Branch:** main  
**Checkpoint:** ee7e341b

Clone the repo and you'll find detailed documentation in:
- **MODAL_ISSUE.md** - Complete problem description and debugging suggestions
- **PROJECT_SUMMARY.md** - Full project context and history

## Setup

```bash
git clone https://github.com/intelleges/iaos-website.git
cd iaos-website
pnpm install
pnpm run dev
```

The dev server will start at `http://localhost:3000`. Click "Download Whitepaper" on the homepage to see the issue.

## What I Need

1. **Fix the modal width** - Modals should render at their intended width (500-700px)
2. **Ensure proper centering** - Modals should be centered on screen
3. **Test both modals** - WhitepaperChoiceModal and EmailCaptureModal
4. **Push your fix** - Commit and push to the main branch when done

## Testing

To verify the fix works:
1. Homepage → Click "Download Whitepaper" → Modal should open ~672px wide
2. Footer → Click "One-Pagers" → Click any service → Modal should open ~512px wide
3. Both modals should be centered and fully readable

## Timeline

This is blocking website publication, so any help you can provide quickly would be appreciated. Once fixed, I'll pull your changes and deploy.

## Questions?

Feel free to reply with any questions. The MODAL_ISSUE.md file has additional debugging suggestions and technical details.

Thanks for your help!

---

**Additional Context:**
- The site uses React 19, Tailwind 4, and shadcn/ui components
- The Dialog component is from shadcn/ui's Radix UI primitives
- Everything else on the site works perfectly - just this one modal width issue

---
