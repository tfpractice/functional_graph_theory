const { spread, spreadK, spreadV, spreadKV, last, } = require('./queries');

const redStr = (str = ' ', val, id, coll) =>
	val === last(coll) ? str.concat(val, ' ') : str.concat(val, ' , ');
const collString = (coll) => spread(coll).reduce(redStr, '');
const kString = (coll) => spreadK(coll).reduce(redStr, '');
const vString = (coll) => spreadV(coll).reduce(redStr, '');
const kvString = (coll) => spreadKV(coll).reduce(redStr, '');

const pathString = (path) => ` { ${spreadK(path).join(' => ')} }`;
const edgeString = ([src, nbs]) => `{ Edge ${src} >> [ ${kString(nbs)} ] } `;

const componentString = ([node, set]) =>
	`{ component ${src} >> [ ${kString(nbs)} ] } `;

const graphString = (edges) =>
	spreadKV(edges).reduce((str, [node, nabes], id) =>
		str + edgeString([node, nabes]),
		'Showing Edges\n');

const showGraph = ({ edges }) => (graphString(edges));

module.exports = {
	redStr,
	collString,
	kString,
	vString,
	kvString,
	pathString,
	edgeString,
	componentString,
	graphString,
	showGraph,
};