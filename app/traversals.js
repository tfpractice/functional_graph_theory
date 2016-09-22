const UTILS = require('./utils');
const { spreadKeys, spreadValues, spreadEntries } = UTILS;
const { lastKey, firstKey, rmFirst, } = UTILS;
const { pathHasNode, x_pathHasNode } = UTILS;
const { pathHasEntry, x_pathHasEntry } = UTILS;

// let augmentPath = ({ edges }) => (path) => (node) => {
// 	path = path || initPath({ edges })(node);
// 	let pred = lastKey(path);
// 	let pWeight = path.get(pred).weight;
// 	let currWeight = edges.get(pred).get(node);
// 	let weight = pWeight + currWeight;
// 	let length = path.size;
// 	console.log('pred, weight, length', pred, weight, length);
// 	return path.set(node, { pred, weight, length });
// };

let initPath = (node) =>
	new Map().set(node, { pred: null, weight: 0, length: 0 });

let unvisitedNeighbors = ({ edges }) => (path) => (node) =>
	spreadKeys(edges.get(node)).filter(x_pathHasNode(path));

let unvisitedMap = ({ edges }) => (path) => (node) =>
	new Map(spreadEntries(edges.get(node)).filter(x_pathHasEntry(path)));

let dfs = ({ edges }) => (iNode) => {
	let dPath = initPath(iNode);
	let dVisit = (path) => {
		let pred = lastKey(path);
		let { length: pCount, weight: pWeight } = path.get(pred);
		let nextNabes = unvisitedMap({ edges })(path)(pred);
		for (let [nabe, weight] of nextNabes) {
			path.set(nabe, {
				pred,
				length: pCount + 1,
				weight: pWeight + weight,
			});
			dVisit(path);
		};
	};

	dVisit(dPath);
	return dPath;
};

let bfs = ({ edges }) => (iNode) => {
	var bPath = initPath(iNode);
	var bQueue = new Set([iNode]);
	while (bQueue.size > 0) {
		let pred = rmFirst(bQueue);
		let nextNabes = unvisitedMap({ edges })(bPath)(pred);
		let { length: pCount, weight: pWeight } = bPath.get(pred);
		for (let [nabe, weight] of nextNabes) {
			bPath.set(nabe, {
				pred,
				length: pCount + 1,
				weight: pWeight + weight,
			});
			bQueue.add(nabe);
		};
	}

	return bPath;
};

let dijkstra = ({ edges }) => (iNode) => {
	let reachables = bfs({ edges })(iNode);
	let inspectQueue = new Set().add(iNode);
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

module.exports = { dfs, bfs, dijkstra, unvisitedMap, unvisitedNeighbors };