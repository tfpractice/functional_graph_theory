xdescribe('Utils/Strings', function() {
	beforeAll(function() {
		console.log('\n.........U/Strings Spec.........');
	});

	xdescribe('strings', () => {
		xdescribe('redStr', () => {
			it('concatenates the string with an  argument', () => {
				expect(Str.redStr('1,2,3,', 6)).toBeString();
			});
		});
		xdescribe('kString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(Str.kString([1, 2, 3, 6])).toBeString();
			});
		});

		xdescribe('vString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(Str.vString(new Set([1, 2, 3, 6]))).toBeString();
			});
		});
		xdescribe('kvString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(Str.kvString([1, 2, 3, 6])).toBeString();
			});
		});
		xdescribe('collString', () => {
			it('concatenates the string representaion of all keys', () => {
				expect(Str.collString([1, 2, 3, 6])).toBeString();
			});
		});
		xdescribe('pathString', () => {
			it('should behave...', () => {
				expect(Str.pathString(myGraphR)).toBeString();
			});
		});
		xdescribe('edgeString', () => {
			it('should behave...', () => {
				let edge0 = Query.first(myGraphR);
				expect(Str.edgeString(edge0)).toBeString();
			});
		});
	});
});