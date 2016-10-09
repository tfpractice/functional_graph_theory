fdescribe('Graph', function() {
	beforeAll(function() {
		console.log('\n.........GraphR Spec.........');
	});

	beforeEach(function() {
		rEdges = Edge.spawn();
		evens = Edge.addNodes()(...eFilter(myNodes));
		odds = Edge.addNodes()(...oFilter(oNodes));
	});

	describe('spawn(nabes)', () => {
		it('returns a new Map', () => {
			expect(Edge.spawn() instanceof Map).toBeTrue();
		});
	});
	describe('fromElements', () => {
		it('returns a new edgelist with the new nodes appended', function() {
			let sEdges = Edge.fromElements(...myNodes);
			expect(Edge.contains(sEdges)(n2)).toBeTrue();
		});
	});
	describe('accessors', () => {
		describe('nodes', () => {
			it('returns an array of the nodes in the edgelist', function() {
				expect(Edge.nodes(evens)).toBeArray();
			});
		});
		describe('copy', () => {
			it('returns a Map of nodes and neighbor', () => {
				expect(Edge.copy(rEdges) instanceof Map).toBeTrue();
			});
		});
		describe('adj', () => {
			it('returns a map of all the neighboring nodes and weights', function() {
				expect(Edge.adj(evens)(n2) instanceof Map).toBeTrue();
			});
		});
		describe('neighbors(edge)(node)', () => {
			it('returns a map entry of that nodes neighbors ', () => {
				expect(Edge.neighbors(myGraphR)(n0) instanceof Array).toBeTrue();
			});
		});
		describe('contains', function() {
			it('checks if a graph has a node', function() {
				expect(Edge.contains(evens)(n12)).toBeTrue();
			});
		});
	});
	describe('operators', () => {
		describe('isAdjacent(graph)(n0)(n1)', () => {
			it('checks for the presence of a node in the graph', () => {
				expect(isAdjacent(myGraph)(n0)(n6)).toBeFalse();
			});
		});

		describe('addNodes', () => {
			it('adds an entry to the edges Map', () => {
				Edge.addNodes(rEdges)(n0);
				expect(rEdges.has(n0)).toBeTrue();
			});
		});
		describe('removeNodes', () => {
			it('removes the nodes from the edges', () => {
				Edge.addEdges(rEdges)(n0, 1)(n1, n2, n3);
				Edge.removeNodes(rEdges)(n0, n2);
				expect(rEdges.has(n1)).toBeTrue();
				expect(rEdges.has(n0)).not.toBeTrue();
			});
		});

		describe('addEdges', () => {
			it('adds an neighbor entry for each node', () => {
				let nabes = Edge.addEdges(rEdges)(n0)(n1, n2, n3);
				expect(Edge.adj(rEdges)(n0).has(n2)).toBeTrue();
			});
		});
		describe('addEntry', () => {
			it('appends an [node, weight] pair to the neighbrs', () => {
				let nabes = Edge.addNeighbor(rEdges)(n0)(n1, 3);
				let w0n2 = Edge.weighedEntry(0)(n2);
				let newNabes = Edge.addEntry(nabes)(w0n2);
				expect(newNabes.has(n2)).toBeTrue();
				expect(Edge.adj(rEdges)(n0).has(n2)).toBeFalse();
			});
		});
		describe('addNeighbor', () => {
			it('adds a neigbor and weight to the src entry', () => {
				let nabes = Edge.addNeighbor(rEdges)(n0)(n1, 3);
				expect(nabes.has(n1)).toBeTrue();
			});
		});
		describe('mergeNeighbors', () => {
			it('combines two neighbor maps', () => {
				let rNabes = Edge.addEdges(rEdges)(n0, 0)(n1, n2, n3).get(n0);
				let eNabes = Edge.addEdges(evens)(n2)(n5, n7, n9).get(n2);
				Edge.mergeNeighbors(eNabes)(rNabes);
				expect(Edge.adj(evens)(n2).has(n5)).toBeTrue();
			});
		});
		describe('removeEdges', () => {
			it('removes an edge entry', function() {
				let nabes = Edge.addEdges(rEdges)(n0, 1)(n1, n2, n3);
				Edge.removeEdges(rEdges)(n0)(n1);
				expect(Edge.isAdjacent(rEdges)(n0)(n1)).toBeFalse();
			});
		});
		describe('mergeEdges', () => {
			it('combines two Edge maps', () => {
				[...evens.keys()].map((e, id, arr) => [e, id, ...arr])
					.reduce(Edge.addEdgeR, evens);
				Edge.mergeEdges(evens)(odds);
				expect(evens.has(n15)).toBeTrue();
			});
		});
		describe('weighedEntry', () => {
			it('returns a [node, weight] array', () => {
				expect(Edge.weighedEntry(0)(n2)).toBeArray();
			});
		});
	});
});