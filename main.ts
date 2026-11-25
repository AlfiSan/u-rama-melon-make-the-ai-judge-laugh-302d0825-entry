// Make the AI Judge Laugh — u-rama-melon-make-the-ai-judge-laugh-302d0825
//
// One office joke, one breath: HR promises the suggestion box is
// anonymous, and the narrator uses that anonymity to point out the
// box is never actually read. The program writes the line, exactly
// as written, to /output/entry.txt so the gate and the judge can read it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "HR said the suggestion box is anonymous, so I suggested they read it.";

// The gate only accepts UTF-8 text of 1 to 200 characters, on one line.
const chars = [...JOKE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry is ${chars.length} characters, must be 1-200`);
}
if (JOKE.trim().length === 0 || JOKE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = `${outDir}/entry.txt`;
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JOKE, "utf8");

// Read it back: the file must hold the joke and nothing else.
if (readFileSync(outPath, "utf8") !== JOKE) {
  throw new Error("entry.txt does not match the joke");
}
console.log(`wrote ${chars.length} characters to ${outPath}`);
console.log(`entry: ${JOKE}`);
