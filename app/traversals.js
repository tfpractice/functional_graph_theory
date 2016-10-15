const Utils = require('./utils');
const { Commands: { spreadK, spreadV, spreadKV, popFirst } } = Utils;
const { Commands: { tuple, triple, rmColl, addMap, addSet } } = Utils;
const { Queries: { lastK, hasK, x_hasK, hasKV, x_hasKV } } = Utils;
const { Strings: { componentString } } = Utils;
const { Comparitors: { diff, } } = Utils;

const initPath = (node) =>
	new Map().set(node, { pred: null, weight: 0, length: 0 });

const pathEntry = (pred) => ([n, w]) => [pred, n, w];

const appendEntry = (path = new Map, [pred, n, w]) => {
	let { length: pCount, weight: pWeight } = path.get(pred);
	let length = pCount + 1;
	let weight = pCount + w;
	return path.set(n, { pred, length, weight });
};

const unvisitedNeighbors = (edges) => (path) => (node) =>
	diff(spreadK(edges.get(node)))(path);

const unvisitedMap = (edges) => (path) => (node) =>
	new Map(spreadKV(edges.get(node)).filter(x_hasKV(path)));

const dfs = (edges) => (iNode) => {
	const dVisit = (path) => {
		let pred = lastK(path);
		let nextNabes = unvisitedMap(edges)(path)(pred);
		spreadKV(nextNabes)
			.map(pathEntry(pred))
			.reduce(appendEntry, path);
		return nextNabes.size > 0 ? dVisit(path) : path;
	};

	return dVisit(initPath(iNode));
};

const bfs = (edges) => (iNode) => {
	const bVisit = (bPath) => (bQueue) => {
		let pred = popFirst(bQueue);
		let nextNabes = unvisitedMap(edges)(bPath)(pred);
		spreadKV(nextNabes)
			.map(pathEntry(pred))
			.reduce(appendEntry, bPath);
		spreadK(nextNabes).reduce(addSet, bQueue);
		return bQueue.size > 0 ? bVisit(bPath)(bQueue) : bPath;
	};

	return bVisit(initPath(iNode))(new Set([iNode]));
};

const dijkstra = (edges) => (iNode) => {
	let reachables = bfs(edges)(iNode);
	let inspectQueue = new Set([iNode]);
	let solutionSet = initPath(iNode);
	while (inspectQueue.size > 0) {
		let pred = popFirst(inspectQueue);
		let nextNabes = edges.get(pred);
		let { length: dCount, weight: dWeight } = solutionSet.get(pred);
		for (let [nabe, nWeight] of nextNabes) {
			let prevMap = reachables.get(nabe);
			let { length: rCount, weight: rWeight } = prevMap;
			let dMap = { pred: pred, length: dCount + 1, weight: dWeight + nWeight, };
			let sMap = ((dWeight + nWeight) < rWeight) ? dMap : prevMap;
			if (!solutionSet.has(nabe)) {
				inspectQueue.add(nabe);
				solutionSet.set(nabe, sMap);
			}
		}
	}

	return solutionSet;
};

const components = (edges) => {
	const vc = (comp = new Set, node) =>
		unvisitedNeighbors(edges)(comp)(node).reduce(vc, comp.add(node));

	const visitMap = (mMap = new Map, node) =>
		diff(vc(new Set, node))(mMap)
		.map(tuple(vc(new Set, node)))
		.reduce(addMap, mMap);

	return spreadK(edges).reduce(visitMap, new Map);
};

const componentSet = (edges) => new Set(spreadV(components(edges)));
const pathBetween = (edges) => (n0) => (n1) => hasK(components(edges))(n1);

module.exports = {
	dfs,
	bfs,
	dijkstra,
	components,
	componentSet,
	pathBetween,
	unvisitedMap,
	unvisitedNeighbors,
};