# 02 — Discrete 4-Arc Capacity Ring & Cooldown Timer

**What to build:** A generation attempt rate limiter represented by a discrete 4-arc segmented ring. Each generation attempt consumes 1 charge, while typing, editing, and deleting vibe text remains completely free. The capacity restores 1 charge every 45 seconds (3 minutes total from empty) with timer state persisted in `localStorage`. When charges reach 0, the Generate button is disabled with reduced opacity, and tapping it displays an on-demand countdown message: *"Refilling — one more in about 40s"*.

**Blocked by:** 01 — Core Flow Wiring, Vibe Submit & Hash Routing

**Status:** ready-for-agent

- [ ] Capacity ring renders as 4 discrete, visible segments rather than a continuous stroke hairline.
- [ ] Submitting a vibe or clicking Generate decrements the capacity by exactly 1 segment.
- [ ] Keystrokes, edits, and deletions in the input field do not spend capacity.
- [ ] A background timer restores 1 segment every 45 seconds, updating the visual arc count reactively.
- [ ] Capacity charges and recharge timestamps are persisted in `localStorage` across page reloads.
- [ ] At 0 charges, generation submissions are locked, and tapping the ring or disabled CTA toggles the countdown notice.
- [ ] Unit tests verify charge consumption, 45s timer step restoration, and localStorage recovery.
