fdescribe('Traversal functions', () => {
	beforeAll(function() {
		console.log('\n.........Traversals Spec.........');
	});

	beforeEach(function() {
		myDepth = Trav.dfs(myGraphR)(n0);
		myBreadth = Trav.bfs(myGraphR)(n5);
	});

	describe('unvisitedNeighbors', () => {
		it('returns nodes not in path', () => {
			let localPath = new Map().set(n0, {});
			let currNabes = Trav.unvisitedNeighbors(myGraphR)(localPath)(n0);
			expect(currNabes).toContain(n1);
		});
	});
	describe('unvisitedMap', () => {
		it('returns a map of nodes not in path', () => {
			let localPath = new Map().set(n0, {});
			let currNabes = (Trav.unvisitedMap(myGraphR)(localPath)(n0));
			expect(currNabes instanceof Map).toBeTrue();
			expect([...currNabes.keys()]).toContain(n1);
		});
	});
	describe('Trav.dfs', () => {
		it('returns a map of nodes and neighbors', () => {
			expect((Trav.dfs(myGraphR)(n0) instanceof Map)).toBeTrue();
		});
	});
	describe('bfs', () => {
		it('returns a map of nodes and neighbors', () => {
			expect((Trav.bfs(myGraphR)(n0) instanceof Map)).toBeTrue();
		});
	});
	describe('dijkstra', () => {
		it('retuns the shortest path from a node to its neighbors', () => {
			expect((Trav.dijkstra(myGraphR)(n0) instanceof Map)).toBeTrue();
		});
	});
	describe('components', () => {
		it('retuns a map of nodes and paths', () => {
			expect((Trav.components(myGraphR) instanceof Map)).toBeTrue();
		});
	});
	// describe('intersection', () => {
	// 	it('returns an array of [k,v] pairs which share keys',
	// 		() => {
	// 			let nInter = utils.intersection(myEdges.get(
	// 				n0))(myEdges.get(n1));
	// 			expect(nInter).toBeArray();
	// 		});
	// });
	// describe('difference', () => {
	// 	it('returns an array of [k,v] pairs which share keys',
	// 		() => {
	// 			let nDiff = utils.difference(myEdges.get(n0))
	// 				(myEdges.get(n1));
	// 			expect(nDiff).toBeArray();
	// 		});
	// });
	// describe('union', () => {
	// 	it('returns an array of [k,v] pairs which share keys',
	// 		() => {
	// 			let nUnion = utils.union(myEdges.get(n0))(
	// 				myEdges.get(n1));
	// 			expect(nUnion).toBeArray();
	// 		});
	// });
});