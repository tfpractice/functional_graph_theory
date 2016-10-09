fdescribe(' Reducers', function() {
	beforeAll(function() {
		console.log('\n......... Reducers Spec.........');
		RD = Reducers;
	});

	beforeEach(function() {
		rEdges = Graph.spawn();
		evens = Graph.addNodes()(...eFilter(myNodes));
		odds = Graph.addNodes()(...oNodes);
	});

	describe('appendNew', () => {
		it('adds an entry to the edges Map', () => {
			RD.appendNew(rEdges)(n0);
			expect(rEdges.has(n0)).toBeTrue();
		});
	});

	describe('appendR', () => {
		it('adds entries to the Map via reduce', () => {
			RD.appendR(rEdges, n0);
			expect(rEdges.has(n0)).toBeTrue();
		});
	});

	describe('rmNodeR', () => {
		it('removes a node from the edges map', () => {
			RD.appendR(rEdges, n0);
			rEdges = RD.rmNodeR(rEdges, n0);
			expect(rEdges.has(n0)).toBeFalse();
		});
	});

	describe('addNeighborR', () => {
		it('adds a neigbor and weight to the src entry', () => {
			let nabes = RD.addNeighborR(Graph.adj(
				rEdges)(n0), n1, 3);
			expect(nabes.has(n1)).toBeTrue();
		});
	});

	describe('addEntryR', () => {
		it('appends an [node, weight] pair to the neighbrs', () => {
			let nabes = RD.addNeighborR(Graph.adj(rEdges)(n0), n1, 3);
			let w0n2 = Graph.weighedEntry(0)(n2);
			RD.addEntryR(nabes, w0n2);
			expect(nabes.has(n2)).toBeTrue();
			expect(Graph.adj(rEdges)(n0).has(n2)).not.toBeTrue();
		});
	});
	describe('removeEdgeR', function() {
		it('removes the connections beteen ', function() {
			let rNabes = Graph.addEdges(rEdges)(n0, 0)(
				n1, n2, n3).get(n0);
			RD.removeEdgeR(rEdges, [n0, n1]);
			expect(Graph.adj(rEdges)(n0).has(n1)).toBeFalse();
		});
	});
});