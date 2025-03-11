export class Node {
    constructor(value) {
        this.value = value;
        this.children = [];
    }

    addChild(node) {
        this.children.push(node);
    }
}

export class Tree {
    constructor(rootValue) {
        this.root = new Node(rootValue);
    }

    addNode(parentNode, childValue) {
        const childNode = new Node(childValue);
        parentNode.addChild(childNode);
        return childNode;
    }
}
