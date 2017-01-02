import { collections, } from 'turmeric';
const { default: spread, spreadK } = collections.spread;
const { group: { tuple, triple, flatTuple }} = collections;
const { manipulate: { addMap }, } = collections;
const { accessors: { get }, } = collections;

// const { accessors: { get }, } = collections;

const Utils = require('./utils');
const { Commands: { rmColl, }} = Utils;
const { Comparitors: { uniteMap, mapDiff, mapUnion, diff }} = Utils;

// const get = m => k => new Map(m).get(k);
const set = m => k => v => new Map(m).set(k, v);

const nMap = edges => src => new Map(get(edges)(src));
const nabes = (edges = new Map) => src => spreadK(nMap(edges)(src));

const addSrc = (edges, src) => addMap(edges)(src)(nMap(edges)(src));

const addEdgeR = (edges = new Map, [ src, nb, wt = 0 ]) =>
  edges
    .set(src, addMap(edges.get(src), [ nb, wt ]))
    .set(nb, addMap(edges.get(nb), [ src, wt ]));

const rmEdge = (edges = new Map, [ src, nb, wt = 0 ]) => edges
  .set(src, rmColl(edges.get(src), nb))
  .set(nb, rmColl(edges.get(src), src));

const rmAdj = (edges = new Map, src) =>
  nabes(edges)(src).map(triple(0)(src)).reduce(rmEdge, edges);

const rmNode = (edges = new Map, src) => rmColl(rmAdj(edges, src), src);

const importEdge = (edges = new Map, [ src, nbs ] = [ , new Map ]) =>
  spread(mapDiff(nbs)(edges.get(src)))
    .map(flatTuple(src))
    .reduce(addEdgeR, addSrc(edges, src));

module.exports = {
  addSrc,
  addEdgeR,
  rmEdge,
  importEdge,
  rmNode,
  rmAdj,
};
