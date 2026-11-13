/* eslint-disable @typescript-eslint/no-explicit-any -- SDK mocks intentionally accept synthetic records. */
import { describe, it, expect, vi, beforeEach } from 'vitest';
const state = vi.hoisted(() => ({ token: {uid:'student',schoolId:'a',role:'student'} as any, records: new Map<string,any>(), verify: vi.fn(), claim: vi.fn() }));
vi.mock('../server/admin.js', () => ({ admin: () => ({
  auth: { verifyIdToken: state.verify, getUser: async () => ({customClaims:{schoolId:'b',role:'teacher'}}), setCustomUserClaims:state.claim },
  db: { doc: (path:string) => ({ path, get:async () => ({exists:state.records.has(path),data:()=>state.records.get(path)}) }),
    runTransaction: async (fn:any) => fn({get:async (ref:any)=>({exists:state.records.has(ref.path),data:()=>state.records.get(ref.path)}),create:(ref:any,data:any)=>state.records.set(ref.path,data),set:(ref:any,data:any)=>state.records.set(ref.path,data)}) }
}) }));
import handler from '../api/cloud.js';
async function request(body:any, authorization='Bearer test', method='POST') {
  const res:any={ code:200, payload:null, setHeader:vi.fn(), status(code:number){this.code=code;return this;},json(payload:any){this.payload=payload;return this;} };
  await handler({method,headers:{authorization},body},res);return res;
}
beforeEach(() => {state.records.clear();state.token={uid:'student',schoolId:'a',role:'student'};state.verify.mockReset().mockImplementation(async()=>state.token);state.claim.mockClear();state.records.set('quizzes/1',{published:true});state.records.set('quizKeys/1',{answerKey:[1,0],optionCounts:[2,2]});});
describe('trusted backend',()=>{
  it('requires a valid Firebase session',async()=>{expect((await request({},'')).code).toBe(401);state.verify.mockRejectedValue(new Error());expect((await request({})).code).toBe(401);});
  it('rejects unassigned identities and unknown actions',async()=>{state.token={uid:'x'};expect((await request({})).code).toBe(403);});
  it('stores authoritative grades and returns an existing attempt on retry',async()=>{
    const r=await request({action:'gradeQuiz',quizId:'1',attemptId:'attempt',answers:[1,1],score:100,schoolId:'b'});
    expect(r.payload).toEqual({score:1,total:2,percent:50});expect(state.records.get('quizResults/student_attempt').schoolId).toBe('a');
    expect((await request({action:'gradeQuiz',quizId:'1',attemptId:'attempt',answers:[1,0]})).payload.score).toBe(1);
    expect(state.records.get('learningProgress/student_1').completed).toBe(true);
  });
  it('rejects malformed answers before writing results',async()=>{expect((await request({action:'gradeQuiz',quizId:'1',attemptId:'attempt',answers:[4,0]})).code).toBe(400);expect(state.records.has('quizResults/student_attempt')).toBe(false);});
  it('denies student role assignment and cross-school administration',async()=>{expect((await request({action:'assignRole',uid:'other',role:'teacher'})).code).toBe(403);state.token.role='administrator';expect((await request({action:'assignRole',uid:'other',role:'teacher'})).code).toBe(403);expect(state.claim).not.toHaveBeenCalled();});
  it('never grants administrator from the web endpoint',async()=>{state.token.role='administrator';expect((await request({action:'assignRole',uid:'other',role:'administrator'})).code).toBe(400);});
});
