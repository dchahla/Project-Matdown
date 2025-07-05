import MathBranchNode from "./base/mathBranchNode.mjs";
import MathPlaceholderNode from './mathPlaceholderNode.mjs';
import MathOperationNode from './mathOperationNode.mjs';
import symbols from '../syntax/symbols.mjs';

export default class MathExponentNode extends MathBranchNode {
  constructor() {
    const base = new MathPlaceholderNode();
    const exponent = new MathPlaceholderNode();
    super([base, exponent]);
    this.base = base;
    this.exponent = exponent;
  }

  requiresParenthesis() {
    return false;
  }

  *getChildren() {
    yield this.base;
    yield this.exponent;
  }
}
