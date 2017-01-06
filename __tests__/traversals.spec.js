import 'jasmine-expect';
import { collections, } from 'turmeric';
import * as Graph from 'src/graph';
import * as Reducers from 'src/reducers';

import { eNodes, firstTen, myNodes, oFilter, oNodes, } from './shared';
import { n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, } from './shared';
import { n10, n11, n12, n13, n14, n15, n16, n17, n18, n19, } from './shared';
import { bfs, components, componentSet, dfs, dijkstra, pathBetween, } from 'src/traversals';

const { spread, spreadK } = collections;

const myGraph = [ Graph.addEdges()(n0, 2)(n1, n2),
  Graph.addEdges()(n1, 4)(n4, n2),
  Graph.addEdges()(n1, 6)(n6),
  Graph.addEdges()(n2, 3)(n3),
  Graph.addEdges()(n5, 4)(n4),
  Graph.addEdges()(n3, 8)(n4),
  Graph.addEdges()(n5, 7)(n6),
  Graph.addEdges()(n7, 7)(n8),
  Graph.addEdges()(n0, 11)(n1), ]
  .reduce(Reducers.mergeEdgesBin, Graph.fromElements(...firstTen));

let odds = Graph.fromElements(...oFilter(myNodes));

odds = spreadK(odds).reduce((g, e, id, arr) =>
      Graph.addEdges(g)(e, id)(arr[((id + 1) % arr.length)]), new Map(odds));
odds = Graph.addEdges(odds)(n11, 0)(n1, n5);

const myBreadth = bfs(myGraph)(n0);
const myDepth = dfs(myGraph)(n0);

describe('dfs', () => {
  it('returns a map of nodes and neighbors', () => {
    expect(myDepth instanceof Map).toBeTrue();
    expect((myDepth).has(n3)).toBeTrue();
  });
});

describe('bfs', () => {
  it('returns a map of nodes and neighbors', () => {
    expect(myBreadth instanceof Map).toBeTrue();
    expect(myBreadth.has(n2)).toBeTrue();
    expect(Graph.neighbors(myGraph)(n2)).not.toContain(n5);
  });
});

describe('dijkstra', () => {
  it('retuns the shortest path from a node to its neighbors', () => {
    const myDijk = dijkstra(myGraph)(n0);

    expect(myDijk instanceof Map).toBeTrue();
  });
});

describe('components', () => {
  it('retuns a map of nodes and paths', () => {
    expect((components(myGraph) instanceof Map)).toBeTrue();
  });
});

describe('componentSet', () => {
  it('returns a set of all the components', () => {
    expect(componentSet(odds) instanceof Set).toBeTrue();
    expect(componentSet(odds).size).toBe(1);
  });
});

describe('pathBetween', () => {
  it('returns a true if nodes are in same component', () => {
    expect(pathBetween(myGraph)(n7)(n8)).toBeTrue();
  });
});
