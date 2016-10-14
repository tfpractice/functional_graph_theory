const tuple = (val) => (key) => [key, val];
const triple = (val) => (key0) => (key1) => [key0, key1, val];
const flatTuple = (v0 = []) => (v1 = []) => [v0, ...v1];

const spread = (coll = []) => [...coll];
const spreadK = (coll = []) => [...coll.keys()];
const spreadV = (coll = []) => [...coll.values()];
const spreadKV = (coll = []) => [...coll.entries()];

const addSet = (coll = new Set, elem) => coll.add(elem);
const addMap = (coll = new Map, [k, v]) => coll.set(k, v);
const rmColl = (coll = new Map, elem) => coll.delete(elem) ? coll : coll;
const popElem = (coll = new Set) => (el) => rmColl(coll, el) && el;
const popFirst = (coll = new Set) => popElem(coll)(spread(coll).shift());

module.exports = {
	spread,
	spreadK,
	spreadV,
	spreadKV,
	tuple,
	triple,
	flatTuple,
	addSet,
	addMap,
	rmColl,
	popFirst,
};