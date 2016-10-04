// fdescribe('Graph reducers', function() {
// 	beforeAll(function() {
// 		console.log('\n.........GraphReducer Spec.........');
// 	});

// 	beforeEach(function() {
// 		rGraph = Graph.spawn();
// 		rEdges = firstTen.reduce(Graph.createEdge, rGraph);
// 		// myNabes = Graph.spawn();
// 		// console.log(Array.from(firstTen, e => [e]));
// 		// myNabes = Array.from(firstTen, e => [e]).reduce(Graph.addNeighbor,
// 		//     Graph.spawn());
// 		// console.log(fmap);
// 		// console.log([...new Map(firstTen)]);
// 	});

// 	describe('spawn(nabes)', () => {
// 		it('returns a new Map', () => {
// 			// console.log(Graph.spawn());
// 			expect(Graph.spawn()).toBeObject();
// 			// expect(Graph.spawn() instanceof Map).toBeTrue();
// 		});
// 	});
// 	describe('createEdge({edges},src)', () => {
// 		it('adds an entry to the nabes', () => {
// 			e0 = Graph.createEdge(rGraph, n0);
// 			// console.log(e0);
// 			// console.log(myNabes);
// 			// expect(myNabes.has(n0)).toBeTrue();
// 		});
// 	});
// 	// describe('removeNeighbor ', () => {
// 	//     it('retuns a new map with the specified nabe deleted', function () {
// 	//         myNabes = Graph.removeNeighbor(myNabes, n0);
// 	//         expect(myNabes.has(n0)).toBeFalse();
// 	//     });
// 	// });
// 	// describe('setWeight ', () => {});
// });
