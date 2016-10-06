const reducers = require('./edge_reducers');
const { appendNew, appendR, rmNodeR, addNeighborR, addEntryR, } = reducers;

const spawn = (edges = new Map) => new Map(edges);

const addNodes = (edges = new Map) => (...nodes) =>
	nodes.reduce(appendR, edges);

const rmNode = (edges = new Map) => (src) =>
	edges.delete(src) ? edges : edges;

const removeNodes = (edges = new Map) => (...nodes) =>
	nodes.reduce(rmNodeR, edges);

const neighbors = (edges = new Map) => (src) =>
	// new Map(edges.get(src));
	edges.has(src) ? edges.get(src) : new Map;
// edges.get(src);
//
// appendNew(edges)(src).get(src);
// console.log(new Map(undefined));
const addNeighbor = (edges = new Map) => (src, w = 0) => (n) =>
	// [src, n].map(weighedEntry(w)).reduce(([k,v])=>AddEntry(edges))
	[
		[src, n, w],
		[n, src, w],
	].reduce(addEdgeR, edges);
// appendNew(edges)(src).set(n, w) && appendNew(edges)(n).set(src, w)
// addNeighborR(neighbors(edges)(src), n, w);

const addEdges = (edges = new Map) => (src, w = 0) => (...nabes) =>
	nabes.map(edgeEntry(w)(src)).reduce(addEdgeR, edges);

const addEdgeR = (edges = new Map, [src, nabe, wt = 0]) =>
	edges.set(src, neighbors(edges)(src).set(nabe, wt));

const addEntry = (nabes = new Map) => ([n, w = 0]) => addNeighborR(nabes, n,
	w);

const mergeNeighbors = (nabes = new Map) => (alts = new Map) =>
	[...alts].reduce(addEntryR, nabes);

const mergeEdges = (edges = new Map) => (alts = new Map) =>
	[...alts]
	.filter(([src, nabes]) => !edges.has(src))
	.reduce((e, [k, v]) => e.set(k, v), edges);

const weighedEntry = (weight = 0) => (nabe) => [nabe, weight];
const edgeEntry = (w = 0) => (src) => (nabe) => [src, nabe, w];

module.exports = {
	spawn,
	addNodes,
	rmNode,
	removeNodes,
	neighbors,
	addNeighbor,
	addEdges,
	addEdgeR,

	addEntry,
	weighedEntry,
	mergeNeighbors,
	mergeEdges,
};