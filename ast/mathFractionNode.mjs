import MathBranchNode from './base/mathBranchNode.mjs';
import MathPlaceholderNode from './mathPlaceholderNode.mjs';

export default class MathFractionNode extends MathBranchNode {
  constructor() {
    const numerator = new MathPlaceholderNode();
    const denominator = new MathPlaceholderNode();
    super([numerator, denominator]);
    this.numerator = numerator;
    this.denominator = denominator;
  }

  requiresParenthesis() {
    return false;
  }

  *getChildren() {
    yield this.numerator;
    yield this.denominator;
  }
}
