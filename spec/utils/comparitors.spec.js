xdescribe('Utils/Comparitors', function() {
	beforeAll(function() {
		console.log('\n.........U/Comparitors Spec.........');
	});

	xdescribe('comparitors', () => {
		beforeEach(() => {
			set0 = new Set([1, 2, 3]);
			set1 = new Set([2, 3, 4]);
			m0 = new Map().set(8, 1).set(7, 2).set(6, 3).set(5, 4);
			m1 = new Map().set(8, 2).set(7, 23).set(9, 10).set(11, 12);
		});

		xdescribe('inter', () => {
			it('returns an array of all shared elements ', () => {
				expect(Comp.inter(set0)(set1)).toBeArray();
				expect(Comp.inter(set0)(set1)).toContain(2, 3);
			});
		});
		xdescribe('diff', () => {
			it('returns elements in first set absent fom the second ', () => {
				expect(Comp.diff(set0)(set1)).toBeArray();
				expect(Comp.diff(set0)(set1)).toContain(1, 4);
			});
		});
		xdescribe('union', () => {
			it('combines elements of both sets ', () => {
				expect(Comp.union(set0)(set1)).toBeArray();
				expect(Comp.union(set0)(set1)).toContain(1, 2, 3, 4);
			});
		});
		xdescribe('mapInter', () => {
			it('returns an array of all shared elements ', () => {
				expect((Comp.mapInter(m0)(m1)) instanceof Map).toBeTrue();
				expect(Comm.spread(Comp.mapInter(m0)(m1))).toContain([7, 2]);
			});
		});
		xdescribe('mapDiff', () => {
			it('returns elements in first map absent fom the second ', () => {
				expect((Comp.mapDiff(m0)(m1)) instanceof Map).toBeTrue();
				expect(Comm.spread(Comp.mapDiff(m0)(m1))).toContain([5, 4]);
			});
		});
		xdescribe('mapUnion', () => {
			it('combines elements of both maps ', () => {
				expect((Comp.mapUnion(m0)(m1)) instanceof Map).toBeTrue();
				expect(Comm.spread(Comp.mapUnion(m0)(m1))).toContain([7, 2]);
			});
		});
		xdescribe('uniteMap', () => {
			it('adds all elements of the second collection to the first', function() {
				let m0 = new Map().set(8, 1).set(7, 2).set(6, 3).set(5, 4);
				let m1 = new Map().set(8, 2).set(7, 23).set(9, 10).set(11, 12);
				expect(Comm.spread(Comp.uniteMap(m0)(m1))).toContain([11, 12]);
			});
		});
	});
});