import { MathVisitor, MathBranchNode } from '../ast/index.mjs';
import symbols from './symbols.mjs';

export default class MathUnparser extends MathVisitor {
  visit(node) {
    let result = super.visit(node);

    if (node instanceof MathBranchNode && node.requiresParenthesis()) {
      result = '(' + result + ')';
    }

    return result;
  }

  visitDigit(node) {
    return node.digit;
  }

  visitDecimalSeperator(node) {
    return '.';
  }

  visitNumber(node) {
    return [...this.visitChildren(node)].join('');
  }

  visitSymbol(node) {
    return node.symbol;
  }

  visitImplicitMultiplication(node) {
    return [...this.visitChildren(node)].join('');
  }

  visitFunction(node) {
    const content = [...this.visitChildren(node)].join(', ');
    return `${node.name}(${content})`;
  }

  visitExponent(node) {
    let base = this.visit(node.base);
    let exponent = this.visit(node.exponent);

    if (node.base instanceof MathBranchNode) base = `(${base})`;
    if (node.exponent instanceof MathBranchNode) exponent = `(${exponent})`;

    return `${base}${symbols.exponent}${exponent}`;
  }

  visitOperation(node) {
    return `${this.visit(node.left)} ${node.operator} ${this.visit(node.right)}`;
  }

  visitUnaryOperation(node) {
    return `${node.operator}${this.visit(node.expression)}`;
  }

  visitFraction(node) {
    let numerator = this.visit(node.numerator);
    let denominator = this.visit(node.denominator);

    if (node.numerator instanceof MathBranchNode) numerator = `(${numerator})`;
    if (node.denominator instanceof MathBranchNode) denominator = `(${denominator})`;

    return `${numerator}${symbols.fraction}${denominator}`;
  }

  visitPlaceholder(node) {
    return node.node !== null
      ? this.visit(node.node)
      : '_';
  }
}
