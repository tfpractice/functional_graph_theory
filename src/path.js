import { addMap, lastK, } from 'fenugreek-collections';

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

// **getWeight** `:: {weight:Number} -> Number`
// returns an object with pred, weight, and length properties
export const getWeight = ({ weight = 0 }) => weight;

// **getLength** `:: {length:Number} -> Number`
// returns an object with pred, weight, and length properties
export const getLength = ({ length = 1 }) => length;

// **lastVal** `:: Map<pathEntry> -> {pred, length, weight}`
// returns the last entry in the path
export const lastVal = path => path.get(lastK(path));

// **lastWeight** `:: Map<pathEntry> -> Number`
// returns the last weight in the path
export const lastWeight = path => getWeight(lastVal(path));

// **lastLength** `:: Map<pathEntry> -> Number`
// returns the last length in the path
export const lastLength = path => getLength(lastVal(path));

// **nextWeight** `:: Map<pathEntry> -> Number -> Number`
// returns an object with pred, weight, and length properties
export const nextWeight = path => (w = 0) => lastWeight(path) + w;

// **nextLength** `:: Map<pathEntry> -> Number -> Number`
// returns an object with pred, weight, and length properties
export const nextLength = path => lastLength(path) ? lastLength(path) + 1 : 1;

// **nextPath** `:: (Map<pathEntry>, [node, Number]) -> Map<pathEntry> `
// returns an object with pred, weight, and length properties
export const nextPath = (path = new Map, [ n, w = 0 ]) =>
  path.set(n, pathVal(lastK(path))(nextLength(path))(nextWeight(path)(w)));
