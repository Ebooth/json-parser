import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  verbose: true,
  preset: "ts-jest/presets/default-esm-legacy",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.m?[tj]sx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
};

export default config;
