export class EventLoopSpinner {
  private afterLastSpin: number;

  constructor(private thresholdMs: number = 10) {
    this.afterLastSpin = Date.now();
  }

  public isStarving(): boolean {
    return Date.now() - this.afterLastSpin > this.thresholdMs;
  }

  public reset(): void {
    this.afterLastSpin = Date.now();
  }

  public async spin(): Promise<void> {
    return new Promise((resolve) =>
      setImmediate(() => {
        this.reset();
        resolve();
      }),
    );
  }
}
