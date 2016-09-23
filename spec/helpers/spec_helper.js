beforeAll(function() {
	require('jasmine-expect');
	this.App = require('../../index');
	({ Graph, utils, traversals } = this.App);
	trav = traversals;
	({ makeEdges, makeGraph, nodes, edges } = Graph);
	({ neighbors, contains, isAdjacent } = Graph);
	({ addEdge, removeEdge } = Graph);
	({ addNodes, removeNode } = Graph);
	({ clearNodes, clearEdges, showGraph } = Graph);
	Node = (label = '', data = {}) => ({
		label,
		data,
		toString: () =>
			label,
	});

});

beforeEach(function() {
	myNodes = Array(10).fill('node').map((el, id) =>
		Node(`${el}::${id}`, { position: id })
	);
	altNodes = Array(10).fill('altnode').map((el, id) =>
		Node(`${el}::${id}`, { position: id })
	);
	[n0, n1, n2, n3, n4, n5, n6, n7, n8, n9] = myNodes;
	myGraph = Graph(n0, n1, n2, n3, n4, n5, n6);
	altGraph = Graph(n4, n5, n6, n7, n8, n9);
});