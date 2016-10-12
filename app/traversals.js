const UTILS = require('./utils');
const { spreadK, spreadV, spreadKV } = UTILS;
const { lastK, firstK, rmFirst, } = UTILS;
const { hasKey, x_hasKey } = UTILS;
const { pathHasEntry, x_pathHasEntry } = UTILS;
const { componentString } = UTILS;

const initPath = (node) =>
	new Map().set(node, { pred: null, weight: 0, length: 0 });

const pathEntry = (pred) => ([n, w]) => [pred, n, w];

const appendSet = (set = new Set, val) => set.add(val);

const appendEntry = (path = new Map, [pred, n, w]) => {
	let { length: pCount, weight: pWeight } = path.get(pred);
	let length = pCount + 1;
	let weight = pCount + w;
	return path.set(n, { pred, length, weight });
};

const difference = (s0) => (s1) => spreadV(s0).filter(x_hasKey(s1));
const unvisitedNeighbors = (edges) => (path) => (node) =>
	spreadK(edges.get(node)).filter(x_hasKey(path));

const unvisitedMap = (edges) => (path) => (node) =>
	new Map(spreadKV(edges.get(node)).filter(x_pathHasEntry(path)));

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
		let pred = rmFirst(bQueue);
		let nextNabes = unvisitedMap(edges)(bPath)(pred);
		spreadKV(nextNabes)
			.map(pathEntry(pred))
			.reduce(appendEntry, bPath);
		spreadK(nextNabes).reduce(appendSet, bQueue);
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
			let dMap = { pred: pred, length: dCount + 1, weight: dWeight + nWeight };
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
	const mapEntry = (comp = new Set) => (node) => [node, comp];

	const appE = (mMap, [node, comp]) => mMap.set(node, comp);

	const vc = (comp = new Set, node) =>
		comp.add(node) && unvisitedNeighbors(edges)(comp)(node).reduce(vc, comp);

	const visitMap = (mMap = new Map, node) =>
		difference(vc(new Set, node))(mMap)
		.map(mapEntry(vc(new Set, node)))
		.reduce(appE, mMap);

	return spreadK(edges).reduce(visitMap, new Map);
};

const componentSet = (edges) => new Set(spreadV(components(edges)));
const pathBetween = (edges) => (n0) => (n1) => components(edges).get(n0).has(n1);

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