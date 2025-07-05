import MathNode from './base/mathNode.mjs';

export default class MathPlaceholderNode extends MathNode {
  constructor() {
    super();
    this.parentNode = null;
    this.node = null;
  }

  *getChildren() {
    yield this.node;
  }
}
