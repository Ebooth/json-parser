export enum NodeType {
  Object = "Object",
  Literal = "Literal",
  Property = "Property",
  Identifier = "Identifier",
}

export interface Expr {
  kind: NodeType;
}

export interface ObjectLiteral extends Expr {
  kind: NodeType.Object;
}

export interface Identifier extends Expr {
  kind: NodeType.Identifier;
}

export interface Literal extends Expr {
  kind: NodeType.Literal;
}

export interface Property extends Expr {
  kind: NodeType.Property;
  key: Identifier;
  value: Expr;
}
