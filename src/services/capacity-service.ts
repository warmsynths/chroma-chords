export const CAPACITY_MAX = 4;
export const RECHARGE_INTERVAL_MS = 45000;
export const STORAGE_CAPACITY_KEY = 'chroma_chords_capacity_v2';

export interface CapacityState {
  charges: number;
  max: number;
  rechargeNextSec: number;
}

export type CapacityCallback = (state: CapacityState) => void;

export class CapacityService {
  private charges = CAPACITY_MAX;
  private rechargeNextSec = 45;
  private lastCapacityTime = Date.now();
  private timer: ReturnType<typeof setInterval> | null = null;
  private subscribers = new Set<CapacityCallback>();

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (typeof localStorage !== 'undefined') {
        const raw = localStorage.getItem(STORAGE_CAPACITY_KEY);
        const now = Date.now();
        if (raw) {
          const data = JSON.parse(raw);
          const savedCharges = typeof data.charges === 'number' ? data.charges : CAPACITY_MAX;
          const lastTime = typeof data.lastTime === 'number' ? data.lastTime : now;
          if (savedCharges < CAPACITY_MAX) {
            const elapsed = Math.max(0, now - lastTime);
            const restored = Math.floor(elapsed / RECHARGE_INTERVAL_MS);
            this.charges = Math.min(CAPACITY_MAX, savedCharges + restored);
            const remainder = elapsed % RECHARGE_INTERVAL_MS;
            this.rechargeNextSec = Math.max(1, Math.ceil((RECHARGE_INTERVAL_MS - remainder) / 1000));
            this.lastCapacityTime = now - remainder;
          } else {
            this.charges = CAPACITY_MAX;
            this.rechargeNextSec = 45;
            this.lastCapacityTime = now;
          }
        } else {
          this.charges = CAPACITY_MAX;
          this.rechargeNextSec = 45;
          this.lastCapacityTime = now;
        }
      }
    } catch {
      this.charges = CAPACITY_MAX;
      this.rechargeNextSec = 45;
    }

    this.save();
    this.startTimer();
  }

  private save() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(
          STORAGE_CAPACITY_KEY,
          JSON.stringify({
            charges: this.charges,
            lastTime: this.lastCapacityTime,
          })
        );
      }
    } catch {}
  }

  private startTimer() {
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.charges < CAPACITY_MAX) {
        const now = Date.now();
        const elapsed = Math.max(0, now - this.lastCapacityTime);
        if (elapsed >= RECHARGE_INTERVAL_MS) {
          const restored = Math.floor(elapsed / RECHARGE_INTERVAL_MS);
          this.charges = Math.min(CAPACITY_MAX, this.charges + restored);
          this.lastCapacityTime = now - (elapsed % RECHARGE_INTERVAL_MS);
          this.save();
        }
        const remainder = (now - this.lastCapacityTime) % RECHARGE_INTERVAL_MS;
        this.rechargeNextSec = Math.max(1, Math.ceil((RECHARGE_INTERVAL_MS - remainder) / 1000));
      } else {
        this.rechargeNextSec = 45;
      }
      this.notify();
    }, 1000);
  }

  public getState(): CapacityState {
    return {
      charges: this.charges,
      max: CAPACITY_MAX,
      rechargeNextSec: this.rechargeNextSec,
    };
  }

  public getCharges(): number {
    return this.charges;
  }

  public getRechargeNextSec(): number {
    return this.rechargeNextSec;
  }

  public getCapacityMax(): number {
    return CAPACITY_MAX;
  }

  public spendCharge(): boolean {
    if (this.charges <= 0) {
      this.notify();
      return false;
    }
    if (this.charges === CAPACITY_MAX) {
      this.lastCapacityTime = Date.now();
    }
    this.charges -= 1;
    this.save();
    this.notify();
    return true;
  }

  public subscribe(cb: CapacityCallback): () => void {
    this.subscribers.add(cb);
    cb(this.getState());
    return () => {
      this.subscribers.delete(cb);
    };
  }

  private notify() {
    const state = this.getState();
    this.subscribers.forEach((cb) => {
      try {
        cb(state);
      } catch (err) {
        console.error('Error in CapacityService subscriber callback:', err);
      }
    });
  }
}

export const capacityService = new CapacityService();
