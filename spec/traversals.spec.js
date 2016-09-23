fdescribe('traversal functions', () => {
	let myDepth, myBreadth;
	beforeAll(function() {
		console.log('\n.........Traversals Spec.........');
	});

	beforeEach(function() {
		n10 = Node('node10', { position: 10 });
		n11 = Node('node11', { position: 11 });
		n12 = Node('node12', { position: 12 });
		n13 = Node('node13', { position: 13 });
		evenGraph = Graph(...myNodes, n10, n12);
		oddGraph = Graph(...myNodes, n11, n13);
		addEdge(myGraph)(n0)(n1, 1);
		addEdge(myGraph)(n0)(n2, 2);
		addEdge(myGraph)(n1)(n4, 4);
		addEdge(myGraph)(n1)(n6, 6);
		addEdge(myGraph)(n2)(n3, 3);
		addEdge(myGraph)(n5)(n4, 4);
		addEdge(myGraph)(n1)(n2, 4);
		addEdge(myGraph)(n3)(n4, 8);
		addEdge(myGraph)(n5)(n6, 7);
		//
		//
		addEdge(evenGraph)(n0)(n1, 11);
		addEdge(evenGraph)(n0)(n9, 22);
		addEdge(evenGraph)(n0)(n2, 1);
		addEdge(evenGraph)(n2)(n4, 2);
		addEdge(evenGraph)(n4)(n6, 4);
		addEdge(evenGraph)(n6)(n8, 6);
		addEdge(evenGraph)(n8)(n0, 3);
		addEdge(evenGraph)(n10)(n12, 3);
		addEdge(evenGraph)(n12)(n6, 3);

		addEdge(oddGraph)(n0)(n1, 11);
		addEdge(oddGraph)(n0)(n9, 22);
		addEdge(oddGraph)(n1)(n3, 2);
		addEdge(oddGraph)(n3)(n5, 4);
		addEdge(oddGraph)(n5)(n7, 6);
		addEdge(oddGraph)(n7)(n9, 3);
		addEdge(oddGraph)(n9)(n1, 3);
		addEdge(oddGraph)(n11)(n13, 3);
		addEdge(oddGraph)(n13)(n7, 3);
		myEdges = edges(myGraph);
		oddEdges = edges(oddGraph);
		evenEdges = edges(evenGraph);
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
	describe('intersection', () => {
		it('returns an array of [k,v] pairs which share keys', function() {
			let nInter = utils.intersection(myEdges.get(n0))(myEdges.get(n1));
			// console.log('nInter', new Map(nInter));
			expect(nInter).toBeArray();
		});
	});
	describe('difference', () => {
		it('returns an array of [k,v] pairs which share keys', function() {
			let nDiff = utils.difference(myEdges.get(n0))(myEdges.get(n1));
			// console.log('nDiff', new Map(nDiff));
			expect(nDiff).toBeArray();
		});
	});
	describe('union', () => {
		it('returns an array of [k,v] pairs which share keys', function() {
			let nUnion = utils.union(myEdges.get(n0))(myEdges.get(n1));
			// console.log('nUnion', new Map(nUnion));
			expect(nUnion).toBeArray();
		});
	});
	describe('mergeEdges', () => {
		it('returns an array of [k,v] pairs which share keys', function() {
			let gMerge = utils.mergeEdges(oddGraph)(evenGraph);
			// console.log('nUnion',(gMerge));
			// expect(nUnion).toBeArray();
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