#!/usr/bin/env node
import { scan } from "./scanner.js";
const [command, directory=".", format=""] = process.argv.slice(2);
if (command !== "scan") {
  console.log("Usage: shipsafe scan [directory] [--json]");
  process.exitCode = command === "--help" || !command ? 0 : 2;
} else {
  try {
    const findings = scan(directory);
    if (format === "--json") console.log(JSON.stringify({findings},null,2));
    else {
      console.log("ShipSafe — Next.js preflight checks\n");
      for (const f of findings) console.log(`${f.level.toUpperCase().padEnd(5)} ${f.message}`);
      console.log(`\n${findings.filter(f=>f.level==="warn").length} warning(s)`);
    }
    if (findings.some(f=>f.level==="warn")) process.exitCode=1;
  } catch(e) { console.error(`ShipSafe: ${e instanceof Error ? e.message : String(e)}`);process.exitCode=2; }
}
