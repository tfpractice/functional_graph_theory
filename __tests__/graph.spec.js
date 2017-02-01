import 'jasmine-expect';
import { addEdgeBin, mergeEdgesBin, } from 'src/reducers';
import { addEdges, addEntry, addNeighbor, addNodes, adj, contains, copy,
  fromElements, isAdjacent, mergeEdges, neighbors, nodes, removeEdges,
    removeNodes, resetNodes, spawn, } from 'src/graph';
import { eFilter, myNodes, oFilter, } from './shared';
import { firstTen, n0, n1, n2, n3, n4, n5, n6, n7, n8, n9, } from './shared';

const myGraph = fromElements(...myNodes);
const nabeGraph = [ addEdges()(n0, 2)(n1, n2),
  addEdges()(n1, 4)(n4, n2),
  addEdges()(n1, 6)(n6),
  addEdges()(n2, 3)(n3),
  addEdges()(n5, 4)(n4),
  addEdges()(n3, 8)(n4),
  addEdges()(n5, 7)(n6),
  addEdges()(n7, 7)(n8),
  addEdges()(n0, 11)(n1), ]
  .reduce(mergeEdgesBin, fromElements(...firstTen));

export { n7, };

export const eGraph = fromElements(...eFilter(myNodes));
export const oGraph = fromElements(...oFilter(myNodes));

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
      expect((removeNodes(nabeGraph)(n0, n2)).has(n0)).toBeFalse();
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
      const w0n2 = [ n2, 0 ];
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

  describe('removeEdges', () => {
    it('removes an edge entry', () => {
      const nabes = addEdges(myGraph)(n0, 1)(n1, n2, n3);

      expect(isAdjacent(removeEdges(nabes)(n0)(n1))(n0)(n1)).toBeFalse();
    });
  });
  describe('resetNodes', () => {
    it('removes all the neighbors from the source nodes', () => {
      const nGraph = addEdges(myGraph)(n0, 1)(n1, n2, n3);

      expect(isAdjacent(resetNodes(nGraph)(n0, n1))(n0)(n1)).toBeFalse();
    });
  });
  describe('mergeEdges', () => {
    it('combines two Edge maps', () => {
      const connGraph = nodes(eGraph).map((e, id, arr) =>
            [ e, arr[((id + 1) % arr.length)], id, ]).reduce(addEdgeBin, eGraph);

      expect(mergeEdges(connGraph)(oGraph).has(n7)).toBeTrue();
    });
  });
});
