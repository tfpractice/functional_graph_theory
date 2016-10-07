// const utils = require('./utils');
// const { spreadKeys, spreadValues, spreadEntries } = utils;
// const { hasKey, x_hasKey, showGraph } = utils;

// const reducers = require('./edge_reducers');
// const { addEdgeR, appendR, rmNodeR, addNeighborR, addEntryR, } = reducers;

// const weighedEntry = (weight = 0) => (nabe) => [ nabe, weight ];

// const edgeEntry = (w = 0) => (src) => (nabe) => [ src, nabe, w ];

// const spawn = (edges = new Map) => new Map(edges);
// const copy = spawn;
// const fromElements = (...elements) => addNodes(spawn())(...elements);
// // makeEdges
// const contains = (edges = new Map) => (node) => edges.has(node);
// const nodes = (edges = new Map) => [ ...new Set(edges.keys()) ];

// const adj = (edges = new Map) => (src) =>
//  edges.has(src) ? edges.get(src) : new Map;

// const neighbors = (edges = new Map) => (src) => nodes(adj(edges)(src));

// const isAdjacent = (edges = new Map) => (src) => (nabe) =>
//  contains(adj(edges)(src))(nabe);

// const clearEdges = (edges) => edges.clear;

// const addNodes = (edges = new Map) => (...nodes) =>
//  nodes.reduce(appendR, edges);

// const rmNode = (edges = new Map) => (src) =>
//  edges.delete(src) ? edges : edges;

// const removeNodes = (edges = new Map) => (...nodes) =>
//  nodes.reduce(rmNodeR, edges);

// const addNeighbor = (edges = new Map) => (src) => (n, w = 0) =>
//  addNeighborR(adj(edges)(src), n, w);

// const rmEdge = (edges = new Map) => (src) => (nabe) =>
//  rmNode(adj(edges)(src))(nabe);

// const rmEdges = (edges = new Map) => (src) => (...nabes) =>
//  rmNode(adj(edges)(src))(nabe);

// const addEdges = (edges = new Map) => (src, w = 0) => (...nabes) =>
//  nabes.map(edgeEntry(w)(src)).reduce(addEdgeR, edges);

// const addEntry = (nabes = new Map) => ([n, w = 0]) => addNeighborR(nabes, n, w);

// const mergeNeighbors = (nabes = new Map) => (alts = new Map) =>
//  [ ...alts ].reduce(addEntryR, nabes);

// const mergeEdgesR = (edges = new Map, [src, alts]) =>
//  edges.set(src, mergeNeighbors(adj(edges)(src))(alts));

// const mergeEdges = (edges = new Map) => (alts = new Map) => {
//     [ ...alts ].reduce(mergeEdgesR, edges);
// };

// module.exports = { spawn,
//     contains,
//     nodes,
//     adj,
//     addNodes,
//     rmNode,
//     rmEdge,
//     removeNodes,
//     neighbors,
//     addNeighbor,
//     addEdges,
//     addEdgeR,
//     addEntry,
//     weighedEntry,
//     mergeNeighbors,
//     mergeEdges,
//     fromElements, };
// // const initEdge = (edges) => (src) => edges.set(src, new Map);
// // // const initR = (edges = new Map, next) => edges.set(next, new Map);

// // const makeEdges = (...elements) =>
// //   spreadValues(new Set(elements))
// //   .reduce((eMap, next) => initEdge(eMap)(next), new Map);

// // const fromElements = (...elements) =>
// //   ({ edges: makeEdges(...elements) });

// // const edges = ({ edges = new Map }) => edges;
// // const nodes = ({ edges = new Map }) => new Set(spreadKeys(edges));
// // const copy = ({ edges }) => ({ edges: new Map(edges) });
// // const neighbors = ({ edges }) => (node) => spreadKeys(edges.get(node));

// // const contains = ({ edges }) => (node) => edges.has(node);
// // const x_contains = ({ edges }) => (node) => !edges.has(node);
// // const isAdjacent = ({ edges }) => (n0) => (n1) => edges.get(n0).has(n1);
// // const clearEdges = ({ edges }) => edges.clear;

// // const hasEdge = (graph) => (n0, n1) =>
// //   isAdjacent(graph)(n0)(n1) && isAdjacent(graph)(n1)(n0);

// // // const addNodesR = ({ edges }, newNode) => edges.set(newNode, new Map);

// // const addNodes = ({ edges }) => (...additional) =>
// //   additional.filter(x_hasKey(edges)).map(initEdge(edges));

// // const addEdge = ({ edges }) => (n0) => (n1, weight = 0) => {
// //   addNodes({ edges })(n0, n1);
// //   if (!hasEdge(({ edges }))(n0, n1)) {
// //       edges.get(n0).set(n1, weight);
// //       edges.get(n1).set(n0, weight);
// //   }

// // };

// // const removeEdge = ({ edges }) => (src) => (nabe) =>
// //   hasEdge({ edges })(src, nabe) ?
// //   (edges.get(src).delete(nabe) && edges.get(nabe).delete(src)) :
// //   ({ edges });

// // const removeNode = ({ edges }) => (exNode) => {
// //   if (contains({ edges })(exNode)) {
// //       neighbors({ edges })(exNode).forEach(removeEdge({ edges })(exNode));
// //       edges.delete(exNode);
// //   }
// // };

// // const addNeighbor = (graph) => (src) => ([nabe, wt = 0]) =>
// //   addEdge(graph)(src)(nabe, wt);

// // const importEdge = (graph) => ([src, nabes = new Map]) =>
// //   spreadEntries(nabes).forEach(addNeighbor(graph)(src));

// // const mergeGraphs = (graph) => ({ edges: altEdges = new Map }) =>
// //   spreadEntries(altEdges).forEach(importEdge(graph));

// // module.exports = {
// //   addEdge,
// //   addNodes,
// //   clearEdges,
// //   contains,
// //   edges,
// //   fromElements,
// //   importEdge,
// //   isAdjacent,
// //   makeEdges,
// //   mergeGraphs,
// //   neighbors,
// //   nodes,
// //   removeEdge,
// //   removeNode,
// //   showGraph,
// // };