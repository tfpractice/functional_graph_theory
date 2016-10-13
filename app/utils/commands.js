const addSet = (coll = new Set, elem) => coll.add(elem);
const addMap = (coll = new Map, [k, v]) => coll.set(k, v);
const rmColl = (coll = new Set, elem) => coll.delete(elem) ? coll : coll;

module.exports = { addSet, addMap, rmColl, };