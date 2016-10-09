const Graph = require('./graph');
const { addNodes, addEdges, removeEdges, removeNodes } = Graph;
const { addNeighbors, mergeNeighbors, mergeEdges } = Graph;

const addNodesAsync = (graph) => (...additional) =>
	new Promise((resolve) => {
		addNodes(graph)(...additional);
		resolve(graph);
	});

const addEdgesAsync = (graph) => (n0, weight = 0) => (...nodes) =>
	new Promise((resolve) => {
		addEdges(graph)(n0, weight)(...nodes);
		resolve(graph);
	});

const removeEdgeAsync = (graph) => (src) => (nabe) =>
	new Promise((resolve, reject) => {
		if (Graph.isAdjacent(graph)(src)(nabe)) {
			removeEdge(graph)(src)(nabe);
			resolve(graph);
		} else {
			reject('no edge to delete');
		}
	});

const removeNodeAsync = (graph) => (exNode) =>
	new Promise((resolve) => {
		removeNodes(graph)(exNode);
		resolve(graph);
	});

const addNeighborAsync = (graph) => (src) => ([nabe, wt]) =>
	new Promise((resolve) => {
		addNeighbor(graph)(src)([nabe, wt]);
		resolve(graph);
	});

// const importEdgeAsync = (graph) => ([src, nabes]) =>
// 	new Promise((resolve) => {
// 		addEntry(graph)([src, nabes]);
// 		resolve(graph);
// 	});
const mergeEdgesAsync = (graph) => (altGraph) =>
	new Promise((resolve) => {
		mergeEdges(graph)(altGraph);
		resolve(graph);
	});

module.exports = {
	addNodesAsync,
	addEdgesAsync,
	removeEdgeAsync,
	removeNodeAsync,
	addNeighborAsync,
	// importEdgeAsync,
	mergeEdgesAsync,
};