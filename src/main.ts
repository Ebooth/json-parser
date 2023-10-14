import fs from "fs/promises";
import { evaluate } from "./interpreter.js";
import Parser from "./parser.js";
import { tokenize } from "./lexer.js";
import util from "util";

util.inspect.defaultOptions.depth = null;

async function main() {
  const res = await parseFile("tests/step1/invalid.json");
  console.log(res);
}

async function parseFile(filePath: string) {
  const file = await fs.readFile(filePath);
  return parseText(file.toString());
}

export function parseText(text: string) {
  const tokens = tokenize(text);
  const parser = new Parser(tokens);
  const ast = parser.produceAST();
  const res = evaluate(ast);
  return res;
}

main();
