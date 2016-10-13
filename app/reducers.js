const Utils = require('./utils');
const { Commands: { tuple, triple, rmColl, addMap, } } = Utils;
const { Commands: { spread, spreadK, } } = Utils;

const appendNew = (edges = new Map) => (src, nbs = new Map(edges.get(src))) =>
	edges.set(src, nbs);

const appendR = (edges = new Map, src) => appendNew(edges)(src);

const addNeighborR = (nbs = new Map, n, w = 0) => addMap(nbs, [n, w]);
const addEntry = (nbs = new Map) => ([n, w = 0]) => addMap(nbs, [n, w]);
const coerceAdj = (edges = new Map) => (src) => appendNew(edges)(src).get(src);
const nabes = (edges = new Map) => (src) => spreadK(coerceAdj(edges)(src));

const addEdgeR = (edges = new Map, [src, nb, wt = 0]) =>
	edges
	.set(src, addMap(coerceAdj(edges)(src), [nb, wt]))
	.set(nb, addMap(coerceAdj(edges)(nb), [src, wt]));

const removeEdgeR = (edges = new Map, [src, nb, wt = 0]) =>
	edges
	.set(src, rmColl(coerceAdj(edges)(src), nb))
	.set(nb, rmColl(coerceAdj(edges)(nb), src));

const removeNeighborsR = (edges = new Map, src) =>
	nabes(edges)(src).map(triple(0)(src)).reduce(removeEdgeR, edges);

const rmNodeXR = (edges = new Map, src) =>
	rmColl(removeNeighborsR(edges, src), src);

const mergeNeighborsR = (nbs = new Map, alts = new Map) =>
	[...alts].reduce(addMap, nbs);

const mergeEdgesR = (edges = new Map, [src, alts]) =>
	edges.set(src, mergeNeighborsR(coerceAdj(edges)(src)), (alts));

module.exports = {
	appendNew,
	appendR,
	addNeighborR,
	coerceAdj,
	addEdgeR,
	removeEdgeR,
	mergeEdgesR,
	rmNodeXR,
	removeNeighborsR,
};