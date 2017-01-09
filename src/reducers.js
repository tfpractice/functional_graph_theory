import { collections as coll, } from 'turmeric-utils';

const { addBinMap, mapDiff, spread, addMap, get, flatTuple, removeMap } = coll;

export const resetNodeBin = (edges, src) => addMap(edges)(src)(new Map);

export const addNodeBin = (edges, src) =>
  addMap(edges)(src)(new Map(get(edges)(src)));

export const removeNodeBin = (edges, src) =>
    addMap(edges)(src)(new Map(get(edges)(src)));

// export const disconnectNode = edges => src =>
//      removeEdges(edges)(src)(...neighbors(edges)(src));
export const addEdgeBin = (edges, [ src, nb, wt = 0 ]) => [
  [ src, addMap(get(edges)(src))(nb)(wt) ],
  [ nb, addMap(get(edges)(nb))(src)(wt) ]].reduce(addBinMap, new Map(edges));

export const removeEdgeBin = (edges, [ src, nb, ]) => [
  [ src, removeMap(get(edges)(src))(nb) ],
  [ nb, removeMap(get(edges)(nb))(src) ]].reduce(addBinMap, new Map(edges));

export const importEdgeBin = (edges, [ src, nbs ]) =>
spread(mapDiff(nbs)(get(edges)(src))).map(flatTuple(src))
  .reduce(addEdgeBin, addNodeBin(edges, src));

export const mergeEdgesBin = (edges, alts) =>
 spread(new Map(alts)).reduce(importEdgeBin, edges);
