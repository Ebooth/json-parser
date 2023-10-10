import { Token, TokenType, tokenize } from "./lexer.js";

export default class Parser {
  constructor(private tokens: Token[]) {}

  isEndOfFile() {
    return this.tokens[0]!.type === TokenType.EOF;
  }

  peek() {
    return this.tokens[0] as Token;
  }

  advance() {
    let token = this.tokens.shift();
    return token as Token;
  }

  produceAST() {
    const ast = this.parseExpression();
    if (!ast) {
      throw new Error("JSON file is empty");
    }
    return ast;
  }

  parseExpression() {
    switch (this.peek().type) {
      case TokenType.OpenBrace: {
        return this.parseObjectExpression();
      }
    }
  }

  parseObjectExpression() {
    if (this.peek().type !== TokenType.OpenBrace) {
      throw new Error("error while parsing, object should start with {");
    }
    this.advance();
    while (!this.isEndOfFile() && this.peek().type != TokenType.CloseBrace) {
      this.advance();
    }

    const endToken = this.advance();
    if (endToken?.type != TokenType.CloseBrace) {
      throw new Error(`Parser error: expecting ${TokenType.CloseBrace}`);
    }
    return { kind: "Object" };
  }
}
