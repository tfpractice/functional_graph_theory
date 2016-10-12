const spread = (coll = []) => [...coll];
const spreadK = (coll = []) => [...coll.keys()];
const spreadV = (coll = []) => [...coll.values()];
const spreadKV = (coll = []) => [...coll.entries()];

const first = (coll = []) => spread(coll).shift();
const last = (coll = []) => spread(coll).pop();
const fromIndex = (coll = new Set) => (index) => spread(coll).slice(index, 1);

const firstK = (coll = []) => first(spreadK(coll));
const lastK = (coll = []) => last(spreadK(coll));

let rmFirst = (coll = []) => {
	let elem = first(coll);
	coll.delete(elem);
	return elem;
};

const hasK = (coll = []) => (key) => coll.has(key);
const x_hasK = (coll = []) => (key) => !coll.has(key);
const hasKV = (path) => ([key, val]) => path.has(key);
const x_hasKV = (path) => ([key, val]) => !hasKV(path)([key, val]);

const redStr = (str = '', val, id, coll) => str.concat(val);

const keyStr = (coll) =>
	spreadK(coll).reduce(redStr, 'keys');
let pathString = (path) =>
	spreadK(path).reduce((str, next, id, coll) =>
		id === (coll.length - 1) ?
		(str + next + ' }') :
		(str + next + ' => '), '{ ');

let edgeString = ([source, nabes]) =>
	'{ Edge ' + source + ' } >> [ ' + spreadK(nabes) + ' ]\n';

let componentString = ([node, set]) =>
	' ' + node + ' { Component ' + firstK(set) + '... ' + lastK(set) + '}';

let graphString = (edges) =>
	spreadKV(edges).reduce((str, [node, nabes], id) =>
		str + edgeString([node, nabes]),
		'Showing Edges\n');

let showGraph = ({ edges }) => (graphString(edges));

let intersection = (m0) => (m1) =>
	spreadKV(m0).filter(([k, v]) => m1.has(k));
let difference = (m0) => (m1) =>
	spreadKV(m0).filter(([k, v]) => !m1.has(k));
let union = (m0) => (m1) =>
	spreadKV(m0).concat(difference(m1)(m0));

module.exports = {
	spread,
	spreadK,
	spreadV,
	spreadKV,
	first,
	last,
	firstK,
	lastK,
	rmFirst,
	hasK,
	x_hasK,
	hasKV,
	x_hasKV,
	componentString,
	showGraph,
	intersection,
	difference,
	union,
	edgeString,
	pathString,
};