import { collections, } from 'turmeric';

const { spread, addMap, get, flatTuple, mapDiff, removeMap } = collections;

export const nabeMap = edges => src => new Map(get(edges)(src));
export const addSrc = (edges, src) => addMap(edges)(src)(nabeMap(edges)(src));

export const addEdgeBin = (edges = new Map, [ src, nb, wt = 0 ]) =>

  // console.log('nabeMap(edges)(src)', nabeMap(edges)(src));
  // console.log('addMap(nabeMap(edges)(src))(nb)(wt)', addMap(nabeMap(edges)(src))(nb)(wt));
  // console.log('edges.get(src)', edges.get(src));
   new Map(edges)
     .set(src, addMap(get(edges)(src))(nb)(wt))
     .set(nb, addMap(get(edges)(nb))(src)(wt))

  // const rVal2 = (edges)
  //     .set(src, addMap(nabeMap(edges)(src))(nb)(wt))
  //     .set(nb, addMap(nabeMap(edges)(nb))(src)(wt));

    // addMap(edges)(src)(addMap(nabeMap(edges)(src))(nb)(wt))
  //
  // console.log('rVal', rVal);
  // console.log('rVal2', rVal2);
  // console.log('mapDiff(rVal(rVal2))', mapDiff(rVal)(rVal2));
  // return rVal;
;

export const rmEdgeBin = (edges, [ src, nb, ]) => new Map(edges)
  .set(src, removeMap(get(edges)(src))(nb))
  .set(nb, removeMap(get(edges)(src))(src));

export const clearNeighborsBin = (edges, src) => addMap(edges)(src)(new Map);

export const importEdgeBin = (edges, [ src, nbs ]) =>
   spread(mapDiff(nbs)(get(edges)(src))).map(flatTuple(src))
     .reduce(addEdgeBin, addSrc(edges, src));
