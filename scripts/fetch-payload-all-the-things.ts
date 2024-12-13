import fs from "node:fs";
import path from "node:path";
import { marked } from "npm:marked";
import * as fastGlob from "npm:fast-glob";

type Payload = { title: string; code: string; lang: string };

function extractCodeWithTitles(inputFile: string): Payload[] {
  const content = fs.readFileSync(inputFile, "utf-8");
  const tokens = marked.lexer(content);
  let currentTitle = "";
  const result: Payload[] = [];
  tokens.forEach((token: any) => {
    if (token.type === "heading" && token.depth >= 1 && token.depth <= 3) {
      currentTitle = token.text;
    } else if (token.type === "code") {
      result.push({
        lang: token.lang,
        title: `${path.basename(path.dirname(inputFile))} - ${currentTitle}`,
        code: token.text,
      });
    }
  });
  return result;
}

const PATH_TO = Deno.args[0]

const files = await fastGlob.default.glob(PATH_TO);

let i = 0;
const result = await Promise.all(
  files.flatMap((file: string) => {
    const inputFile = path.resolve(file);
    const result = extractCodeWithTitles(inputFile);
    return result.map((x) => {
      const item = {
        lang: x.lang,
        code: x.code,
        title: `${i} - ${x.title}`,
      };
      i += 1;
      return item;
    });
  }),
);

const outputFile = path.resolve("payloads.json");
fs.writeFileSync(outputFile, JSON.stringify(result), "utf-8");
