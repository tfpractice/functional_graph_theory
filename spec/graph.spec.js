fdescribe('Graph', function() {
	let Node;
	let n0, n1, n2, n3, n4, n5, n6;
	let myNodes, xNodes;
	let myGraph;
	beforeAll(function() {
		({ Graph } = this.App);
		({ makeEdges, makeGraph, nodes, edges } = Graph);
		({ neighbors, contains, isAdjacent } = Graph);
		({ clearNodes, clearEdges } = Graph);

		Node = (label = '', data = {}) => ({
			label,
			data,
			toString: () =>
				label,
		});
	});

	beforeEach(function() {
		myNodes = Array(7).fill('node').map((el, id) =>
			Node(`${el}::${id}`, { position: id })
		);
		altNodes = Array(7).fill('altnode').map((el, id) =>
			Node(`${el}::${id}`, { position: id })
		);
		[n0, n1, n2, n3, n4, n5, n6] = myNodes;
		myGraph = Graph(...myNodes);
	});

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