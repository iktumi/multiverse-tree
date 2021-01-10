# tree
A module that provides a tree structure and methods to manipulate the structure.

It also provides an easy way to convert between tree struture and array.

## Install

<img align="center" src="https://gitlab.com/cervoneluca/openbits/-/raw/master/assets/logo-black.png" height="50px" alt="OpenBits logo" title="OpenBits Logo"> This package is only served through OpenBits. 

To install OpenBits run:

```shell
npm install openbits -g
```

Then login into openbits by following these <a href="https://www.npmjs.com/package/openbits" target="_blank">instructions</a>.

When OpenBits is set up, then install tree as followings:

```shell
openbits install tree
```

## Usage

Import the package:

```Javascript
import tree from 'tree';
```

Create a new Tree:

```javascript
let worldMapTree = new tree.Tree();
```

Add some nodes to the tree:
```javascript
worldMapTree.append(new tree.Node({id: 1,name: "Europe"}));
worldMapTree.append(new tree.Node({id: 2,name: "Africa"}));
worldMapTree.append(new tree.Node({id: 3,name: "America"}));
worldMapTree.append(new tree.Node({id: 4,name: "Australia"}));
worldMapTree.append(new tree.Node({id: 5,name: "Antarctica"}));

worldMapTree.insert(new tree.Node({id: 6,name: "Portugal"}) , 1 );
worldMapTree.insert(new tree.Node({id: 7,name: "Spain"}), 1 );
worldMapTree.insert(new tree.Node({id: 8,name: "France"}), 1 );

worldMapTree.insert(new tree.Node({id: 9,name: "Egypt"}), 2 );
worldMapTree.insert(new tree.Node({id: 10,name: "South Africa"}), 2 );

worldMapTree.insert(new tree.Node({id: 11,name: "Angola"}), 2 );
worldMapTree.insert(new tree.Node({id: 12,name: "Cabinda"}), 11 );
worldMapTree.insert(new tree.Node({id: 13,name: "Benguela"}), 11 );
```

Print the tree:

```javascript
worldMapTree.print();
```

This will output: 
```text
Root
    {"id":1,"name":"Europe"}
        {"id":6,"name":"Portugal"}
        {"id":7,"name":"Spain"}
        {"id":8,"name":"France"}
    {"id":2,"name":"Africa"}
        {"id":9,"name":"Egypt"}
        {"id":11,"name":"Angola"}
            {"id":12,"name":"Cabinda"}
            {"id":13,"name":"Benguela"}
        {"id":10,"name":"South Africa"}
    {"id":3,"name":"America"}
    {"id":4,"name":"Australia"}
    {"id":5,"name":"Antarctica"}
```

You can also set a tree using an array of JSONs.

Each JSON must have a parentId and a node with attribute id and any additional data.
```javascript
let placesList = [
  {
    parentId: 0,
    node: {
      id: 1,
      name: "Europe"
    }
  },
  {
    parentId: 0,
    node: {
      id: 2,
      name: "America"
    }
  },
  {
    parentId: 0,
    node: {
      id: 3,
      name: "Africa"
    }
  },
  {
    parentId: 0,
    node: {
      id: 4,
      name: "Angola"
    }
  },
  {
    parentId: 1,
    node: {
      id: 5,
      name: "Spain"
    }
  },
  {
    parentId: 1,
    node: {
      id: 6,
      name: "Portugal"
    }
  }

]

let worldMapCopy = new tree.Tree();
worldMapCopy.loadFromArray(placesList); 
```

It is also possible to transform the tree into an array:
```javascript
worldMapTree.toArray()
```
