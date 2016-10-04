const reducers = require('./edge_reducers');

// const spawn = (nabes = new Map) =>
// 	new Map(nabes);

// const entry = (nabe) => [nabe, 0];
// // const addEntry = (nabes = new Map, n) => {
// // return addNeighbor(nabes, [n, 0]);
// // };
// const getEntry = (nabes = new Map);
// const addNeighbor = (nabes = new Map, [n, w = 0]) => {
// 	// console.log('oldNabes', nabes);
// 	// console.log('newnabe', n, w);
// 	return spawn(nabes).set(n, w);
// };

// const hasNeighbor = (nabes = new Map, n) =>
// 	nabes.has(n);

// const removeNeighbor = (nabes = new Map, n) => {
// 	if (hasNeighbor(nabes, n)) { nabes.delete(n); }

// 	return spawn(nabes);
// };

// const setWeight = (nabes = new Map, [n, w = 0]) =>
// 	spawn(nabes).set(n, w);

// reduce(setWeight(n, w)) => sW(n, w)(prev)
// reduce((prev, next) => setWeight(prev, next, weight), nabes);

// const initEdge = (edges) => (src) => edges.set(src, new Map);
// const initR = (edges = new Map, next) => edges.set(next, new Map);

// const makeEdges = (...elements) =>
//     spreadValues(new Set(elements))
//     .reduce((eMap, next) => initEdge(eMap)(next), new Map);
//
//
//
module.exports = Object.assign({}, reducers);