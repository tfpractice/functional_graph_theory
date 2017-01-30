import { addBinMap, append, asMap, flatten, flattenBin, get, hasK, removeBin,
   spreadK, triple, tuple, uniteMap, } from 'fenugreek-collections';
import { addEdgeBin, addNodeBin, disconnectNodeBin2, mergeEdgesBin, neighborPairs, removeEdgeBin, resetNodeBin, }
from './reducers';

export const disconnectNodeBin = disconnectNodeBin2;
export const kvPair = append;

export const spawn = edges => asMap(edges);
export const copy = spawn;
export const fromElements = (...elems) => elems.reduce(addNodeBin, copy());
export const nodes = edges => spreadK(copy(edges));
export const adj = edges => src => asMap(get(edges)(src));
export const neighbors = edges => src => nodes(adj(edges)(src));
export const contains = edges => node => hasK(edges)(node);
export const isAdjacent = edges => src => nabe =>
  contains(adj(edges)(src))(nabe);

export const nodeNeighbors = neighborPairs;
export const addNodes = edges => (...srcs) => srcs.reduce(addNodeBin, edges);

export const resetNodes = edges => (...srcs) => srcs.reduce(resetNodeBin, edges);

export const addEdges = edges => (src, w = 0) => (...nabes) =>
  nabes.map(triple(w)(src)).reduce(addEdgeBin, edges);

export const removeEdges = edges => src => (...nabes) =>
  nabes.map(tuple(src)).reduce(removeEdgeBin, edges);

// export const disconnectNodeBin = (edges, src) =>
//       removeEdges(edges)(src)(...neighbors(edges)(src));

export const disconnectNodes = edges => (...srcs) =>
     srcs.reduce(disconnectNodeBin, copy(edges));

export const removeNodes = edges => (...srcs) =>
    srcs.reduce(removeBin, disconnectNodes(edges)(...srcs));

export const mergeEdges = edges => (...alts) => alts.reduce(mergeEdgesBin, edges);

export const addNeighbor = edges => src => (n, w = 0) =>
  addBinMap(adj(edges)(src), [ n, w ]);

export const addEntry = nabes => ([ n, w = 0 ]) => addBinMap(nabes, [ n, w ]);

export const mergeNeighbors = uniteMap;
