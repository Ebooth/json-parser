export enum TokenType {
  OpenBrace = "OpenBrace",
  CloseBrace = "CloseBrace",
  EOF = "EOF",
}
export type Token = {
  type: TokenType;
  value: string;
};

export function tokenize(sourceCode: string): Token[] {
  const source = sourceCode.split("");
  const tokens = [];
  while (source.length > 0) {
    if (source[0] == "{") {
      tokens.push({ type: TokenType.OpenBrace, value: source.shift() as string });
    } else if (source[0] == "}") {
      tokens.push({ type: TokenType.CloseBrace, value: source.shift() as string });
    } else {
      throw new Error(`unrecognized character found in source : ${source[0]}`);
    }
  }

  tokens.push({ type: TokenType.EOF, value: "EOF" });
  return tokens;
}
