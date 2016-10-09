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

	myGraph = fromElements(...firstTen);
	myGraphR = Edge.fromElements(...firstTen);
	altGraph = fromElements(n4, n5, n6, n7, n8, n9);
	altGraphR = Edge.fromElements(n4, n5, n6, n7, n8, n9);
	evenGraph = fromElements(...firstTen, ...eNodes);
	evenGraphR = Edge.fromElements(...firstTen, ...eNodes);
	oddGraph = fromElements(...firstTen, ...oNodes);
	oddGraphR = Edge.fromElements(...firstTen, ...oNodes);

	addEdge(myGraph)(n0)(n1, 2);
	Edge.addEdges(myGraphR)(n0, 2)(n1);
	addEdge(myGraph)(n0)(n2, 2);
	Edge.addEdges(myGraphR)(n0, 2)(n2);
	addEdge(myGraph)(n1)(n4, 4);
	Edge.addEdges(myGraphR)(n1, 4)(n4);
	addEdge(myGraph)(n1)(n6, 6);
	Edge.addEdges(myGraphR)(n1, 6)(n6);
	addEdge(myGraph)(n2)(n3, 3);
	Edge.addEdges(myGraphR)(n2, 3)(n3);
	addEdge(myGraph)(n5)(n4, 4);
	Edge.addEdges(myGraphR)(n5, 4)(n4);
	addEdge(myGraph)(n1)(n2, 4);
	Edge.addEdges(myGraphR)(n1, 4)(n2);
	addEdge(myGraph)(n3)(n4, 8);
	Edge.addEdges(myGraphR)(n3, 8)(n4);
	addEdge(myGraph)(n5)(n6, 7);
	Edge.addEdges(myGraphR)(n5, 7)(n6);

	addEdge(evenGraph)(n0)(n1, 11);
	Edge.addEdges(evenGraphR)(n0, 11)(n1);
	addEdge(evenGraph)(n0)(n9, 22);
	Edge.addEdges(evenGraphR)(n0, 22)(n9);
	nEdges(evenGraph);
	nEdgesR(evenGraphR);

	addEdge(oddGraph)(n0)(n1, 11);
	Edge.addEdges(oddGraphR)(n0, 11)(n1);
	addEdge(oddGraph)(n0)(n9, 22);
	Edge.addEdges(oddGraphR)(n0, 22)(n9);
	oEdges(oddGraph);
	oEdgesR(oddGraphR);

	myEdges = edges(myGraph);
	myEdgesR = edges(myGraphR);
	oddEdges = edges(oddGraph);
	oddEdgesR = edges(oddGraphR);
	evenEdges = edges(evenGraph);
	evenEdgesR = edges(evenGraphR);
});