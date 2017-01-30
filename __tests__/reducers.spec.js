import 'jasmine-expect';
import { addEdgeBin,
 addNodeBin, importEdgeBin, mergeEdgesBin, neighborPairs,
  nodes, removeEdgeBin, resetNodeBin,
} from 'graph-curry';
import { disconnectNodeBin2, } from 'src/reducers';
import { n0, n2, n7, } from './shared';
import { eGraph, oGraph, } from './graph.spec';

const cSet = new Set([ 1, 2, 3, 4, ]);
const cMap = [[ 8, 1 ], [ 7, 2 ], [ 6, 3 ], [ 5, 4 ]].reduce(addEdgeBin, new Map);
const dMap = [[ 8, 19, 2 ], [ 7, 17, 2 ], [ 6, 16, 2 ], [ 5, 15, 2 ]].reduce(addEdgeBin, new Map);
const cArr = [ 0, 11, 22, 33, 44, ];
const connGraph = nodes(eGraph).map((e, id, arr) =>
    [ e, arr[((id + 1) % arr.length)], id, ]).reduce(addEdgeBin, eGraph);

describe('addNodeBin', () => {
  it('adds a [key, Map] pair to a map', () => {
    expect((addNodeBin(cMap, 'added')).has('added')).toBeTrue();
  });
});
describe('addEdgeBin', () => {
  it('adds src nodes and neighbors and weights', () => {
    expect((addEdgeBin(new Map, [ 'added', 'new', 'nabe' ])) instanceof Map).toBeTrue();
  });
});
describe('removeEdgeBin', () => {
  it('removes a key value pair', () => {
    expect((removeEdgeBin(cMap, [ 'added', 'new', 'nabe' ]).get('added')).has('new')).toBeFalse();
  });
});

describe('resetNodeBin', () => {
  it('removes the connections from a source node ', () => {
    expect(resetNodeBin(cMap, 8).get(8).has(1)).toBeFalse();
  });
});
describe('neighborPairs', () => {
  it('assembles a src node and its neighbors into [src, nb] pairs', () => {
    expect(neighborPairs(connGraph)(n2)).toBeArray();
  });
});
describe('disconnectNodeBin2', () => {
  it('isolates a node from all its neighbors', () => {
    console.log('isconnectNodeBin2(connGraph)(n2)', disconnectNodeBin2(connGraph, n2));
    expect(neighborPairs(disconnectNodeBin2(connGraph, n2))(n2).length).toEqual(0);
  });
});
describe('importEdgeBin', () => {
  it('adds missing neighbors to a graph and adds connections', () => {
    expect(importEdgeBin(cMap, [ 11, dMap.get(8) ]).has(11)).toBeTrue();
  });
});
describe('mergeEdgesBin', () => {
  it('combines two Edge maps', () => {
    expect(mergeEdgesBin(connGraph, oGraph).has(n7)).toBeTrue();
  });
});
