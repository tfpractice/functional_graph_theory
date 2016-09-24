beforeAll(function() {
	require('jasmine-expect');
	this.App = require('../../index');
	({ Graph, utils, traversals } = this.App);
	trav = traversals;
	({ makeEdges, makeGraph, nodes, edges } = Graph);
	({ neighbors, contains, isAdjacent } = Graph);
	({ addEdge, removeEdge } = Graph);
	({ addNodes, removeNode } = Graph);
	({ importEdge, mergeGraphs } = Graph);
	({ clearNodes, clearEdges, showGraph } = Graph);
	Node = (label = '', data = {}) => ({
		label,
		data,
		toString: () =>
			label,
	});
	eFilter = (coll) => coll.filter(({ data }) => data.position % 2 === 0);
	oFilter = (coll) => coll.filter(({ data }) => data.position % 2 === 1);
	nEdges = ({ nodes, edges }) => eFilter(Array.from(nodes))
		.reduce((prev, next, id) => {
			addEdge({ nodes, edges })(prev)(next, id * 2);
			return next;
		});
	oEdges = ({ nodes, edges }) => oFilter(Array.from(nodes))
		.reduce((prev, next, id) => {
			addEdge({ nodes, edges })(prev)(next, (id * 2) + 1);
			return next;
		});

});

beforeEach(function() {
	myNodes = Array(20).fill('node').map((el, id) =>
		Node(`${el}::${id}`, { position: id })
	);
	altNodes = Array(20).fill('altnode').map((el, id) =>
		Node(`${el}::${id}`, { position: id })
	);
	firstTen = myNodes.slice(0, 10);
	lastTen = myNodes.slice(-10);
	[n0, n1, n2, n3, n4, n5, n6, n7, n8, n9] = firstTen;
	[n10, n11, n12, n13, n14, n15, n16, n17, n18, n19] = lastTen;

	eNodes = eFilter(lastTen);
	oNodes = oFilter(lastTen);

	myGraph = Graph(...firstTen);
	altGraph = Graph(n4, n5, n6, n7, n8, n9);
	evenGraph = Graph(...firstTen, ...eNodes);
	oddGraph = Graph(...firstTen, ...oNodes);

	addEdge(myGraph)(n0)(n1, 2);
	addEdge(myGraph)(n0)(n2, 2);
	addEdge(myGraph)(n1)(n4, 4);
	addEdge(myGraph)(n1)(n6, 6);
	addEdge(myGraph)(n2)(n3, 3);
	addEdge(myGraph)(n5)(n4, 4);
	addEdge(myGraph)(n1)(n2, 4);
	addEdge(myGraph)(n3)(n4, 8);
	addEdge(myGraph)(n5)(n6, 7);

	addEdge(evenGraph)(n0)(n1, 11);
	addEdge(evenGraph)(n0)(n9, 22);
	nEdges(evenGraph);

	addEdge(oddGraph)(n0)(n1, 11);
	addEdge(oddGraph)(n0)(n9, 22);
	oEdges(oddGraph);

	myEdges = edges(myGraph);
	oddEdges = edges(oddGraph);
	evenEdges = edges(evenGraph);
});