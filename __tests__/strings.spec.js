import 'jasmine-expect';
import { first, } from 'fenugreek-collections';
import { fromElements, } from 'src/graph';
import { collString, edgeString,
  kString, kvString, pathString, redStr, vString, } from 'src/strings';

import { myNodes, } from './shared';

describe('strings', () => {
  describe('redStr', () => {
    it('concatenates the string with an  argument', () => {
      expect(redStr('1,2,3,', 6)).toBeString();
    });
  });
  describe('kString', () => {
    it('concatenates the string representaion of all keys', () => {
      expect(kString([ 1, 2, 3, 6 ])).toBeString();
    });
  });

  describe('vString', () => {
    it('concatenates the string representaion of all keys', () => {
      expect(vString(new Set([ 1, 2, 3, 6 ]))).toBeString();
    });
  });
  describe('kvString', () => {
    it('concatenates the string representaion of all keys', () => {
      expect(kvString([ 1, 2, 3, 6 ])).toBeString();
    });
  });
  describe('collString', () => {
    it('concatenates the string representaion of all keys', () => {
      expect(collString([ 1, 2, 3, 6 ])).toBeString();
    });
  });
  describe('pathString', () => {
    it('should behave...', () => {
      expect(pathString(fromElements(...myNodes))).toBeString();
    });
  });
  describe('edgeString', () => {
    it('should behave...', () => {
      expect(edgeString(first(fromElements(...myNodes)))).toBeString();
    });
  });
});
