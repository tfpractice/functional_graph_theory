import 'jasmine-expect';
import { addEdgeBin, addSrc, clearNeighborsBin, importEdgeBin, nabeMap,
  rmEdgeBin, } from 'src/reducers';

const cSet = new Set([ 1, 2, 3, 4, ]);
const cMap = new Map().set(8, 1).set(7, 2).set(6, 3).set(5, 4);
const dMap = new Map().set(8, 19).set(7, 17).set(6, 16).set(5, 15);
const rMap = new Map();
const cArr = [ 0, 11, 22, 33, 44, ];

describe('nabeMap', () => {
  it('retrieves a map of the key and its connections', () => {
    expect(nabeMap(cMap)(92) instanceof Map).toBeTrue();
  });
});
describe('addSrc', () => {
  it('adds a [key, Map] pair to a map', () => {
    expect((addSrc(cMap, 'added')).has('added')).toBeTrue();
  });
});
describe('addEdgeBin', () => {
  it('adds src nodes and neighbors and weights', () => {
    expect((addEdgeBin(rMap, [ 'added', 'new', 'nabe' ])) instanceof Map).toBeTrue();
  });
});
describe('rmEdgeBin', () => {
  it('removes a key value pair', () => {
    expect((rmEdgeBin(cMap, [ 'added', 'new', 'nabe' ]).get('added')).has('new')).toBeFalse();
  });
});

describe('clearNeighborsBin', () => {
  it('removes the connections from a source node ', () => {
    expect(nabeMap(clearNeighborsBin(cMap, 8))(8).has(1)).toBeFalse();
  });
});

describe('importEdge', () => {
  it('adds missing neighbors to a graph and adds connections', () => {
    expect(importEdgeBin(cMap, [ 11, dMap.get(8) ]).has(11)).toBeTrue();
  });
});
