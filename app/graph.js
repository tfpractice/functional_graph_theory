const utils = require('./utils');
const { spreadKeys, spreadEntries } = utils;

let makeEdges = (...elements) =>
	elements.reduce((eMap, next) =>
		eMap.set(next, new Map()), new Map());

let makeGraph = (...elements) => ({
	nodes: new Set(elements),
	edges: makeEdges(...elements),
});

let nodes = ({ nodes = new Set }) => nodes;
let edges = ({ edges = new Map }) => edges;
let neighbors = ({ edges }) => (node) => spreadKeys(edges.get(node));
let contains = ({ nodes }) => (node) => nodes.has(node);

let addEdge = ({ edges }) => (n0) => (n1, weight = 0) =>
	edges.get(n0).set(n1, weight) && edges.get(n1).set(n0, weight);

let removeEdge = ({ edges }) => (n0) => (n1) =>
	edges.get(n0).delete(n1) && edges.get(n1).delete(n0);

let clearNodes = ({ nodes }) => nodes.clear;
let clearEdges = ({ edges }) => edges.clear;
let isAdjacent = ({ edges }) => (n0) => (n1) =>
	edges.get(n0).has(n1);

let edgeString = ([source, nabes]) =>
	'{ Edge ' + source + ' } >> [ ' + spreadKeys(nabes) + ' ]\n';

let showGraph = ({ edges }) =>
	spreadEntries(edges).reduce((str, [node, nabes], id) =>
		str + edgeString([node, nabes]),
		'Showing Graph\n');

let addNodes = ({ nodes, edges }) => (...additional) =>
	additional.forEach(n => {
		nodes.add(n);
		edges.set(n, new Map);
	});

let removeNode = ({ nodes, edges }) => (exNode) =>
	// edges.get(exNode).forEach;
	nodes.delete(exNode);

let Graph = (...elements) => {
	let gState = makeGraph(...elements);
	return {
		nodes: nodes(gState),
		edges: edges(gState),
		neighbors: neighbors(gState),
		contains: contains(gState),
		clearEdges: clearEdges(gState),
		addEdge: addEdge(gState),
		removeEdge: removeEdge(gState),
		isAdjacent: isAdjacent(gState),
		toString: showGraph(gState),
	};
};

module.exports = Graph;
module.exports.makeEdges = makeEdges;
module.exports.makeGraph = makeGraph;
module.exports.showGraph = showGraph;
module.exports.nodes = nodes;
module.exports.edges = edges;
module.exports.addNodes = addNodes;
module.exports.removeNode = removeNode;
module.exports.addEdge = addEdge;
module.exports.removeEdge = removeEdge;
module.exports.neighbors = neighbors;
module.exports.contains = contains;
module.exports.clearNodes = clearNodes;
module.exports.clearEdges = clearEdges;
module.exports.isAdjacent = isAdjacent;


//