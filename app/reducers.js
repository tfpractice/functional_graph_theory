const weighedEntry = (weight = 0) => (nabe) => [nabe, weight];
const edgeEntry = (w = 0) => (src) => (nabe) => [src, nabe, w];

const appendNew = (edges = new Map) => (src, nabes = new Map(edges.get(src))) =>
	edges.set(src, nabes);

const appendR = (edges = new Map, src) => appendNew(edges)(src);
const rmNodeR = (edges = new Map, src) => edges.delete(src) ? edges : edges;
const addNeighborR = (nabes = new Map, n, w = 0) => appendNew(nabes)(n, w);
const addEntry = (nabes = new Map) => ([n, w = 0]) => appendNew(nabes)(n, w);
const addEntryR = (nabes = new Map, [n, w = 0]) => appendNew(nabes)(n, w);
const coerceAdj = (edges = new Map) => (src) => appendNew(edges)(src).get(src);
const neighborsR = (edges = new Map) => (src) => [...coerceAdj(edges)(src).keys()];

const addEdgeR = (edges = new Map, [src, nabe, wt = 0]) =>
	edges
	.set(src, addNeighborR(coerceAdj(edges)(src), nabe, wt))
	.set(nabe, addNeighborR(coerceAdj(edges)(nabe), src, wt));

const removeEdgeR = (edges = new Map, [src, nabe, wt = 0]) =>
	edges
	.set(src, rmNodeR(coerceAdj(edges)(src), nabe))
	.set(nabe, rmNodeR(coerceAdj(edges)(nabe), src));

const removeNeighborsR = (edges = new Map, src) =>
	neighborsR(edges)(src).map(edgeEntry(0)(src)).reduce(removeEdgeR, edges);

const rmNodeXR = (edges = new Map, src) =>
	rmNodeR(removeNeighborsR(edges, src), src);

const mergeNeighborsR = (nabes = new Map, alts = new Map) =>
	[...alts].reduce(addEntryR, nabes);

const mergeEdgesR = (edges = new Map, [src, alts]) =>
	edges.set(src, mergeNeighborsR(coerceAdj(edges)(src)), (alts));

module.exports = {
	appendNew,
	appendR,
	rmNodeR,
	addNeighborR,
	addEntryR,
	coerceAdj,
	addEdgeR,
	removeEdgeR,
	mergeEdgesR,
	rmNodeXR,
	removeNeighborsR,
};