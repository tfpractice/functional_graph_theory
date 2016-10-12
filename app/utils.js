// const { spreadK, spreadValues, spreadKV } = utils;
// const { hasKey, x_hasKey, showGraph } = utils;
// const { spreadK, spreadValues, spreadKV } = UTILS;
// const { lastKey, firstK, rmFirst, } = UTILS;
// const { pathHasNode, x_pathHasNode } = UTILS;
// const { pathHasEntry, x_pathHasEntry } = UTILS;
// const { componentString } = UTILS;
const spread = (coll = []) => [ ...coll ];
const spreadK = (coll = []) => [ ...coll.keys() ];
const spreadV = (coll = []) => [ ...coll.values() ];
const spreadKV = (coll = []) => [ ...coll.entries() ];

const first = (coll = []) => spread(coll).shift();
const last = (coll = []) => spread(coll).pop();

const firstK = (coll) => first(spreadK(coll));
const lastKey = (coll) => last(spreadK(coll));

let rmFirst = (coll) => {
    let elem = getFirst(coll);
    coll.delete(elem);
    return elem;
};

let myMap = new Map().set(1, 11).set(2, 22).set(3, 33);
let mySet = new Set().add(1).add(2).add(3).add(4);
let myArr = [ 11, 22, 33, 44, 55 ];

const getFirst = (coll = new Set) => spread(coll).shift();
const getIndex = (coll = new Set) => (index) => spread(coll).slice(index, 1);

let hasKey = (coll) => (key) => coll.has(key);
let x_hasKey = (coll) => (key) => !coll.has(key);
let pathHasNode = hasKey;
let x_pathHasNode = x_hasKey;
let pathHasEntry = (path) => ([key, val]) => path.has(key);
let x_pathHasEntry = (path) => ([key, val]) => !pathHasEntry(path)([ key, val ]);

let pathString = (path) =>
	spreadK(path).reduce((str, next, id, coll) =>
		id === (coll.length - 1) ?
		(str + next + ' }') :
		(str + next + ' => '), '{ ');

let edgeString = ([source, nabes]) =>
	'{ Edge ' + source + ' } >> [ ' + spreadK(nabes) + ' ]\n';

let componentString = ([node, set]) =>
	' ' + node + ' { Component ' + firstK(set) + '... ' + lastKey(set) + '}';

let graphString = (edges) =>
	spreadKV(edges).reduce((str, [node, nabes], id) =>
		str + edgeString([ node, nabes ]),
		'Showing Edges\n');

let showGraph = ({ edges }) => (graphString(edges));

let intersection = (m0) => (m1) =>
	spreadKV(m0).filter(([k, v]) => m1.has(k));
let difference = (m0) => (m1) =>
	spreadKV(m0).filter(([k, v]) => !m1.has(k));
let union = (m0) => (m1) =>
	spreadKV(m0).concat(difference(m1)(m0));

// module.exports.spreadK = spreadK;
// module.exports.spreadValues = spreadValues;
// module.exports.spreadKV = spreadKV;
// module.exports.hasKey = hasKey;
// module.exports.x_hasKey = x_hasKey;
// module.exports.lastKey = lastKey;
// module.exports.firstK = firstK;
// module.exports.rmFirst = rmFirst;
// module.exports.pathHasNode = pathHasNode;
// module.exports.x_pathHasNode = x_pathHasNode;
// module.exports.pathHasEntry = pathHasEntry;
// module.exports.x_pathHasEntry = x_pathHasEntry;
// module.exports.componentString = componentString;
// module.exports.showGraph = showGraph;
// module.exports.intersection = intersection;
// module.exports.difference = difference;
// module.exports.union = union;
// module.exports.edgeString = edgeString;
// module.exports.pathString = pathString;
// module.exports.graphString = graphString;


// {spread,
// spreadK,
// spreadV,
// spreadKV,}

module.exports = { spread,
    spreadK,
    spreadV,
    spreadKV,
    hasKey,
    x_hasKey,
    lastKey,
    firstK,
    rmFirst,
    pathHasNode,
    x_pathHasNode,
    pathHasEntry,
    x_pathHasEntry,
    componentString,
    showGraph,
    intersection,
    difference,
    union,
    edgeString,
    pathString, };
//
//
//
