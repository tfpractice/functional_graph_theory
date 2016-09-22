fdescribe('Graph', function() {
	it('is a function', function() {
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
			it('returns a map entry of that nodes neighbors ', function() {
				expect(neighbors(myGraph)(n0) instanceof Map).toBeTrue();

			});
		});
		describe('contains(graph)(node)', () => {
			it('checks for the presence of a node in the graph', function() {
				expect(contains(myGraph)(n0)).toBeTrue();
			});
		});
		describe('isAdjacent(graph)(n0)(n1)', () => {
			it('checks for the presence of a node in the graph', function() {
				expect(isAdjacent(myGraph)(n0)(n1)).toBeFalse();
			});
		});
	});

});