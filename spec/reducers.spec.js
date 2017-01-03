import 'jasmine-expect';
import { addSrc, } from 'src/reducers';

const cSet = new Set([ 1, 2, 3, 4, ]);
const cMap = new Map().set(8, 1).set(7, 2).set(6, 3).set(5, 4);
const rMap = new Map();
const cArr = [ 0, 11, 22, 33, 44, ];

console.log(addSrc);

// console.log(Reducers);
//
// xdescribe('Reducers', () => {
//   beforeAll(() => {
//     console.log('\n......... Reducers Spec.........');
//   });
//
//   beforeEach(() => {
//     // rEdges = Graph.spawn();
//     // evens = Graph.addNodes()(...eFilter(myNodes));
//     // odds = Graph.addNodes()(...oNodes);
//   });

describe('addSrc', () => {
  it('adds a [key, Map] pair to a map', () => {
    expect(addSrc()).toBeString();

    // expect((addSrc(rMap, 'added')).has('added')).toBeTrue();
  });
});

//
//   xdescribe('rmEdge', () => {
//     it('removes the connections beteen ', () => {
//       const rNabes = Graph.addEdges(rEdges)(n0, 0)(n1, n2, n3).get(n0);
//
//       RD.rmEdge(rEdges, [ n0, n1 ]);
//       expect(Graph.adj(rEdges)(n0).has(n1)).toBeFalse();
//     });
//   });
//
//   xdescribe('importEdge', () => {
//     it('adds missing neighbors to a graph and adds connections', () => {
//       [
//         [ n15, n13, 7 ],
//         [ n15, n17, 7 ],
//         [ n15, n11, 7 ],
//       ].reduce(Graph.addEdgeR, odds);
//       RD.importEdge(evens, [ n15, odds.get(n15) ]);
//       expect(evens.has(n17)).toBeTrue();
//       expect(evens.get(n15).has(n17)).toBeTrue();
//       expect(evens.get(n15).has(n13)).toBeTrue();
//     });
//   });
// });
