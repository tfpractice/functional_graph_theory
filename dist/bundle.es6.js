import { collections, } from 'turmeric';

const _slicedToArray = (function () {
  function sliceIterator(arr, i) {
    const _arr = []; let _n = true; let _d = false; let _e;

    try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i.return) _i.return(); } finally { if (_d) throw _e; } } return _arr;
  } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };
}());

const addBinMap = collections.addBinMap;
const mapDiff = collections.mapDiff;
const spread = collections.spread;
const addMap = collections.addMap;
const get = collections.get;
const flatTuple = collections.flatTuple;
const removeMap = collections.removeMap;

const resetNodeBin = function resetNodeBin(edges, src) {
  return addMap(edges)(src)(new Map());
};

const addNodeBin = function addNodeBin(edges, src) {
  return addMap(edges)(src)(new Map(get(edges)(src)));
};

const addEdgeBin = function addEdgeBin(edges, _ref) {
  let _ref2 = _slicedToArray(_ref, 3),
  src = _ref2[0],
  nb = _ref2[1],
  _ref2$ = _ref2[2],
  wt = _ref2$ === undefined ? 0 : _ref2$;

  return [[ src, addMap(get(edges)(src))(nb)(wt) ], [ nb, addMap(get(edges)(nb))(src)(wt) ]].reduce(addBinMap, new Map(edges));
};

const removeEdgeBin = function removeEdgeBin(edges, _ref3) {
  let _ref4 = _slicedToArray(_ref3, 2),
  src = _ref4[0],
  nb = _ref4[1];

  return [[ src, removeMap(get(edges)(src))(nb) ], [ nb, removeMap(get(edges)(nb))(src) ]].reduce(addBinMap, new Map(edges));
};

const importEdgeBin = function importEdgeBin(edges, _ref5) {
  let _ref6 = _slicedToArray(_ref5, 2),
  src = _ref6[0],
  nbs = _ref6[1];

  return spread(mapDiff(nbs)(get(edges)(src))).map(flatTuple(src)).reduce(addEdgeBin, addNodeBin(edges, src));
};

const mergeEdgesBin = function mergeEdgesBin(edges, alts) {
  return spread(new Map(alts)).reduce(importEdgeBin, edges);
};

const reducers = Object.freeze({
  resetNodeBin,
  addNodeBin,
  addEdgeBin,
  removeEdgeBin,
  importEdgeBin,
  mergeEdgesBin
});

const _slicedToArray$1 = (function () {
  function sliceIterator(arr, i) {
    const _arr = []; let _n = true; let _d = false; let _e;

    try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i.return) _i.return(); } finally { if (_d) throw _e; } } return _arr;
  } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };
}());

const triple = collections.triple;
const tuple = collections.tuple;
const get$1 = collections.get;
const spreadK = collections.spreadK;
const hasK = collections.hasK;
const addBinMap$1 = collections.addBinMap;
const removeBin = collections.removeBin;
const uniteMap = collections.uniteMap;

const spawn = function spawn(edges) {
  return new Map(edges);
};
const copy = spawn;
const fromElements = function fromElements() {
  for (var _len = arguments.length, elems = Array(_len), _key = 0; _key < _len; _key++) {
    elems[_key] = arguments[_key];
  }

  return elems.reduce(addNodeBin, copy());
};
const nodes = function nodes(edges) {
  return spreadK(copy(edges));
};
const adj = function adj(edges) {
  return function (src) {
    return copy(get$1(edges)(src));
  };
};
const neighbors = function neighbors(edges) {
  return function (src) {
    return nodes(adj(edges)(src));
  };
};
const contains = function contains(edges) {
  return function (node) {
    return hasK(edges)(node);
  };
};
const isAdjacent = function isAdjacent(edges) {
  return function (src) {
    return function (nabe) {
      return contains(adj(edges)(src))(nabe);
    };
  };
};

const addNodes = function addNodes(edges) {
  return function () {
    for (var _len2 = arguments.length, srcs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      srcs[_key2] = arguments[_key2];
    }

    return srcs.reduce(addNodeBin, edges);
  };
};
const removeNodes = function removeNodes(edges) {
  return function () {
    for (var _len3 = arguments.length, srcs = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      srcs[_key3] = arguments[_key3];
    }

    return srcs.reduce(removeBin, copy(edges));
  };
};
const resetNodes = function resetNodes(edges) {
  return function () {
    for (var _len4 = arguments.length, srcs = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      srcs[_key4] = arguments[_key4];
    }

    return srcs.reduce(resetNodeBin, edges);
  };
};

const addEdges = function addEdges(edges) {
  return function (src) {
    const w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    return function () {
      for (var _len5 = arguments.length, nabes = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        nabes[_key5] = arguments[_key5];
      }

      return nabes.map(triple(w)(src)).reduce(addEdgeBin, edges);
    };
  };
};

const removeEdges = function removeEdges(edges) {
  return function (src) {
    return function () {
      for (var _len6 = arguments.length, nabes = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        nabes[_key6] = arguments[_key6];
      }

      return nabes.map(tuple(src)).reduce(removeEdgeBin, edges);
    };
  };
};

const mergeEdges = function mergeEdges(edges) {
  return function () {
    for (var _len7 = arguments.length, alts = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      alts[_key7] = arguments[_key7];
    }

    return alts.reduce(mergeEdgesBin, edges);
  };
};

const addNeighbor = function addNeighbor(edges) {
  return function (src) {
    return function (n) {
      const w = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      return addBinMap$1(adj(edges)(src), [ n, w ]);
    };
  };
};

const addEntry = function addEntry(nabes) {
  return function (_ref) {
    let _ref2 = _slicedToArray$1(_ref, 2),
    n = _ref2[0],
    _ref2$ = _ref2[1],
    w = _ref2$ === undefined ? 0 : _ref2$;

    return addBinMap$1(nabes, [ n, w ]);
  };
};

const mergeNeighbors = uniteMap;

const graph = Object.freeze({
  spawn,
  copy,
  fromElements,
  nodes,
  adj,
  neighbors,
  contains,
  isAdjacent,
  addNodes,
  removeNodes,
  resetNodes,
  addEdges,
  removeEdges,
  mergeEdges,
  addNeighbor,
  addEntry,
  mergeNeighbors
});

const _slicedToArray$2 = (function () {
  function sliceIterator(arr, i) {
    const _arr = []; let _n = true; let _d = false; let _e;

    try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i.return) _i.return(); } finally { if (_d) throw _e; } } return _arr;
  } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };
}());

const addBinSet = collections.addBinSet;
const lastK = collections.lastK;
const hasK$1 = collections.hasK;
const mapDiff$1 = collections.mapDiff;
const diff = collections.diff;
const addBinMap$2 = collections.addBinMap;
const spread$1 = collections.spread;
const spreadK$1 = collections.spreadK;
const spreadV = collections.spreadV;
const popFirst = collections.popFirst;
const tuple$1 = collections.tuple;

const pathVal = function pathVal() {
  const pred = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  return function () {
    const length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

    return function () {
      const weight = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      return { pred, length, weight };
    };
  };
};

const addSrc = function addSrc() {
  const path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();

  return function (src) {
    return path.set(src, { pred: lastK(path), weight: 0, length: 1 });
  };
};

const initPath = function initPath(node) {
  return addSrc()(node);
};
const ptW = function ptW(_ref) {
  let _ref$weight = _ref.weight,
  weight = _ref$weight === undefined ? 0 : _ref$weight;

  return weight;
};
const ptL = function ptL(_ref2) {
  let _ref2$length = _ref2.length,
  length = _ref2$length === undefined ? 1 : _ref2$length;

  return length;
};
const lastVal = function lastVal(path) {
  return path.get(lastK(path));
};
const lastW = function lastW(path) {
  return ptW(lastVal(path));
};
const lastL = function lastL(path) {
  return ptL(lastVal(path));
};
const nextW = function nextW(path) {
  return function () {
    const w = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    return lastW(path) + w;
  };
};
const nextL = function nextL(path) {
  return lastL(path) ? lastL(path) + 1 : 1;
};

const nextPath = function nextPath() {
  const path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
  const _ref3 = arguments[1];

  let _ref4 = _slicedToArray$2(_ref3, 2),
  n = _ref4[0],
  _ref4$ = _ref4[1],
  w = _ref4$ === undefined ? 0 : _ref4$;

  return path.set(n, pathVal(lastK(path))(nextL(path))(nextW(path)(w)));
};

const dfs = function dfs(edges) {
  return function (src) {
    const trav = function trav() {
      const path = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initPath(src);

      let _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [ lastK(path), 0 ],
      _ref6 = _slicedToArray$2(_ref5, 2),
      n = _ref6[0],
      w = _ref6[1];

      return spread$1(mapDiff$1(edges.get(n))(path)).reduce(trav, nextPath(path, [ n, w ]));
    };

    return trav(initPath(src));
  };
};

const bfs = function bfs(edges) {
  return function (iNode) {
    const bVisit = function bVisit(bPath) {
      return function (bQueue) {
        const pred = popFirst(bQueue);
        const nextNabes = mapDiff$1(edges.get(pred))(bPath);

        spread$1(nextNabes).reduce(nextPath, bPath);
        spreadK$1(nextNabes).reduce(addBinSet, bQueue);
        return bQueue.size > 0 ? bVisit(bPath)(bQueue) : bPath;
      };
    };

    return bVisit(initPath(iNode))(new Set([ iNode ]));
  };
};

const dijkstra = function dijkstra(edges) {
  return function (iNode) {
    const reachables = bfs(edges)(iNode);
    const inspectQueue = new Set([ iNode ]);
    const solutionSet = initPath(iNode);

    while (inspectQueue.size > 0) {
      const pred = popFirst(inspectQueue);
      const nextNabes = edges.get(pred);

      let _solutionSet$get = solutionSet.get(pred),
      dCount = _solutionSet$get.length,
      dWeight = _solutionSet$get.weight;

      let _iteratorNormalCompletion = true;
      let _didIteratorError = false;
      let _iteratorError;

      try {
        for (var _iterator = nextNabes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          let _step$value = _slicedToArray$2(_step.value, 2),
          nabe = _step$value[0],
          nWeight = _step$value[1];

          const prevMap = reachables.get(nabe) || { length: 1, weight: 0 };
          let rCount = prevMap.length,
          rWeight = prevMap.weight;

          const dMap = { pred, length: dCount + 1, weight: dWeight + nWeight };
          const sMap = dWeight + nWeight < rWeight ? dMap : prevMap;

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

const components = function components(edges) {
  const trav = function trav() {
    const comp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Set();
    const node = arguments[1];

    return diff(spreadK$1(edges.get(node)))(comp).reduce(trav, comp.add(node));
  };
  const visitMap = function visitMap() {
    const mMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
    const node = arguments[1];

    return diff(trav(new Set(), node))(mMap).map(tuple$1(trav(new Set(), node))).reduce(addBinMap$2, mMap);
  };

  return spreadK$1(edges).reduce(visitMap, new Map());
};

const componentSet = function componentSet(edges) {
  return new Set(spreadV(components(edges)));
};
const pathBetween = function pathBetween(edges) {
  return function (n0) {
    return function (n1) {
      return hasK$1(components(edges).get(n1))(n0);
    };
  };
};

const traversals = Object.freeze({
  dfs,
  bfs,
  dijkstra,
  components,
  componentSet,
  pathBetween
});

const src$1 = Object.freeze({
  Graph: graph,
  Reducers: reducers,
  Traversals: traversals
});

export default src$1;

// # sourceMappingURL=bundle.es6.js.map
