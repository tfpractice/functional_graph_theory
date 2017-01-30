import { addBinMap, flatten, flattenBin, get, hasK, removeBin, spreadK, triple, tuple, uniteMap, } from 'fenugreek-collections';
import { addEdgeBin, addNodeBin, disconnectNodeBin2, mergeEdgesBin, removeEdgeBin, resetNodeBin, }
from './reducers';

export const disconnectNodeBin = disconnectNodeBin2;

// const { addBinMap, removeBin, uniteMap, } = collections;

// const flattenBin = (a = [], b = []) => flatten(a)(b);

export const spawn = edges => new Map(edges);
export const copy = spawn;
export const fromElements = (...elems) => elems.reduce(addNodeBin, copy());
export const nodes = edges => spreadK(copy(edges));
export const adj = edges => src => copy(get(edges)(src));
export const neighbors = edges => src => nodes(adj(edges)(src));
export const contains = edges => node => hasK(edges)(node);
export const isAdjacent = edges => src => nabe =>
  contains(adj(edges)(src))(nabe);

export const kvPair = k => v => [ k, v ];

export const nodeNeighbors = edges => src => neighbors(edges)(src).map(kvPair(src));
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
