const appendNew = (edges = new Map) => (src, nabes = new Map(edges.get(src))) =>
	edges.set(src, nabes);

const appendR = (edges = new Map, src) => appendNew(edges)(src);
const rmNodeR = (edges = new Map, src) => edges.delete(src) ? edges : edges;
const addNeighborR = (nabes = new Map, n, w = 0) => appendNew(nabes)(n, w);
const addEntry = (nabes = new Map) => ([n, w = 0]) => appendNew(nabes)(n, w);
const addEntryR = (nabes = new Map, [n, w = 0]) => appendNew(nabes)(n, w);
const coerceNabes = (edges = new Map) => (src) =>
	appendNew(edges)(src).get(src);

const addEdgeR = (edges = new Map, [src, nabe, wt = 0]) =>
	edges
	.set(src, addNeighborR(coerceNabes(edges)(src), nabe, wt))
	.set(nabe, addNeighborR(coerceNabes(edges)(nabe), src, wt));

const removeEdgeR = (edges = new Map, [src, nabe, wt = 0]) =>
	edges
	.set(src, rmNodeR(coerceNabes(edges)(src), nabe))
	.set(nabe, rmNodeR(coerceNabes(edges)(nabe), src));

const mergeNeighborsR = (nabes = new Map, alts = new Map) =>
	[...alts].reduce(addEntryR, nabes);

const mergeEdgesR = (edges = new Map, [src, alts]) =>
	edges.set(src, mergeNeighborsR(coerceNabes(edges)(src)), (alts));

module.exports = {
	appendNew,
	appendR,
	rmNodeR,
	addNeighborR,
	addEntryR,
	coerceNabes,
	addEdgeR,
	removeEdgeR,
	mergeEdgesR,
};