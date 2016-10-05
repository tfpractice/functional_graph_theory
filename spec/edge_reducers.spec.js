fdescribe('Edge Reducers', function() {
	beforeAll(function() {
		console.log('\n.........Edge Reducers Spec.........');
	});

	beforeEach(function() {
		rEdges = Edge.spawn();
	});

	describe('spawn(nabes)', () => {
		it('returns a new Map', () => {
			expect(Edge.spawn() instanceof Map).toBeTrue();
		});
	});
	describe('appendNew', () => {
		it('adds an entry to the edges Map', () => {
			Edge.appendNew(rEdges)(n0);
			expect(rEdges.has(n0)).toBeTrue();
		});
	});

	describe('addNodes', () => {
		it('adds an entry to the edges Map', () => {
			Edge.addNodes(rEdges)(n0);
			expect(rEdges.has(n0)).toBeTrue();
		});
	});

	describe('appendR', () => {
		it('adds entries to the Map via reduce', () => {
			Edge.appendR(rEdges, n0);
			expect(rEdges.has(n0)).toBeTrue();
		});
	});

	describe('rmNode', () => {
		it('removes a node from the edges map', () => {
			Edge.appendR(rEdges, n0);
			rEdges = Edge.rmNode(rEdges)(n0);
			expect(rEdges.has(n0)).toBeFalse();
		});
	});
	describe('rmNodeR', () => {
		it('removes a node from the edges map', () => {
			Edge.appendR(rEdges, n0);
			rEdges = Edge.rmNodeR(rEdges, n0);
			expect(rEdges.has(n0)).toBeFalse();
		});
	});
	describe('removeNodes', () => {
		it('removes the nodes from the edges', function() {
			Edge.addNodes(rEdges)(n0, n1, n2, n3);
			Edge.removeNodes(rEdges)(n0, n2);
			expect(rEdges.has(n1)).toBeTrue();
			expect(rEdges.has(n0)).not.toBeTrue();
		});
	});

	describe('addEdges', () => {
		it('adds an neighbor entry for each node', () => {
			let nabes = Edge.addEdges(rEdges)(n0)(n1, n2, n3);
			expect(nabes.has(n2)).toBeTrue();
		});
	});
	describe('neighbors', () => {
		it('returns a new map of the src neighbors', () => {
			let nabes = Edge.neighbors(rEdges)(n0);
			expect(nabes instanceof Map).toBeTrue();
		});
	});
	describe('appendNabe', () => {
		it('adds a neigbor and weight to the src entry', function() {
			let nabes = Edge.appendNabe(rEdges)(n0)(n1, 3);
			expect(nabes.has(n1)).toBeTrue();
		});
	});
	describe('appendNabe', () => {
		it('adds a neigbor and weight to the src entry', function() {
			let nabes = Edge.appendNabeR(Edge.neighbors(rEdges)(n0), n1, 3);
			expect(nabes.has(n1)).toBeTrue();
		});
	});
	describe('weighedEntry', () => {
		it('returns a [node, weight] array', function() {
			expect(Edge.weighedEntry(0)(n2)).toBeArray();
		});
	});
	describe('addEntry', () => {
		it('appends an [node, weight] pair to the neighbrs', () => {
			let nabes = Edge.appendNabeR(Edge.neighbors(rEdges)(n0), n1, 3);
			let w0n2 = Edge.weighedEntry(0)(n2);
			Edge.addEntry(nabes)(w0n2);
			expect(Edge.neighbors(rEdges)(n0).has(n2)).toBeTrue();
		});
	});
});