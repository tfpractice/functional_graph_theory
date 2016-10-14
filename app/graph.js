const Utils = require('./utils');
const { Queries: { hasK, x_hasK, } } = Utils;
const { Commands: { spread, spreadK, spreadV, spreadKV, } } = Utils;
const { Commands: { tuple, triple, addMap, } } = Utils;
const { Comparitors: { uniteMap, } } = Utils;
const { Strings: { showGraph } } = Utils;
const Reducers = require('./reducers');
const {
	addEdgeR,
	appendR,
	rmEdge,
	rmAdj,
	rmNode,
	importEdge,
} =
Reducers;

const spawn = (edges = new Map) => new Map(edges);

const copy = spawn;
const fromElements = (...elements) => addNodes(spawn())(...elements);

const contains = (edges = new Map) => (node) => edges.has(node);
const nodes = (edges = new Map) => [ ...new Set(spreadK(edges)) ];

const adj = (edges = new Map) => (src) => edges.get(src) || new Map;

const neighbors = (edges = new Map) => (src) => nodes(adj(edges)(src));

const isAdjacent = (edges = new Map) => (src) => (nabe) =>
	contains(adj(edges)(src))(nabe);

const clearEdges = (edges) => edges.clear;

const addNodes = (edges = new Map) => (...nodes) => nodes.reduce(appendR,
	edges);

const removeNodes = (edges = new Map) => (...ns) => ns.reduce(rmNode, edges);

const addNeighbor = (edges = new Map) => (src) => (n, w = 0) =>
	addMap(adj(edges)(src), [ n, w ]);

const addEdges = (edges = new Map) => (src, w = 0) => (...nabes) =>
	nabes.map(triple(w)(src)).reduce(addEdgeR, edges);

const removeNeighbors = (edges = new Map) => (...nodes) =>
	nodes.reduce(rmAdj, edges);

const removeEdges = (edges = new Map) => (src) => (...nabes) =>
	nabes.map(triple(0)(src)).reduce(rmEdge, edges);

const addEntry = (nabes = new Map) => ([n, w = 0]) => addMap(nabes, [ n, w ]);

const mergeNeighbors = uniteMap;

const mergeEdges = (edges = new Map) => (altEdges = new Map) => {
    spread(altEdges).reduce(importEdge, edges);
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
    removeNeighbors,
    mergeNeighbors,
    mergeEdges,
    fromElements, };
