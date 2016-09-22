fdescribe('Graph', function() {
	let Graph;
	let Node;
	let n0, n1, n2, n3, n4, n5, n6;
	let myGraph;
	beforeAll(function() {
		({ Graph } = this.App);
		Node = (label = '', data = {}) => ({
			label,
			data,
			toString: () =>
				label,
		});
	});

	beforeEach(function() {
		let allNodes = Array(7).fill('node').map((el, id) =>
			Node(`${el}::${id}`, { position: id })
		);
		[n0, n1, n2, n3, n4, n5, n6] = allNodes;
		myGraph = Graph(...allNodes);
	});

	it('is a function', function() {
		expect(Graph).toBeFunction();
	});

	// describe('when given nodes', () => {
	// 	it('returns a set of objects', function() {
	// 		console.log(myGraph);
	// 		expect(myGraph.nodes instanceof Set).toBeTrue();
	// 	});
	// });
});