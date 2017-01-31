import 'jasmine-expect';
import { appendPath, getLength, getWeight, initPath, lastLength, lastVal,
lastWeight, nextLength, nextPath, nextWeight, pathEntry, } from 'src/path';

import { connGraph, n0, n2, n7, } from './shared';
describe('paths', () => {
  describe('pathEntry', () => {
    it('returns an object with pred, weight, and length properties', () => {
      expect(pathEntry(n0, 2, 2).pred).toBe(n0);
      expect(pathEntry(n0, 2, 2).weight).toBe(2);
      expect(pathEntry(n0, 2, 2).length).toBe(2);
    });
  });
  describe('appendPath', () => {
    it('appends a pathEntry to a path', () => {
      expect(appendPath()(n0) instanceof Map).toBeTrue();
    });
  });
  describe('getLength', () => {
    it('returns the length of the path entry', () => {
      expect(getLength(appendPath()(n0))).toEqual(1);
    });
  });
  describe('getWeight', () => {
    it('returns the weight of the path entry', () => {
      expect(getWeight(appendPath()(n0))).toEqual(0);
    });
  });
  describe('lastLength', () => {
    it('returns the lenght of the path entry', () => {
      expect(lastLength(appendPath()(n0))).toEqual(1);
    });
  });
  describe('lastWeight', () => {
    it('returns the weight of the path entry', () => {
      expect(lastWeight(appendPath()(n0))).toEqual(0);
    });
  });
  describe('nextLength', () => {
    it('returns the lenght of the path entry', () => {
      expect(nextLength(appendPath()(n0))).toEqual(2);
    });
  });
  describe('nextWeight', () => {
    it('returns the weight of the path entry', () => {
      expect(nextWeight(appendPath()(n0))(5)).toEqual(5);
    });
  });
  describe('nextPath', () => {
    it('augments a path by adding a node, increasing theweight and length', () => {
      expect(nextWeight(nextPath(appendPath()(n0), [n2, 2]))(0)).toEqual(2);
    });
  });
});
