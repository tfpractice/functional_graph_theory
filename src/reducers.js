import { collections, } from 'turmeric';

const { spread, addMap, get, flatTuple, mapDiff, removeMap } = collections;

export const nabeMap = edges => src => new Map(get(edges)(src));
export const addSrc = (edges, src) => addMap(edges)(src)(nabeMap(edges)(src));

export const addEdgeBin = (edges, [ src, nb, wt = 0 ]) => new Map(edges)
  .set(src, addMap(get(edges)(src))(nb)(wt))
  .set(nb, addMap(get(edges)(nb))(src)(wt));

export const rmEdgeBin = (edges, [ src, nb, ]) => new Map(edges)
  .set(src, removeMap(get(edges)(src))(nb))
  .set(nb, removeMap(get(edges)(src))(src));

export const clearNeighborsBin = (edges, src) => addMap(edges)(src)(new Map);

export const importEdgeBin = (edges, [ src, nbs ]) =>
   spread(mapDiff(nbs)(get(edges)(src))).map(flatTuple(src))
     .reduce(addEdgeBin, addSrc(edges, src));
