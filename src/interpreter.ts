import { Expr, NodeType, ObjectLiteral } from "./ast.js";

export function evaluate(astNode: Expr) {
  switch (astNode.kind) {
    case NodeType.Object: {
      return evaluateObject(astNode);
    }
  }
}

function evaluateObject(obj: ObjectLiteral) {
  return {};
}
