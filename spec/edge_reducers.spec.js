fdescribe('Edge Reducers', function() {
	beforeAll(function() {
		console.log('\n.........Edge Reducers Spec.........');
	});

	beforeEach(function() {});

	describe('spawn(nabes)', () => {
		it('returns a new Map', () => {
			expect(Edge.spawn() instanceof Map).toBeTrue();
		});
	});
	describe('appendNew', function() {
		it('adds an entry to the edges Map', function() {
			let res = Edge.appendNew()(n0);
			expect(res.has(n0)).toBeTrue();
		});
	});

	describe('addNodes', function() {
		it('adds an entry to the edges Map', function() {
			let res = Edge.addNodes()(n0);
			expect(res.has(n0)).toBeTrue();
		});
	});

	describe('appendR', function() {
		it('adds entries to the Map via reduce', function() {
			let res = Edge.appendR(Edge.spawn(), n0);
			expect(res.has(n0)).toBeTrue();
		});
	});

	// describe('addEdge(nabes, [n,w])', () => {
	// 	it('adds an entry to the nabes', () => {});
	// });
	// describe('neighbors', () => {
	// 	it('returns a new map of the src neighbors', function() {});
	// });
	// describe('addNeighbor', () => {
	// 	it('appends an node to the edgelist', function() {});
	// });
});