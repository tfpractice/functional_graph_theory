import { collections, } from 'turmeric-utils';

const { spread, spreadK, spreadV, spreadKV, last } = collections;

export const redStr = (str = ' ', val, id, coll) =>
  val === last(coll) ? str.concat(val, ' ') : str.concat(val, ' , ');
export const collString = coll => spread(coll).reduce(redStr, '');
export const kString = coll => spreadK(coll).reduce(redStr, '');
export const vString = coll => spreadV(coll).reduce(redStr, '');
export const kvString = coll => spreadKV(coll).reduce(redStr, '');

export const pathString = path => ` { ${spreadK(path).join(' => ')} }`;
export const edgeString = ([ src, nbs ]) => `{ Edge ${src} >> [ ${kString(nbs)} ] } `;

export const componentString = ([ node, nbs ]) =>
  `{ component ${node} >> [ ${kString(nbs)} ] } `;

export const graphString = edges =>
  spreadKV(edges).reduce((str, [ node, nabes ], id) =>
    str + edgeString([ node, nabes ]),
    'Showing Edges\n');

export const showGraph = ({ edges }) => (graphString(edges));
