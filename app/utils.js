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

const inter = (c0) => (c1) => spread(c0).filter(hasK(c1));
const diff = (c0) => (c1) => spread(c0).filter(x_hasK(c1));
const union = (c0) => (c1) => spread(c0).concat(diff(c1)(c0));

const redStr = (str = ' ', val, id, coll) => str.concat(val, ' , ');
const collString = (coll) => spread(coll).reduce(redStr, '');
const kString = (coll) => spreadK(coll).reduce(redStr, '');
const vString = (coll) => spreadV(coll).reduce(redStr, '');
const kvString = (coll) => spreadKV(coll).reduce(redStr, '');
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
	redStr,
	collString,
	kString,
	vString,
	kvString,
	componentString,
	showGraph,
	inter,
	diff,
	union,
	edgeString,
	pathString,
};