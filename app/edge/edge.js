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
	appendNew(edges)(src).get(src);

const addNeighbor = (edges = new Map) => (src) => (n, w = 0) =>
	addNeighborR(neighbors(edges)(src), n, w);

const addEdges = (edges = new Map) => (src, w = 0) => (...nabes) =>
	nabes.map(edgeEntry(w)(src)).reduce(addEdgeR, edges);

const addEdgeR = (edges = new Map, [src, nabe, wt = 0]) =>
	edges.set(src, neighbors(edges)(src).set(nabe, wt));

const addEntry = (nabes = new Map) => ([n, w = 0]) => addNeighborR(nabes, n, w);

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
	addEntry,
	weighedEntry,
	mergeNeighbors,
	mergeEdges,
};