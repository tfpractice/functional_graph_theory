const utils = require('./utils');
const { spreadKeys, spreadValues, spreadEntries } = utils;
const { hasKey, x_hasKey, showGraph } = utils;
const Reducers = require('./reducers');
const {
	addEdgeR,
	appendR,
	rmNodeR,
	addNeighborR,
	addEntryR,
	removeEdgeR,
	removeNeighborsR,
	rmNodeXR,
	mergeEdgesR,
} =
Reducers;

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

const addNodes = (edges = new Map) => (...nodes) => nodes.reduce(appendR, edges);

const removeNodes = (edges = new Map) => (...ns) => ns.reduce(rmNodeXR, edges);

const addNeighbor = (edges = new Map) => (src) => (n, w = 0) =>
	addNeighborR(adj(edges)(src), n, w);

const addEdges = (edges = new Map) => (src, w = 0) => (...nabes) =>
	nabes.map(edgeEntry(w)(src)).reduce(addEdgeR, edges);

const removeNeighbors = (edges = new Map) => (...nodes) =>
	nodes.reduce(removeNeighborsR, edges);

const removeEdges = (edges = new Map) => (src) => (...nabes) =>
	nabes.map(edgeEntry(0)(src)).reduce(removeEdgeR, edges);

const addEntry = (nabes = new Map) => ([n, w = 0]) => addNeighborR(nabes, n,
	w);

const mergeNeighbors = (nabes = new Map) => (altNabes = new Map) =>
	[...altNabes].reduce(addEntryR, nabes);

	const mergeEdges = (edges = new Map) => (altEdges = new Map) => {
			[...altEdges].reduce(mergeEdgesR, edges);
};

module.exports = { spawn,
    contains,
    nodes,
    adj,
    copy,
    isAdjacent,
    addNodes,
    removeEdges,
    removeNodes,
    neighbors,
    addNeighbor,
    addEdges,
    addEdgeR,
    addEntry,
    weighedEntry,
    removeNeighbors,
    mergeNeighbors,
    mergeEdges,
    fromElements, };
