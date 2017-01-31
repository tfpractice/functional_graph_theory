import { addBinSet, asSet, get, hasK, lastK, mapDiff, popFirst, spread, spreadK, } from 'fenugreek-collections';
import { initPath, nextPath, } from './path';
import { components, } from './components';

// **dfs** `:: Map<edge> -> node -> Map<pathEntry>`
// depth first traversal
export const dfs = edges => (src) => {
  // >**dfs.trav** `:: Map<pathEntry> -> [node, w] -> Map<pathEntry>`
  // >depth first traversal
  const trav = (path = initPath(src), [ n, w ] = [ lastK(path), 0 ]) =>
    spread(mapDiff(edges.get(n))(path)).reduce(trav, nextPath(path, [ n, w ]));
  
  return trav(initPath(src));
};

// **bfs** `:: Map<edge> -> node -> Map<pathEntry>`
// breadth first traversal
export const bfs = edges => (iNode) => {
  const bVisit = bPath => (bQueue) => {
    const pred = popFirst(bQueue);
    const nextNabes = mapDiff(edges.get(pred))(bPath);
    
    spread(nextNabes).reduce(nextPath, bPath);
    spreadK(nextNabes).reduce(addBinSet, bQueue);
    return bQueue.size > 0 ? bVisit(bPath)(bQueue) : bPath;
  };
  
  return bVisit(initPath(iNode))(asSet([ iNode ]));
};

// **dijkstra** `:: Map<edge> -> node -> Map<pathEntry>`
// finds shortest paths from a source node to all node reachable from that node
export const dijkstra = edges => (iNode) => {
  const reachables = bfs(edges)(iNode);
  const inspectQueue = asSet([ iNode ]);
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

// **pathBetween** `:: Map<edge> -> node -> node -> Boolean`
// checks for a path between two nodes
export const pathBetween = e => n0 => n1 => hasK(get(components(e))(n0))(n1);
