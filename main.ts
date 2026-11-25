import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One Emoji, One Smile (v3): write exactly one emoji — 😄 (U+1F604,
// GRINNING FACE WITH SMILING EYES) — and nothing else, no newline,
// to $OUTPUT_DIR/entry.txt (OUTPUT_DIR defaults to "/output").
const EMOJI = "😄";
const outputDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, "entry.txt");
writeFileSync(entryPath, EMOJI, "utf8");
// Guard: the file must round-trip byte-for-byte as exactly that one
// emoji, so a bad write (extra bytes, newline, wrong encoding) fails
// loudly instead of submitting a broken entry.
if (readFileSync(entryPath, "utf8") !== EMOJI) {
  throw new Error("entry.txt does not contain exactly the 😄 emoji");
}
