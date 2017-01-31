import { addBinMap, addBinSet, diff, get, hasK, lastK, mapDiff, popFirst,
   spread, spreadK, spreadV, tuple, } from 'fenugreek-collections';
import { appendPath, initPath, nextPath, } from './path';
import { components, } from './components';
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

export const pathBetween = edges => n0 => n1 => hasK(get(components(edges))(n0))(n1);

// hasK(components(edges).get(n1))(n0);
