beforeAll(function() {
	require('jasmine-expect');
	App = require('../../index');
	({ Graph, utils, traversals, AsyncOps, Edge } = App);
	({ makeEdges, fromElements, nodes, edges } = Graph);
	({ neighbors, contains, isAdjacent } = Graph);
	({ addEdge, removeEdge } = Graph);
	({ addNodes, removeNode } = Graph);
	({ importEdge, mergeGraphs } = Graph);
	({ clearEdges, showGraph } = Graph);
	trav = traversals;
	Node = (label = '', data = {}) => ({
		label,
		data,
		toString: () =>
			label,
	});
	eFilter = (coll) => coll.filter(({ data }) => data.position % 2 ===
		0);
	oFilter = (coll) => coll.filter(({ data }) => data.position % 2 ===
		1);
	nEdges = ({ edges }) => eFilter(Array.from(nodes({ edges })))
		.reduce((prev, next, id) => {
			addEdge({ edges })(prev)(next, id * 2);
			return next;
		});
	nEdgesR = (edges) => eFilter(Array.from(Edge.nodes(edges)))
		.reduce((prev, next, id) => {
			Edge.addEdges(edges)(prev, id * 2)(next);
			return next;
		});
	oEdges = ({ edges }) => oFilter(Array.from(nodes({ edges })))
		.reduce((prev, next, id) => {
			addEdge({ edges })(prev)(next, (id * 2) + 1);
			return next;
		});
	oEdgesR = (edges) => oFilter(Array.from(Edge.nodes(edges)))
		.reduce((prev, next, id) => {
			Edge.addEdges(edges)(prev, id * 2)(next);
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
	myGraphR = Edge.fromElements(...firstTen);
	altGraphR = Edge.fromElements(n4, n5, n6, n7, n8, n9);
	evenGraphR = Edge.fromElements(...firstTen, ...eNodes);
	oddGraphR = Edge.fromElements(...firstTen, ...oNodes);

	Edge.addEdges(myGraphR)(n0, 2)(n1, n2);
	Edge.addEdges(myGraphR)(n1, 4)(n4, n2);
	Edge.addEdges(myGraphR)(n1, 6)(n6);
	Edge.addEdges(myGraphR)(n2, 3)(n3);
	Edge.addEdges(myGraphR)(n5, 4)(n4);
	Edge.addEdges(myGraphR)(n3, 8)(n4);
	Edge.addEdges(myGraphR)(n5, 7)(n6);

	Edge.addEdges(evenGraphR)(n0, 11)(n1);
	Edge.addEdges(evenGraphR)(n0, 22)(n9);
	nEdgesR(evenGraphR);

	Edge.addEdges(oddGraphR)(n0, 11)(n1);
	Edge.addEdges(oddGraphR)(n0, 22)(n9);
	oEdgesR(oddGraphR);

	myEdgesR = edges(myGraphR);
	oddEdgesR = edges(oddGraphR);
	evenEdgesR = edges(evenGraphR);
});