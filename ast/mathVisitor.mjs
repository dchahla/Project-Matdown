import MathDigitNode from "./mathDigitNode.mjs";
import MathDecimalSeperatorNode from './mathDecimalSeperatorNode.mjs';
import MathNumberNode from './mathNumberNode.mjs';
import MathSymbolNode from './mathSymbolNode.mjs'
import MathImplicitMultiplicationNode from './mathImplicitMultiplicationNode.mjs'
import MathFunctionNode from './mathFunctionNode.mjs';
import MathExponentNode from './mathExponentNode.mjs';
import MathOperationNode from './mathOperationNode.mjs';
import MathUnaryOperationNode from './mathUnaryOperationNode.mjs';
import MathFractionNode from './mathFractionNode.mjs';
import MathPlaceholderNode from "./mathPlaceholderNode.mjs";

export default class MathVisitor {
  visit(node) {
    if (node instanceof MathDigitNode) {
      return this.visitDigit(node);
    } else if (node instanceof MathDecimalSeperatorNode) {
      return this.visitDecimalSeperator(node);
    } else if (node instanceof MathNumberNode) {
      return this.visitNumber(node);
    } else if (node instanceof MathSymbolNode) {
      return this.visitSymbol(node);
    } else if (node instanceof MathImplicitMultiplicationNode) {
      return this.visitImplicitMultiplication(node);
    } else if (node instanceof MathFunctionNode) {
      return this.visitFunction(node);
    } else if (node instanceof MathExponentNode) {
      return this.visitExponent(node);
    } else if (node instanceof MathOperationNode) {
      return this.visitOperation(node);
    } else if (node instanceof MathUnaryOperationNode) {
      return this.visitUnaryOperation(node);
    } else if (node instanceof MathFractionNode) {
      return this.visitFraction(node);
    } else if (node instanceof MathPlaceholderNode) {
      return this.visitPlaceholder(node);
    } else {
      throw new Error(`Unknown node type: ${typeof node}`);
    }
  }

  visitChildren(node) {
    return [...node.getChildren()].map(c => this.visit(c));
  }

  visitDigit(node) {
    throw new Error("Abstract method cannot be called.");
  }

  visitDecimalSeperator(node) {
    throw new Error("Abstract method cannot be called.");
  }

  visitNumber(node) {
    throw new Error("Abstract method cannot be called.");
  }

  visitSymbol(node) {
    throw new Error("Abstract method cannot be called.");
  }

  visitImplicitMultiplication(node) {
    throw new Error("Abstract method cannot be called.");
  }

  visitFunction(node) {
    throw new Error("Abstract method cannot be called.");
  }

  visitExponent(node) {
    throw new Error("Abstract method cannot be called.");
  }

  visitOperation(node) {
    throw new Error("Abstract method cannot be called.");
  }

  visitUnaryOperation(node) {
    throw new Error("Abstract method cannot be called.");
  }

  visitFraction(node) {
    throw new Error("Abstract method cannot be called.");
  }

  visitPlaceholder(node) {
    throw new Error("Abstract method cannot be called.");
  }
}
