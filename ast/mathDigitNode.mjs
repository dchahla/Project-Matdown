import MathPartOfNumberNode from './base/mathPartOfNumberNode.mjs';

export default class MathDigitNode extends MathPartOfNumberNode {
  constructor(digit) {
    super();
    this.digit = digit;
  }
}
