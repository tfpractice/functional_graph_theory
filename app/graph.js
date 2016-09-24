const utils = require('./utils');
const { spreadKeys, spreadEntries } = utils;
const { edgeString, pathString, graphString, showGraph } = utils;

let makeEdges = (...elements) =>
	elements.reduce((eMap, next) =>
		eMap.set(next, new Map()), new Map());

let makeGraph = (...elements) => ({
	nodes: new Set(elements),
	edges: makeEdges(...elements),
});

let nodes = ({ nodes = new Set }) => nodes;
let edges = ({ edges = new Map }) => edges;

let contains = ({ nodes }) => (node) => nodes.has(node);
let neighbors = ({ edges }) => (node) => spreadKeys(edges.get(node));
let isAdjacent = ({ edges }) => (n0) => (n1) => edges.get(n0).has(n1);

let addNodes = ({ nodes, edges }) => (...additional) =>
	additional
	.filter(n => !nodes.has(n))
	.forEach(n => {
		nodes.add(n);
		edges.set(n, new Map);
	});

let addEdge = ({ edges, nodes }) => (n0) => (n1, weight = 0) => {
	addNodes({ edges, nodes })(n0, n1);
	if (!isAdjacent({ edges })(n0)(n1)) {
		edges.get(n0).set(n1, weight);
		edges.get(n1).set(n0, weight);
	}

	return { edges, nodes };
};

let importEdge = ({ edges, nodes }) => ([source, nabes]) => {
	addNodes({ edges, nodes })(source);
	for (let [nabe, weight] of nabes) {
		addEdge({ edges, nodes })(source)(nabe, weight);
	}

	return { edges, nodes };
};

let removeEdge = ({ edges }) => (n0) => (n1) =>
	edges.get(n0).delete(n1) && edges.get(n1).delete(n0);

let removeNode = ({ nodes, edges }) => (exNode) => {
	neighbors({ edges })(exNode).forEach(nabe =>
		removeEdge({ edges })(nabe)(exNode));
	nodes.delete(exNode);
	return { edges, nodes };

};

let clearNodes = ({ nodes }) => nodes.clear;
let clearEdges = ({ edges }) => edges.clear;

let mergeGraphs = ({ edges: e0, nodes: n0 }) => ({ edges: e1, nodes: n1 }) => {
	for (let [source, nabes] of e1) {
		importEdge({ edges: e0, nodes: n0 })([source, nabes]);
	}

	return { edges: e0, nodes: n0 };

};

// let edgeString = ([source, nabes]) =>
// 	'{ Edge ' + source + ' } >> [ ' + spreadKeys(nabes) + ' ]\n';

// let showGraph = ({ edges }) =>
// 	spreadEntries(edges).reduce((str, [node, nabes], id) =>
// 		str + edgeString([node, nabes]),
// 		'Showing Graph\n');

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
module.exports.importEdge = importEdge;
module.exports.mergeGraphs = mergeGraphs;
module.exports.removeEdge = removeEdge;
module.exports.neighbors = neighbors;
module.exports.contains = contains;
module.exports.clearNodes = clearNodes;
module.exports.clearEdges = clearEdges;
module.exports.isAdjacent = isAdjacent;


//