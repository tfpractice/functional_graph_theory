import 'jasmine-expect';
import { collections, } from 'turmeric-utils';
import { autoSpread, combineAdj, combineNeighbors, contract, contractAuto,
   contractBin, contractMin, contractNext, contractSrc, superAdj, superEdge,
    superNode, } from 'src/operations';
import { addEdgeBin, addEdges, bfs, components, componentSet, dfs, dijkstra,
  fromElements, graphString, mergeEdgesBin, neighbors, nodes, pathBetween, pathString,
   removeEdges, } from 'graph-curry';
import { eNodes, firstTen, myNodes, oFilter, oNodes, } from './shared';
import { n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, } from './shared';
import { n10, n11, n12, n13, n14, n15, n16, n17, n18, n19, } from './shared';
const { spread, spreadK, first, last } = collections;

import { compSize,
countComponents,
safeNabes,
safeReduce,
safeReduceBin,
safeSearch,
sameComps,
selectNeighbor,
selectNeighborBin,
uncut, uncutKey, } from 'src/tree';
const myGraph = [
  addEdges()(n0, 1)(n1, n3),
  addEdges()(n1, 1)(n0, n2, n4),
  addEdges()(n2, 1)(n1, n5),
  addEdges()(n3, 1)(n0, n4, n6),
  addEdges()(n4, 1)(n1, n3, n5, n7),
  addEdges()(n5, 1)(n2, n4, n8),
  addEdges()(n6, 1)(n3, n7),
  addEdges()(n7, 1)(n6, n4, n8),
  addEdges()(n8, 1)(n7, n5) ]
  .reduce(mergeEdgesBin, new Map);

const myDepth = dfs(myGraph)(n3);
const allSearch = g => nodes(myGraph).map(dfs(myGraph));

const stepped = [ selectNeighbor(myGraph)(n4)(n5),
  selectNeighbor(myGraph)(n5)(n2), selectNeighbor(myGraph)(n2)(n1),
  selectNeighbor(myGraph)(n1)(n0) ].reduce(mergeEdgesBin, new Map);

// console.log(pathString(myDepth));
// console.log((allSearch(myGraph).map(pathString)));
describe('bst', () => {
  it('is true', () => {
    expect(true).toBeTrue();
  });
});

describe('selectNeighbor', () => {
  // console.log('stepped', graphString(stepped));
  // console.log('stepped', countComponents(stepped));
  // console.log(graphString(spread(myDepth).map(([ k, v ]) => [ k, v.pred ]).reduce(selectNeighborBin)));
  const ss0 = safeSearch(myGraph)(n0);
  const ss7 = safeSearch(myGraph)(n7);
  const ss2 = safeSearch(myGraph)(n2);
  const ss6 = safeSearch(myGraph)(n6);

  // const ss0 = safeSearch(myGraph)(n0);

  // console.log('safeSearch(myGraph)', pathString(safeSearch(myGraph)(n4)));
  // console.log('safeReduce', pathString(safeReduce(myGraph)(n4)));
  // console.log('safeReduce', pathString(safeReduceBin(myGraph, n4)));
  // nodes(myGraph).map(safeSearch(myGraph)).map(pathString).map(console.log);

  // console.log(allSearch(selectNeighbor(myGraph)(n4)(n5)).map(pathString));
  // console.log(graphString(selectNeighbor(myGraph)(n4)(n5)));
});
