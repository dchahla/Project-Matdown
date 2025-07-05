import MathLeafNode from './base/mathLeafNode.mjs';

export default class MathNumberNode extends MathLeafNode {
  constructor(digit) {
    super();
    this.digits = [digit];
  }

  *getChildren() {
    for (let digit of this.digits)
      yield digit;
  }
}
