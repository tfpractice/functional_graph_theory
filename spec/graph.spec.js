fdescribe('Graph', function() {
	beforeAll(function() {
		console.log('\n.........Graph Spec.........');
	});

	it('is a function', () => {
		expect(Graph).toBeFunction();
	});

	describe('when given a collection of elements', () => {
		describe('makeEdges(...elements)', () => {
			it('returns a new Map of those elements', () => {
				expect(makeEdges(...myNodes) instanceof Map).toBeTrue();
			});
		});
		describe('makeGraph(...elements)', () => {
			it('returns a new object with nodes and edges', () => {
				expect(makeGraph(...myNodes)).toBeObject();
			});
		});
	});
	describe('accessors', () => {
		describe('nodes', () => {
			it('returns a set of the nodes from that graph', () => {
				expect(nodes(myGraph) instanceof Set).toBeTrue();
			});
		});
		describe('edges', () => {
			it('returns a set of the nodes from that graph', () => {
				expect(edges(myGraph) instanceof Map).toBeTrue();
			});
		});
		describe('neighbors(edge)(node)', () => {
			it('returns a map entry of that nodes neighbors ', () => {
				expect(neighbors(myGraph)(n0) instanceof Map).toBeTrue();

			});
		});
		describe('contains(graph)(node)', () => {
			it('checks for the presence of a node in the graph', () => {
				expect(contains(myGraph)(n0)).toBeTrue();
			});
		});
		describe('isAdjacent(graph)(n0)(n1)', () => {
			it('checks for the presence of a node in the graph', () => {
				expect(isAdjacent(myGraph)(n0)(n1)).toBeFalse();
			});
		});
		describe('showGraph(graph)', () => {
			it('returns a string representation the graph', () => {
				expect(showGraph(myGraph)).toBeString();
			});
		});
		describe('addEdge(n0)(n1,weight)', () => {
			it('updates each nodes edge entry', () => {
				addEdge(myGraph)(n0)(n1, 2);
				expect(neighbors(myGraph)(n0).has(n1)).toBeTrue();
				expect(neighbors(myGraph)(n0).get(n1)).toBe(2);
			});
		});
		describe('removeEdge', () => {
			it('removes an entry from the edgs map', () => {
				addEdge(myGraph)(n0)(n1, 2);
				removeEdge(myGraph)(n0)(n1);
				expect(neighbors(myGraph)(n0).has(n1)).toBeFalse();
				expect(neighbors(myGraph)(n0).get(n1)).toBeUndefined();
			});
		});
	});

});