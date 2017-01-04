import 'jasmine-expect';
import { collections, } from 'turmeric';
import { eFilter, myNodes, oFilter, } from './shared';
import { n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, } from './shared';
import { adj, copy, fromElements, neighbors, nodes, spawn, } from 'src/graph';
import { addEdges, addNodes, contains, isAdjacent, removeNodes, } from 'src/graph';
import { addEntry, addNeighbor, clearNeighbors, mergeEdges, removeEdges, } from 'src/graph';
import { addEdgeBin, } from 'src/reducers';
const { tuple } = collections;
const myGraph = fromElements(...myNodes);
const eGraph = fromElements(eFilter(myNodes));
const oGraph = fromElements(oFilter(myNodes));

describe('spawn(nabes)', () => {
  it('returns a new Map', () => {
    expect(spawn() instanceof Map).toBeTrue();
  });
});
describe('fromElements', () => {
  it('returns a new edgelist with the new nodes appended', () => {
    expect(fromElements(...myNodes) instanceof Map).toBeTrue();
  });
});
describe('accessors', () => {
  describe('nodes', () => {
    it('returns an array of the nodes in the edgelist', () => {
      expect(nodes(myGraph)).toBeArray();
    });
  });
  describe('copy', () => {
    it('returns a Map of nodes and neighbor', () => {
      expect(copy(myGraph) instanceof Map).toBeTrue();
    });
  });
  describe('adj', () => {
    it('returns a map of all the neighboring nodes and weights', () => {
      expect(adj(eGraph)(n2) instanceof Map).toBeTrue();
    });
  });
  describe('neighbors(edge)(node)', () => {
    it('returns a map entry of that nodes neighbors ', () => {
      expect(neighbors(myGraph)(n0) instanceof Array).toBeTrue();
    });
  });
  describe('contains', () => {
    it('checks if a graph has a node', () => {
      expect(contains(myGraph)(n4)).toBeTrue();
    });
  });
});
describe('operators', () => {
  describe('isAdjacent(graph)(n0)(n1)', () => {
    it('checks for the presence of a node in the graph', () => {
      expect(isAdjacent(myGraph)(n0)(n6)).toBeFalse();
    });
  });
  describe('addNodes', () => {
    it('adds an entry to the edges Map', () => {
      expect(addNodes(eGraph)(n3).has(n3)).toBeTrue();
    });
  });
  describe('removeNodes', () => {
    it('removes the nodes from the edges', () => {
      expect((removeNodes(myGraph)(n0, n2)).has(n0)).toBeFalse();
    });
  });
  describe('addEdges', () => {
    it('adds an neighbor entry for each node', () => {
      expect((addEdges(spawn())(n0)(n1, n2, n3)).has(n2)).toBeTrue();
    });
  });
  describe('addEntry', () => {
    it('appends an [node, weight] pair to the neighbrs', () => {
      const nabes = addNeighbor(myGraph)(n0)(n1, 3);
      const w0n2 = tuple(0)(n2);
      const newNabes = addEntry(nabes)(w0n2);

      expect(newNabes.has(n2)).toBeTrue();
      expect(adj(myGraph)(n0).has(n2)).toBeFalse();
    });
  });
  describe('addNeighbor', () => {
    it('adds a neigbor and weight to the src entry', () => {
      expect((addNeighbor(myGraph)(n0)(n1, 3)).has(n1)).toBeTrue();
    });
  });

//     describe('mergeNeighbors', () => {
//       it('combines two neighbor maps', () => {
//         const rNabes = addEdges(rEdges)(n0, 0)(n1, n2, n3).get(n0);
//         const eNabes = addEdges(eGraph)(n2)(n5, n7, n9).get(n2);
//
//         mergeNeighbors(eNabes)(rNabes);
//         expect(adj(eGraph)(n2).has(n5)).toBeTrue();
//       });
//     });
  describe('removeEdges', () => {
    it('removes an edge entry', () => {
      const nabes = addEdges(myGraph)(n0, 1)(n1, n2, n3);

      expect(isAdjacent(removeEdges(nabes)(n0)(n1))(n0)(n1)).toBeFalse();
    });
  });
  describe('clearNeighbors', () => {
    it('removes all the neighbors from the source nodes', () => {
      const nGraph = addEdges(myGraph)(n0, 1)(n1, n2, n3);

      expect(isAdjacent(clearNeighbors(nGraph)(n0, n1))(n0)(n1)).toBeFalse();
    });
  });
  xdescribe('mergeEdges', () => {
    it('combines two Edge maps', () => {
      const connGraph = nodes(eGraph).map((e, id, arr) =>
            [ e, arr[((id + 1) % arr.length)], id, ]).reduce(addEdgeBin, eGraph);

      // console.log('connGraph', connGraph);
        // .reduce(addEdgeBin, eGraph);
      const mGraph = mergeEdges(connGraph)(oGraph);

      // console.log('mGraph', nodes(mGraph));
      // console.log('eGraph', eGraph);

      expect(mGraph.has(n7)).toBeTrue();
    });
  });
});
