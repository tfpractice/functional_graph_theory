fdescribe('Graph', function() {
	beforeAll(function() {
		console.log('\n.........GraphR Spec.........');
	});

	beforeEach(function() {
		rEdges = Graph.spawn();
		evens = Graph.addNodes()(...eFilter(myNodes));
		odds = Graph.addNodes()(...oFilter(oNodes));
	});

	describe('spawn(nabes)', () => {
		it('returns a new Map', () => {
			expect(Graph.spawn() instanceof Map).toBeTrue();
		});
	});
	describe('fromElements', () => {
		it('returns a new edgelist with the new nodes appended', function() {
			let sEdges = Graph.fromElements(...myNodes);
			expect(Graph.contains(sEdges)(n2)).toBeTrue();
		});
	});
	describe('accessors', () => {
		describe('nodes', () => {
			it('returns an array of the nodes in the edgelist', function() {
				expect(Graph.nodes(evens)).toBeArray();
			});
		});
		describe('copy', () => {
			it('returns a Map of nodes and neighbor', () => {
				expect(Graph.copy(rEdges) instanceof Map).toBeTrue();
			});
		});
		describe('adj', () => {
			it('returns a map of all the neighboring nodes and weights', function() {
				expect(Graph.adj(evens)(n2) instanceof Map).toBeTrue();
			});
		});
		describe('neighbors(edge)(node)', () => {
			it('returns a map entry of that nodes neighbors ', () => {
				expect(Graph.neighbors(myGraphR)(n0) instanceof Array).toBeTrue();
			});
		});
		describe('contains', function() {
			it('checks if a graph has a node', function() {
				expect(Graph.contains(evens)(n12)).toBeTrue();
			});
		});
	});
	describe('operators', () => {
		describe('isAdjacent(graph)(n0)(n1)', () => {
			it('checks for the presence of a node in the graph', () => {
				expect(Graph.isAdjacent(myGraphR)(n0)(n6)).toBeFalse();
			});
		});

		describe('addNodes', () => {
			it('adds an entry to the edges Map', () => {
				Graph.addNodes(rEdges)(n0);
				expect(rEdges.has(n0)).toBeTrue();
			});
		});
		describe('removeNodes', () => {
			it('removes the nodes from the edges', () => {
				Graph.addEdges(rEdges)(n0, 1)(n1, n2, n3);
				Graph.removeNodes(rEdges)(n0, n2);
				expect(rEdges.has(n1)).toBeTrue();
				expect(rEdges.has(n0)).not.toBeTrue();
			});
		});

		describe('addEdges', () => {
			it('adds an neighbor entry for each node', () => {
				let nabes = Graph.addEdges(rEdges)(n0)(n1, n2, n3);
				expect(Graph.adj(rEdges)(n0).has(n2)).toBeTrue();
			});
		});

		describe('addEntry', () => {
			it('appends an [node, weight] pair to the neighbrs', () => {
				let nabes = Graph.addNeighbor(rEdges)(n0)(n1, 3);
				let w0n2 = Comm.tuple(0)(n2);
				let newNabes = Graph.addEntry(nabes)(w0n2);
				expect(newNabes.has(n2)).toBeTrue();
				expect(Graph.adj(rEdges)(n0).has(n2)).toBeFalse();
			});
		});
		describe('addNeighbor', () => {
			it('adds a neigbor and weight to the src entry', () => {
				let nabes = Graph.addNeighbor(rEdges)(n0)(n1, 3);
				expect(nabes.has(n1)).toBeTrue();
			});
		});
		describe('mergeNeighbors', () => {
			it('combines two neighbor maps', () => {
				let rNabes = Graph.addEdges(rEdges)(n0, 0)(n1, n2, n3).get(n0);
				let eNabes = Graph.addEdges(evens)(n2)(n5, n7, n9).get(n2);
				Graph.mergeNeighbors(eNabes)(rNabes);
				expect(Graph.adj(evens)(n2).has(n5)).toBeTrue();
			});
		});
		describe('removeEdges', () => {
			it('removes an edge entry', function() {
				let nabes = Graph.addEdges(rEdges)(n0, 1)(n1, n2, n3);
				Graph.removeEdges(rEdges)(n0)(n1);
				expect(Graph.isAdjacent(rEdges)(n0)(n1)).toBeFalse();
			});
		});
		describe('mergeEdges', () => {
			it('combines two Edge maps', () => {
				[...evens.keys()].map((e, id, arr) => [e, id, ...arr])
					.reduce(Graph.addEdgeR, evens);
				Graph.mergeEdges(evens)(odds);
				expect(evens.has(n15)).toBeTrue();
			});
		});
	});
});