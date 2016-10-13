fdescribe('Utils/Queries', function() {
	beforeAll(function() {
		console.log('\n.........U/Queries Spec.........');
	});

	beforeEach(function() {
		nabes0 = Graph.neighbors(myGraphR)(n0);
		myEdges = Graph.spawn(myGraphR);
	});

	describe('accessors', () => {
		describe('spread', () => {
			it('returns an array of the collections default values', () => {
				expect(utils.spread(myEdges)).toBeArray();
			});
		});
		describe('spreadK', () => {
			it('returns an array of Map keys', () => {
				expect(utils.spreadK(myEdges)).toBeArray();
				expect(utils.spreadK(myEdges)).toContain(n0);
			});
		});
		describe('spreadV', () => {
			it('returns an array of map values', () => {
				expect(utils.spreadV(myEdges)).toBeArray();
			});
		});
		describe('spreadKV', () => {
			it('returns an array of key values pairs', () => {
				expect(utils.spreadKV(myEdges)[0]).toBeArray();
			});
		});
		describe('first', () => {
			it('returns the first value of a collection', () => {
				expect(utils.first([1, 2, 3])).toBe(1);
			});
		});
		describe('last', () => {
			it('returns the last value of a collection', () => {
				expect(utils.last([1, 2, 3])).toBe(3);
			});
		});
		describe('lastK', () => {
			it('retrievs the last key in a map', () => {
				expect(utils.lastK(myEdges)).toBe(n9);
			});
		});
		describe('firstK', () => {
			it('retrieves the last key in a map', () => {
				expect(utils.firstK(myEdges)).toBe(n0);
			});
		});
		describe('rmFirst', () => {
			it('deletes the last key in a map/set', () => {
				let copied = new Set(Graph.nodes(myGraphR));
				let first = utils.rmFirst((copied));
				expect(first).toBe(n0);
				expect(copied.has(n0)).toBeFalse();
			});
		});
		describe('hasK', () => {
			it('checks a path for a node', () => {
				expect(utils.hasK(myEdges)(n0)).toBeTrue();
			});
		});
		describe('x_hasK', () => {
			it('checks a path for a node', () => {
				expect(utils.x_hasK(myEdges)(n0)).toBeFalse();
			});
		});
		describe('hasKV', () => {
			it('checks a path for an entry', () => {
				let first = [...myEdges][0];
				expect(utils.hasKV(myEdges)(first)).toBeTrue();
			});
		});
		describe('x_hasKV', () => {
			it('checks a path for an entry', () => {
				let first = [...myEdges][0];
				expect(utils.x_hasKV(myEdges)(first)).toBeFalse();
			});
		});
	});
});