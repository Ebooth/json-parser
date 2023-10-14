import { Node, NodeType, ObjectLiteral } from "./ast.js";

export function evaluate(astNode: Node) {
  switch (astNode.kind) {
    case NodeType.Object: {
      return evaluateObject(astNode as ObjectLiteral);
    }
  }
}

function evaluateObject(obj: ObjectLiteral) {
  const res: Record<string, unknown> = {};
  for (let { key, value } of obj.properties) {
    res[key.value] = value.value;
  }
  return res;
}
