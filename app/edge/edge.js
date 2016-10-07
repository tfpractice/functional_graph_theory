const reducers = require('./edge_reducers');
const { addEdgeR, appendR, rmNodeR, addNeighborR, addEntryR, removeEdgeR } =
reducers;

const weighedEntry = (weight = 0) => (nabe) => [nabe, weight];

const edgeEntry = (w = 0) => (src) => (nabe) => [src, nabe, w];

const spawn = (edges = new Map) => new Map(edges);
const copy = spawn;
const fromElements = (...elements) => addNodes(spawn())(...elements);
const contains = (edges = new Map) => (node) => edges.has(node);
const nodes = (edges = new Map) => [...new Set(edges.keys())];

const adj = (edges = new Map) => (src) =>
	edges.has(src) ? edges.get(src) : new Map;

const neighbors = (edges = new Map) => (src) => nodes(adj(edges)(src));

const isAdjacent = (edges = new Map) => (src) => (nabe) =>
	contains(adj(edges)(src))(nabe);

const clearEdges = (edges) => edges.clear;

const addNodes = (edges = new Map) => (...nodes) =>
	nodes.reduce(appendR, edges);

const rmNode = (edges = new Map, src) => {
	if (adj(edges)(src).size > 0) {
		neighbors(edges)(src)
			.map(edgeEntry(0)(src))
			.reduce(removeEdgeR, edges);
	}

	return edges.delete(src) ? edges : edges;
};

const removeNodes = (edges = new Map) => (...ns) => {
	// neighbors;
	ns.forEach(n =>
		removeEdges(edges)(n)(...neighbors(edges)(n)));
	let nMap = ns.map(neighbors(edges));
	console.log(nMap);
	return ns.reduce(rmNode, edges);
};

const addNeighbor = (edges = new Map) => (src) => (n, w = 0) =>
	addNeighborR(adj(edges)(src), n, w);

const rmEdge = (edges = new Map) => (src) => (nabe) =>
	removeEdgeR(edges, [src, nabe]);

const addEdges = (edges = new Map) => (src, w = 0) => (...nabes) =>
	nabes.map(edgeEntry(w)(src)).reduce(addEdgeR, edges);

const removeEdges = (edges = new Map) => (src) => (...nabes) =>
	nabes.map(edgeEntry(0)(src)).reduce(removeEdgeR, edges);

const addEntry = (nabes = new Map) => ([n, w = 0]) => addNeighborR(nabes, n,
	w);

const mergeNeighbors = (nabes = new Map) => (alts = new Map) =>
	[...alts].reduce(addEntryR, nabes);

const mergeEdgesR = (edges = new Map, [src, alts]) =>
	edges.set(src, mergeNeighbors(adj(edges)(src))(alts));

const mergeEdges = (edges = new Map) => (alts = new Map) => {
	[...alts].reduce(mergeEdgesR, edges);
};

module.exports = {
	spawn,
	contains,
	nodes,
	adj,
	isAdjacent,
	addNodes,
	rmNode,
	removeEdges,
	removeNodes,
	neighbors,
	addNeighbor,
	addEdges,
	addEdgeR,
	addEntry,
	weighedEntry,
	mergeNeighbors,
	mergeEdges,
	fromElements,
};