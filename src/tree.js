/**
 * Tree
 *
 * @constructor
 */
function Tree() {
  this.root = new Branch();
}

/**
 *
 * Expects an array of JSONs with following properties:
 *    parentId: the parent node id for this node or 0 if parent is root
 *    node: the data for the node. must have an attribute of name id on this object.
 *
 *
 * @param flattenTree
 */
Tree.prototype.loadFromArray = function (flattenTree) {
  let queue = [];
  flattenTree.forEach(n => queue.push(n));

  while (queue.length > 0) {
    let flattenedNode = queue.shift();
    if (flattenedNode.parentId > 0) {
      let parentNode = this.find(flattenedNode.parentId);
      if (parentNode) {
        parentNode.children.append(new Node(flattenedNode.node));
      } else {
        queue.push(parentNode);
      }
    } else {
      this.root.append(new Node(flattenedNode.node));
    }
  }
}

Tree.prototype.print = function () {
  console.log("Root");
  this.root.print(0);
}

Tree.prototype.find = function (id) {
  let queue = [];
  this.root.nodes.forEach(n => queue.push(n));

  while (queue.length > 0) {
    let node = queue.shift();
    if (id === node.id) {
      return node;
    } else {
      node.children.nodes.forEach(n => queue.push(n));
    }
  }
  return null;
}

Tree.prototype.append = function (node) {
  this.root.append(node);
}

Tree.prototype.insert = function (node, parentId, index) {
  let parent = this.find(parentId);
  if (index == undefined) {
    parent.children.append(node);
  } else {
    parent.children.insert(index, node);
  }
}

Tree.prototype.remove = function (id) {
  let node = this.find(id);
  return node.branch.remove(node);
}

Tree.prototype.toArray = function () {
  return this.root.toArray(0, 0);
}


/**
 * Branch is a collection of nodes
 *
 * @param nodes
 * @constructor
 */
function Branch(nodes) {
  nodes = nodes || [];
  this.nodes = [];

  const thisBranch = this;
  nodes.forEach(node => thisBranch.append(node));
}

Branch.prototype.append = function (node) {
  node.branch = this;
  this.nodes.push(node);
}

Branch.prototype.insert = function (node, index) {
  node.branch = this;
  this.nodes.splice(Math.max(0, index), 0, node);
}

Branch.prototype.remove = function (node) {
  this.nodes = this.nodes.filter(n => n.id !== node.id);
  node.branch = null;
  return node;
}

Branch.prototype.size = function () {
  return this.nodes.length;
}


Branch.prototype.toArray = function (level, parentId) {
  let result = [];
  level++;
  this.nodes.forEach(function (node) {
    let flattenedNode = {
      level: level,
      nodeId: node.data.id,
      parentId: parentId,
      node: node.data
    }
    result.push(flattenedNode);

    if (node.children.size() > 0) {
      result = result.concat(node.children.toArray(level, node.data.id));
    }
  })
  return result;
}

Branch.prototype.print = function (level) {
  level++;
  this.nodes.forEach(function (node) {

    console.log(getLevelIdentation(level) + JSON.stringify(node.data));
    if (node.children && node.children.size() > 0) {
      node.children.print(level);
    }
  })
}

function getLevelIdentation(level) {
  let result = "";
  while (level > 0) {
    result = result + "\t";
    level--;
  }
  return result;
}


/**
 * Node object
 *
 * @param data
 * @constructor
 */
function Node(data) {
  this.children = new Branch();
  this.data = data;
  this.id = data.id;
  this.branch = null;
}


Node.prototype.setIndex = function (newIndex) {
  if (this.branch == null) {
    throw new TypeError('Node does not belong to a branch');
  }

  let branch = this.branch;
  branch.remove(this);
  branch.insert(this, newIndex);
}


module.exports = {
  Tree: Tree,
  Branch: Branch,
  Node: Node
}
