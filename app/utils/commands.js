const tuple = (val) => (key) => [ key, val ];
const triple = (val) => (key0) => (key1) => [ key0, key1, val ];

const spread = (coll = []) => [ ...coll ];
const spreadK = (coll = []) => [ ...coll.keys() ];
const spreadV = (coll = []) => [ ...coll.values() ];
const spreadKV = (coll = []) => [ ...coll.entries() ];

const addSet = (coll = new Set, elem) => coll.add(elem);
const addMap = (coll = new Map, [k, v]) => coll.set(k, v);
const rmColl = (coll = new Set, elem) => coll.delete(elem) ? coll : coll;
const popElem = (coll = new Set) => (el) => rmColl(coll, el) && el;
const popFirst = (coll = new Set) => popElem(coll)(spread(coll).shift());

const inter = (c0) => (c1) => spread(c0).filter(k => c1.has(k));
const diff = (c0) => (c1) => spread(c0).filter(k => !c1.has(k));
const union = (c0) => (c1) => spread(c0).concat(diff(c1)(c0));

// const mapInter = (c0 = new Map) => (c1 = new Map) =>
// 	spread(c0).filter(([k, v]) => c1.has(k)).reduce(addMap, new Map);

// const mapDiff = (c0 = new Map) => (c1 = new Map) =>
// 	spread(c0).filter(([k, v]) => !c1.has(k)).reduce(addMap, new Map);

// const mapUnion = (c0 = new Map) => (c1 = new Map) =>
// 	spread(mapDiff(c1)(c0)).reduce(addMap, new Map(c0));

module.exports = { spread,
    spreadK,
    spreadV,
    spreadKV,
    tuple,
    triple,
    addSet,
    addMap,
    rmColl,
    popFirst, };
