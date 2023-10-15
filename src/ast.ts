export enum NodeType {
  Object = "Object",
  Array = "Array",
  Literal = "Literal",
  Property = "Property",
  Identifier = "Identifier",
}

export interface Node {
  kind: NodeType;
}

export interface ObjectLiteral extends Node {
  kind: NodeType.Object;
  children: Property[];
}

export interface ArrayLiteral extends Node {
  kind: NodeType.Array;
  children: Value[];
}

export interface Identifier extends Node {
  kind: NodeType.Identifier;
  value: string;
}

export interface Literal extends Node {
  kind: NodeType.Literal;
  value: string | number | boolean | null;
}

export interface Property extends Node {
  kind: NodeType.Property;
  key: Identifier;
  value: Value;
}

export type Value = Literal | ObjectLiteral | ArrayLiteral;
