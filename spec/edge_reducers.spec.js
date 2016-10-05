fdescribe('Edge Reducers', function() {
	beforeAll(function() {
		console.log('\n.........Edge Reducers Spec.........');
	});

	beforeEach(function() {
		rEdges = Edge.spawn();
	});

	describe('spawn(nabes)', () => {
		it('returns a new Map', () => {
			expect(Edge.spawn() instanceof Map).toBeTrue();
		});
	});
	describe('appendNew', () => {
		it('adds an entry to the edges Map', () => {
			let res = Edge.appendNew()(n0);
			expect(res.has(n0)).toBeTrue();
		});
	});

	describe('addNodes', () => {
		it('adds an entry to the edges Map', () => {
			let res = Edge.addNodes()(n0);
			expect(res.has(n0)).toBeTrue();
		});
	});

	describe('appendR', () => {
		it('adds entries to the Map via reduce', () => {
			let res = Edge.appendR(rEdges, n0);
			expect(res.has(n0)).toBeTrue();
		});
	});

	describe('removeNode', () => {
		it('removes a node from the edges map', () => {
			let res = Edge.appendR(rEdges, n0);
			res = Edge.removeNode(rEdges)(n0);
			expect(res.has(n0)).toBeFalse();
		});
	});

	// describe('addEdge(nabes, [n,w])', () => {
	// 	it('adds an entry to the nabes', () => {});
	// });
	// describe('neighbors', () => {
	// 	it('returns a new map of the src neighbors', () => {});
	// });
	// describe('addNeighbor', () => {
	// 	it('appends an node to the edgelist', () => {});
	// });
});