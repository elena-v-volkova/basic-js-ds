const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    this.rootNode = addInside(this.rootNode, data);

    function addInside(node, value) {
      if (!node) {
        return new Node(value);
      }

      if (node.data === value) {
        return node;
      }

      if (value < node.data) {
        node.left = addInside(node.left, value);
      } else {
        node.right = addInside(node.right, value);
      }

      return node;
    }
  }

  has(data) {
    return searchInside(this.rootNode, data);

    function searchInside(node, value) {
      if (!node) {
        return false;
      }
      if (node.data === value) {
        return true;
      }
      return value < node.data
        ? searchInside(node.left, value)
        : searchInside(node.right, value);
    }
  }

  find(data) {
    return findInside(this.rootNode, data);

    function findInside(node, value) {
      if (!node) return null;
      if (node.data === value) return node;
      return value < node.data
        ? findInside(node.left, value)
        : findInside(node.right, value);
    }
  }

  remove(data) {
    this.rootNode = removeNode(this.rootNode, data);

    function removeNode(node, value) {
      if (!node) {
        return null;
      }
      if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          return node.right;
        }
        if (!node.right) {
          return node.left;
        }
        let rightMin = node.right;
        while (rightMin.left) {
          rightMin = rightMin.left;
        }
        node.data = rightMin.data;
        node.right = removeNode(node.right, rightMin.data);

        return node;
      }
    }
  }

  min() {
    if (!this.rootNode) {
      return null;
    }
    let current = this.rootNode;
    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    if (!this.rootNode) {
      return null;
    }
    let current = this.rootNode;
    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree,
};
