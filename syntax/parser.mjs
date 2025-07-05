import { getUnaryOperatorPrecedence, getBinaryOperatorPrecedence } from './syntaxFacts.mjs';
import { MathDigitNode, MathDecimalSeperatorNode, MathNumberNode, MathSymbolNode, MathImplicitMultiplicationNode, MathFunctionNode, MathExponentNode, MathOperationNode, MathUnaryOperationNode, MathFractionNode, MathPlaceholderNode, MathBranchNode } from '../ast/index.mjs';
import symbols from './symbols.mjs';

const replaces = [
    [/\s+/g, ''],
    ['*', symbols.times],
    ['+-', symbols.plusMinus]
];

export default class MathParser {
  constructor(text) {
    for (const replace of replaces) text = text.replace(replace[0], replace[1]);
    this.text = text;
    this.pos = 0;
    this.currentChar = this.text[this.pos] ?? '\0';
  }

  advance() {
    this.pos++;
    this.currentChar = this.pos < this.text.length ? this.text[this.pos] : '\0';
  }

  peek() {
    return this.pos + 1 < this.text.length ? this.text[this.pos + 1] : '\0';
  }

  parse() {      
    const node = this.expr();
    if (this.currentChar !== '\0') throw new Error("Unexpected character at end");
      
    const placeholder = new MathPlaceholderNode();
    placeholder.node = node;
    this.updateParent(placeholder, null);

    return placeholder;
  }

  updateParent(node, parent) {
    if (node === null) return;

    if (node instanceof MathPlaceholderNode) {
        node.parentNode = parent;
        this.updateParent(node.node, node);
    } else {
        node.parentPlaceholder = parent;

        if (node instanceof MathBranchNode)
            for (let child of node.placeholders)
                this.updateParent(child, node);
    }
  }

  eat(char) {
    if (this.currentChar === char) {
      this.advance();
    } else {
      throw new Error(`Expected '${char}', got '${this.currentChar}'`);
    }
  }

  number() {
    const digits = [];
    let hasDecimalSeparator = false;

    while (this.currentChar && /[0-9.]/.test(this.currentChar)) {
      if (this.currentChar === '.') {
        if (hasDecimalSeparator) {
          throw new Error("Multiple decimal separators in number");
        }
        hasDecimalSeparator = true;
        digits.push(new MathDecimalSeperatorNode());
      } else {
        digits.push(new MathDigitNode(parseInt(this.currentChar, 10)));
      }
      this.advance();
    }

    const nbr = new MathNumberNode(0);
    nbr.digits = digits;

    return nbr;
  }

  name() {
    let name = '';

    while (this.currentChar && /[a-zA-Z0-9]/.test(this.currentChar)) {
      name += this.currentChar;
      this.advance();
    }

    return new MathSymbolNode(name);
  }

  primary() {
    if (this.currentChar === '(') {
      this.advance();
      const node = this.expr();
      this.eat(')');
      return node;
    }

    if (/[0-9.]/.test(this.currentChar)) {
      let value = this.number();

      if (/[a-zA-Z]/.test(this.currentChar))
        value = new MathImplicitMultiplicationNode(value, this.primary());

      return value;
    }

    if (/[a-zA-Z]/.test(this.currentChar)) {
      const nameNode = this.name();

      if (this.currentChar === '(') {
        this.advance();
        const args = [];

        if (this.currentChar === ')') {
          this.advance();
          return new MathFunctionNode(nameNode, 0);
        }

        while (true) {
          const arg = this.expr();
          args.push(arg);

          if (this.currentChar === ',') {
            this.advance();
          } else if (this.currentChar === ')') {
            this.advance();
            break;
          } else {
            throw new Error("Expected ',' or ')' in function arguments");
          }
        }

        const func = new MathFunctionNode(nameNode.symbol, args.length);
        for (let i = 0; i < args.length; i++) func.args[i].node = args[i];
        return func;
      }

      return nameNode;
    }

    if (this.currentChar === '_') this.advance();

    return null;
  }

  binary(parentPrecedence) {
    let left;

    const unaryOperatorPrecedence = getUnaryOperatorPrecedence(this.currentChar);
    if (unaryOperatorPrecedence != 0 && unaryOperatorPrecedence >= parentPrecedence) {
      const operator = this.currentChar;
      this.advance();
      const operand = this.binary(unaryOperatorPrecedence);
      const unary = new MathUnaryOperationNode(operator);
      unary.expression.node = operand;
      left = unary;
    } else {
      left = this.primary();
    }

    while (true) {
      const precedence = getBinaryOperatorPrecedence(this.currentChar);
      if (precedence == 0 || precedence <= parentPrecedence)
        break;

      const operator = this.currentChar;
      this.advance();
      const right = this.binary(precedence);

      switch (operator) {
        case symbols.exponent:
          const exponent = new MathExponentNode();
          exponent.base.node = left;
          exponent.exponent.node = right;
          left = exponent;
          break;
        case symbols.fraction:
          const fraction = new MathFractionNode();
          fraction.numerator.node = left;
          fraction.denominator.node = right;
          left = fraction;
          break;
        default:
          const operation = new MathOperationNode(operator);
          operation.left.node = left;
          operation.right.node = right;
          left = operation;
          break;
      }
    }

    return left;
  }

  expr() {
    return this.binary(0);
  }
}
