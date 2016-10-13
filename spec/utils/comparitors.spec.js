fdescribe('Utils/Comparitors', function() {
	beforeAll(function() {
		console.log('\n.........U/Comparitors Spec.........');
	});

	describe('comparitors', () => {
		beforeEach(() => {
			set0 = new Set([1, 2, 3]);
			set1 = new Set([2, 3, 4]);
		});

		describe('inter', () => {
			it('returns an array of all shared elements ', () => {
				expect(utils.inter(set0)(set1)).toBeArray();
			});
		});
		describe('diff', () => {
			it('returns elements in first set absent fom the second ', () => {
				expect(utils.diff(set0)(set1)).toBeArray();
			});
		});
		describe('union', () => {
			it('combines elements of both sets ', () => {
				expect(utils.union(set0)(set1)).toBeArray();
			});
		});
	});
});