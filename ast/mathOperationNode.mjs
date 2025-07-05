import MathBranchNode from "./base/mathBranchNode.mjs";
import MathPlaceholderNode from './mathPlaceholderNode.mjs';
import { getBinaryOperatorPrecedence } from '../syntax/syntaxFacts.mjs';
import MathExponentNode from "./mathExponentNode.mjs";

export default class MathOperationNode extends MathBranchNode {
  constructor(operator) {
    const left = new MathPlaceholderNode();
    const right = new MathPlaceholderNode();

    super([left, right]);

    this.left = left;
    this.operator = operator;
    this.right = right;
  }

  requiresParenthesis() {
    const parent = this.parentPlaceholder.parentNode;
    if (parent === null) return false;
    if (parent instanceof MathExponentNode) {
      return this == parent.base.node;
    } else if (parent instanceof MathOperationNode) {
      return getBinaryOperatorPrecedence(this.operator) < getBinaryOperatorPrecedence(parent.operator);
    }
  }

  *getChildren() {
    yield this.left;
    yield this.right;
  }
}
