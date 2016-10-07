const appendNew = (edges = new Map) => (src, nabes = edges.get(src)) =>
	edges.set(src, new Map(nabes));

const appendR = (edges = new Map, src) => appendNew(edges)(src);
const rmNodeR = (edges = new Map, src) => edges.delete(src) ? edges : edges;

const coerceNabes = (edges = new Map) => (src) =>
	appendNew(edges)(src).get(src);

const addEdgeR = (edges = new Map, [src, nabe, wt = 0]) =>
	edges
	.set(src, coerceNabes(edges)(src).set(nabe, wt))
	.set(nabe, coerceNabes(edges)(nabe).set(src, wt));

const removeEdgeR = (edges = new Map, [src, nabe, wt = 0]) =>
	edges
	.set(src, rmNodeR(coerceNabes(edges)(src), nabe))
	.set(nabe, rmNodeR(coerceNabes(edges)(nabe), src));

const addNeighborR = (nabes = new Map, n, w = 0) => nabes.set(n, w);

const addEntryR = (nabes = new Map, [n, w = 0]) => addNeighborR(nabes, n, w);

const mergeNeighborsR = (nabes = new Map, alts = new Map) =>
	mergeNeighbors(nabes)(alts);

module.exports = { appendNew,
    appendR,
    rmNodeR,
    addNeighborR,
    addEntryR,
    coerceNabes,
    addEdgeR,
    removeEdgeR, };
