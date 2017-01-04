import 'jasmine-expect';
import { collections, } from 'turmeric';
import * as Graph from 'src/graph';

import { eNodes, firstTen, nEdgesR, oEdgesR, oNodes, } from './shared';
import { eFilter, myNodes, oFilter, } from './shared';
import { n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, } from './shared';
import { n10, n11, n12, n13, n14, n15, n16, n17, n18, n19, } from './shared';
import { bfs, components, componentSet, dfs, dijkstra, pathBetween, } from 'src/traversals';

const { spread, spreadK } = collections;
const altGraph = Graph.fromElements(n4, n5, n6, n7, n8, n9);
const evenGraph = Graph.fromElements(...firstTen, ...eNodes);
const oddGraph = Graph.fromElements(...firstTen, ...oNodes);
const myGraph = Graph.fromElements(...firstTen);
const addMyGraph = Graph.addEdges(myGraph);
const addEGraph = Graph.addEdges(evenGraph);
const addOGraph = Graph.addEdges(oddGraph);

addMyGraph(n0, 2)(n1, n2);
addMyGraph(n1, 4)(n4, n2);
addMyGraph(n1, 6)(n6);
addMyGraph(n2, 3)(n3);
addMyGraph(n5, 4)(n4);
addMyGraph(n3, 8)(n4);
addMyGraph(n5, 7)(n6);
addMyGraph(n7, 7)(n8);
addMyGraph(n0, 11)(n1);
addEGraph(n0, 22)(n9);
addOGraph(n0, 11)(n1);
addOGraph(n0, 22)(n9);

nEdgesR(evenGraph);

oEdgesR(oddGraph);

const myEdgesR = Graph.spawn(myGraph);
const oddEdgesR = Graph.spawn(oddGraph);
const evenEdgesR = Graph.spawn(evenGraph);

let odds = Graph.fromElements(...oFilter(myNodes));

odds = spreadK(odds).reduce((g, e, id, arr) =>
      Graph.addEdges(g)(e, id)(arr[((id + 1) % arr.length)]), odds);
odds = Graph.addEdges(odds)(n11, 0)(n1, n5);

const myBreadth = bfs(myGraph)(n0);

console.log('myBreadth', myBreadth);

const myDepth = dfs(myGraph)(n0);

// const myDijk = dijkstra(myGraph)(n0);

// console.log('myDepth', myDepth);

describe('Trav.dfs', () => {
  it('returns a map of nodes and neighbors', () => {
    expect(myDepth instanceof Map).toBeTrue();
    expect((myDepth).has(n3)).toBeTrue();
  });
});

describe('bfs', () => {
  it('returns a map of nodes and neighbors', () => {
    // console.log('myBreadth', myBreadth);
    expect(myBreadth instanceof Map).toBeTrue();
    expect(myBreadth.has(n2)).toBeTrue();
    expect(Graph.neighbors(myGraph)(n2)).not.toContain(n5);
  });
});

describe('dijkstra', () => {
  it('retuns the shortest path from a node to its neighbors', () => {
    const myDijk = dijkstra(myGraph)(n0);

    console.log('myDepth', myDepth);
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
