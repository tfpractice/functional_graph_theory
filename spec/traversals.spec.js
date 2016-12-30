xdescribe('Traversal functions', () => {
  beforeAll(() => {
    console.log('\n.........Traversals Spec.........');
  });

  beforeEach(() => {
    odds = Graph.fromElements(...oFilter(myNodes));
    [ ...odds.keys() ].reduce((g, e, id, arr) =>
      Graph.addEdges(g)(e, id)(arr[((id + 1) % arr.length)]

        // arr[((id + 2) % arr.length)]
      ), odds);
    Graph.addEdges(odds)(n11, 0)(n1, n5);
    o11D = Trav.dfs(odds)(n11);
    o11B = Trav.bfs(odds)(n11);
    oDijk = Trav.dijkstra(odds)(n11);
  });

  xdescribe('Trav.dfs', () => {
    it('returns a map of nodes and neighbors', () => {
      expect(o11D instanceof Map).toBeTrue();
      expect((o11D).has(n15)).toBeTrue();
    });
  });
  xdescribe('bfs', () => {
    it('returns a map of nodes and neighbors', () => {
      expect(o11B instanceof Map).toBeTrue();
      expect((o11B).has(n15)).toBeTrue();
      expect(Graph.neighbors(odds)(n11)).not.toContain(n15);
    });
  });
  xdescribe('dijkstra', () => {
    it('retuns the shortest path from a node to its neighbors', () => {
      expect((Trav.dijkstra(odds)(n11) instanceof Map)).toBeTrue();
    });
  });
  xdescribe('components', () => {
    it('retuns a map of nodes and paths', () => {
      expect((Trav.components(myGraphR) instanceof Map)).toBeTrue();
    });
  });
  xdescribe('componentSet', () => {
    it('returns a set of all the components', () => {
      expect(Trav.componentSet(odds) instanceof Set).toBeTrue();
      expect(Trav.componentSet(odds).size).toBe(1);
    });
  });
  xdescribe('pathBetween', () => {
    it('returns a true if nodes are in same component', () => {
      expect(Trav.pathBetween(myGraphR)(n7)(n8)).toBeTrue();
    });
  });
});
