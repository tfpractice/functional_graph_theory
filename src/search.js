import { addBinMap, addBinSet, diff, hasK, lastK, mapDiff, popFirst,
   spread, spreadK, spreadV, tuple, } from 'fenugreek-collections';
import { appendPath, getLength, getWeight, initPath, lastLength, lastVal,
lastWeight, nextLength, nextPath, nextWeight, pathEntry, } from './path';
const pathVal = (pred = null) => (length = 1) => (weight = 0) =>
  ({ pred, length, weight });

//
// export const getWeight = ({ weight = 0 }) => weight;
// export const getLength = ({ length = 1 }) => length;
// export const lastVal = path => path.get(lastK(path));
// export const lastWeight = path => getWeight(lastVal(path));
// export const lastLength = path => getLength(lastVal(path));
// export const nextWeight = path => (w = 0) => lastWeight(path) + w;
// export const nextLength = path => lastLength(path) ? lastLength(path) + 1 : 1;

// export const nextPath = (path = new Map, [ n, w = 0 ]) =>
//   path.set(n, pathVal(lastK(path))(nextLength(path))(nextWeight(path)(w)));

export const dfs = edges => (src) => {
  const trav = (path = initPath(src), [ n, w ] = [ lastK(path), 0 ]) =>
    spread(mapDiff(edges.get(n))(path)).reduce(trav, nextPath(path, [ n, w ]));

  return trav(initPath(src));
};

export const bfs = edges => (iNode) => {
  const bVisit = bPath => (bQueue) => {
    const pred = popFirst(bQueue);
    const nextNabes = mapDiff(edges.get(pred))(bPath);

    spread(nextNabes).reduce(nextPath, bPath);
    spreadK(nextNabes).reduce(addBinSet, bQueue);
    return bQueue.size > 0 ? bVisit(bPath)(bQueue) : bPath;
  };

  return bVisit(initPath(iNode))(new Set([ iNode ]));
};

export const dijkstra = edges => (iNode) => {
  const reachables = bfs(edges)(iNode);
  const inspectQueue = new Set([ iNode ]);
  const solutionSet = initPath(iNode);

  while (inspectQueue.size > 0) {
    const pred = popFirst(inspectQueue);
    const nextNabes = edges.get(pred);
    const { length: dCount, weight: dWeight } = solutionSet.get(pred);

    for (const [ nabe, nWeight ] of nextNabes) {
      const prevMap = reachables.get(nabe) || { length: 1, weight: 0 };
      const { length: rCount, weight: rWeight } = prevMap;
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

export const components = (edges) => {
  const trav = (comp = new Set, node) =>
     diff(spreadK(edges.get(node)))(comp).reduce(trav, comp.add(node));
  const visitMap = (mMap = new Map, node) =>
     diff(trav(new Set, node))(mMap).map(tuple(trav(new Set, node)))
       .reduce(addBinMap, mMap);

  return spreadK(edges).reduce(visitMap, new Map);
};

export const componentSet = edges => new Set(spreadV(components(edges)));
export const pathBetween = edges => n0 => n1 =>
  hasK(components(edges).get(n1))(n0);
