fdescribe('Utils', function() {
	let testMap, testSet;
	let nabes0;
	// let Node;
	// let n0, n1, n2, n3, n4, n5, n6;
	// let myNodes, xNodes;
	// let myGraph;
	beforeEach(function() {
		nabes0 = neighbors(myGraph)(n0);
		myEdges = edges(myGraph);
	});
	// beforeAll(function() {
	//     ({ Graph } = this.App);
	//     ({ makeEdges, makeGraph, nodes, edges } = Graph);
	//     ({ neighbors, contains, isAdjacent } = Graph);
	//     ({ clearNodes, clearEdges } = Graph);

	//     Node = (label = '', data = {}) => ({
	//         label,
	//         data,
	//         toString: () =>
	//             label,
	//     });
	describe('spreadKeys', () => {
		it('returns an array of Map keys', function() {
			expect(utils.spreadKeys(myEdges)).toBeArray();
			expect(utils.spreadKeys(myEdges)).toContain(n0);
		});
	});
	describe('spreadValues', () => {
		it('returns an array of map values', function() {
			expect(utils.spreadValues(myEdges)).toBeArray();
			// expect(utils.spreadValues(myEdges)).toContain(n0);
		});
	});
	describe('spreadEntries', () => {
		it('returns an array of key values pairs of each map entry',
			function() {
				expect(utils.spreadEntries(myEdges)[0]).toBeArray();

			});
	});
	describe('lastKey', () => {
		it('retrievs the last key in a map', function() {
			expect(utils.lastKey(myEdges)).toBe(n6);

		});
	});
	describe('firstKey', () => {
		it('retrieves the last key in a map', function() {
			expect(utils.firstKey(myEdges)).toBe(n0);

		});
	});

	describe('rmFirst', () => {
		it('deletes the last key in a map', function() {
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