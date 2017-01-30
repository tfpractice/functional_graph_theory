import 'jasmine-expect';
import { spreadK, } from 'fenugreek-collections';
import { addEdges, bfs, components, componentSet, dfs, dijkstra, fromElements,
mergeEdgesBin, neighbors, pathBetween, } from 'graph-curry';

import { eNodes, firstTen, myNodes, oFilter, oNodes, } from './shared';
import { n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, } from './shared';
import { n10, n11, n12, n13, n14, n15, n16, n17, n18, n19, } from './shared';

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

let odds = fromElements(...oFilter(myNodes));

odds = spreadK(odds).reduce((g, e, id, arr) =>
      addEdges(g)(e, id)(arr[((id + 1) % arr.length)]), new Map(odds));
odds = addEdges(odds)(n11, 0)(n1, n5);

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
    expect(neighbors(myGraph)(n2)).not.toContain(n5);
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
