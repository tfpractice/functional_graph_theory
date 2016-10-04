// fdescribe('Edge', function() {
// 	beforeAll(function() {
// 		console.log('\n.........Edge Spec.........');
// 	});

// 	beforeEach(function() {
// 		// myNabes = Edge.spawn();
// 		// console.log(Array.from(firstTen, e => [e]));
// 		myNabes = Array.from(firstTen, e => [e]).reduce(Edge.addNeighbor,
// 			Edge.spawn());
// 		// console.log(fmap);
// 		// Edge.spawnEdges();
// 		edgeR = firstTen.reduce(Edge.createEdge, Edge.spawnEdges());
// 		console.log(edgeR);
// 	});

// 	describe('spawn(nabes)', () => {
// 		it('returns a new Map', () => {
// 			expect(Edge.spawn() instanceof Map).toBeTrue();
// 		});
// 	});
// 	describe('addNeighbor(nabes, [n,w])', () => {
// 		it('adds an entry to the nabes', () => {
// 			// myNabes = Edge.addNeighbor(myNabes, [n0, 3]);
// 			// console.log(myNabes);
// 			// expect(myNabes.has(n0)).toBeTrue();
// 		});
// 	});
// 	describe('removeNeighbor ', () => {
// 		it('retuns a new map with the specified nabe deleted',
// 			function() {
// 				myNabes = Edge.removeNeighbor(myNabes, n0);
// 				expect(myNabes.has(n0)).toBeFalse();
// 			});
// 	});
// 	describe('setWeight ', () => {});
// });
