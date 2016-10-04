fdescribe('Edge', function() {
	beforeAll(function() {
		console.log('\n.........Edge Spec.........');
	});

	beforeEach(function() {
		// myNabes = Array.from(firstTen, e => [e]).reduce(Edge.addNeighbor,
		// 	Edge.spawn());

		// rEdges = firstTen.reduce(Edge.addEdge, Edge.spawn());
		// console.log(rEdges);
	});

	describe('spawn(nabes)', () => {
		it('returns a new Map', () => {
			expect(Edge.spawn() instanceof Map).toBeTrue();
		});
	});
	describe('addEdge(nabes, [n,w])', () => {
		it('adds an entry to the nabes', () => {
			Edge.addEdge(Edge.spawn(), n0);
		});
	});
	describe('neighbors', () => {
		it('returns a new map of the src neighbors', function() {
			console.log(Edge.neighbors(Edge.spawn())(n0));
			// console.log(Edge.neighbors());
		});
	});
	describe('addNeighbor', () => {
		it('appends an node to the edgelist', function() {});
	});
	// describe('removeNeighbor ', () => {
	// 	it('retuns a new map with the specified nabe deleted',
	// 		function() {
	// 			myNabes = Edge.removeNeighbor(myNabes, n0);
	// 			expect(myNabes.has(n0)).toBeFalse();
	// 		});
	// });
	// describe('setWeight ', () => {});
});