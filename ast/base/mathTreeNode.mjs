import MathNode from './mathNode.mjs';

export default class MathTreeNode extends MathNode {
    constructor() {
        super();
        this.parentPlaceholder = null;
    }
}
