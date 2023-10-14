export enum NodeType {
  Object = "Object",
  Literal = "Literal",
  Property = "Property",
  Identifier = "Identifier",
}

export interface Node {
  kind: NodeType;
}

export interface ObjectLiteral extends Node {
  kind: NodeType.Object;
  properties: Property[];
}

export interface Identifier extends Node {
  kind: NodeType.Identifier;
  value: string;
}

export interface Literal extends Node {
  kind: NodeType.Literal;
}

export interface Property extends Node {
  kind: NodeType.Property;
  key: Identifier;
  value: Value;
}

export interface Value extends Node {
  kind: NodeType.Literal;
  value: string;
}
