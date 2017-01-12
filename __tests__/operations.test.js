import 'jasmine-expect';
import { collections, } from 'turmeric-utils';
import { autoSpread, combineAdj, combineNeighbors, contract, contractAuto, contractBin, contractMin,
contractNext, contractSrc, superAdj, superEdge, superNode, } from 'src/operations';
import { addEdgeBin, addEdges, bfs, components, componentSet, dfs, dijkstra, fromElements, graphString,
mergeEdgesBin, neighbors, nodes, pathBetween, removeEdges, } from 'graph-curry';
import { eNodes, firstTen, myNodes, oFilter, oNodes, } from './shared';
import { n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, } from './shared';
import { n10, n11, n12, n13, n14, n15, n16, n17, n18, n19, } from './shared';
const { spread, spreadK, first, last } = collections;
const myGraph = [ addEdges()(n0, 2)(n1, n2),
  addEdges()(n1, 4)(n4, n2),
  addEdges()(n1, 6)(n6),
  addEdges()(n2, 3)(n3),
  addEdges()(n5, 4)(n4),
  addEdges()(n3, 8)(n4),
  addEdges()(n5, 7)(n6),
  addEdges()(n7, 7)(n8),
  addEdges()(n0, 11)(n1), ]
  .reduce(mergeEdgesBin, fromElements(...firstTen));

const nabes0 = neighbors(myGraph)(n0);
const nabes1 = neighbors(myGraph)(n1);

const connGraph = [ myNodes.map((e, id, arr) =>
    [ e, arr[((id + 1) % arr.length)], id, ]).reduce(addEdgeBin, new Map), myNodes.map((e, id, arr) =>
        [ e, arr[((id + 18) % arr.length)], id, ]).reduce(addEdgeBin, new Map), ]
        .reduce(mergeEdgesBin, myGraph);

const isomorphism = contractMin(connGraph, 2);

describe('combineAdj', () => {
  it('returns a combined set of two nodes adjacency list', () => {
    expect(combineNeighbors(myGraph)(n0)(n1).size).toEqual(5);
  });
});
describe('combineNeighbors', () => {
  it('returns a combined set of two nodes neighbors', () => {
    expect(combineNeighbors(myGraph)(n0)(n1).size).toEqual(5);
  });
});
describe('superNode', () => {
  it('returns a new set of the source and neighboring edge', () => {
    expect(superNode(n0)(n1)).toContain(n0);
    expect(superNode(n0)(n1)).toContain(n1);
    expect(superNode(n0)(n1)).not.toContain(n2);
  });
});
describe('superAdj', () => {
  it('returns the combined adjaceny list of a superNode', () => {
    expect(superAdj(myGraph)(n0)(n1).has(n0)).toBeFalse();
    expect(superAdj(myGraph)(n0)(n1).has(n1)).toBeFalse();
  });
});
describe('superEdge', () => {
  it('returns a Map of the superNode and its superAdj', () => {
    expect(superEdge(myGraph)(n0)(n1) instanceof Map).toBeTrue();
  });
});
describe('contract', () => {
  it('creates a minor isomorphism of a graph by contracting on an edge', () => {
    const gMinor = contract(myGraph)(n0)();

    expect(contract(myGraph)(n0)(n1).has(n0)).toBeFalse();
    expect(contract(myGraph)(n0)(n1).has(n1)).toBeFalse();
    expect(contract(myGraph)(n0)(n1).size).toEqual(9);
  });
});
describe('contractBin', () => {
  it('contracts a graph based on a [k,v] pair', () => {
    expect(contractBin(myGraph, [ n0, n1 ]).has(n0)).toBeFalse();
  });
});
describe('contractSrc', () => {
  it('contracts a graph on a source and all its neighbors', () => {
    const n0dis = contractSrc(myGraph)(n0);

    expect(contractSrc(myGraph)(n0).has(n0)).toBeFalse();
  });
});
describe('contractNext', () => {
  it('contracts the graph once on a node(defaults to first node)', () => {
    const cn = contractNext(myGraph);
    const auto = contractAuto(myGraph);
  });
});
describe('contractAuto', () => {
  it('contracts the graph once on every node', () => {
    const oldlength = myGraph.size;
    const newLength = contractAuto(myGraph).size;

    expect(newLength).toBeLessThan(oldlength);
  });
});
describe('contractMin', () => {
  it('contracts the graph down to a minimum of 2 elements', () => {
    expect(isomorphism.size).toEqual(2);
  });
});
