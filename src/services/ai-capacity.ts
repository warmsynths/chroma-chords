// Shared AI-generate capacity (4 pips, one refills every 60s). Cosmetic for now: the header
// chip (desktop) and the mobile dock's ⋯ menu both read from here so they never disagree.
export const AI_MAX_TOKENS = 4;
export const AI_REFILL_SECONDS = 60;

type Listener = () => void;

class AiCapacity {
  tokens = AI_MAX_TOKENS;
  nextIn = AI_REFILL_SECONDS;
  private listeners = new Set<Listener>();
  private timer: ReturnType<typeof setInterval> | null = null;

  subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    this.ensureTimer();
    return () => {
      this.listeners.delete(fn);
      if (!this.listeners.size && this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    };
  }

  /** Spend one token (used when a generate action is wired in). */
  consume() {
    if (this.tokens > 0) {
      this.tokens -= 1;
      this.nextIn = AI_REFILL_SECONDS;
      this.emit();
    }
  }

  get label(): string {
    return this.tokens >= AI_MAX_TOKENS ? 'AI ready' : `Refill ${this.nextIn}s`;
  }

  private ensureTimer() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      if (this.tokens >= AI_MAX_TOKENS) return;
      if (this.nextIn <= 1) {
        this.tokens = Math.min(AI_MAX_TOKENS, this.tokens + 1);
        this.nextIn = AI_REFILL_SECONDS;
      } else {
        this.nextIn -= 1;
      }
      this.emit();
    }, 1000);
  }

  private emit() {
    this.listeners.forEach(fn => fn());
  }
}

export const aiCapacity = new AiCapacity();
