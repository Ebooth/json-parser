export enum TokenType {
  OpenBrace = "OpenBrace",
  CloseBrace = "CloseBrace",
  String = "String",
  Number = "Number",
  Colon = "Colon",
  EOF = "EOF",
}
export type Token = {
  type: TokenType;
  value: string;
};

type NonEmptyArray<T> = [T, ...T[]];

export function tokenize(sourceCode: string): Token[] {
  const source = sourceCode.split("") as NonEmptyArray<string>;
  const tokens = [];
  while (source.length > 0) {
    if (source[0] == "{") {
      tokens.push({ type: TokenType.OpenBrace, value: source.shift() as string });
    } else if (source[0] == "}") {
      tokens.push({ type: TokenType.CloseBrace, value: source.shift() as string });
    } else if (source[0] == ":") {
      tokens.push({ type: TokenType.Colon, value: source.shift() as string });
    } else if (/\d/.test(source[0])) {
      let val = "";
      while (/\d/.test(source[0])) {
        val += source.shift();
      }
      tokens.push({ type: TokenType.Number, value: val });
    } else if (source[0] == '"') {
      let val = source.shift() as string;
      while (source[0] != '"') {
        val += source.shift();
      }
      val += source.shift();
      tokens.push({ type: TokenType.String, value: val });
    } else if (/\s/.test(source[0])) {
      while (/\s/.test(source[0])) {
        source.shift();
      }
    } else {
      throw new Error(`unrecognized character found in source : "${source[0]}"`);
    }
  }

  tokens.push({ type: TokenType.EOF, value: "EOF" });
  return tokens;
}
