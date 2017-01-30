import { addBinMap, addMap, append, asMap, flatTuple,
  get, mapDiff, removeMap, spread, spreadK, } from 'fenugreek-collections';

// **resetNodeBin** `:: ( Map<edge>, node ) -> Map<edge>`
// resets the nodes adjacency list to an empty map
export const resetNodeBin = (edges, src) => addMap(edges)(src)(asMap());

// **addNodeBin** `:: ( Map<edge>, node ) -> Map<edge>`
// adds a node:adjacency list pair to an edgelist
export const addNodeBin = (edges, src) => addMap(edges)(src)(get(edges)(src));

// **neighborPairs** `:: ( Map<edge>, node ) -> Map<edge>`
// returns an Iterable<a> of the collections default iterator
export const neighborPairs = edges => src =>
spreadK(get(edges)(src)).map(append(src));

// **addEdgeBin** `:: ( Map<edge>, node ) -> Map<edge>`
// returns an Iterable<a> of the collections default iterator
export const addEdgeBin = (edges, [ src, nb, wt = 0 ]) => [
  [ src, addMap(get(edges)(src))(nb)(wt) ],
  [ nb, addMap(get(edges)(nb))(src)(wt) ],].reduce(addBinMap, asMap(edges));

// **removeEdgeBin** `:: ( Map<edge>, node ) -> Map<edge>`
  // returns an Iterable<a> of the collections default iterator
export const removeEdgeBin = (edges, [ src, nb, ]) => [
  [ src, removeMap(get(edges)(src))(nb) ],
  [ nb, removeMap(get(edges)(nb))(src) ],].reduce(addBinMap, asMap(edges));

// **disconnectNodeBin** `:: ( Map<edge>, node ) -> Map<edge>`
  // returns an Iterable<a> of the collections default iterator
export const disconnectNodeBin = (edges, src) =>
  neighborPairs(edges)(src).reduce(removeEdgeBin, asMap(edges));

// **removeNodeBin** `:: ( Map<edge>, node ) -> Map<edge>`
// removes a node:adjacency list pair from an edgelist
export const removeNodeBin = (edges, src) =>
removeMap(disconnectNodeBin(edges, src))(src);

// **importEdgeBin** `:: ( Map<edge>, node ) -> Map<edge>`
  // returns an Iterable<a> of the collections default iterator
export const importEdgeBin = (edges, [ src, nbs ]) =>
spread(mapDiff(nbs)(get(edges)(src))).map(flatTuple(src))
  .reduce(addEdgeBin, addNodeBin(edges, src));

// **mergeEdgesBin** `:: ( Map<edge>, node ) -> Map<edge>`
  // returns an Iterable<a> of the collections default iterator
export const mergeEdgesBin = (edges, alts) =>
 spread(asMap(alts)).reduce(importEdgeBin, edges);
