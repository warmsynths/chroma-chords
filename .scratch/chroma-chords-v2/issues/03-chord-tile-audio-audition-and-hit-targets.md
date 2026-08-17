# 03 — Interactive Chord Audition & Touch Target Optimization

**What to build:** Direct tap-to-audition interaction on chord tiles in the progression loop. Tapping any chord card immediately pauses loop playback (if currently playing) and auditions the specific chord notes via Web Audio accompanied by a visual flash feedback on the card. Corner swap and voicing buttons are enlarged to a 44px minimum touch target hitbox to prevent mis-taps on mobile.

**Blocked by:** 01 — Core Flow Wiring, Vibe Submit & Hash Routing

**Status:** ready-for-agent

- [ ] Tapping anywhere on a chord tile plays the chord's voices and triggers a momentary visual highlight on the card.
- [ ] If loop playback is running, tapping a chord tile pauses loop playback and isolates the tapped chord audition.
- [ ] The copy in the loop header reads *"Tap a chord to hear it."* without superfluous tutorial text.
- [ ] Corner buttons for chord swap and voicing provide at least 44px × 44px touch targets.
- [ ] Audio unit tests verify chord playback triggering and playback engine pause coordination.
