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
	describe('addNode', function() {
		it('adds an entry to the edges Map', function() {
			let res = Edge.addNode()(n0);
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