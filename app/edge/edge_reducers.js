const spawn = (edges = new Map) => new Map(edges);

const neighbors = (edges = new Map) => (src) => new Map(edges.get(src));

const addEdge = (edges = new Map, src) =>
	spawn(edges).set(src, neighbors(edges)(src));

const addNeighbor = (edges) => (src) => (nabes = new Map, [n, w]) =>
	neighbors(edges)(src).set(n, w);

// const spawnEdges = (edges = new Map) => new Map(edges);
// // const spawn = (edges = new Map) => new Map(edges);

// const entry = (nabe) => [nabe, 0];

// const createEdge = (edges, src) => spawnEdges(edges).set(src, spawn());
// const addNeighbor = (nabes = new Map, [n, w = 0]) => {
// 	// console.log('oldNabes', nabes);
// 	// console.log('newnabe', n, w);
// 	return spawn(nabes).set(n, w);
// };

// const addEdge = ( edges ) => (n0) => (n1, weight = 0) => {
// 	addNodes({ edges })(n0, n1);
// 	if (!hasEdge(({ edges }))(n0, n1)) {
// 		edges.get(n0).set(n1, weight);
// 		edges.get(n1).set(n0, weight);
// 	}
// };

// const hasNeighbor = (nabes = new Map, n) =>
// 	nabes.has(n);

// const removeNeighbor = (nabes = new Map, n) => {
// 	if (hasNeighbor(nabes, n)) { nabes.delete(n); }

// 	return spawn(nabes);
// };

// const setWeight = (nabes = new Map, [n, w = 0]) =>
// 	spawn(nabes).set(n, w);

module.exports = {
	spawn,
	neighbors,
	addEdge,
	addNeighbor,
	// spawnEdges,
	// createEdge,
	// entry,
	// addNeighbor,
	// hasNeighbor,
	// removeNeighbor,
	// setWeight,
};