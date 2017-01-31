import { addBinMap, addBinSet, addMap, asMap, lastK, popFirst,
   spread, spreadK, spreadV, tuple, } from 'fenugreek-collections';

// **pathEntry** `:: ( node, Number, Number ) -> {pred, length, weight}`
// returns an object with pred, weight, and length properties
export const pathEntry = (pred = null, length = 1, weight = 0) => ({ pred, length, weight });
const pathVal = (pred = null) => (length = 1) => (weight = 0) =>
  ({ pred, length, weight });
  
// **addSrc** `:: Map<pathEntry> -> node ->  Map<pathEntry>`
// adds a {node:{pred, weight, length}} entry to a  path
export const appendPath = path => src => addMap(path)(src)(pathEntry(lastK(path), 1, 0));

// **initPath** `:: node -> Map<pathEntry>`
// initializes a new path given a source node
export const initPath = node => appendPath()(node);

// **ptW** `:: ( node, Number, Number ) -> {pred, length, weight}`
// returns an object with pred, weight, and length properties
export const getWeight = ({ weight = 0 }) => weight;

// **ptL** `:: ( node, Number, Number ) -> {pred, length, weight}`
// returns an object with pred, weight, and length properties
export const getLength = ({ length = 1 }) => length;

// **lastVal** `:: ( node, Number, Number ) -> {pred, length, weight}`
// returns the last entry in the path
export const lastVal = path => path.get(lastK(path));

// **lastW** `:: ( node, Number, Number ) -> {pred, length, weight}`
// returns the last weight in the path
export const lastWeight = path => getWeight(lastVal(path));

// **lastL** `:: ( node, Number, Number ) -> {pred, length, weight}`
// returns the last length in the path
export const lastLength = path => getLength(lastVal(path));

// **nextW** `:: ( node, Number, Number ) -> {pred, length, weight}`
// returns an object with pred, weight, and length properties
export const nextWeight = path => (w = 0) => lastWeight(path) + w;

// **nextL** `:: ( node, Number, Number ) -> {pred, length, weight}`
// returns an object with pred, weight, and length properties
export const nextLength = path => lastLength(path) ? lastLength(path) + 1 : 1;

// **nextPath** `:: ( node, Number, Number ) -> {pred, length, weight}`
// returns an object with pred, weight, and length properties
export const nextPath = (path = new Map, [ n, w = 0 ]) =>
  path.set(n, pathVal(lastK(path))(nextLength(path))(nextWeight(path)(w)));
