import { ArrayLiteral, Literal, Node, NodeType, ObjectLiteral, Value } from "./ast.js";

export function evaluate(astNode: Node) {
  switch (astNode.kind) {
    case NodeType.Object: {
      return evaluateObject(astNode as ObjectLiteral);
    }
    case NodeType.Array: {
      return evaluateArray(astNode as ArrayLiteral);
    }

    case NodeType.Literal:
      return (astNode as Literal).value;
  }
}

function evaluateObject(obj: ObjectLiteral) {
  const res: Record<string, unknown> = {};
  for (let { key, value } of obj.children) {
    res[key.value] = evaluate(value);
  }
  return res;
}

function evaluateArray(obj: ArrayLiteral) {
  const res: unknown[] = [];
  for (let value of obj.children) {
    res.push(evaluate(value));
  }
  return res;
}
