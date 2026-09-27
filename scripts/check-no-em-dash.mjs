import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOTS = ["src", "public"];
const TEXT_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".jsx",
  ".md",
  ".mjs",
  ".ts",
  ".tsx",
  ".txt",
]);

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(target)));
    if (entry.isFile() && TEXT_EXTENSIONS.has(path.extname(entry.name))) files.push(target);
  }

  return files;
}

const matches = [];

for (const root of ROOTS) {
  for (const file of await collectFiles(root)) {
    const content = await readFile(file, "utf8");
    content.split(/\r?\n/).forEach((line, index) => {
      if (line.includes("\u2014")) matches.push(`${file}:${index + 1}`);
    });
  }
}

if (matches.length) {
  console.error(`Em dash found in:\n${matches.join("\n")}`);
  process.exit(1);
}

console.log("No em dashes found.");
