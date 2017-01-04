(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define('functional_graphs', factory) :
  (global.functional_graphs = factory());
}(this, (function () { 'use strict';

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

var spread$1 = function spread() {
  var coll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return [].concat(toConsumableArray(coll));
};
var spreadK$1 = function spreadK() {
  var coll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return spread$1(coll.keys());
};
var spreadV = function spreadV() {
  var coll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return spread$1(coll.values());
};
var spreadE = function spreadE() {
  var coll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return spread$1(coll.entries());
};
var spreadKV = function spreadKV() {
  var coll = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return spread$1(coll.entries());
};

var tuple$1 = function tuple(val) {
  return function (key) {
    return [key, val];
  };
};
var triple = function triple(val) {
  return function (key0) {
    return function (key1) {
      return [key0, key1, val];
    };
  };
};
var flatten = function flatten() {
  var c0 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function () {
    var c1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return [].concat(toConsumableArray(c0), toConsumableArray(c1));
  };
};
var flatTuple$1 = function flatTuple() {
  var c0 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return function () {
    var c1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return [c0].concat(toConsumableArray(c1));
  };
};
var append = function append(coll) {
  return function (val) {
    return [].concat(toConsumableArray(coll), [val]);
  };
};

var has = function has(coll) {
  return function (el) {
    return new Set(coll).has(el);
  };
};
var xhas = function xhas(coll) {
  return function (el) {
    return !has(coll)(el);
  };
};

var hasK = function hasK(coll) {
  return function (k) {
    return has(spreadK$1(coll))(k);
  };
};
var xhasK = function xhasK(coll) {
  return function (k) {
    return !hasK(coll)(k);
  };
};

var hasV = function hasV(coll) {
  return function (v) {
    return has(spreadV(coll))(v);
  };
};
var xhasV = function xhasV(coll) {
  return function (v) {
    return !hasV(coll)(v);
  };
};

var hasKV = function hasKV(coll) {
  return function (_ref) {
    var _ref2 = slicedToArray(_ref, 2),
        k = _ref2[0],
        v = _ref2[1];

    return hasK(coll)(k);
  };
};
var xhasKV = function xhasKV(coll) {
  return function (_ref3) {
    var _ref4 = slicedToArray(_ref3, 2),
        k = _ref4[0],
        v = _ref4[1];

    return !hasKV(coll)([k, v]);
  };
};

var addBin = function addBin(c, el) {
  return append(c)(el);
};
var addBinSet = function addBinSet(c, el) {
  return new Set(append(c)(el));
};
var addBinMap$1 = function addBinMap(c, el) {
  return new Map(append(c)(el));
};

var removeBin$1 = function removeBin() {
  var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Set();
  var el = arguments[1];
  return c.delete(el) ? c : c;
};
var removeBinArray = function removeBinArray(c, el) {
  return spread$1(removeBin$1(new Set(c), el));
};
var removeBinTuple$1 = function removeBinTuple(c, _ref) {
  var _ref2 = slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];

  return removeBin$1(new Map(c), k);
};

var inter = function inter(c0) {
  return function (c1) {
    return spread$1(c0).filter(hasK(c1));
  };
};
var diff$1 = function diff(c0) {
  return function (c1) {
    return spread$1(c0).filter(xhasK(c1));
  };
};
var union = function union(c0) {
  return function (c1) {
    return spread$1(c0).concat(diff$1(c1)(c0));
  };
};

var mapInter = function mapInter(c0) {
  return function (c1) {
    return spread$1(c0).filter(hasKV(c1)).reduce(addBinMap$1, new Map());
  };
};

var mapDiff$1 = function mapDiff(c0) {
  return function (c1) {
    return spread$1(c0).filter(xhasKV(c1)).reduce(addBinMap$1, new Map());
  };
};

var mapUnion$1 = function mapUnion(c0) {
  return function (c1) {
    return spread$1(mapDiff$1(c1)(c0)).reduce(addBinMap$1, new Map(c0));
  };
};

var uniteMap$1 = function uniteMap(c0) {
  return function (c1) {
    return spread$1(mapDiff$1(c1)(c0)).reduce(addBinMap$1, c0);
  };
};

var addMap$1 = function addMap(c) {
  return function (k) {
    return function (v) {
      return new Map(c).set(k, v);
    };
  };
};
var addMapTuple = function addMapTuple(c) {
  return function () {
    for (var _len = arguments.length, tups = Array(_len), _key = 0; _key < _len; _key++) {
      tups[_key] = arguments[_key];
    }

    return tups.reduce(addBinMap$1, c);
  };
};
var addSet = function addSet(c) {
  return function () {
    for (var _len2 = arguments.length, els = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      els[_key2] = arguments[_key2];
    }

    return els.reduce(addBinSet, c);
  };
};

var removeSet = function removeSet(c) {
  return function () {
    for (var _len3 = arguments.length, els = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      els[_key3] = arguments[_key3];
    }

    return els.reduce(removeBin$1, new Set(c));
  };
};
var removeMap$1 = function removeMap(c) {
  return function () {
    for (var _len4 = arguments.length, els = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      els[_key4] = arguments[_key4];
    }

    return els.reduce(removeBin$1, new Map(c));
  };
};
var removeMapTuple = function removeMapTuple(c) {
  return function () {
    for (var _len5 = arguments.length, tups = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      tups[_key5] = arguments[_key5];
    }

    return tups.reduce(removeBinTuple$1, new Map(c));
  };
};

var popElem = function popElem(c) {
  return function (el) {
    return removeBin$1(c, el) && el;
  };
};
var popFirst = function popFirst(c) {
  return popElem(c)(spread$1(c).shift());
};

var asArray = function asArray(coll) {
  return spread$1(coll);
};
var asSet = function asSet(coll) {
  return new Set(spread$1(coll));
};
var asMap$1 = function asMap(coll) {
  return new Map(spreadKV(coll));
};

var get$1 = function get(c) {
  return function (k) {
    return asMap$1(c).get(k);
  };
};
var first = function first() {
  var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return spread$1(c).shift();
};
var last = function last() {
  var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return spread$1(c).pop();
};
var firstK = function firstK() {
  var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return first(spreadK$1(c));
};
var lastK = function lastK() {
  var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return last(spreadK$1(c));
};
var firstV = function firstV() {
  var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return first(spreadV(c));
};
var lastV = function lastV() {
  var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return last(spreadV(c));
};
var fromIndex = function fromIndex() {
  var c = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Set();
  return function (i) {
    return spread$1(c).slice(i, i + 1).shift();
  };
};



var index = Object.freeze({
	spread: spread$1,
	spreadK: spreadK$1,
	spreadV: spreadV,
	spreadE: spreadE,
	spreadKV: spreadKV,
	tuple: tuple$1,
	triple: triple,
	flatten: flatten,
	flatTuple: flatTuple$1,
	append: append,
	has: has,
	xhas: xhas,
	hasK: hasK,
	xhasK: xhasK,
	hasV: hasV,
	xhasV: xhasV,
	hasKV: hasKV,
	xhasKV: xhasKV,
	addBin: addBin,
	addBinSet: addBinSet,
	addBinMap: addBinMap$1,
	removeBin: removeBin$1,
	removeBinArray: removeBinArray,
	removeBinTuple: removeBinTuple$1,
	inter: inter,
	diff: diff$1,
	union: union,
	mapInter: mapInter,
	mapDiff: mapDiff$1,
	mapUnion: mapUnion$1,
	uniteMap: uniteMap$1,
	addMap: addMap$1,
	addMapTuple: addMapTuple,
	addSet: addSet,
	removeSet: removeSet,
	removeMap: removeMap$1,
	removeMapTuple: removeMapTuple,
	popElem: popElem,
	popFirst: popFirst,
	get: get$1,
	first: first,
	last: last,
	firstK: firstK,
	lastK: lastK,
	firstV: firstV,
	lastV: lastV,
	fromIndex: fromIndex,
	asArray: asArray,
	asSet: asSet,
	asMap: asMap$1
});



var turmeric$1 = Object.freeze({
	collections: index
});

var slicedToArray$1 = function () {
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

// const { collections } = turmeric;
// console.log(turmeric);
console.log(index);

// import { collections, } from 'turmeric';
var spread = index.spread;
var addMap = index.addMap;
var get$$1 = index.get;
var spreadK = index.spreadK;
var flatTuple = index.flatTuple;
var mapDiff = index.mapDiff;
var removeMap = index.removeMap;


var nabeMap = function nabeMap(edges) {
  return function (src) {
    return new Map(get$$1(edges)(src));
  };
};
var nabes = function nabes() {
  var edges = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
  return function (src) {
    return spreadK(nabeMap(edges)(src));
  };
};
var addSrc = function addSrc(edges, src) {
  return addMap(edges)(src)(nabeMap(edges)(src));
};

var addEdgeBin = function addEdgeBin() {
  var edges = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
  var _ref = arguments[1];

  var _ref2 = slicedToArray$1(_ref, 3),
      src = _ref2[0],
      nb = _ref2[1],
      _ref2$ = _ref2[2],
      wt = _ref2$ === undefined ? 0 : _ref2$;

  return edges.set(src, addMap(nabeMap(edges)(src))(nb)(wt)).set(nb, addMap(nabeMap(edges)(nb))(src)(wt));
};

var rmEdgeBin = function rmEdgeBin() {
  var edges = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
  var _ref3 = arguments[1];

  var _ref4 = slicedToArray$1(_ref3, 3),
      src = _ref4[0],
      nb = _ref4[1],
      _ref4$ = _ref4[2],
      wt = _ref4$ === undefined ? 0 : _ref4$;

  return edges.set(src, removeMap(edges.get(src))(nb)).set(nb, removeMap(edges.get(src))(src));
};

var clearNeighborsBin = function clearNeighborsBin() {
  var edges = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
  var src = arguments[1];
  return edges.set(src, new Map());
};

var importEdgeBin = function importEdgeBin() {
  var edges = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();

  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [, new Map()],
      _ref6 = slicedToArray$1(_ref5, 2),
      src = _ref6[0],
      nbs = _ref6[1];

  return spread(mapDiff(nbs)(edges.get(src))).map(flatTuple(src)).reduce(addEdgeBin, addSrc(edges, src));
};



var reducers = Object.freeze({
	nabeMap: nabeMap,
	nabes: nabes,
	addSrc: addSrc,
	addEdgeBin: addEdgeBin,
	rmEdgeBin: rmEdgeBin,
	clearNeighborsBin: clearNeighborsBin,
	importEdgeBin: importEdgeBin
});

exports.Graph = require('./graph');

// exports.Reducers = require('./reducers');
exports.Utils = require('./utils');
exports.AsyncOps = require('./async_operators');
exports.Traversals = require('./traversals');

var src$1 = Object.freeze({
	Reducers: reducers
});

// require('babel-register');
// module.exports = require('./src');

return src$1;

})));
//# sourceMappingURL=bundle.umd.js.map
