/* eslint-disable @typescript-eslint/no-explicit-any -- SDK mocks intentionally accept synthetic records. */
// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCloud } from '../src/hooks/useCloud';
const state=vi.hoisted(()=>({user:{uid:'one'},schoolId:'a',stop:vi.fn(),listen:vi.fn(),next:null as any}));
vi.mock('@/context/AuthContext',()=>({useAuth:()=>state}));
vi.mock('@/lib/cloud',()=>({listen:state.listen}));
describe('school listeners',()=>{
  it('subscribes with school/owner constraints, propagates results and unsubscribes on identity change/unmount',()=>{
    state.listen.mockImplementation((name,school,uid,next)=>{state.next=next;return state.stop;});
    const {result,rerender,unmount}=renderHook(()=>useCloud('quizResults',true));
    expect(state.listen).toHaveBeenLastCalledWith('quizResults','a','one',expect.any(Function),expect.any(Function));
    act(()=>state.next([{id:'attempt',score:2}]));expect(result.current.rows[0].score).toBe(2);
    state.schoolId='b';rerender();expect(state.stop).toHaveBeenCalledTimes(1);expect(result.current.rows).toEqual([]);
    unmount();expect(state.stop).toHaveBeenCalledTimes(2);
  });
});
