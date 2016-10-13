const Queries = require('./queries');
const Comparitors = require('./comparitors');
const Commands = require('./commands');
const Strings = require('./strings');

// const addSet = (coll = new Set, elem) => coll.add(elem);
// const addMap = (coll = new Map, [k, v]) => coll.set(k, v);
// const rmColl = (coll = new Set, elem) => coll.delete(elem) ? set : set;
// module.exports = Object.assign({ Queries, Comparitors, Strings }, Queries,
//  Comparitors, Strings);

module.exports = { Queries, Comparitors, Strings, Commands };