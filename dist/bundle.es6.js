import { collections } from 'turmeric-utils';

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













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var addBinMap = collections.addBinMap;
var mapDiff = collections.mapDiff;
var spread = collections.spread;
var addMap = collections.addMap;
var get$$1 = collections.get;
var flatTuple = collections.flatTuple;
var removeMap = collections.removeMap;


var resetNodeBin = function resetNodeBin(edges, src) {
  return addMap(edges)(src)(new Map());
};

var addNodeBin = function addNodeBin(edges, src) {
  return addMap(edges)(src)(new Map(get$$1(edges)(src)));
};

var removeNodeBin = function removeNodeBin(edges, src) {
  return addMap(edges)(src)(new Map(get$$1(edges)(src)));
};

var addEdgeBin = function addEdgeBin(edges, _ref) {
  var _ref2 = slicedToArray(_ref, 3),
      src = _ref2[0],
      nb = _ref2[1],
      _ref2$ = _ref2[2],
      wt = _ref2$ === undefined ? 0 : _ref2$;

  return [[src, addMap(get$$1(edges)(src))(nb)(wt)], [nb, addMap(get$$1(edges)(nb))(src)(wt)]].reduce(addBinMap, new Map(edges));
};

var removeEdgeBin = function removeEdgeBin(edges, _ref3) {
  var _ref4 = slicedToArray(_ref3, 2),
      src = _ref4[0],
      nb = _ref4[1];

  return [[src, removeMap(get$$1(edges)(src))(nb)], [nb, removeMap(get$$1(edges)(nb))(src)]].reduce(addBinMap, new Map(edges));
};

var importEdgeBin = function importEdgeBin(edges, _ref5) {
  var _ref6 = slicedToArray(_ref5, 2),
      src = _ref6[0],
      nbs = _ref6[1];

  return spread(mapDiff(nbs)(get$$1(edges)(src))).map(flatTuple(src)).reduce(addEdgeBin, addNodeBin(edges, src));
};

var mergeEdgesBin = function mergeEdgesBin(edges, alts) {
  return spread(new Map(alts)).reduce(importEdgeBin, edges);
};

var triple = collections.triple;
var tuple = collections.tuple;
var get$2 = collections.get;
var spreadK = collections.spreadK;
var hasK = collections.hasK;
var addBinMap$1 = collections.addBinMap;
var removeBin = collections.removeBin;
var uniteMap = collections.uniteMap;

var spawn = function spawn(edges) {
  return new Map(edges);
};
var copy = spawn;
var fromElements = function fromElements() {
  for (var _len = arguments.length, elems = Array(_len), _key = 0; _key < _len; _key++) {
    elems[_key] = arguments[_key];
  }

  return elems.reduce(addNodeBin, copy());
};
var nodes = function nodes(edges) {
  return spreadK(copy(edges));
};
var adj = function adj(edges) {
  return function (src) {
    return copy(get$2(edges)(src));
  };
};
var neighbors = function neighbors(edges) {
  return function (src) {
    return nodes(adj(edges)(src));
  };
};
var contains = function contains(edges) {
  return function (node) {
    return hasK(edges)(node);
  };
};
var isAdjacent = function isAdjacent(edges) {
  return function (src) {
    return function (nabe) {
      return contains(adj(edges)(src))(nabe);
    };
  };
};

var kvPair = function kvPair(k) {
  return function (v) {
    return [k, v];
  };
};

var nodeNeighbors = function nodeNeighbors(edges) {
  return function (src) {
    return neighbors(edges)(src).map(kvPair(src));
  };
};
var addNodes = function addNodes(edges) {
  return function () {
    for (var _len2 = arguments.length, srcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      srcs[_key2] = arguments[_key2];
    }

    return srcs.reduce(addNodeBin, edges);
  };
};

//  srcs.map(nodeNeighbors(edges))
//    .reduce(flattenBin, [])
//    .reduce(removeEdgeBin, copy(edges));
var resetNodes = function resetNodes(edges) {
  return function () {
    for (var _len3 = arguments.length, srcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      srcs[_key3] = arguments[_key3];
    }

    return srcs.reduce(resetNodeBin, edges);
  };
};

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

var disconnectNodeBin = function disconnectNodeBin(edges, src) {
  return removeEdges(edges)(src).apply(undefined, toConsumableArray(neighbors(edges)(src)));
};

var disconnectNodes = function disconnectNodes(edges) {
  return function () {
    for (var _len6 = arguments.length, srcs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      srcs[_key6] = arguments[_key6];
    }

    return srcs.reduce(disconnectNodeBin, copy(edges));
  };
};

var removeNodes = function removeNodes(edges) {
  return function () {
    for (var _len7 = arguments.length, srcs = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      srcs[_key7] = arguments[_key7];
    }

    return srcs.reduce(removeBin, disconnectNodes(edges).apply(undefined, srcs));
  };
};

var mergeEdges = function mergeEdges(edges) {
  return function () {
    for (var _len8 = arguments.length, alts = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      alts[_key8] = arguments[_key8];
    }

    return alts.reduce(mergeEdgesBin, edges);
  };
};

var addNeighbor = function addNeighbor(edges) {
  return function (src) {
    return function (n) {
      var w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return addBinMap$1(adj(edges)(src), [n, w]);
    };
  };
};

var addEntry = function addEntry(nabes) {
  return function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        n = _ref2[0],
        _ref2$ = _ref2[1],
        w = _ref2$ === undefined ? 0 : _ref2$;

    return addBinMap$1(nabes, [n, w]);
  };
};

var mergeNeighbors = uniteMap;

var addBinSet = collections.addBinSet;
var lastK = collections.lastK;
var hasK$1 = collections.hasK;
var mapDiff$1 = collections.mapDiff;
var diff = collections.diff;
var addBinMap$2 = collections.addBinMap;
var spread$1 = collections.spread;
var spreadK$1 = collections.spreadK;
var spreadV = collections.spreadV;
var popFirst = collections.popFirst;
var tuple$1 = collections.tuple;


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

var addSrc = function addSrc() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
  return function (src) {
    return path.set(src, { pred: lastK(path), weight: 0, length: 1 });
  };
};

var initPath = function initPath(node) {
  return addSrc()(node);
};
var ptW = function ptW(_ref) {
  var _ref$weight = _ref.weight,
      weight = _ref$weight === undefined ? 0 : _ref$weight;
  return weight;
};
var ptL = function ptL(_ref2) {
  var _ref2$length = _ref2.length,
      length = _ref2$length === undefined ? 1 : _ref2$length;
  return length;
};
var lastVal = function lastVal(path) {
  return path.get(lastK(path));
};
var lastW = function lastW(path) {
  return ptW(lastVal(path));
};
var lastL = function lastL(path) {
  return ptL(lastVal(path));
};
var nextW = function nextW(path) {
  return function () {
    var w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return lastW(path) + w;
  };
};
var nextL = function nextL(path) {
  return lastL(path) ? lastL(path) + 1 : 1;
};

var nextPath = function nextPath() {
  var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
  var _ref3 = arguments[1];

  var _ref4 = slicedToArray(_ref3, 2),
      n = _ref4[0],
      _ref4$ = _ref4[1],
      w = _ref4$ === undefined ? 0 : _ref4$;

  return path.set(n, pathVal(lastK(path))(nextL(path))(nextW(path)(w)));
};

var dfs = function dfs(edges) {
  return function (src) {
    var trav = function trav() {
      var path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initPath(src);

      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [lastK(path), 0],
          _ref6 = slicedToArray(_ref5, 2),
          n = _ref6[0],
          w = _ref6[1];

      return spread$1(mapDiff$1(edges.get(n))(path)).reduce(trav, nextPath(path, [n, w]));
    };

    return trav(initPath(src));
  };
};

var bfs = function bfs(edges) {
  return function (iNode) {
    var bVisit = function bVisit(bPath) {
      return function (bQueue) {
        var pred = popFirst(bQueue);
        var nextNabes = mapDiff$1(edges.get(pred))(bPath);

        spread$1(nextNabes).reduce(nextPath, bPath);
        spreadK$1(nextNabes).reduce(addBinSet, bQueue);
        return bQueue.size > 0 ? bVisit(bPath)(bQueue) : bPath;
      };
    };

    return bVisit(initPath(iNode))(new Set([iNode]));
  };
};

var dijkstra = function dijkstra(edges) {
  return function (iNode) {
    var reachables = bfs(edges)(iNode);
    var inspectQueue = new Set([iNode]);
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

var components = function components(edges) {
  var trav = function trav() {
    var comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Set();
    var node = arguments[1];
    return diff(spreadK$1(edges.get(node)))(comp).reduce(trav, comp.add(node));
  };
  var visitMap = function visitMap() {
    var mMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
    var node = arguments[1];
    return diff(trav(new Set(), node))(mMap).map(tuple$1(trav(new Set(), node))).reduce(addBinMap$2, mMap);
  };

  return spreadK$1(edges).reduce(visitMap, new Map());
};

var componentSet = function componentSet(edges) {
  return new Set(spreadV(components(edges)));
};
var pathBetween = function pathBetween(edges) {
  return function (n0) {
    return function (n1) {
      return hasK$1(components(edges).get(n1))(n0);
    };
  };
};

var spread$2 = collections.spread;
var spreadK$2 = collections.spreadK;
var spreadV$1 = collections.spreadV;
var spreadKV = collections.spreadKV;
var last = collections.last;


var redStr = function redStr() {
  var str = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ' ';
  var val = arguments[1];
  var id = arguments[2];
  var coll = arguments[3];
  return val === last(coll) ? str.concat(val, ' ') : str.concat(val, ' , ');
};
var collString = function collString(coll) {
  return spread$2(coll).reduce(redStr, '');
};
var kString = function kString(coll) {
  return spreadK$2(coll).reduce(redStr, '');
};
var vString = function vString(coll) {
  return spreadV$1(coll).reduce(redStr, '');
};
var kvString = function kvString(coll) {
  return spreadKV(coll).reduce(redStr, '');
};

var pathString = function pathString(path) {
  return ' { ' + spreadK$2(path).join(' => ') + ' }';
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

var flatten$1 = collections.flatten;
var spread$3 = collections.spread;
var first = collections.first;
var removeBin$1 = collections.removeBin;
var addMap$1 = collections.addMap;


var flattenBin$1 = function flattenBin() {
  var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  return flatten$1(a)(b);
};

var autoSpread = function autoSpread(el) {
  return el[Symbol.iterator] ? spread$3(el).reduce(flattenBin$1, []).map(autoSpread) : el;
};

var superNode = function superNode(src) {
  return function (nb) {
    return new Set([src, nb]);
  };
};

var combineNeighbors = function combineNeighbors(g) {
  return function (src) {
    return function (nb) {
      return new Set(flatten$1(neighbors(g)(src))(neighbors(g)(nb)));
    };
  };
};

var combineAdj = function combineAdj(g) {
  return function (src) {
    return function (nb) {
      return new Map(flatten$1(adj(g)(src))(adj(g)(nb)));
    };
  };
};

var superAdj = function superAdj(g) {
  return function (src) {
    return function (nb) {
      return [src, nb].reduce(removeBin$1, combineAdj(g)(src)(nb));
    };
  };
};

var superEdge = function superEdge(g) {
  return function (src) {
    return function (nb) {
      return addMap$1()(superNode(src)(nb))(superAdj(g)(src)(nb));
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
    return nodeNeighbors(g)(src).reduce(contractBin, copy(g));
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



var operations = Object.freeze({
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

export { operations as Operations, resetNodeBin, addNodeBin, removeNodeBin, addEdgeBin, removeEdgeBin, importEdgeBin, mergeEdgesBin, spawn, copy, fromElements, nodes, adj, neighbors, contains, isAdjacent, kvPair, nodeNeighbors, addNodes, resetNodes, addEdges, removeEdges, disconnectNodeBin, disconnectNodes, removeNodes, mergeEdges, addNeighbor, addEntry, mergeNeighbors, dfs, bfs, dijkstra, components, componentSet, pathBetween, redStr, collString, kString, vString, kvString, pathString, edgeString, componentString, graphString, showGraph };export default fromElements;
//# sourceMappingURL=bundle.es6.js.map
