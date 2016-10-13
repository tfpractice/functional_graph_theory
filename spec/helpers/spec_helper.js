beforeAll(function() {
	require('jasmine-expect');
	App = require('../../index');
	({ Graph, Utils, Traversals, AsyncOps, Reducers } = App);
	({ Queries: Query, Comparitors: Comp, Strings: Str } = Utils);
	Trav = Traversals;
	Node = (label = '', data = {}) => ({
		label,
		data,
		toString: () =>
			label,
	});
	eFilter = (coll) => coll.filter(({ data: { position: p } }) => p % 2 === 0);
	oFilter = (coll) => coll.filter(({ data: { position: p } }) => p % 2 === 1);
	nEdgesR = (edges) => eFilter(Graph.nodes(edges))
		.reduce((prv, nxt, id) => Graph.addEdges(edges)(prv, id * 2)(nxt) && nxt);
	oEdgesR = (edges) => oFilter(Graph.nodes(edges))
		.reduce((prv, nxt, id) => Graph.addEdges(edges)(prv, id * 2)(nxt) && nxt);
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
	myGraphR = Graph.fromElements(...firstTen);
	altGraphR = Graph.fromElements(n4, n5, n6, n7, n8, n9);
	evenGraphR = Graph.fromElements(...firstTen, ...eNodes);
	oddGraphR = Graph.fromElements(...firstTen, ...oNodes);

	Graph.addEdges(myGraphR)(n0, 2)(n1, n2);
	Graph.addEdges(myGraphR)(n1, 4)(n4, n2);
	Graph.addEdges(myGraphR)(n1, 6)(n6);
	Graph.addEdges(myGraphR)(n2, 3)(n3);
	Graph.addEdges(myGraphR)(n5, 4)(n4);
	Graph.addEdges(myGraphR)(n3, 8)(n4);
	Graph.addEdges(myGraphR)(n5, 7)(n6);
	Graph.addEdges(myGraphR)(n7, 7)(n8);

	Graph.addEdges(evenGraphR)(n0, 11)(n1);
	Graph.addEdges(evenGraphR)(n0, 22)(n9);
	nEdgesR(evenGraphR);

	Graph.addEdges(oddGraphR)(n0, 11)(n1);
	Graph.addEdges(oddGraphR)(n0, 22)(n9);
	oEdgesR(oddGraphR);

	myEdgesR = Graph.spawn(myGraphR);
	oddEdgesR = Graph.spawn(oddGraphR);
	evenEdgesR = Graph.spawn(evenGraphR);
});