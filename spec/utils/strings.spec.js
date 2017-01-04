import 'jasmine-expect';
import * as Graph from 'src/graph';
import * as Str from 'src/utils/strings';
import { myNodes, } from '../shared';
const myGraph = Graph.fromElements(...myNodes);

describe('strings', () => {
  describe('redStr', () => {
    it('concatenates the string with an  argument', () => {
      expect(Str.redStr('1,2,3,', 6)).toBeString();
    });
  });
  describe('kString', () => {
    it('concatenates the string representaion of all keys', () => {
      expect(Str.kString([ 1, 2, 3, 6 ])).toBeString();
    });
  });

  describe('vString', () => {
    it('concatenates the string representaion of all keys', () => {
      expect(Str.vString(new Set([ 1, 2, 3, 6 ]))).toBeString();
    });
  });
  describe('kvString', () => {
    it('concatenates the string representaion of all keys', () => {
      expect(Str.kvString([ 1, 2, 3, 6 ])).toBeString();
    });
  });
  describe('collString', () => {
    it('concatenates the string representaion of all keys', () => {
      expect(Str.collString([ 1, 2, 3, 6 ])).toBeString();
    });
  });
  describe('pathString', () => {
    it('should behave...', () => {
      expect(Str.pathString(myGraph)).toBeString();
    });
  });
  describe('edgeString', () => {
    it('should behave...', () => {
      const edge0 = [ ...(myGraph) ][0];

      expect(Str.edgeString(edge0)).toBeString();
    });
  });
});
