import { test as base } from '@playwright/test';
import type { PerformanceOptions, PlaywrightPerformance, PerformanceWorker } from "playwright-performance";
import { playwrightPerformance } from "playwright-performance";

export const test = base.extend<PlaywrightPerformance, PerformanceOptions & PerformanceWorker>({
    performance: playwrightPerformance.performance,
    performanceOptions: [{
      disableAppendToExistingFile: true,
    }, { scope: 'worker' }],
    worker: [playwrightPerformance.worker, { scope: 'worker', auto: true }]
});

export const test2 = base.extend<PlaywrightPerformance, PerformanceOptions & PerformanceWorker>({
  performance: playwrightPerformance.performance,
  performanceOptions: [{
    disableAppendToExistingFile: true,
  }, { scope: 'worker' }],
  worker: [playwrightPerformance.worker, { scope: 'worker', auto: true }]
});

export { expect } from '@playwright/test';