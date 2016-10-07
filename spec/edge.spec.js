describe('Edge ', function() {
	beforeAll(function() {
		console.log('\n.........Edge  Spec.........');
	});

	beforeEach(function() {
		rEdges = Edge.spawn();
		evens = Edge.addNodes()(...eFilter(myNodes));
		odds = Edge.addNodes()(...oNodes);
	});

	describe('spawn(nabes)', () => {
		it('returns a new Map', () => {
			expect(Edge.spawn() instanceof Map).toBeTrue();
		});
	});
	describe('addNodes', () => {
		it('adds an entry to the edges Map', () => {
			Edge.addNodes(rEdges)(n0);
			expect(rEdges.has(n0)).toBeTrue();
		});
	});
	describe('rmNode', () => {
		it('removes a node from the edges map', () => {
			Edge.addNodes(rEdges)(n0);
			rEdges = Edge.rmNode(rEdges)(n0);
			expect(rEdges.has(n0)).toBeFalse();
		});
	});
	describe('removeNodes', () => {
		it('removes the nodes from the edges', () => {
			Edge.addNodes(rEdges)(n0, n1, n2, n3);
			Edge.removeNodes(rEdges)(n0, n2);
			expect(rEdges.has(n1)).toBeTrue();
			expect(rEdges.has(n0)).not.toBeTrue();
		});
	});
	describe('rmEdge', () => {
		it('removes an edge entry', function() {});
	});
	describe('addEdges', () => {
		it('adds an neighbor entry for each node', () => {
			let nabes = Edge.addEdges(rEdges)(n0)(n1, n2, n3);
			expect(Edge.adjNodes(rEdges)(n0).has(n2)).toBeTrue();
		});
	});
	describe('adjNodes', () => {
		it('returns a new map of the src adjNodes', () => {
			let nabes = Edge.adjNodes(rEdges)(n0);
			expect(nabes instanceof Map).toBeTrue();
		});
	});
	describe('addNeighbor', () => {
		it('adds a neigbor and weight to the src entry', () => {
			let nabes = Edge.addNeighbor(rEdges)(n0)(n1, 3);
			expect(nabes.has(n1)).toBeTrue();
		});
	});
	describe('weighedEntry', () => {
		it('returns a [node, weight] array', () => {
			expect(Edge.weighedEntry(0)(n2)).toBeArray();
		});
	});
	describe('addEntry', () => {
		it('appends an [node, weight] pair to the neighbrs', () => {
			let nabes = Edge.addNeighbor(rEdges)(n0)(n1, 3);
			let w0n2 = Edge.weighedEntry(0)(n2);
			let newNabes = Edge.addEntry(nabes)(w0n2);
			expect(newNabes.has(n2)).toBeTrue();
			expect(Edge.adjNodes(rEdges)(n0).has(n2)).toBeFalse();
		});
	});
	describe('mergeNeighbors', () => {
		it('combines two neighbor maps', () => {
			let rNabes = Edge.addEdges(rEdges)(n0, 0)(n1, n2, n3).get(n0);
			let eNabes = Edge.addEdges(evens)(n2)(n5, n7, n9).get(n2);
			Edge.mergeNeighbors(eNabes)(rNabes);
			expect(Edge.adjNodes(evens)(n2).has(n5)).toBeTrue();
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
});