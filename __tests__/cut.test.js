import 'jasmine-expect';
import { autoSpread, combineAdj, combineNeighbors, contract, contractAuto, contractBin, contractMin,
contractNext, contractSrc, superAdj, superEdge, superNode, } from 'src/operations';
import { addEdgeBin, addEdges, bfs, components, componentSet, dfs, dijkstra, fromElements, graphString,
mergeEdgesBin, neighbors, nodes, pathBetween, removeEdges, } from 'graph-curry';
import { eNodes, firstTen, myNodes, oFilter, oNodes, } from './shared';
import { n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, } from './shared';
import { n10, n11, n12, n13, n14, n15, n16, n17, n18, n19, } from './shared';

const myGraph = [ addEdges()(n0, 1)(n1, n3),
  addEdges()(n1, 1)(n0, n2, n4),
  addEdges()(n2, 1)(n1, n5),
  addEdges()(n3, 1)(n0, n4, n6),
  addEdges()(n4, 1)(n1, n3, n5, n7),
  addEdges()(n5, 1)(n4, n2, n8),
  addEdges()(n6, 1)(n3, n7, ),
  addEdges()(n7, 1)(n6, n4, n8),
  addEdges()(n8, 1)(n7, n5, ),
].reduce(mergeEdgesBin, new Map());

const nabes0 = neighbors(myGraph)(n0);
const nabes1 = neighbors(myGraph)(n1);

describe('connecting corner nodes in a 3x3grid', () => {
  it('has 9nodes', () => {
    expect(nodes(myGraph).length).toEqual(9);
  });
});
describe('pre-contraction', () => {
  it('has paths for each pair', () => {
    // console\.log('pathBetween(myGraph)(n0)(n1))', pathBetween(myGraph)(n0)(n1));
  });
});
describe('components after a single contraction', () => {
  // console\.log('components(myGraph)', componentSet(myGraph).size);
  const con41 = contract(myGraph)(n4)(n1);

  // console\.log('con41', con41);
  // console\.log('components(myGraph)', componentSet(con41).size);
});
