import { describe, it, expect } from 'vitest';
import { membership, grade } from '../server/policy.js';
describe('server authority and grading', () => {
  it('rejects missing/invalid trusted school claims', () => {
    for (const token of [null, { uid: 'a' }, { uid:'a', schoolId:'school', role:'owner' }, {uid:'a',schoolId:'../other',role:'student'}]) expect(() => membership(token)).toThrow();
  });
  it('accepts each permitted trusted role', () => { for (const role of ['student','teacher','administrator']) expect(membership({ uid:'a',schoolId:'school',role }).role).toBe(role); });
  it('grades using private keys and rejects malformed submissions', () => {
    const quiz = { answerKey:[0,2], optionCounts:[3,3] };
    expect(grade(quiz,[0,1])).toEqual({score:1,total:2,percent:50});
    for (const answers of [[], [0], [0,3], [0,2,1], ['0',2], [-1,2]]) expect(() => grade(quiz,answers)).toThrow();
  });
});
