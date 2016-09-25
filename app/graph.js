const utils = require('./utils');
const traversals = require('./traversals');
const { dfs, bfs, components, dijkstra } = traversals;
const { spreadKeys, spreadValues, spreadEntries } = utils;
const { hasKey, x_hasKey } = utils;
const { edgeString, pathString, graphString, showGraph } = utils;

let initEdge = ({ edges }) => (src, nabes = new Map) =>
	edges.set(src, nabes);

let makeEdges = (...elements) =>
	spreadValues(new Set(elements)).reduce((eMap, next) =>
		eMap.set(next, new Map), new Map);

let makeGraph = (...elements) => ({
	nodes: new Set(elements),
	edges: makeEdges(...elements),
});

let nodes = ({ edges = new Map }) => new Set(spreadKeys(edges));
let edges = ({ edges = new Map }) => edges;

let contains = ({ edges }) => (node) => edges.has(node);
let x_contains = ({ edges }) => (node) => !edges.has(node);
let neighbors = ({ edges }) => (node) => spreadKeys(edges.get(node));
let isAdjacent = ({ edges }) => (n0) => (n1) => edges.get(n0).has(n1);

let addNodes = ({ edges }) => (...additional) =>
	additional
	.filter(x_hasKey(edges))
	.forEach(n => {
		edges.set(n, new Map);
	});

let addEdge = ({ edges }) => (n0) => (n1, weight = 0) => {
	addNodes({ edges })(n0, n1);
	if (!isAdjacent({ edges })(n0)(n1)) {
		edges.get(n0).set(n1, weight);
		edges.get(n1).set(n0, weight);
	}

	return { edges };
};

let importEdge = ({ edges }) => ([source, nabes]) => {
	addNodes({ edges })(source);
	for (let [nabe, weight] of nabes) {
		addEdge({ edges, nodes })(source)(nabe, weight);
	}

	return { edges };
};

let removeEdge = ({ edges }) => (n0) => (n1) =>
	edges.get(n0).delete(n1) && edges.get(n1).delete(n0);

let removeNode = ({ edges }) => (exNode) => {
	neighbors({ edges })(exNode).forEach(nabe =>
		removeEdge({ edges })(nabe)(exNode));
	edges.delete(exNode);
	return { edges };

};

let clearNodes = ({ nodes }) => nodes.clear;
let clearEdges = ({ edges }) => edges.clear;

let mergeGraphs = ({ edges: e0, nodes: n0 }) => ({ edges: e1, nodes: n1 }) => {
	for (let [source, nabes] of e1) {
		importEdge({ edges: e0, nodes: n0 })([source, nabes]);
	}

	return { edges: e0, nodes: n0 };

};

let Graph = (...elements) => {
	let gState = makeGraph(...elements);
	return {
		addEdge: addEdge(gState),
		addNodes: addNodes(gState),
		clearEdges: clearEdges(gState),
		clearNodes: clearNodes(gState),
		contains: contains(gState),
		edges: edges(gState),
		importEdge: importEdge(gState),
		isAdjacent: isAdjacent(gState),
		mergeGraphs: mergeGraphs(gState),
		neighbors: neighbors(gState),
		nodes: nodes(gState),
		removeEdge: removeEdge(gState),
		removeNode: removeNode(gState),
		showGraph: showGraph(gState),
		dfs: dfs(gState),
		bfs: bfs(gState),
		components: components(gState),
		dijkstra: dijkstra(gState),
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