import { collections, } from 'turmeric';

const { spread, addMap, get, flatTuple, mapDiff, removeMap } = collections;

export const nabeMap = edges => src => new Map(get(edges)(src));
export const addSrc = (edges, src) => addMap(edges)(src)(nabeMap(edges)(src));

export const addEdgeBin = (edges = new Map, [ src, nb, wt = 0 ]) => edges
  .set(src, addMap(nabeMap(edges)(src))(nb)(wt))
  .set(nb, addMap(nabeMap(edges)(nb))(src)(wt));

export const rmEdgeBin = (edges = new Map, [ src, nb, ]) => edges
  .set(src, removeMap(edges.get(src))(nb))
  .set(nb, removeMap(edges.get(src))(src));

export const clearNeighborsBin = (edges = new Map, src) => edges.set(src, new Map);

export const importEdgeBin = (edges = new Map, [ src, nbs ] = [{}, new Map ]) =>
   spread(mapDiff(nbs)(edges.get(src))).map(flatTuple(src))
     .reduce(addEdgeBin, addSrc(edges, src));
