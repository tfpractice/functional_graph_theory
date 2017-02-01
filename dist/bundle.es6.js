import { addBinMap, addBinSet, addMap, addSet, append, asMap, asSet, diff, first, flatTuple, flatten, flattenBin, get, hasK, isIterable, last, lastK, mapDiff, popFirst, removeBin, removeMap, spread, spreadK, spreadKV, spreadV, triple, tuple, uniteMap } from 'fenugreek-collections';

// **components** `::  Map<edge> -> Map<component>`
// maps each node to a set of connected nodes
var components = function components(edges) {
   var trav = function trav() {
      var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Set();
      var node = arguments[1];
      return diff(spreadK(edges.get(node)))(comp).reduce(trav, addSet(comp)(node));
   };

   var visitMap = function visitMap() {
      var mMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
      var node = arguments[1];
      return diff(trav(new Set(), node))(mMap).map(tuple(trav(new Set(), node))).reduce(addBinMap, mMap);
   };

   return spreadK(edges).reduce(visitMap, new Map());
};

// **componentSet** `::  Map<edge> -> Set<component>`
// partitions an edgelist into sets of connected nodes
var componentSet = function componentSet(edges) {
   return new Set(spreadV(components(edges)));
};

var components$1 = Object.freeze({
	components: components,
	componentSet: componentSet
});

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

// **resetNodeBin** `:: ( Map<edge>, node ) -> Map<edge>`
// resets the nodes adjacency list to an empty map
var resetNodeBin = function resetNodeBin(edges, src) {
  return addMap(edges)(src)(asMap());
};

// **addNodeBin** `:: ( Map<edge>, node ) -> Map<edge>`
// adds a node:adjacency list pair to an edgelist
var addNodeBin = function addNodeBin(edges, src) {
  return addMap(edges)(src)(get(edges)(src));
};

// **neighborPairs** `:: ( Map<edge>, node ) -> [ [node, node] ]`
// returns an array of [node, neigbor] pairs from an edgelist
var neighborPairs = function neighborPairs(edges) {
  return function (src) {
    return spreadK(get(edges)(src)).map(append(src));
  };
};

// **addEdgeBin** `:: ( Map<edge>, [node, node, Number] ) -> Map<edge>`
// add a node:Map<{node: Number}> entry to an edgelist
var addEdgeBin = function addEdgeBin(edges, _ref) {
  var _ref2 = slicedToArray(_ref, 3),
      src = _ref2[0],
      nb = _ref2[1],
      _ref2$ = _ref2[2],
      wt = _ref2$ === undefined ? 0 : _ref2$;

  return [[src, addMap(get(edges)(src))(nb)(wt)], [nb, addMap(get(edges)(nb))(src)(wt)]].reduce(addBinMap, asMap(edges));
};

// **removeEdgeBin** `:: ( Map<edge>, [node, node] ) -> Map<edge>`
// removes a {node:Map<{node: Number}>} entry from an edgelist
var removeEdgeBin = function removeEdgeBin(edges, _ref3) {
  var _ref4 = slicedToArray(_ref3, 2),
      src = _ref4[0],
      nb = _ref4[1];

  return [[src, removeMap(get(edges)(src))(nb)], [nb, removeMap(get(edges)(nb))(src)]].reduce(addBinMap, asMap(edges));
};

// **disconnectNodeBin** `:: ( Map<edge>, node ) -> Map<edge>`
// removes all edges connected to a node
var disconnectNodeBin = function disconnectNodeBin(edges, src) {
  return neighborPairs(edges)(src).reduce(removeEdgeBin, asMap(edges));
};

// **removeNodeBin** `:: ( Map<edge>, node ) -> Map<edge>`
// isolates a node and removes it from edgelist


// **importEdgeBin** `:: ( Map<edge>, [node, [node: Number]] ) -> Map<edge>`
// appends a node and all of its neighbors to an edgelist
var importEdgeBin = function importEdgeBin(edges, _ref5) {
  var _ref6 = slicedToArray(_ref5, 2),
      src = _ref6[0],
      nbs = _ref6[1];

  return spread(mapDiff(nbs)(get(edges)(src))).map(flatTuple(src)).reduce(addEdgeBin, addNodeBin(edges, src));
};

// **mergeEdgesBin** `:: ( Map<edge>, Map<edge>, ) -> Map<edge>`
// combines two Edge maps
var mergeEdgesBin = function mergeEdgesBin(edges, alts) {
  return spread(asMap(alts)).reduce(importEdgeBin, edges);
};

// **mergeNeighbors** `::  Map<edge> ->  node  -> Map<edge>`
// resets the nodes adjacency list to an empty map
var mergeNeighbors = uniteMap;

// **spawn** `::  Map<edge> -> Map<edge>`
// returns a new Edgelist
var spawn = function spawn(edges) {
  return asMap(edges);
};

// **copy** `::  Map<edge> -> Map<edge>`
// creates a copy of a Edgelist
var copy = spawn;

// **fromElements** `::  Map<edge> -> ...node  -> Map<edge>`
// adds  {node: adjacencyList} pairs ot an Edgelist
var fromElements = function fromElements() {
  for (var _len = arguments.length, elems = Array(_len), _key = 0; _key < _len; _key++) {
    elems[_key] = arguments[_key];
  }

  return elems.reduce(addNodeBin, copy());
};

// **nodes** `::  Map<edge> ->  [node]
// returns an array of the nodes
var nodes = function nodes(edges) {
  return spreadK(copy(edges));
};

// **adj** `::  Map<edge> ->  node  -> Map<{node: Number}>`
// returns the nodes adjacency list
var adj = function adj(edges) {
  return function (src) {
    return asMap(get(edges)(src));
  };
};

// **neighbors** `::  Map<edge> ->  node  -> [node]`
// returns the nodes neighbors
var neighbors = function neighbors(edges) {
  return function (src) {
    return nodes(adj(edges)(src));
  };
};

// **contains** `::  Map<edge> ->  node  -> Boolean`
// checks for the presence of a node in an edgelist
var contains = function contains(edges) {
  return function (node) {
    return hasK(edges)(node);
  };
};

// **isAdjacent** `::  Map<edge> ->  node  -> Map<edge>`
// checks for the presence of a neighbor in a node's adjacency list
var isAdjacent = function isAdjacent(edges) {
  return function (src) {
    return function (nb) {
      return contains(adj(edges)(src))(nb);
    };
  };
};

// **addNodes** `::  Map<edge> ->  ...node  -> Map<edge>`
// adds nodes to an Edgelist
var addNodes = function addNodes(edges) {
  return function () {
    for (var _len2 = arguments.length, srcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      srcs[_key2] = arguments[_key2];
    }

    return srcs.reduce(addNodeBin, edges);
  };
};

// **resetNodes** `::  Map<edge> ->  ...node  -> Map<edge>`
// resets the adjacency lists of given nodes to an empty map
var resetNodes = function resetNodes(edges) {
  return function () {
    for (var _len3 = arguments.length, src = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      src[_key3] = arguments[_key3];
    }

    return src.reduce(resetNodeBin, edges);
  };
};

// **addEdges** `::  Map<edge> ->  (node, Number) -> ...node  -> Map<edge>`
// creates edges between a node and multiple other nodes
var addEdges = function addEdges(edges) {
  return function (src) {
    var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return function () {
      for (var _len4 = arguments.length, nabes = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        nabes[_key4] = arguments[_key4];
      }

      return nabes.map(triple(w)(src)).reduce(addEdgeBin, edges);
    };
  };
};

// **removeEdges** `::  Map<edge> ->  node -> ...node  -> Map<edge>`
// removes edges between a node and select other nodes
var removeEdges = function removeEdges(edges) {
  return function (src) {
    return function () {
      for (var _len5 = arguments.length, nabes = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        nabes[_key5] = arguments[_key5];
      }

      return nabes.map(tuple(src)).reduce(removeEdgeBin, edges);
    };
  };
};

// **disconnectNodes** `:: Map<edge> ->  ...node  -> Map<edge>`
// resets the nodes adjacency list to an empty map
var disconnectNodes = function disconnectNodes(edges) {
  return function () {
    for (var _len6 = arguments.length, srcs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      srcs[_key6] = arguments[_key6];
    }

    return srcs.reduce(disconnectNodeBin, copy(edges));
  };
};

// **removeNodes** `::  Map<edge> ->  ...node  -> Map<edge>`
// resets the nodes adjacency list to an empty map
var removeNodes = function removeNodes(edges) {
  return function () {
    for (var _len7 = arguments.length, srcs = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      srcs[_key7] = arguments[_key7];
    }

    return srcs.reduce(removeBin, disconnectNodes(edges).apply(undefined, srcs));
  };
};

// **mergeEdges** `::  Map<edge> -> ...{node:adjacency} -> Map<edge>`
// resets the nodes adjacency list to an empty map
var mergeEdges = function mergeEdges(edges) {
  return function () {
    for (var _len8 = arguments.length, alt = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      alt[_key8] = arguments[_key8];
    }

    return alt.reduce(mergeEdgesBin, edges);
  };
};

// **addNeighbor** `::  Map<edge> -> ...{node:adjacency} -> Map<edge>`
// resets the nodes adjacency list to an empty map
var addNeighbor = function addNeighbor(edges) {
  return function (src) {
    return function (n) {
      var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return addBinMap(adj(edges)(src), [n, w]);
    };
  };
};

// **addEntry** `::  Map<{node:Number}> ->  [node, Number]  -> Map<edge>`
// resets the nodes adjacency list to an empty map
var addEntry = function addEntry(nabes) {
  return function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        n = _ref2[0],
        _ref2$ = _ref2[1],
        w = _ref2$ === undefined ? 0 : _ref2$;

    return addBinMap(nabes, [n, w]);
  };
};



var graph = Object.freeze({
	mergeNeighbors: mergeNeighbors,
	spawn: spawn,
	copy: copy,
	fromElements: fromElements,
	nodes: nodes,
	adj: adj,
	neighbors: neighbors,
	contains: contains,
	isAdjacent: isAdjacent,
	addNodes: addNodes,
	resetNodes: resetNodes,
	addEdges: addEdges,
	removeEdges: removeEdges,
	disconnectNodes: disconnectNodes,
	removeNodes: removeNodes,
	mergeEdges: mergeEdges,
	addNeighbor: addNeighbor,
	addEntry: addEntry
});

var autoSpread = function autoSpread(el) {
  return isIterable(el) ? spread(el).reduce(flattenBin, []).map(autoSpread) : el;
};

var superNode = function superNode(src) {
  return function (nb) {
    return asSet([src, nb]);
  };
};

var combineNeighbors = function combineNeighbors(g) {
  return function (src) {
    return function (nb) {
      return asSet(flatten(neighbors(g)(src))(neighbors(g)(nb)));
    };
  };
};

var combineAdj = function combineAdj(g) {
  return function (src) {
    return function (nb) {
      return asMap(flatten(adj(g)(src))(adj(g)(nb)));
    };
  };
};

var superAdj = function superAdj(g) {
  return function (src) {
    return function (nb) {
      return [src, nb].reduce(removeBin, combineAdj(g)(src)(nb));
    };
  };
};

var superEdge = function superEdge(g) {
  return function (src) {
    return function (nb) {
      return addMap()(superNode(src)(nb))(superAdj(g)(src)(nb));
    };
  };
};

var contract = function contract(g) {
  return function (src) {
    return function () {
      var nb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : first(neighbors(g)(src));
      return nb ? mergeEdges(removeNodes(g)(src, nb))(superEdge(g)(src)(nb)) : g;
    };
  };
};

var contractBin = function contractBin(g, _ref) {
  var _ref2 = slicedToArray(_ref, 2),
      src = _ref2[0],
      nb = _ref2[1];

  return contract(g)(src)(nb);
};

var contractSrc = function contractSrc(g) {
  return function (src) {
    return neighborPairs(g)(src).reduce(contractBin, copy(g));
  };
};

var contractNext = function contractNext(g) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : first(nodes(g));
  return contract(copy(g))(n)();
};

var contractAuto = function contractAuto(g) {
  return nodes(g).reduce(contractNext, g);
};
var contractMin = function contractMin(g) {
  var min = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  return g.size > min ? contractMin(contractNext(g), min) : copy(g);
};



var contract$1 = Object.freeze({
	autoSpread: autoSpread,
	superNode: superNode,
	combineNeighbors: combineNeighbors,
	combineAdj: combineAdj,
	superAdj: superAdj,
	superEdge: superEdge,
	contract: contract,
	contractBin: contractBin,
	contractSrc: contractSrc,
	contractNext: contractNext,
	contractAuto: contractAuto,
	contractMin: contractMin
});

// **pathEntry** `:: ( node, Number, Number ) -> {pred, length, weight}`
// returns an object with pred, weight, and length properties
var pathEntry = function pathEntry() {
  var pred = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return { pred: pred, length: length, weight: weight };
};
var pathVal = function pathVal() {
  var pred = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return function () {
    var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    return function () {
      var weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return { pred: pred, length: length, weight: weight };
    };
  };
};

// **addSrc** `:: Map<pathEntry> -> node ->  Map<pathEntry>`
// adds a {node:{pred, weight, length}} entry to a  path
var appendPath = function appendPath(path) {
  return function (src) {
    return addMap(path)(src)(pathEntry(lastK(path), 1, 0));
  };
};

// **initPath** `:: node -> Map<pathEntry>`
// initializes a new path given a source node
var initPath = function initPath(node) {
  return appendPath()(node);
};

// **getWeight** `:: {weight:Number} -> Number`
// returns an object with pred, weight, and length properties
var getWeight = function getWeight(_ref) {
  var _ref$weight = _ref.weight,
      weight = _ref$weight === undefined ? 0 : _ref$weight;
  return weight;
};

// **getLength** `:: {length:Number} -> Number`
// returns an object with pred, weight, and length properties
var getLength = function getLength(_ref2) {
  var _ref2$length = _ref2.length,
      length = _ref2$length === undefined ? 1 : _ref2$length;
  return length;
};

// **lastVal** `:: Map<pathEntry> -> {pred, length, weight}`
// returns the last entry in the path
var lastVal = function lastVal(path) {
  return path.get(lastK(path));
};

// **lastWeight** `:: Map<pathEntry> -> Number`
// returns the last weight in the path
var lastWeight = function lastWeight(path) {
  return getWeight(lastVal(path));
};

// **lastLength** `:: Map<pathEntry> -> Number`
// returns the last length in the path
var lastLength = function lastLength(path) {
  return getLength(lastVal(path));
};

// **nextWeight** `:: Map<pathEntry> -> Number -> Number`
// returns an object with pred, weight, and length properties
var nextWeight = function nextWeight(path) {
  return function () {
    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return lastWeight(path) + w;
  };
};

// **nextLength** `:: Map<pathEntry> -> Number -> Number`
// returns an object with pred, weight, and length properties
var nextLength = function nextLength(path) {
  return lastLength(path) ? lastLength(path) + 1 : 1;
};

// **nextPath** `:: (Map<pathEntry>, [node, Number]) -> Map<pathEntry> `
// returns an object with pred, weight, and length properties
var nextPath = function nextPath() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
  var _ref3 = arguments[1];

  var _ref4 = slicedToArray(_ref3, 2),
      n = _ref4[0],
      _ref4$ = _ref4[1],
      w = _ref4$ === undefined ? 0 : _ref4$;

  return path.set(n, pathVal(lastK(path))(nextLength(path))(nextWeight(path)(w)));
};



var path = Object.freeze({
	pathEntry: pathEntry,
	appendPath: appendPath,
	initPath: initPath,
	getWeight: getWeight,
	getLength: getLength,
	lastVal: lastVal,
	lastWeight: lastWeight,
	lastLength: lastLength,
	nextWeight: nextWeight,
	nextLength: nextLength,
	nextPath: nextPath
});

// **dfs** `:: Map<edge> -> node -> Map<pathEntry>`
// depth first traversal
var dfs = function dfs(edges) {
  return function (src) {
    // >**dfs.trav** `:: Map<pathEntry> -> [node, w] -> Map<pathEntry>`
    // >depth first traversal
    var trav = function trav() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initPath(src);

      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [lastK(path), 0],
          _ref2 = slicedToArray(_ref, 2),
          n = _ref2[0],
          w = _ref2[1];

      return spread(mapDiff(edges.get(n))(path)).reduce(trav, nextPath(path, [n, w]));
    };

    return trav(initPath(src));
  };
};

// **bfs** `:: Map<edge> -> node -> Map<pathEntry>`
// breadth first traversal
var bfs = function bfs(edges) {
  return function (iNode) {
    var bVisit = function bVisit(bPath) {
      return function (bQueue) {
        var pred = popFirst(bQueue);
        var nextNabes = mapDiff(edges.get(pred))(bPath);

        spread(nextNabes).reduce(nextPath, bPath);
        spreadK(nextNabes).reduce(addBinSet, bQueue);
        return bQueue.size > 0 ? bVisit(bPath)(bQueue) : bPath;
      };
    };

    return bVisit(initPath(iNode))(asSet([iNode]));
  };
};

// **dijkstra** `:: Map<edge> -> node -> Map<pathEntry>`
// finds shortest paths from a source node to all node reachable from that node
var dijkstra = function dijkstra(edges) {
  return function (iNode) {
    var reachables = bfs(edges)(iNode);
    var inspectQueue = asSet([iNode]);
    var solutionSet = initPath(iNode);

    while (inspectQueue.size > 0) {
      var pred = popFirst(inspectQueue);
      var nextNabes = edges.get(pred);

      var _solutionSet$get = solutionSet.get(pred),
          dCount = _solutionSet$get.length,
          dWeight = _solutionSet$get.weight;

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {

        for (var _iterator = nextNabes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = slicedToArray(_step.value, 2),
              nabe = _step$value[0],
              nWeight = _step$value[1];

          var prevMap = reachables.get(nabe) || { length: 1, weight: 0 };
          var rCount = prevMap.length,
              rWeight = prevMap.weight;

          var dMap = { pred: pred, length: dCount + 1, weight: dWeight + nWeight };
          var sMap = dWeight + nWeight < rWeight ? dMap : prevMap;

          if (!solutionSet.has(nabe)) {
            inspectQueue.add(nabe);
            solutionSet.set(nabe, sMap);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
    return solutionSet;
  };
};

// **pathBetween** `:: Map<edge> -> node -> node -> Boolean`
// checks for a path between two nodes
var pathBetween = function pathBetween(e) {
  return function (n0) {
    return function (n1) {
      return hasK(get(components(e))(n0))(n1);
    };
  };
};



var search = Object.freeze({
	dfs: dfs,
	bfs: bfs,
	dijkstra: dijkstra,
	pathBetween: pathBetween
});

var redStr = function redStr() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
  var val = arguments[1];
  var id = arguments[2];
  var coll = arguments[3];
  return val === last(coll) ? str.concat(val, ' ') : str.concat(val, ' , ');
};
var collString = function collString(coll) {
  return spread(coll).reduce(redStr, '');
};
var kString = function kString(coll) {
  return spreadK(coll).reduce(redStr, '');
};
var vString = function vString(coll) {
  return spreadV(coll).reduce(redStr, '');
};
var kvString = function kvString(coll) {
  return spreadKV(coll).reduce(redStr, '');
};

var pathString = function pathString(path) {
  return ' { ' + spreadK(path).join(' => ') + ' }';
};
var edgeString = function edgeString(_ref) {
  var _ref2 = slicedToArray(_ref, 2),
      src = _ref2[0],
      nbs = _ref2[1];

  return '{ Edge ' + src + ' >> [ ' + kString(nbs) + ' ] } ';
};

var componentString = function componentString(_ref3) {
  var _ref4 = slicedToArray(_ref3, 2),
      node = _ref4[0],
      nbs = _ref4[1];

  return '{ component ' + node + ' >> [ ' + kString(nbs) + ' ] } ';
};

var graphString = function graphString(edges) {
  return spreadKV(edges).reduce(function (str, _ref5, id) {
    var _ref6 = slicedToArray(_ref5, 2),
        node = _ref6[0],
        nabes = _ref6[1];

    return str + edgeString([node, nabes]);
  }, 'Showing Edges\n');
};

var showGraph = function showGraph(_ref7) {
  var edges = _ref7.edges;
  return graphString(edges);
};



var show = Object.freeze({
	redStr: redStr,
	collString: collString,
	kString: kString,
	vString: vString,
	kvString: kvString,
	pathString: pathString,
	edgeString: edgeString,
	componentString: componentString,
	graphString: graphString,
	showGraph: showGraph
});

export { components$1 as Components, contract$1 as Contract, graph as Graph, path as Path, search as Search, show as Show };
//# sourceMappingURL=bundle.es6.js.map
