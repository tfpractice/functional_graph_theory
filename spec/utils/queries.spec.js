xdescribe('Utils/Queries', () => {
  beforeAll(() => {
    console.log('\n.........U/Queries Spec.........');
  });

  beforeEach(() => {
    qSet = new Set([ 1, 2, 3, 4 ]);
    qMap = new Map().set(8, 1).set(7, 2).set(6, 3).set(5, 4);
    qArr = [ 0, 11, 22, 33, 44 ];
  });

  xdescribe('first', () => {
    it('returns the first value of a collection', () => {
      expect(Query.first(qSet)).toBe(1);
    });
  });
  xdescribe('last', () => {
    it('returns the last value of a collection', () => {
      expect(Query.last(qSet)).toBe(4);
    });
  });
  xdescribe('lastK', () => {
    it('retrievs the last key in a map', () => {
      expect(Query.lastK(qMap)).toBe(5);
    });
  });
  xdescribe('firstK', () => {
    it('retrieves the last key in a map', () => {
      expect(Query.firstK(qMap)).toBe(8);
    });
  });

  xdescribe('hasK', () => {
    it('checks a map for a key', () => {
      expect(Query.hasK(qMap)(6)).toBeTrue();
    });
  });
  xdescribe('x_hasK', () => {
    it('checks a collection for a node', () => {
      expect(Query.x_hasK(qMap)(6)).toBeFalse();
    });
  });
  xdescribe('hasKV', () => {
    it('checks a collection for an entry', () => {
      const first = [ ...qMap ][0];

      expect(Query.hasKV(qMap)(first)).toBeTrue();
    });
  });
  xdescribe('x_hasKV', () => {
    it('checks a collection for an entry', () => {
      const first = [ ...qMap ][0];

      expect(Query.x_hasKV(qMap)(first)).toBeFalse();
    });
  });
});
