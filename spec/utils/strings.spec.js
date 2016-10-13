fdescribe('Utils/Strings', function() {
	beforeAll(function() {
		console.log('\n.........U/Strings Spec.........');
	});

	describe('strings', () => {
		describe('redStr', () => {
			it('concatenates the string with an  argument', () => {
				expect(Str.redStr('1,2,3,', 6)).toBeString();
			});
		});
		describe('kString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(Str.kString([1, 2, 3, 6])).toBeString();
			});
		});

		describe('vString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(Str.vString(new Set([1, 2, 3, 6]))).toBeString();
			});
		});
		describe('kvString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(Str.kvString([1, 2, 3, 6])).toBeString();
			});
		});
		describe('collString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(Str.collString([1, 2, 3, 6])).toBeString();
			});
		});
		describe('pathString', () => {
			it('should behave...', () => {
				expect(Str.pathString(myGraphR)).toBeString();
			});
		});
		describe('edgeString', () => {
			it('should behave...', () => {
				let edge0 = Query.first(myGraphR);
				expect(Str.edgeString(edge0)).toBeString();
			});
		});
	});
});