fdescribe('Utils/Strings', function() {
	beforeAll(function() {
		console.log('\n.........U/Strings Spec.........');
	});

	describe('strings', () => {
		describe('redStr', () => {
			it('concatenates the string with an  argument', () => {
				expect(utils.redStr('1,2,3,', 6)).toBeString();
			});
		});
		describe('kString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(utils.kString([1, 2, 3, 6])).toBeString();
			});
		});

		describe('vString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(utils.vString(new Set([1, 2, 3, 6]))).toBeString();
			});
		});
		describe('kvString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(utils.kvString([1, 2, 3, 6])).toBeString();
			});
		});
		describe('collString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(utils.collString([1, 2, 3, 6])).toBeString();
			});
		});
		describe('pathString', () => {
			it('should behave...', () => {
				expect(utils.pathString(myGraphR)).toBeString();
			});
		});
		describe('edgeString', () => {
			it('should behave...', () => {
				let edge0 = utils.first(myGraphR);
				expect(utils.edgeString(edge0)).toBeString();
			});
		});
	});
});