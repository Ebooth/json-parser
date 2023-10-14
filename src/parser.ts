import { NodeType, Property, Node, Value } from "./ast.js";
import { Token, TokenType } from "./lexer.js";

export default class Parser {
  constructor(private tokens: Token[]) {}

  isEndOfFile() {
    return this.tokens[0]!.type === TokenType.EOF;
  }

  private peek() {
    return this.tokens[0] as Token;
  }

  private advance() {
    let token = this.tokens.shift();
    return token as Token;
  }

  private expect(tokenType: TokenType) {
    const token = this.tokens.shift();
    if (!token || token.type !== tokenType) {
      throw new Error(
        `Parser Error: \n Expected token type ${tokenType}, got ${token?.type ?? undefined}`,
      );
    }
    return token;
  }

  produceAST(): Node {
    const ast = this.parseExpression();
    if (!ast) {
      throw new Error("JSON file is empty");
    }
    return ast;
  }

  parseExpression(): Node {
    switch (this.peek().type) {
      case TokenType.OpenBrace: {
        return this.parseObjectExpression();
      }
      default:
        throw new Error("expression is empty");
    }
  }

  parseObjectExpression() {
    this.expect(TokenType.OpenBrace);
    const properties: Property[] = [];

    while (!this.isEndOfFile() && this.peek().type != TokenType.CloseBrace) {
      const key = this.expect(TokenType.String);
      this.expect(TokenType.Colon);
      const value = this.parseValue();
      properties.push({
        kind: NodeType.Property,
        key: {
          kind: NodeType.Identifier,
          value: key.value.slice(1, -1),
        },
        value,
      });

      if (this.peek().type != TokenType.CloseBrace) {
        this.expect(TokenType.Comma);
        if (this.peek().type != TokenType.String) {
          throw new Error(`Parser error: expecting ${TokenType.String} after ${TokenType.Comma}`);
        }
      }
    }

    const endToken = this.advance();
    if (endToken?.type != TokenType.CloseBrace) {
      throw new Error(`Parser error: expecting ${TokenType.CloseBrace}`);
    }
    return { kind: NodeType.Object, properties };
  }

  parseValue(): Value {
    const token = this.advance();

    switch (token.type) {
      case TokenType.String: {
        return { kind: NodeType.Literal, value: token.value.slice(1, -1) };
      }
      case TokenType.Number: {
        return { kind: NodeType.Literal, value: parseFloat(token.value) };
      }
      case TokenType.Boolean: {
        return { kind: NodeType.Literal, value: token.value == "true" };
      }
      case TokenType.Null: {
        return { kind: NodeType.Literal, value: null };
      }
      default:
        throw new Error(`Parser Error: \n Unexpected token type ${token?.type ?? undefined}`);
    }
  }
}
