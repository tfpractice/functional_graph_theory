let makeEdges = (...elements) =>
	elements.reduce((eMap, next) =>
		eMap.set(next, new Map()), new Map());

let makeGraph = (...elements) => ({
	nodes: new Set(elements),
	edges: makeEdges(...elements),
});

let nodes = ({ nodes = new Set() }) => nodes;
let edges = ({ edges = new Map() }) => edges;
let neighbors = ({ edges }) => (node) => edges.get(node);
let contains = ({ nodes }) => (node) => nodes.has(node);
let clearNodes = ({ nodes }) => nodes.clear;
let clearEdges = ({ edges }) => edges.clear;
let isAdjacent = ({ edges }) => (n0) => (n1) =>
	edges.get(n0).has(n1);
// let spreadKeys = (map) => [...map.keys()];
// let spreadValues = (map) => [...map.values()];
// let spreadEntries = (map) => [...map.entries()];
// let lastKey = (map) => spreadKeys(map).pop();

let Graph = (...elements) => {
	let gState = makeGraph(...elements);
	return {
		nodes: nodes(gState),
		edges: edges(gState),
		neighbors: neighbors(gState),
		contains: contains(gState),
		clearEdges: clearEdges(gState),
		// addEdge: addEdge(gState),
		// removeEdge: removeEdge(gState),
		isAdjacent: isAdjacent(gState),
	};
	// return { nodes: new Set(elements) };
};

// let operators = { makeEdges, makeGraph, nodes, edges, neighbors, contains };
module.exports = Graph;
module.exports.makeEdges = makeEdges;
module.exports.makeGraph = makeGraph;
module.exports.nodes = nodes;
module.exports.edges = edges;
module.exports.neighbors = neighbors;
module.exports.contains = contains;
module.exports.clearNodes = clearNodes;
module.exports.clearEdges = clearEdges;
module.exports.isAdjacent = isAdjacent;


//