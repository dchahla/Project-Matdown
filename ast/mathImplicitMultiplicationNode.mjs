import MathLeafNode from './base/mathLeafNode.mjs';

export default class MathImplicitMultiplicationNode extends MathLeafNode {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  *getChildren() {
    yield this.left;
    yield this.right;
  }
}
