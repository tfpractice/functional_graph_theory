import { addBinMap, asMap, get, hasK, removeBin, spreadK, triple, tuple, uniteMap, } from 'fenugreek-collections';
import { addEdgeBin, addNodeBin, disconnectNodeBin, mergeEdgesBin, removeEdgeBin, resetNodeBin, }
from './reducers';

// **mergeNeighbors** `::  Map<edge> ->  node  -> Map<edge>`
// resets the nodes adjacency list to an empty map
export const mergeNeighbors = uniteMap;

// **spawn** `::  Map<edge> -> Map<edge>`
// returns a new Edgelist
export const spawn = edges => asMap(edges);

// **copy** `::  Map<edge> -> Map<edge>`
// creates a copy of a Edgelist
export const copy = spawn;

// **fromElements** `::  Map<edge> -> ...node  -> Map<edge>`
// adds  {node: adjacencyList} pairs ot an Edgelist
export const fromElements = (...elems) => elems.reduce(addNodeBin, copy());

// **nodes** `::  Map<edge> ->  [node]
// returns an array of the nodes
export const nodes = edges => spreadK(copy(edges));

// **adj** `::  Map<edge> ->  node  -> Map<{node: Number}>`
// returns the nodes adjacency list
export const adj = edges => src => asMap(get(edges)(src));

// **neighbors** `::  Map<edge> ->  node  -> [node]`
// returns the nodes neighbors
export const neighbors = edges => src => nodes(adj(edges)(src));

// **contains** `::  Map<edge> ->  node  -> Boolean`
// checks for the presence of a node in an edgelist
export const contains = edges => node => hasK(edges)(node);

// **isAdjacent** `::  Map<edge> ->  node  -> Map<edge>`
// checks for the presence of a neighbor in a node's adjacency list
export const isAdjacent = edges => src => nb => contains(adj(edges)(src))(nb);

// **addNodes** `::  Map<edge> ->  ...node  -> Map<edge>`
// adds nodes to an Edgelist
export const addNodes = edges => (...srcs) => srcs.reduce(addNodeBin, edges);

// **resetNodes** `::  Map<edge> ->  ...node  -> Map<edge>`
// resets the adjacency lists of given nodes to an empty map
export const resetNodes = edges => (...src) => src.reduce(resetNodeBin, edges);

// **addEdges** `::  Map<edge> ->  (node, Number) -> ...node  -> Map<edge>`
// creates edges between a node and multiple other nodes
export const addEdges = edges => (src, w = 0) => (...nabes) =>
nabes.map(triple(w)(src)).reduce(addEdgeBin, edges);

// **removeEdges** `::  Map<edge> ->  node -> ...node  -> Map<edge>`
// removes edges between a node and select other nodes
export const removeEdges = edges => src => (...nabes) =>
nabes.map(tuple(src)).reduce(removeEdgeBin, edges);

// **disconnectNodes** `:: Map<edge> ->  ...node  -> Map<edge>`
// resets the nodes adjacency list to an empty map
export const disconnectNodes = edges => (...srcs) =>
 srcs.reduce(disconnectNodeBin, copy(edges));

 // **removeNodes** `::  Map<edge> ->  ...node  -> Map<edge>`
 // resets the nodes adjacency list to an empty map
export const removeNodes = edges => (...srcs) =>
srcs.reduce(removeBin, disconnectNodes(edges)(...srcs));

// **mergeEdges** `::  Map<edge> -> ...{node:adjacency} -> Map<edge>`
// resets the nodes adjacency list to an empty map
export const mergeEdges = edges => (...alt) => alt.reduce(mergeEdgesBin, edges);

// **addNeighbor** `::  Map<edge> -> ...{node:adjacency} -> Map<edge>`
// resets the nodes adjacency list to an empty map
export const addNeighbor = edges => src => (n, w = 0) =>
addBinMap(adj(edges)(src), [n, w]);

// **addEntry** `::  Map<{node:Number}> ->  [node, Number]  -> Map<edge>`
// resets the nodes adjacency list to an empty map
export const addEntry = nabes => ([n, w = 0]) => addBinMap(nabes, [n, w]);
