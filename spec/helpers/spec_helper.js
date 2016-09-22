beforeAll(function() {
	require('jasmine-expect');
	this.App = require('../../index');
	({ Graph, utils, traversals } = this.App);
	trav = traversals;
	({ makeEdges, makeGraph, nodes, edges } = Graph);
	({ neighbors, contains, isAdjacent } = Graph);
	({ addEdge, removeEdge } = Graph);
	({ clearNodes, clearEdges, showGraph } = Graph);
	Node = (label = '', data = {}) => ({
		label,
		data,
		toString: () =>
			label,
	});

});

beforeEach(function() {
	myNodes = Array(7).fill('node').map((el, id) =>
		Node(`${el}::${id}`, { position: id })
	);
	altNodes = Array(7).fill('altnode').map((el, id) =>
		Node(`${el}::${id}`, { position: id })
	);
	[n0, n1, n2, n3, n4, n5, n6] = myNodes;
	myGraph = Graph(...myNodes);
	altGraph = Graph(...altNodes);
});