import symbols from './symbols.mjs';

export function getUnaryOperatorPrecedence(kind) {
  switch (kind) {
    case symbols.plus:
    case symbols.minus:
    case symbols.plusMinus:
      return 6;

    default:
      return 0;
  }
}

export function getBinaryOperatorPrecedence(kind) {
  switch (kind) {
    case symbols.exponent:
    case symbols.times:
    case symbols.division:
    case symbols.fraction:
      return 5;

    case symbols.plus:
    case symbols.minus:
    case symbols.plusMinus:
      return 4;

    case symbols.equals:
    case symbols.approximatelyEqual:
    case symbols.equivalentTo:
    case symbols.congruentTo:
    case symbols.notEquals:
    case symbols.less:
    case symbols.lessEquals:
    case symbols.greater:
    case symbols.greaterEquals:
      return 3;

    default:
      return 0;
  }
}
