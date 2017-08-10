import {
  addMap,
  asMap,
  asSet,
  first,
  flatten,
  flattenBin,
  isIterable,
  removeBin,
  spread,
} from 'fenugreek-collections';
import { adj, copy, mergeEdges, neighbors, nodes, removeNodes, } from './graph';
import * as reducers from './reducers';

export const autoSpread = el =>
  isIterable(el) ? spread(el).reduce(flattenBin, []).map(autoSpread) : el;

export const superNode = src => nb => asSet([ src, nb ]);

export const combineNeighbors = g => src => nb =>
  asSet(flatten(neighbors(g)(src))(neighbors(g)(nb)));

export const combineAdj = g => src => nb =>
  asMap(flatten(adj(g)(src))(adj(g)(nb)));

export const superAdj = g => src => nb =>
  [ src, nb ].reduce(removeBin, combineAdj(g)(src)(nb));

export const superEdge = g => src => nb =>
  addMap()(superNode(src)(nb))(superAdj(g)(src)(nb));

export const contract = g => src => (nb = first(neighbors(g)(src))) =>
  nb ? mergeEdges(removeNodes(g)(src, nb))(superEdge(g)(src)(nb)) : g;

export const contractBin = (g, [ src, nb ]) => contract(g)(src)(nb);

export const contractSrc = g => src =>
  reducers.neighborPairs(g)(src).reduce(contractBin, copy(g));

export const contractNext = (g, n = first(nodes(g))) => contract(copy(g))(n)();

export const contractAuto = g => nodes(g).reduce(contractNext, g);
export const contractMin = (g, min = 2) =>
  g.size > min ? contractMin(contractNext(g), min) : copy(g);
