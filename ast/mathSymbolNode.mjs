import MathLeafNode from './base/mathLeafNode.mjs';

export default class MathSymbolNode extends MathLeafNode {
  constructor(symbol) {
    super();
    this.symbol = symbol;
  }
}
