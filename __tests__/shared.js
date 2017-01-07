import { addEdges, nodes, } from 'graph-curry';

export const Node = (label = '', data = {}) =>
  ({ label, data, toString: () => label, });

export const myNodes = Array(20).fill('node').map((el, id) =>
  Node(`${el}::${id}`, { position: id })
);
export const altNodes = Array(20).fill('altnode').map((el, id) =>
  Node(`${el}::${id}`, { position: id })
);
export const firstTen = myNodes.slice(0, 10);
export const lastTen = myNodes.slice(-10);
export const [ n0, n1, n2, n3, n4, n5, n6, n7, n8, n9 ] = firstTen;
export const [ n10, n11, n12, n13, n14, n15, n16, n17, n18, n19 ] = lastTen;

export const eFilter = coll => coll.filter(({ data: { position: p }}) => p % 2 === 0);
export const oFilter = coll => coll.filter(({ data: { position: p }}) => p % 2 === 1);
export const nEdgesR = edges => eFilter(nodes(edges))
  .reduce((prv, nxt, id) => addEdges(edges)(prv, id * 2)(nxt) && nxt);
export const oEdgesR = edges => oFilter(nodes(edges))
  .reduce((prv, nxt, id) => addEdges(edges)(prv, id * 2)(nxt) && nxt);
export const eNodes = eFilter(myNodes);
export const oNodes = oFilter(myNodes);
