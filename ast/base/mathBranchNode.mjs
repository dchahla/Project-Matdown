import MathTreeNode from "./mathTreeNode.mjs";

export default class MathBranchNode extends MathTreeNode {
  constructor(placeholders) {
    super();

    if (this.constructor == MathBranchNode) {
      throw new Error("Abstract classes can't be instantiated.");
    }

    this.placeholders = placeholders;

    for (let placeholder of placeholders) {
      placeholder.parentNode = this;
    }
  }

  requiresParenthesis() {
    throw new Error("Abstract method cannot be called.");
  }
}
