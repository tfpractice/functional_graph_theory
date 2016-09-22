fdescribe('traversal functions', () => {
	let myDepth, myBreadth;
	beforeAll(function() {
		console.log('\n.........Traversals Spec.........');
	});

	beforeEach(function() {
		addEdge(myGraph)(n0)(n1, 1);
		addEdge(myGraph)(n0)(n2, 2);
		addEdge(myGraph)(n1)(n4, 4);
		addEdge(myGraph)(n1)(n6, 6);
		addEdge(myGraph)(n2)(n3, 3);
		addEdge(myGraph)(n5)(n4, 4);
		addEdge(myGraph)(n1)(n2, 4);
		addEdge(myGraph)(n3)(n4, 8);
		addEdge(myGraph)(n5)(n6, 7);
		myDepth = trav.dfs(myGraph)(n0);
		myBreadth = trav.bfs(myGraph)(n5);
	});

	describe('unvisitedNeighbors', () => {
		it('returns nodes not in path', () => {
			let localPath = new Map().set(n0, {});
			let currNabes = trav.unvisitedNeighbors(myGraph)(localPath)(n0);
			expect(currNabes).toContain(n1);
		});
	});
	describe('unvisitedMap', () => {
		it('returns a map of nodes not in path', () => {
			let localPath = new Map().set(n0, {});
			let currNabes = (trav.unvisitedMap(myGraph)(localPath)(n0));
			expect(currNabes instanceof Map).toBeTrue();
			expect([...currNabes.keys()]).toContain(n1);
		});
	});
	describe('trav.dfs', () => {
		it('returns a map of nodes and neighbors', () => {
			expect((trav.dfs(myGraph)(n0) instanceof Map)).toBeTrue();
		});
	});
	describe('bfs', () => {
		it('returns a map of nodes and neighbors', () => {
			expect((trav.bfs(myGraph)(n0) instanceof Map)).toBeTrue();
		});
	});
	// describe('reachable', () => {
	// 	it('checks for a  path connecting two nodes', () => {
	// 		expect(reachable(myGraph)(n0)(n6)).toBeTrue();
	// 	});
	// });
	describe('dijkstra', () => {
		it('retuns the shortest path from a node to its neighbors', () => {
			expect((trav.dijkstra(myGraph)(n0) instanceof Map)).toBeTrue();
		});
	});
	describe('components', () => {
		it('retuns a map of nodes and paths', () => {
			expect((trav.components(myGraph) instanceof Map)).toBeTrue();

		});
	});
	// describe('pathString', () => {
	// 	it('shows the insertion order of each node in a path', () => {
	// 		console.log(pathString(trav.dfs(myGraph)(n0)));
	// 		expect(pathString(trav.dfs(myGraph)(n0))).toBeString();

	// 	});
	// });
	// describe('showGraph', () => {
	// 	it('shows each node and neighbors', () => {
	// 		console.log(showGraph(myGraph));
	// 		expect(showGraph(myGraph)).toBeString();

	// 	});
	// });
	// describe('pathHasNode', () => {
	// 	it('checks if a path contains node', () => {
	// 		expect(pathHasNode(myDepth)(n0)).toBeTrue();
	// 	});
	// });
});