class EventLoopSpinner {
  constructor() {
    this.afterLastSpin = Date.now();
  }

  isStarving(thresholdMs = 100) {
    return Date.now() - this.afterLastSpin > thresholdMs;
  }

  reset() {
    this.afterLastSpin = Date.now();
  }

  async spin() {
    return new Promise((resolve) => setImmediate(() => {
      this.reset();
      resolve();
    }));
  }
}

module.exports = {
  EventLoopSpinner,
};
