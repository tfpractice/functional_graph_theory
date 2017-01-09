import { collections, } from 'turmeric-utils';
import { addEdges, addEntry, addNeighbor, addNodes, adj, contains, copy,
  fromElements, isAdjacent, mergeEdges, mergeNeighbors, neighbors, nodeNeighbors,
  nodes, removeEdges, removeNodes, resetNodes, spawn, } from './graph';
import { graphString, } from './strings';
import * as reducers from './reducers';

const { flatten, spread, first, removeBin, get, addMap } = collections;

const flattenBin = (a = [], b = []) => flatten(a)(b);

export const autoSpread = el =>
el[Symbol.iterator] ? (spread(el).reduce(flattenBin, []).map(autoSpread)) : el;

export const superNode = src => nb => new Set([ src, nb ]);

export const combineNeighbors = g => src => nb =>
  new Set(flatten(neighbors(g)(src))(neighbors(g)(nb)));

export const combineAdj = g => src => nb =>
  new Map(flatten(adj(g)(src))(adj(g)(nb)));

export const superAdj = g => src => nb =>
 [ src, nb ].reduce(removeBin, combineAdj(g)(src)(nb));

export const superEdge = g => src => nb =>
  addMap()(superNode(src)(nb))(superAdj(g)(src)(nb));

export const contract = g => src => (nb = first(neighbors(g)(src))) =>
nb ? mergeEdges(removeNodes(g)(src, nb))(superEdge(g)(src)(nb)) : g;

export const contractBin = (g, [ src, nb ]) => contract(g)(src)(nb);

export const contractSrc = g => src =>
nodeNeighbors(g)(src).reduce(contractBin, copy(g));

export const contractNext = (g, n = (first(nodes(g)))) =>
  contract(copy(g))(n)();

export const contractAuto = g => nodes(g).reduce(contractNext, g);
export const contractMin = (g, min = 2) =>
 g.size > min ? contractMin(contractNext(g), min) : copy(g);
