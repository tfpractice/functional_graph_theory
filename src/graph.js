import { collections, } from 'turmeric';

const { spread, tuple, addMap, get, spreadK, flatTuple, } = collections;
const { uniteMap, mapDiff, mapUnion, diff } = collections;
const { asMap, addBinMap, removeBinTuple, removeMap, removeBin } = collections;

export const spawn = (edges = new Map) => new Map(edges);

// const fromElements = (...elements) => elements.reduce(addSrc, spawn());
//
// const nodes = (edges = new Map) => spreadK(edges);
// const adj = (edges = new Map) => (src) => edges.get(src) || new Map;
// const neighbors = (edges = new Map) => (src) => nodes(adj(edges)(src));
// const contains = (edges = new Map) => (node) => edges.has(node);
// const isAdjacent = (edges = new Map) => (src) => (nabe) =>
// 	contains(adj(edges)(src))(nabe);
//
// const addNodes = (edges = new Map) => (...srcs) => srcs.reduce(addSrc, edges);
// const removeNodes = (edges = new Map) => (...ns) => ns.reduce(rmNode, edges);
//
// const addEdges = (edges = new Map) => (src, w = 0) => (...nabes) =>
// 	nabes.map(triple(w)(src)).reduce(addEdgeR, edges);
//
// const removeEdges = (edges = new Map) => (src) => (...nabes) =>
// 	nabes.map(triple(0)(src)).reduce(rmEdge, edges);
//
// const mergeEdges = (edges = new Map) => (altEdges = new Map) => {
// 	spread(altEdges).reduce(importEdge, edges);
// };
//
// const addEntry = (nabes = new Map) => ([n, w = 0]) => addMap(nabes, [n, w]);
//
// const addNeighbor = (edges = new Map) => (src) => (n, w = 0) =>
// 	addMap(adj(edges)(src), [n, w]);
//
// const clearNeighbors = (edges = new Map) => (...srcs) =>
// 	srcs.reduce(rmAdj, edges);
//
// const clearEdges = (edges) => edges.clear;
//
// const copy = spawn;
// const mergeNeighbors = uniteMap;
// module.exports = {
// 	spawn,
// 	contains,
// 	nodes,
// 	adj,
// 	copy,
// 	isAdjacent,
// 	addNodes,
// 	removeEdges,
// 	removeNodes,
// 	neighbors,
// 	addNeighbor,
// 	addEdges,
// 	addEdgeR,
// 	addEntry,
// 	clearNeighbors,
// 	mergeNeighbors,
// 	mergeEdges,
// 	fromElements,
// };
