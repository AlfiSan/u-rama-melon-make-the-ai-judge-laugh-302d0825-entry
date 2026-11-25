// Make the AI Judge Laugh — u-rama-melon-make-the-ai-judge-laugh-302d0825
//
// The whole entry is one office joke, built to land in a single breath:
// HR makes a promise about the suggestion box, and the narrator's
// suggestion quietly points out that nobody ever reads the thing.
// The program's only job is to put that line, exactly as written,
// into /output/entry.txt so the gate and the judge can read it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const JOKE =
  "HR said the suggestion box is anonymous, so I suggested they read it.";

// The gate only accepts UTF-8 text of 1 to 200 characters, on one line.
const codePoints = [...JOKE];
if (codePoints.length < 1 || codePoints.length > 200) {
  throw new Error(`entry is ${codePoints.length} characters, must be 1-200`);
}
if (JOKE.trim().length === 0 || JOKE.includes("\n")) {
  throw new Error("entry must be a single non-blank line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = `${outDir}/entry.txt`;
mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, JOKE, "utf8");

// Read it back: the file must hold the joke and nothing else, so a bad
// write can never slip past to the gate.
if (readFileSync(outPath, "utf8") !== JOKE) {
  throw new Error("entry.txt does not match the joke");
}
console.log(`wrote ${codePoints.length} characters to ${outPath}`);
