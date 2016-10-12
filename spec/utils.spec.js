fdescribe('Utils', function () {
    let nabes0;
    beforeAll(function () {
        console.log('\n.........Utils Spec.........');
    });

    beforeEach(function () {
        nabes0 = Graph.neighbors(myGraphR)(n0);
		myEdges = Graph.spawn(myGraphR);
    });

    describe('spread', () => {
        it('returns an array of the collections default values', function () {
            expect(utils.spread(myEdges)).toBeArray();
        });
    });
    describe('spreadK', () => {
        it('returns an array of Map keys', () => {
            expect(utils.spreadK(myEdges)).toBeArray();
            expect(utils.spreadK(myEdges)).toContain(n0);
        });
    });
    describe('spreadV', () => {
        it('returns an array of map values', () => {
            expect(utils.spreadV(myEdges)).toBeArray();
        });
    });
    describe('spreadKV', () => {
        it('returns an array of key values pairs', () => {
            expect(utils.spreadKV(myEdges)[0]).toBeArray();
        });
    });
    describe('lastKey', () => {
        it('retrievs the last key in a map', () => {
            expect(utils.lastKey(myEdges)).toBe(n9);
        });
    });
    describe('firstK', () => {
        it('retrieves the last key in a map', () => {
            expect(utils.firstK(myEdges)).toBe(n0);
        });
    });
    describe('rmFirst', () => {
        it('deletes the last key in a map/set', () => {
            let copied = new Set(Graph.nodes(myGraphR));
            let first = utils.rmFirst((copied));
            expect(first).toBe(n0);
            expect(copied.has(n0)).toBeFalse();
        });
    });
    describe('pathHasNode', () => {
        it('checks a path for a node', () => {
            expect(utils.pathHasNode(myEdges)(n0)).toBeTrue();
        });
    });
    describe('x_pathHasNode', () => {
        it('checks a path for a node', () => {
            expect(utils.x_pathHasNode(myEdges)(n0)).toBeFalse();
        });
    });
    describe('pathHasEntry', () => {
        it('checks a path for an entry', () => {
            let first = [ ...myEdges ][0];
            expect(utils.pathHasEntry(myEdges)(first)).toBeTrue();
        });
    });
    describe('x_pathHasEntry', () => {
        it('checks a path for an entry', () => {
            let first = [ ...myEdges ][0];
            expect(utils.x_pathHasEntry(myEdges)(first))
             .toBeFalse();
        });
    });
});
