import { collections, } from 'turmeric';
import { addEdgeBin, addSrc, clearNeighborsBin, importEdgeBin, rmEdgeBin, } from './reducers';
const { spread, spreadKV, tuple, triple, addMap, get, spreadK, flatTuple, hasK, } = collections;
const { uniteMap, mapDiff, mapUnion, diff } = collections;
const { asMap, addBinMap, removeBinTuple, removeMap, removeBin } = collections;

export const spawn = edges => new Map(edges);
export const copy = spawn;
export const fromElements = (...elements) => elements.reduce(addSrc, spawn());
export const nodes = edges => spreadK(asMap(edges));
export const adj = edges => src => edges.get(src) || new Map;

export const neighbors = edges => src => nodes(adj(edges)(src));

export const contains = edges => node => hasK(edges)(node);

export const isAdjacent = edges => src => nabe =>
  contains(adj(edges)(src))(nabe);

export const addNodes = edges => (...srcs) => srcs.reduce(addSrc, edges);

export const removeNodes = edges => (...nodes) =>
  nodes.reduce(removeBin, edges);

export const addEdges = edges => (src, w = 0) => (...nabes) =>
  nabes.map(triple(w)(src)).reduce(addEdgeBin, edges);

export const removeEdges = edges => src => (...nabes) =>
  nabes.map(triple(0)(src)).reduce(rmEdgeBin, edges);

export const mergeEdges = (edges = new Map) => (altEdges = new Map) => {
  const rval = spread(altEdges).reduce(importEdgeBin, edges);

  console.log('uniteMapedges(altEdges)', uniteMap(edges)(altEdges));

  // console.log('rval', new Map(rval));
  return new Map(spreadKV(altEdges).reduce(importEdgeBin, edges));
};

export const addNeighbor = edges => src => (n, w = 0) =>
  addBinMap(adj(edges)(src), [ n, w ]);
export const addEntry = nabes => ([ n, w = 0 ]) => addBinMap(nabes, [ n, w ]);

export const clearNeighbors = (edges = new Map) => (...nodes) =>
  nodes.reduce(clearNeighborsBin, edges);

//
// export const clearEdges = (edges) => edges.clear;
//
export const mergeNeighbors = uniteMap;

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
