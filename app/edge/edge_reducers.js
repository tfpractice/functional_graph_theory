const appendNew = (edges = new Map) => (src) =>
	edges.has(src) ? edges : edges.set(src, new Map);

const appendR = (edges = new Map, src) => appendNew(edges)(src);

const rmNodeR = (edges = new Map, src) => edges.delete(src) ? edges : edges;

const addNeighborR = (nabes = new Map, n, w = 0) => nabes.set(n, w);
const addNeighborRX = (edges = new Map) => (src) => (nabes = new Map, n, w = 0) =>
	edges.set(src, nabes.set(n, w));
// appendNew(edges)(src).get(src).set(n, w);

const addEntryR = (nabes = new Map, [n, w = 0]) => addNeighborR(nabes, n, w);

const mergeNeighborsR = (nabes = new Map, alts = new Map) =>
	mergeNeighbors(nabes)(alts);

module.exports = { appendNew, appendR, rmNodeR, addNeighborR, addEntryR };