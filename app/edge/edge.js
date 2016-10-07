const reducers = require('./edge_reducers');
const { addEdgeR, appendR, rmNodeR, addNeighborR, addEntryR, } = reducers;

const weighedEntry = (weight = 0) => (nabe) => [nabe, weight];

const edgeEntry = (w = 0) => (src) => (nabe) => [src, nabe, w];

const spawn = (edges = new Map) => new Map(edges);
const copy = spawn;

const contains = (edges = new Map) => (node) => edges.has(node);
const isAdjacent = (edges = new Map) => (n0) => (n1) =>
	adjNodes(edges)(n0).has(n1);

const clearEdges = ({ edges }) => edges.clear;

const nodes = (edges = new Map) => [...edges.keys()];

const addNodes = (edges = new Map) => (...nodes) =>
	nodes.reduce(appendR, edges);

const rmNode = (edges = new Map) => (src) =>
	edges.delete(src) ? edges : edges;

const removeNodes = (edges = new Map) => (...nodes) =>
	nodes.reduce(rmNodeR, edges);

const adjNodes = (edges = new Map) => (src) =>
	edges.has(src) ? edges.get(src) : new Map;

const neighbors = (edges = new Map) => (src) => [...adjNodes(egdes)(src).keys()];

const addNeighbor = (edges = new Map) => (src) => (n, w = 0) =>
	addNeighborR(adjNodes(edges)(src), n, w);

const rmEdge = (edges = new Map) => (src) => (nabe) =>
	rmNode(adjNodes(edges)(src))(nabe);
const rmEdges = (edges = new Map) => (src) => (...nabes) =>
	rmNode(adjNodes(edges)(src))(nabe);

const addEdges = (edges = new Map) => (src, w = 0) => (...nabes) =>
	nabes.map(edgeEntry(w)(src)).reduce(addEdgeR, edges);

const addEntry = (nabes = new Map) => ([n, w = 0]) => addNeighborR(nabes, n, w);

const mergeNeighbors = (nabes = new Map) => (alts = new Map) =>
	[...alts].reduce(addEntryR, nabes);

const mergeEdgesR = (edges = new Map, [src, alts]) =>
	edges.set(src, mergeNeighbors(adjNodes(edges)(src))(alts));

const mergeEdges = (edges = new Map) => (alts = new Map) => {
	[...alts].reduce(mergeEdgesR, edges);
};

module.exports = {
	spawn,
	nodes,
	addNodes,
	rmNode,
	rmEdge,
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