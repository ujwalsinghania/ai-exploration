import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";

export default function globalTeardown() {
  const nycOutput = path.join(process.cwd(), ".nyc_output");
  if (!fs.existsSync(nycOutput)) return;

  execSync("npx nyc report", { stdio: "inherit" });
}
