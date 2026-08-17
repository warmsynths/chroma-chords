# 06 — Motion Budget, Rhythm Animation & Accessibility Standards

**What to build:** Aesthetic de-cluttering and accessibility hardening pass. Prunes hero floating shapes from 8 noisy shapes to 3 slow-drifting SVGs (`cvfv-float1`, `cvfv-float2`, `cvfv-float3`). Replaces continuous panel border-radius morphing and horizontal jitter with a smooth one-shot transition on mood change. Redirects motion budget into subtle rhythmic pulse animations on active chord tiles during loop playback. Enforces 44px minimum hit targets across all interactive controls, increases input placeholder contrast to >= 0.52 opacity, standardizes mobile length bar labels (e.g. *"8 bars"*), and adds high-contrast `:focus-visible` outlines (`3px solid #9B7CA8`, `outline-offset: 2px`) for keyboard accessibility.

**Blocked by:** 02 — Discrete 4-Arc Capacity Ring & Cooldown Timer, 03 — Interactive Chord Audition & Touch Target Optimization, 04 — Per-Set Storage Model, Save Toast & Undo, 05 — Sets Library Management & Empty State

**Status:** ready-for-agent

- [ ] Hero background contains exactly 3 slow-drifting floating shapes instead of 8 squash/rotate animations.
- [ ] Panel container border-radius eases smoothly once on mood change and remains stationary during viewing.
- [ ] Active chord tile visually pulses in time with playback steps.
- [ ] All buttons, pills, chips, and transport controls enforce a 44px minimum hit area.
- [ ] Input placeholder text contrast is at least 0.52 opacity (`rgba(46,39,31,0.52)`).
- [ ] Mobile and desktop length selectors consistently display numeric bar count labels.
- [ ] Keyboard navigation is fully supported with `:focus-visible` plum focus rings on all interactive elements.
- [ ] Media query `@media (prefers-reduced-motion: reduce)` disables non-essential animations.
- [ ] Automated accessibility and styling tests verify contrast, focus styles, and keyframe definitions.
