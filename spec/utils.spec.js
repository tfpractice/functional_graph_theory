fdescribe('Utils', function() {
	let nabes0;

	beforeEach(function() {
		nabes0 = neighbors(myGraph)(n0);
		myEdges = edges(myGraph);
	});
	// beforeAll(function() {
	//     });
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
			expect(utils.lastKey(myEdges)).toBe(n6);

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

	describe('pathHasNode', () => {});
	describe('x_pathHasNode', () => {});
	describe('pathHasEntry', () => {});
	describe('x_pathHasEntry', () => {});

});