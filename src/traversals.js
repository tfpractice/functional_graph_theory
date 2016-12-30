const Utils = require('./utils');
const { Commands: { spread, spreadK, spreadV, spreadKV, popFirst }} = Utils;
const { Commands: { tuple, flatTuple, triple, addMap, addSet }} = Utils;
const { Queries: { lastK, hasK, x_hasK, hasKV, x_hasKV }} = Utils;
const { Strings: { componentString }} = Utils;
const { Comparitors: { diff, mapDiff }} = Utils;

const pathVal = (pred = null) => (length = 1) => (weight = 0) =>
  ({ pred, length, weight });

const addSrc = (path = new Map) => src =>
  path.set(src, { pred: lastK(path), weight: 0, length: 1 });

const initPath = node => addSrc()(node);
const ptW = ({ weight = 0 }) => weight;
const ptL = ({ length = 1 }) => length;
const lastVal = path => path.get(lastK(path));
const lastW = path => ptW(lastVal(path));
const lastL = path => ptL(lastVal(path));
const nextW = path => (w = 0) => lastW(path) + w;
const nextL = path => lastL(path) ? lastL(path) + 1 : 1;

const nextPath = (path = new Map, [ n, w = 0 ]) =>
  path.set(n, pathVal(lastK(path))(nextL(path))(nextW(path)(w)));

const dfs = edges => (src) => {
  const trav = (path = initPath(src), [ n, w ] = [ lastK(path), 0 ]) =>
    spread(mapDiff(edges.get(n))(path)).reduce(trav, nextPath(path, [ n, w ]));

  return trav(initPath(src));
};

const bfs = edges => (iNode) => {
  const bVisit = bPath => (bQueue) => {
    const pred = popFirst(bQueue);
    const nextNabes = mapDiff(edges.get(pred))(bPath);

    spread(nextNabes).reduce(nextPath, bPath);
    spreadK(nextNabes).reduce(addSet, bQueue);
    return bQueue.size > 0 ? bVisit(bPath)(bQueue) : bPath;
  };

  return bVisit(initPath(iNode))(new Set([ iNode ]));
};

const dijkstra = edges => (iNode) => {
  const reachables = bfs(edges)(iNode);
  const inspectQueue = new Set([ iNode ]);
  const solutionSet = initPath(iNode);

  while (inspectQueue.size > 0) {
    const pred = popFirst(inspectQueue);
    const nextNabes = edges.get(pred);
    let { length: dCount, weight: dWeight } = solutionSet.get(pred);

    for (let [ nabe, nWeight ] of nextNabes) {
      const prevMap = reachables.get(nabe);
      let { length: rCount, weight: rWeight } = prevMap;
      const dMap = { pred, length: dCount + 1, weight: dWeight + nWeight, };
      const sMap = ((dWeight + nWeight) < rWeight) ? dMap : prevMap;

      if (!solutionSet.has(nabe)) {
        inspectQueue.add(nabe);
        solutionSet.set(nabe, sMap);
      }
    }
  }

  return solutionSet;
};

const components = (edges) => {
  const trav = (comp = new Set, node) =>
    diff(spreadK(edges.get(node)))(comp).reduce(trav, comp.add(node));

  const visitMap = (mMap = new Map, node) =>
    diff(trav(new Set, node))(mMap)
      .map(tuple(trav(new Set, node)))
      .reduce(addMap, mMap);

  return spreadK(edges).reduce(visitMap, new Map);
};

const componentSet = edges => new Set(spreadV(components(edges)));
const pathBetween = edges => n0 => n1 =>
  hasK(components(edges).get(n1))(n0);

module.exports = {
  dfs,
  bfs,
  dijkstra,
  components,
  componentSet,
  pathBetween,
};
