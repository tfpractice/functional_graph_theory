
import { lastK, mapDiff, spread, } from 'fenugreek-collections';
import { addEdges, addEntry, addNeighbor, addNodes, adj, contains, copy,
 isAdjacent, mergeEdges, mergeNeighbors, neighbors, nodes, removeEdges, removeNodes, resetNodes, } from './graph';
import { graphString, } from './show';
import * as reducers from './reducers';
import { bfs, dfs, dijkstra, pathBetween, } from './search';
import { disconnectNodes, } from './';
import { components, componentSet, } from './components';
import { superNode, } from './contract';
import { initPath, nextPath, } from './path';
export const countComponents = g => componentSet(g).size;

export const selectNeighbor = g => src => nb => nb ?
addEdges(disconnectNodes(g)(src))(src)(nb) : g;

export const selectNeighborBin = (g, [ src, nb ]) => selectNeighbor(g)(src)(nb);
export const compSize = g => componentSet(g).size;
export const sameComps = g0 => g1 => compSize(g0) === compSize(g1);

export const uncut = g => src => nb => sameComps(g)(selectNeighbor(g)(src)(nb));
export const uncutKey = g => src => ([ n, w ]) => uncut(g)(src)(n);
export const safeNabes = g => src => neighbors(g)(src).filter(uncut(g)(src));
export const nextUncut = g => src => neighbors(g)(src).find(uncut(g)(src));
const single = ([ el, ...rest ]) => [ el ];

export const safeSearch = g => (src) => {
  const trav = (path = initPath(src), [ n, w ] = [ lastK(path), 0 ]) =>
    (spread(mapDiff(g.get(n))(path)).filter(uncutKey(g)(n)))
      .reduce(trav, nextPath(path, [ n, w ]));

  return trav(initPath(src));
};

export const safeReduce = g => src => selectNeighbor(g)(src)(nextUncut(g)(src));
export const safeReduceBin = (g, src) =>
(selectNeighbor(g)(src)(nextUncut(g)(src)));
