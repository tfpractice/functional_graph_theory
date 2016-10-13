const queries = require('./queries');
const comparitors = require('./comparitors');
const strings = require('./strings');

const addSet = (coll = new Set, elem) => coll.add(elem);
const addMap = (coll = new Map, [k, v]) => coll.set(k, v);
const rmColl = (coll = new Set, elem) => coll.delete(elem) ? set : set;

module.exports = Object.assign({}, queries, comparitors, strings);