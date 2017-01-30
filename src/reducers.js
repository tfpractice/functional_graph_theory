import { addBinMap, addMap, append, asMap, flatTuple,
  get, mapDiff, removeMap, spread, spreadK, } from 'fenugreek-collections';

export const resetNodeBin = (edges, src) => addMap(edges)(src)(asMap());

export const addNodeBin = (edges, src) => addMap(edges)(src)(get(edges)(src));

export const removeNodeBin = (edges, src) => addMap(edges)(src)(get(edges)(src));

export const neighborPairs = edges => src =>
spreadK(get(edges)(src)).map(append(src));

export const addEdgeBin = (edges, [ src, nb, wt = 0 ]) => [
  [ src, addMap(get(edges)(src))(nb)(wt) ],
  [ nb, addMap(get(edges)(nb))(src)(wt) ]].reduce(addBinMap, asMap(edges));

export const removeEdgeBin = (edges, [ src, nb, ]) => [
  [ src, removeMap(get(edges)(src))(nb) ],
  [ nb, removeMap(get(edges)(nb))(src) ]].reduce(addBinMap, asMap(edges));

export const disconnectNodeBin = (edges, src) =>
  neighborPairs(edges)(src).reduce(removeEdgeBin, asMap(edges));

export const importEdgeBin = (edges, [ src, nbs ]) =>
spread(mapDiff(nbs)(get(edges)(src))).map(flatTuple(src))
  .reduce(addEdgeBin, addNodeBin(edges, src));

export const mergeEdgesBin = (edges, alts) =>
 spread(asMap(alts)).reduce(importEdgeBin, edges);
