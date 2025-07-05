import MathBranchNode from "./base/mathBranchNode.mjs";
import MathPlaceholderNode from "./mathPlaceholderNode.mjs";

export default class MathFunctionNode extends MathBranchNode {
  constructor(name, argCount) {
    const args = new Array(argCount).fill(null).map(() => new MathPlaceholderNode());
    super(args);
    this.name = name;
    this.args = args;
  }

  requiresParenthesis() {
    return false;
  }

  *getChildren() {
    for (let arg of this.args)
      yield arg;
  }
}
