import { collections, } from 'turmeric';
import { addEdgeBin, addNodeBin, importEdgeBin, removeEdgeBin, resetNodeBin, }
from './reducers';

const { spread, triple, get, spreadK, hasK, } = collections;
const { addBinMap, removeBin, uniteMap, } = collections;

export const spawn = edges => new Map(edges);
export const copy = spawn;
export const fromElements = (...elems) => elems.reduce(addNodeBin, copy());
export const nodes = edges => spreadK(copy(edges));
export const adj = edges => src => copy(get(edges)(src));
export const neighbors = edges => src => nodes(adj(edges)(src));
export const contains = edges => node => hasK(edges)(node);
export const isAdjacent = edges => src => nabe =>
  contains(adj(edges)(src))(nabe);

export const addNodes = edges => (...srcs) => srcs.reduce(addNodeBin, edges);
export const removeNodes = edges => (...srcs) => srcs.reduce(removeBin, copy(edges));
export const resetNodes = edges => (...srcs) => srcs.reduce(resetNodeBin, edges);

export const addEdges = edges => (src, w = 0) => (...nabes) =>
  nabes.map(triple(w)(src)).reduce(addEdgeBin, edges);

export const removeEdges = edges => src => (...nabes) =>
  nabes.map(triple(0)(src)).reduce(removeEdgeBin, edges);

export const mergeEdgesBin = (edges, alts) =>
  spread(alts).reduce(importEdgeBin, edges);

export const mergeEdges = edges => (...alts) =>
   alts.reduce(mergeEdgesBin, edges);

export const addNeighbor = edges => src => (n, w = 0) =>
  addBinMap(adj(edges)(src), [ n, w ]);

export const addEntry = nabes => ([ n, w = 0 ]) => addBinMap(nabes, [ n, w ]);

export const mergeNeighbors = uniteMap;
