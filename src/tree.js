import { collections, } from 'turmeric-utils';
import { addEdges, addEntry, addNeighbor, addNodes, adj, contains, copy,
  fromElements, isAdjacent, mergeEdges, mergeNeighbors, neighbors, nodeNeighbors,
  nodes, removeEdges, removeNodes, resetNodes, spawn, } from './graph';
import { graphString, } from './strings';
import * as reducers from './reducers';
import { bfs, components, componentSet, dfs, dijkstra, pathBetween, } from './search';
import { disconnectNodes, } from './';
import { superNode, } from './operations';
export const countComponents = g => componentSet(g).size;

export const selectNeighbor = g => src => nb =>
addEdges(disconnectNodes(g)(src))(src)(nb);

export const selectNeighborBin = (g, [ src, nb ]) => selectNeighbor(g)(src)(nb);
