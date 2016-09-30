const { AsyncOps } = require('../index');
const { addNodesAsync, addEdgeAsync, removeEdgeAsync, } = AsyncOps;
const { removeNodeAsync, addNeighborAsync, } = AsyncOps;
const { importEdgeAsync, mergeGraphsAsync, } = AsyncOps;
describe('async', function () {
    it('should behave...', function () {
        e5 = eNodes[2];
		console.log(contains(evenGraph)(e5));

		// removeNodeAsync(evenGraph)(e5)
		// 	.then((g) =>
		// 		console.log('' + g))
        // 	.catch(e => e);
    });
});
