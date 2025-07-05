export default class MathNode {
  constructor() {
    if (this.constructor == MathNode) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  *getChildren() {
    throw new Error("Abstract method cannot be called.");
  }
}
