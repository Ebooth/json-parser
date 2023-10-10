export enum NodeType {
  Object = "Object",
}

export interface Expr {
  kind: NodeType;
}

export interface ObjectLiteral extends Expr {
  kind: NodeType.Object;
}
