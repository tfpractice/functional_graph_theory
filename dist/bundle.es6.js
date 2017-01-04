import { collections } from 'turmeric';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var spread = collections.spread;
var addMap = collections.addMap;
var get = collections.get;
var spreadK = collections.spreadK;
var flatTuple = collections.flatTuple;
var mapDiff = collections.mapDiff;
var removeMap = collections.removeMap;


var set = function set(m) {
  return function (k) {
    return function (v) {
      return new Map(m).set(k, v);
    };
  };
};

var nabeMap = function nabeMap(edges) {
  return function (src) {
    return new Map(get(edges)(src));
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

  var _ref2 = _slicedToArray(_ref, 3),
      src = _ref2[0],
      nb = _ref2[1],
      _ref2$ = _ref2[2],
      wt = _ref2$ === undefined ? 0 : _ref2$;

  return edges.set(src, addMap(nabeMap(edges)(src))(nb)(wt)).set(nb, addMap(nabeMap(edges)(nb))(src)(wt));
};

var rmEdgeBin = function rmEdgeBin() {
  var edges = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
  var _ref3 = arguments[1];

  var _ref4 = _slicedToArray(_ref3, 3),
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
      _ref6 = _slicedToArray(_ref5, 2),
      src = _ref6[0],
      nbs = _ref6[1];

  return spread(mapDiff(nbs)(edges.get(src))).map(flatTuple(src)).reduce(addEdgeBin, addSrc(edges, src));
};

var reducers = Object.freeze({
	set: set,
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

export default src$1;
//# sourceMappingURL=bundle.es6.js.map
