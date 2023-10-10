import fs from "fs/promises";
import Parser from "../src/parser.js";
import { parseText } from "../src/main.js";

describe("Step1", () => {
  test("should be able to parse empty json object", () => {
    const text = "{}";
    expect(parseText(text)).toEqual({});
  });

  test("should throw an error if json text is empty", () => {
    const text = "";
    expect(() => parseText(text)).toThrowError();
  });
});
