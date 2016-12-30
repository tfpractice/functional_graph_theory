xdescribe('async', () => {
  beforeAll(() => {
    console.log('\n.........AsyncOps Spec.........');
    ({ addNodesAsync, addEdgesAsync, removeEdgeAsync } = AsyncOps);
    ({ removeNodeAsync, addNeighborAsync, } = AsyncOps);
    ({ importEdgeAsync, mergeEdgesAsync, } = AsyncOps);
  });

  beforeEach(() => {
    e2 = eNodes[2];
    o2 = oNodes[2];
  });

  xdescribe('addNodesAsync', () => {
    it('adds a node to the graph', (done) => {
      addNodesAsync(oddGraphR)(e2);
      expect(Graph.contains(oddGraphR)(e2)).toBeTrue();
      done();
    });
  });

  xdescribe('addEdgesAsync(e2)(o2,weight)', () => {
    it('updates each nodes edge entry', (done) => {
      addEdgesAsync(oddGraphR)(e2, 2)(o2);
      expect(Graph.neighbors(oddGraphR)(e2)).toContain(o2);
      expect((oddGraphR).get(e2).get(o2)).toBe(2);
      done();
    });
  });

  // xdescribe('importEdgeAsync(e2)(o2,weight)', () => {
  //  it('updates each nodes edge entry', (done) => {
  //      let firstOdd = [...oddGraphR.edges.entries()][0];
  //      let OddNode = firstOdd[0];
  //      let OddNabe = [...firstOdd[1].keys()][0];
  //      importEdgeAsync(evenGraph)(firstOdd);
  //      expect(contains(evenGraph)(OddNode)).toBeTrue();
  //      expect(contains(evenGraph)(OddNabe)).toBeTrue();
  //      done();
  // });
  // });
  // xdescribe('removeEdgeAsync', () => {
  //  it('removes an entry from the edgs map', (done) => {
  //      let firstOdd = [...oddGraphR.edges.entries()][0];
  //      let OddNode = firstOdd[0];
  //      let OddNabe = [...firstOdd[1].keys()][0];
  //      importEdge(evenGraph)(firstOdd);
  //      removeEdge(evenGraph)(OddNode)(OddNabe);
  //      expect(isAdjacent(evenGraph)(OddNode)(OddNabe)).not.toBeTrue();
  //      done();
  //  });
  // });
  xdescribe('removeNodeAsync', () => {
    it('removes an entry from the edgs map', (done) => {
      const firstOdd = Comm.spreadKV(oddGraphR)[0];
      const OddNode = firstOdd[0];
      const OddNabe = Comm.spreadK(firstOdd[1])[0];

      mergeEdgesAsync(evenGraphR)(oddGraphR);
      removeNodeAsync(evenGraphR)(OddNode);
      expect(Graph.contains(evenGraphR)(OddNode)).toBeFalse();
      done();
    });
  });
  xdescribe('mergeEdgesAsync(e2)(o2,weight)', () => {
    it('merges nodes and edges of two graphs', (done) => {
      const elevOdd = Comm.spreadKV(oddGraphR)[3];
      const OddNode = elevOdd[0];

      mergeEdgesAsync(evenGraphR)(oddGraphR);
      expect(Graph.contains(evenGraphR)(OddNode)).toBeTrue();
      done();
    });
  });
});
