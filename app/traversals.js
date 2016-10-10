const UTILS = require('./utils');
const { spreadKeys, spreadValues, spreadEntries } = UTILS;
const { lastKey, firstKey, rmFirst, } = UTILS;
const { pathHasNode, x_pathHasNode } = UTILS;
const { pathHasEntry, x_pathHasEntry } = UTILS;
const { componentString } = UTILS;
const initPath = (node) =>
	new Map().set(node, { pred: null, weight: 0, length: 0 });
const unvisitedNeighbors = (edges) => (path) => (node) =>
	spreadKeys(edges.get(node)).filter(x_pathHasNode(path));
const unvisitedMap = (edges) => (path) => (node) =>
	new Map(spreadEntries(edges.get(node)).filter(x_pathHasEntry(path)));
const pathEntry = (pred) => ([n, w]) => [pred, n, w];
const appendEntry = (path = new Map, [pred, n, w]) => {
	let { length: pCount, weight: pWeight } = path.get(pred);
	let length = pCount + 1;
	let weight = pCount + w;
	return path.set(n, { pred, length, weight });
};

const dfs = (edges) => (iNode) => {
	const dVisit = (path) => {
		let pred = lastKey(path);
		let nextNabes = unvisitedMap(edges)(path)(pred);
		spreadEntries(nextNabes)
			.map(pathEntry(pred))
			.reduce(appendEntry, path);
		return nextNabes.size > 0 ? dVisit(path) : path;
	};

	return dVisit(initPath(iNode));
};

const appendSet = (set = new Set, val) => set.add(val);
const bfs = (edges) => (iNode) => {
	const bVisit = (bPath) => (bQueue) => {
		let pred = rmFirst(bQueue);
		let nextNabes = unvisitedMap(edges)(bPath)(pred);
		spreadEntries(nextNabes)
			.map(pathEntry(pred))
			.reduce(appendEntry, bPath);
		spreadKeys(nextNabes).reduce(appendSet, bQueue);
		return bQueue.size > 0 ? bVisit(bPath)(bQueue) : bPath;
	};

	return bVisit(initPath(iNode))(new Set([iNode]));
};

const dijkstra = (edges) => (iNode) => {
	let reachables = bfs(edges)(iNode);
	let inspectQueue = new Set([iNode]);
	let solutionSet = initPath(iNode);
	while (inspectQueue.size > 0) {
		let pred = rmFirst(inspectQueue);
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
	let cMap = new Map();
	const visitComponent = (comp = new Set, node) => {
		if (!cMap.has(node)) {
			cMap.set(node, appendSet(comp, node));
			return unvisitedNeighbors(edges)(comp)(node)
				.reduce(visitComponent, comp);
		}
	};

	spreadKeys(edges).reduce(visitComponent, new Set);

	return cMap;
};

module.exports = {
	dfs,
	bfs,
	dijkstra,
	components,
	unvisitedMap,
	unvisitedNeighbors,
};