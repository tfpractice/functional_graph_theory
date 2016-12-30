xdescribe('Utils/Commands', () => {
  beforeAll(() => {
    console.log('\n.........U/Commands Spec.........');
  });

  xdescribe('commands', () => {
    beforeEach(() => {
      cSet = new Set([ 1, 2, 3, 4 ]);
      cMap = new Map().set(8, 1).set(7, 2).set(6, 3).set(5, 4);
      cArr = [ 0, 11, 22, 33, 44 ];
    });
    xdescribe('spread', () => {
      it('returns an array of the collections default values', () => {
        expect(Comm.spread(cMap)).toBeArray();
      });
    });
    xdescribe('spreadK', () => {
      it('returns an array of Map keys', () => {
        expect(Comm.spreadK(cMap)).toContain(8);
      });
    });
    xdescribe('spreadV', () => {
      it('returns an array of map values', () => {
        expect(Comm.spreadV(cMap)).toContain(1);
      });
    });
    xdescribe('spreadKV', () => {
      it('returns an array of key values pairs', () => {
        expect(Comm.spreadKV(cArr)[0]).toContain(...[ 0, 0 ]);
      });
    });
    xdescribe('tuple(val)(key)', () => {
      it('returns a [key, val] array', () => {
        expect(Comm.tuple(0)('zero')).toBeArray();
      });
    });
    xdescribe('triple(val)(key)(key1)', () => {
      it('returns a [key0,key1,val] array', () => {
        expect(Comm.triple(1)('zero')('one')).toBeArray();
      });
    });
    xdescribe('flatTuple(v0)([...elements])', () => {
      it('returns a [key0,...elements] array', () => {
        expect(Comm.flatTuple(1)([ 'zero', 'one' ])).toBeArray();
      });
    });
    xdescribe('addSet(val)', () => {
      it('adds a value to a set', () => {
        Comm.addSet(cSet, 9);
        expect([ ...cSet ]).toContain(9);
      });
    });
    xdescribe('addMap(tuple)', () => {
      it('appends a [k,v] tuple to a map', () => {
        Comm.addMap(cMap, [ 22, 33 ]);
        expect([ ...cMap.keys() ]).toContain(22);
      });
    });
    xdescribe('rmColl', () => {
      it('returns a collection without the element', () => {
        Comm.rmColl(cSet, 2);
        expect([ ...cSet ]).not.toContain(2);
      });
    });
    xdescribe('popFirst', () => {
      it('deletes the first key in a map/set', () => {
        const copy = new Set(cSet);
        const first = Comm.popFirst(copy);

        expect(first).toBe(1);
        expect(cSet.has(first)).toBeTrue();
        expect(copy.has(first)).toBeFalse();
      });
    });
  });
});
