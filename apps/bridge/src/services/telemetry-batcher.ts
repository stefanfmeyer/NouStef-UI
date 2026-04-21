import type { TelemetryEvent } from '@hermes-recipes/protocol';

export class TelemetryBatcher {
  private readonly buffer: TelemetryEvent[] = [];
  private readonly timer: ReturnType<typeof setInterval>;

  constructor(
    private readonly flush: (events: TelemetryEvent[]) => void,
    private readonly maxBufferSize = 50,
    flushIntervalMs = 500
  ) {
    this.timer = setInterval(() => this.drain(), flushIntervalMs);
    // Don't keep the Node.js process alive just for telemetry flushes.
    if (typeof this.timer.unref === 'function') this.timer.unref();
  }

  append(event: TelemetryEvent) {
    this.buffer.push(event);
    if (this.buffer.length >= this.maxBufferSize) {
      this.drain();
    }
  }

  drain() {
    if (this.buffer.length === 0 || this.destroyed) return;
    const events = this.buffer.splice(0, this.buffer.length);
    try {
      this.flush(events);
    } catch {
      // Database may have been closed during shutdown — drop buffered events.
    }
  }

  private destroyed = false;

  destroy() {
    this.destroyed = true;
    clearInterval(this.timer);
    this.drain();
  }
}
