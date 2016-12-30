import { collections, } from 'turmeric';
const { group, reducers, manipulate } = collections;

const { tuple, triple, flatTuple, } = group;
const { default: spread, spreadK, spreadV, spreadKV, } = collections.spread;

// const { add, addSet, addKV: addMap, remove: rmColl } = reducers;

const addSet = (coll = new Set, elem) => coll.add(elem);
const addMap = (coll = new Map, [ k, v, ]) => coll.set(k, v);
const rmColl = (coll = new Map, elem) => coll.delete(elem) ? coll : coll;
const popElem = (coll = new Set) => el => rmColl(coll, el) && el;
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
