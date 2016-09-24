let spreadKeys = (coll) => [...coll.keys()];
let spreadValues = (coll) => [...coll.values()];
let spreadEntries = (coll) => [...coll.entries()];
let lastKey = (coll) => spreadKeys(coll).pop();
let firstKey = (coll) => spreadKeys(coll).shift();

let rmFirst = (set) => {
	let elem = [...set].shift();
	set.delete(elem);
	return elem;
};

let pathHasNode = (path) => (node) => path.has(node);
let x_pathHasNode = (path) => (node) => !pathHasNode(path)(node);
let pathHasEntry = (path) => ([key, val]) => path.has(key);
let x_pathHasEntry = (path) => ([key, val]) => !pathHasEntry(path)([key, val]);

let pathString = (path) =>
	spreadKeys(path).reduce((str, next, id, coll) =>
		id === (coll.length - 1) ?
		(str + next + ' }') :
		(str + next + ' => '), '{ ');

let edgeString = ([source, nabes]) =>
	'{ Edge ' + source + ' } >> [ ' + spreadKeys(nabes) + ' ]\n';

let componentString = ([node, set]) =>
	' ' + node + ' { Component ' + firstKey(set) + '... ' + lastKey(set) + '}';

let showEdges = (edges) =>
	spreadEntries(edges).reduce((str, [node, nabes], id) =>
		str + edgeString([node, nabes]),
		'Showing Edges\n');

let showGraph = ({ edges }) => showEdges(edges);

let intersection = (m0) => (m1) =>
	spreadEntries(m0).filter(([k, v]) => m1.has(k));
let difference = (m0) => (m1) =>
	spreadEntries(m0).filter(([k, v]) => !m1.has(k));
let union = (m0) => (m1) =>
	spreadEntries(m0).concat(difference(m1)(m0));
let mergeEdges = ({ edges: e0 }) => ({ edges: e1 }) => {
	let newEdges = difference(e1)(e0);
	let sharedEdges = intersection(e1)(e0);
	// sharedEdges.forEach(edge => )
	// console.log(newEdges);
	let united = union(e0)(e1);
	let uMap = new Map(united);
	// console.log('........union');
	// sharedEdges.forEach(edge => console.log(edgeString(edge)));

	// console.log('united', united);

};

module.exports.spreadKeys = spreadKeys;
module.exports.spreadValues = spreadValues;
module.exports.spreadEntries = spreadEntries;
module.exports.lastKey = lastKey;
module.exports.firstKey = firstKey;
module.exports.rmFirst = rmFirst;
module.exports.pathHasNode = pathHasNode;
module.exports.x_pathHasNode = x_pathHasNode;
module.exports.pathHasEntry = pathHasEntry;
module.exports.x_pathHasEntry = x_pathHasEntry;
module.exports.componentString = componentString;
module.exports.mergeEdges = mergeEdges;
module.exports.intersection = intersection;
module.exports.difference = difference;
module.exports.union = union;