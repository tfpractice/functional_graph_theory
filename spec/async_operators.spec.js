fdescribe('async', function() {
	beforeAll(function() {
		console.log('\n.........AsyncOps Spec.........');
		({ addNodesAsync, addEdgesAsync, removeEdgeAsync } = AsyncOps);
		({ removeNodeAsync, addNeighborAsync, } = AsyncOps);
		({ importEdgeAsync, mergeEdgesAsync, } = AsyncOps);
	});

	beforeEach(function() {
		e2 = eNodes[2];
		o2 = oNodes[2];
	});

	describe('addNodesAsync', () => {
		it('adds a node to the graph', (done) => {
			addNodesAsync(oddGraphR)(e2);
			expect(Edge.contains(oddGraphR)(e2)).toBeTrue();
			done();
		});
	});

	describe('addEdgesAsync(e2)(o2,weight)', () => {
		it('updates each nodes edge entry', (done) => {
			addEdgesAsync(oddGraphR)(e2, 2)(o2);
			expect(Edge.neighbors(oddGraphR)(e2)).toContain(o2);
			expect((oddGraphR).get(e2).get(o2)).toBe(2);
			done();
		});
	});
	// describe('importEdgeAsync(e2)(o2,weight)', () => {
	// 	it('updates each nodes edge entry', (done) => {
	// 		let firstOdd = [...oddGraphR.edges.entries()][0];
	// 		let OddNode = firstOdd[0];
	// 		let OddNabe = [...firstOdd[1].keys()][0];
	// 		importEdgeAsync(evenGraph)(firstOdd);
	// 		expect(contains(evenGraph)(OddNode)).toBeTrue();
	// 		expect(contains(evenGraph)(OddNabe)).toBeTrue();
	// 		done();
	// });
	// });
	// describe('removeEdgeAsync', () => {
	// 	it('removes an entry from the edgs map', (done) => {
	// 		let firstOdd = [...oddGraphR.edges.entries()][0];
	// 		let OddNode = firstOdd[0];
	// 		let OddNabe = [...firstOdd[1].keys()][0];
	// 		importEdge(evenGraph)(firstOdd);
	// 		removeEdge(evenGraph)(OddNode)(OddNabe);
	// 		expect(isAdjacent(evenGraph)(OddNode)(OddNabe)).not.toBeTrue();
	// 		done();
	// 	});
	// });
	describe('removeNodeAsync', () => {
		it('removes an entry from the edgs map', (done) => {
			let firstOdd = utils.spreadEntries(oddGraphR)[0];
			let OddNode = firstOdd[0];
			let OddNabe = utils.spreadKeys(firstOdd[1])[0];
			mergeEdgesAsync(evenGraphR)(oddGraphR);
			removeNodeAsync(evenGraphR)(OddNode);
			expect(Edge.contains(evenGraphR)(OddNode)).toBeFalse();
			done();
		});
	});
	describe('mergeEdgesAsync(e2)(o2,weight)', () => {
		it('merges nodes and edges of two graphs', (done) => {
			let elevOdd = utils.spreadEntries(oddGraphR)[3];
			let OddNode = elevOdd[0];
			mergeEdgesAsync(evenGraphR)(oddGraphR);
			expect(Edge.contains(evenGraphR)(OddNode)).toBeTrue();
			done();
		});
	});
});