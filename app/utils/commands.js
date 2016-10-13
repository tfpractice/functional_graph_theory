const tuple = (val) => (key) => [key, val];
const triple = (val) => (key0) => (key1) => [key0, key1, val];

const addSet = (coll = new Set, elem) => coll.add(elem);
const addMap = (coll = new Map, [k, v]) => coll.set(k, v);
const rmColl = (coll = new Set, elem) => coll.delete(elem) ? coll : coll;

module.exports = { tuple, triple, addSet, addMap, rmColl, };