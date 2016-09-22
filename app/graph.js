let Graph = (...elements) => {
	// let gState = makeGraph(...elements);
	// return {
	//     nodes: nodes(gState),
	//     edges: edges(gState),
	//     neighbors: neighbors(gState),
	//     contains: contains(gState),
	//     addEdge: addEdge(gState),
	//     removeEdge: removeEdge(gState),
	//     isAdjacent: isAdjacent(gState),
	// };
	return { nodes: new Set(elements) };
};

module.exports = Graph;