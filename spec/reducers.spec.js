fdescribe('Reducers', () => {
  beforeAll(() => {
    console.log('\n......... Reducers Spec.........');
    RD = Reducers;
  });

  beforeEach(() => {
    rEdges = Graph.spawn();
    evens = Graph.addNodes()(...eFilter(myNodes));
    odds = Graph.addNodes()(...oNodes);
  });

  describe('addSrc', () => {
    it('adds entries to the Map via reduce', () => {
      RD.addSrc(rEdges, n0);
      expect(rEdges.has(n0)).toBeTrue();
    });
  });

  describe('rmEdge', () => {
    it('removes the connections beteen ', () => {
      const rNabes = Graph.addEdges(rEdges)(n0, 0)(n1, n2, n3).get(n0);

      RD.rmEdge(rEdges, [ n0, n1 ]);
      expect(Graph.adj(rEdges)(n0).has(n1)).toBeFalse();
    });
  });

  describe('importEdge', () => {
    it('adds missing neighbors to a graph and adds connections', () => {
      [
        [ n15, n13, 7 ],
        [ n15, n17, 7 ],
        [ n15, n11, 7 ],
      ].reduce(Graph.addEdgeR, odds);
      RD.importEdge(evens, [ n15, odds.get(n15) ]);
      expect(evens.has(n17)).toBeTrue();
      expect(evens.get(n15).has(n17)).toBeTrue();
      expect(evens.get(n15).has(n13)).toBeTrue();
    });
  });
});
