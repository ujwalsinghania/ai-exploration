import { test as base, type Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import * as crypto from "crypto";

async function saveCoverage(page: Page) {
  const coverage = await page.evaluate(
    () => (window as { __coverage__?: unknown }).__coverage__
  );
  if (coverage) {
    const outputDir = path.join(process.cwd(), ".nyc_output");
    fs.mkdirSync(outputDir, { recursive: true });
    const filename = `coverage-${crypto.randomUUID()}.json`;
    fs.writeFileSync(
      path.join(outputDir, filename),
      JSON.stringify(coverage)
    );
  }
}

export const test = base.extend<{ page: Page }>({
  page: async ({ page }, use) => {
    await use(page);
    await saveCoverage(page);
  },
});

export { expect } from "@playwright/test";
