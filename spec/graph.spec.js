xdescribe('Graph', () => {
  beforeAll(() => {
    console.log('\n.........GraphR Spec.........');
  });

  beforeEach(() => {
    rEdges = Graph.spawn();
    evens = Graph.addNodes()(...eFilter(myNodes));
    odds = Graph.addNodes()(...oFilter(oNodes));
  });

  xdescribe('spawn(nabes)', () => {
    it('returns a new Map', () => {
      expect(Graph.spawn() instanceof Map).toBeTrue();
    });
  });
  xdescribe('fromElements', () => {
    it('returns a new edgelist with the new nodes appended', () => {
      const sEdges = Graph.fromElements(...myNodes);

      expect(Graph.contains(sEdges)(n2)).toBeTrue();
    });
  });
  xdescribe('accessors', () => {
    xdescribe('nodes', () => {
      it('returns an array of the nodes in the edgelist', () => {
        expect(Graph.nodes(evens)).toBeArray();
      });
    });
    xdescribe('copy', () => {
      it('returns a Map of nodes and neighbor', () => {
        expect(Graph.copy(rEdges) instanceof Map).toBeTrue();
      });
    });
    xdescribe('adj', () => {
      it('returns a map of all the neighboring nodes and weights', () => {
        expect(Graph.adj(evens)(n2) instanceof Map).toBeTrue();
      });
    });
    xdescribe('neighbors(edge)(node)', () => {
      it('returns a map entry of that nodes neighbors ', () => {
        expect(Graph.neighbors(myGraphR)(n0) instanceof Array).toBeTrue();
      });
    });
    xdescribe('contains', () => {
      it('checks if a graph has a node', () => {
        expect(Graph.contains(evens)(n12)).toBeTrue();
      });
    });
  });
  xdescribe('operators', () => {
    xdescribe('isAdjacent(graph)(n0)(n1)', () => {
      it('checks for the presence of a node in the graph', () => {
        expect(Graph.isAdjacent(myGraphR)(n0)(n6)).toBeFalse();
      });
    });

    xdescribe('addNodes', () => {
      it('adds an entry to the edges Map', () => {
        Graph.addNodes(rEdges)(n0);
        expect(rEdges.has(n0)).toBeTrue();
      });
    });
    xdescribe('removeNodes', () => {
      it('removes the nodes from the edges', () => {
        Graph.addEdges(rEdges)(n0, 1)(n1, n2, n3);
        Graph.removeNodes(rEdges)(n0, n2);
        expect(rEdges.has(n1)).toBeTrue();
        expect(rEdges.has(n0)).not.toBeTrue();
      });
    });

    xdescribe('addEdges', () => {
      it('adds an neighbor entry for each node', () => {
        const nabes = Graph.addEdges(rEdges)(n0)(n1, n2, n3);

        expect(Graph.adj(rEdges)(n0).has(n2)).toBeTrue();
      });
    });

    xdescribe('addEntry', () => {
      it('appends an [node, weight] pair to the neighbrs', () => {
        const nabes = Graph.addNeighbor(rEdges)(n0)(n1, 3);
        const w0n2 = Comm.tuple(0)(n2);
        const newNabes = Graph.addEntry(nabes)(w0n2);

        expect(newNabes.has(n2)).toBeTrue();
        expect(Graph.adj(rEdges)(n0).has(n2)).toBeFalse();
      });
    });
    xdescribe('addNeighbor', () => {
      it('adds a neigbor and weight to the src entry', () => {
        const nabes = Graph.addNeighbor(rEdges)(n0)(n1, 3);

        expect(nabes.has(n1)).toBeTrue();
      });
    });
    xdescribe('mergeNeighbors', () => {
      it('combines two neighbor maps', () => {
        const rNabes = Graph.addEdges(rEdges)(n0, 0)(n1, n2, n3).get(n0);
        const eNabes = Graph.addEdges(evens)(n2)(n5, n7, n9).get(n2);

        Graph.mergeNeighbors(eNabes)(rNabes);
        expect(Graph.adj(evens)(n2).has(n5)).toBeTrue();
      });
    });
    xdescribe('removeEdges', () => {
      it('removes an edge entry', () => {
        const nabes = Graph.addEdges(rEdges)(n0, 1)(n1, n2, n3);

        Graph.removeEdges(rEdges)(n0)(n1);
        expect(Graph.isAdjacent(rEdges)(n0)(n1)).toBeFalse();
      });
    });
    xdescribe('clearNeighbors', () => {
      it('removes all the neighbors from the source nodes', () => {
        const nabes = Graph.addEdges(rEdges)(n0, 1)(n1, n2, n3);

        Graph.clearNeighbors(rEdges)(n0, n1);
        expect(Graph.isAdjacent(rEdges)(n0)(n1)).toBeFalse();
      });
    });
    xdescribe('mergeEdges', () => {
      it('combines two Edge maps', () => {
        [ ...evens.keys(), ].map((e, id, arr) =>
            [ e, arr[((id + 1) % arr.length)], id, ])
          .reduce(Graph.addEdgeR, evens);
        Graph.mergeEdges(evens)(odds);
        expect(evens.has(n15)).toBeTrue();
      });
    });
  });
});
