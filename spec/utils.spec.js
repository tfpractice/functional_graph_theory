describe('Utils', function() {
	let nabes0;
	beforeAll(function() {
		console.log('\n.........Utils Spec.........');
	});

	beforeEach(function() {
		nabes0 = neighbors(myGraph)(n0);
		myEdges = edges(myGraph);
	});

	describe('spreadKeys', () => {
		it('returns an array of Map keys', () => {
			expect(utils.spreadKeys(myEdges)).toBeArray();
			expect(utils.spreadKeys(myEdges)).toContain(n0);
		});
	});
	describe('spreadValues', () => {
		it('returns an array of map values', () => {
			expect(utils.spreadValues(myEdges)).toBeArray();
		});
	});
	describe('spreadEntries', () => {
		it('returns an array of key values pairs', () => {
			expect(utils.spreadEntries(myEdges)[0]).toBeArray();
		});
	});
	describe('lastKey', () => {
		it('retrievs the last key in a map', () => {
			expect(utils.lastKey(myEdges)).toBe(n9);
		});
	});
	describe('firstKey', () => {
		it('retrieves the last key in a map', () => {
			expect(utils.firstKey(myEdges)).toBe(n0);
		});
	});
	describe('rmFirst', () => {
		it('deletes the last key in a map', () => {
			let first = utils.rmFirst((myGraph.nodes));
			expect(first).toBe(n0);
			expect(contains(myGraph)(n0)).toBeFalse();
		});
	});
	describe('pathHasNode', () => {
		it('checks a path for a node', function() {
			expect(utils.pathHasNode(myEdges)(n0)).toBeTrue();
		});
	});
	describe('x_pathHasNode', () => {
		it('checks a path for a node', function() {
			expect(utils.x_pathHasNode(myEdges)(n0)).toBeFalse();
		});
	});
	describe('pathHasEntry', () => {
		it('checks a path for an entry', function() {
			let first = [...myEdges][0];
			expect(utils.pathHasEntry(myEdges)(first)).toBeTrue();
		});
	});
	describe('x_pathHasEntry', () => {
		it('checks a path for an entry', function() {
			let first = [...myEdges][0];
			expect(utils.x_pathHasEntry(myEdges)(first)).toBeFalse();
		});

	});
});