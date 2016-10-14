const Utils = require('./utils');
const { Commands: { tuple, triple, rmColl, addMap, } } = Utils;
const { Commands: { spread, spreadK, } } = Utils;
const { Comparitors: { uniteMap, mapDiff, mapUnion, } } = Utils;

const nMap = (edges = new Map) => (src) => new Map(edges.get(src));
const nabes = (edges = new Map) => (src) => spreadK(nMap(edges)(src));
const addSrc = (edges = new Map, src) => addMap(edges, [src, nMap(edges)(src)]);

const addEdgeR = (edges = new Map, [src, nb, wt = 0]) => {
    return edges
     .set(src, addMap(edges.get(src), [ nb, wt ]))
     .set(nb, addMap(edges.get(nb), [ src, wt ]));
};

const rmEdge = (edges = new Map, [src, nb, wt = 0]) =>
	edges
	.set(src, rmColl(edges.get(src), nb))
	.set(nb, rmColl(edges.get(src), src));

const rmAdj = (edges = new Map, src) =>
	nabes(edges)(src).map(triple(0)(src)).reduce(rmEdge, edges);

const rmNode = (edges = new Map, src) => rmColl(rmAdj(edges, src), src);

const importEdge = (edges = new Map, [src, alts = new Map]) =>
	addMap(edges, [ src, mapUnion(edges.get(src))(alts) ]);

module.exports = { addSrc,
    addEdgeR,
    rmEdge,
    importEdge,
    rmNode,
    rmAdj, };
