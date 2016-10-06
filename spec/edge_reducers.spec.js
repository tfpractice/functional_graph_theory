describe('Edge Reducers', function() {
	beforeAll(function() {
		console.log('\n.........Edge Reducers Spec.........');
		({ Reducers: RD } = Edge);
	});

	beforeEach(function() {
		rEdges = Edge.spawn();
		evens = Edge.addNodes()(...eFilter(myNodes));
		odds = Edge.addNodes()(...oNodes);
	});

	describe('appendNew', () => {
		it('adds an entry to the edges Map', () => {
			RD.appendNew(rEdges)(n0);
			expect(rEdges.has(n0)).toBeTrue();
		});
	});

	describe('appendR', () => {
		it('adds entries to the Map via reduce', () => {
			RD.appendR(rEdges, n0);
			expect(rEdges.has(n0)).toBeTrue();
		});
	});

	describe('rmNodeR', () => {
		it('removes a node from the edges map', () => {
			RD.appendR(rEdges, n0);
			rEdges = RD.rmNodeR(rEdges, n0);
			expect(rEdges.has(n0)).toBeFalse();
		});
	});

	describe('addNeighborR', () => {
		it('adds a neigbor and weight to the src entry', () => {
			let nabes = RD.addNeighborR(Edge.neighbors(rEdges)(n0), n1, 3);
			expect(nabes.has(n1)).toBeTrue();
		});
	});

	describe('addEntryR', () => {
		it('appends an [node, weight] pair to the neighbrs', () => {
			let nabes = RD.addNeighborR(Edge.neighbors(rEdges)(n0), n1, 3);
			let w0n2 = Edge.weighedEntry(0)(n2);
			RD.addEntryR(nabes, w0n2);
			expect(Edge.neighbors(rEdges)(n0).has(n2)).toBeTrue();
		});
	});
});