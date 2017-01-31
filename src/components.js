import { addBinMap, addSet, diff, spreadK, spreadV, tuple, }
 from 'fenugreek-collections';

 // **components** `::  Map<edge> -> Map<component>`
 // maps each node to a set of connected nodes
export const components = (edges) => {
  const trav = (comp = new Set, node) =>
     diff(spreadK(edges.get(node)))(comp).reduce(trav, addSet(comp)(node));
     
  const visitMap = (mMap = new Map, node) =>
     diff(trav(new Set, node))(mMap).map(tuple(trav(new Set, node)))
       .reduce(addBinMap, mMap);
  
  return spreadK(edges).reduce(visitMap, new Map);
};

export const componentSet = edges => new Set(spreadV(components(edges)));
