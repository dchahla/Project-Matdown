import { MathVisitor, MathBranchNode } from '../ast/index.mjs';

export default class MathHtmlEmmiter extends MathVisitor {
  constructor(keyboard) {
    super();
    this.keyboard = keyboard;
    this.onClick = null;
  }

  visit(node) {
    let result = super.visit(node);

    if (node instanceof MathBranchNode && node.requiresParenthesis()) {
      const left = this.createElement('span', 'matdowninline-expression', '(');
      const right = this.createElement('span', 'matdowninline-expression', ')');

      this.scaleTo(left, result);
      this.scaleTo(right, result);

      result = this.createElement('span', 'matdowninline-expression', left, result, right);
    }

    return result;
  }

  visitDigit(node) {
    return this.createElement('span', 'matdowninline-expression', node.digit);
  }

  visitDecimalSeperator(node) {
    return this.createElement('span', 'matdowninline-expression', '.');
  }

  visitNumber(node) {
    const content = [...this.visitChildren(node)];
    const n = this.createElement('span', 'matdowninline-expression');
    content.forEach(child => n.append(child));
    return n;
  }

  visitSymbol(node) {
    return this.createElement('span', 'matdowninline-expression', node.symbol);
  }

  visitImplicitMultiplication(node) {
    const content = [...this.visitChildren(node)];
    const n = this.createElement('span', 'matdowninline-expression');
    content.forEach(child => n.append(child));
    return n;
  }

  visitFunction(node) {
    const content = [...this.visitChildren(node)];
    const n = this.createElement('span', 'matdowninline-expression', node.name, '(');
    content.forEach(child => n.append(child));
    n.append(')');
    return n;
  }

  visitExponent(node) {
    return this.createElement('span', 'matdowninline-expression', 
      this.visit(node.base), 
      this.createElement('span', 'matdownexponent', this.visit(node.exponent))
    );
  }

  visitOperation(node) {
    return this.createElement('span', 'matdowninline-expression',
      this.visit(node.left), 
      this.createElement('span', 'matdownoperator', node.operator),
      this.visit(node.right)
    );
  }

  visitUnaryOperation(node) {
    return this.createElement('span', 'matdowninline-expression',
      this.createElement('span', 'matdownoperator', node.operator),
      this.visit(node.expression)
    );
  }

  visitFraction(node) {
    return this.createElement('div', 'matdownfraction',
      this.createElement('div', 'matdownnumerator', this.visit(node.numerator)),
      this.createElement('div', 'matdowndenominator', this.visit(node.denominator))
    );
  }

  visitPlaceholder(node) {
    const placeholder = node.node !== null
      ? this.visit(node.node)
      : this.createElement('span', 'matdowngroup');

    if (this.keyboard.current === node || this.keyboard.current === node.node) {
      placeholder.classList.add('matdownselected');
    }

    if (this.onClick !== null)
      placeholder.addEventListener('click', (event) => {
        event.stopPropagation();
        this.keyboard.current = node.node ?? node;
        this.onClick();
      });

    return placeholder;
  }

  createElement(tag, className, ...children) {
    const element = document.createElement(tag);
    element.classList.add(className);

    children.forEach(child => element.append(child));

    return element;
  }

  measure(tag) {
    const tempDiv = document.createElement('div');
    tempDiv.style.visibility = 'hidden';
    tempDiv.style.position = 'absolute';

    document.body.appendChild(tempDiv);
    tempDiv.appendChild(tag);
    const rect = tag.getBoundingClientRect();
    document.body.removeChild(tempDiv);

    return rect;
  }

  scaleTo(tag, to) {
    const toHeight = this.measure(to).height;
    const currentHeight = this.measure(tag).height;
    const scale = toHeight / currentHeight;

    if (scale > 1)
      tag.style.transform = `scale(1, ${scale})`;
  }
}
