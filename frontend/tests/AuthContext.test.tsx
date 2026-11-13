// @vitest-environment jsdom
import React from 'react';
import { it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { AuthProvider, useAuth } from '../src/context/AuthContext';
const mocked=vi.hoisted(()=>({ changed:undefined as undefined | ((u:unknown)=>Promise<void>), stop:vi.fn() }));
vi.mock('@/lib/firebase',()=>({auth:{},googleProvider:{}}));
vi.mock('firebase/auth',()=>({onIdTokenChanged:(_auth:unknown,cb:(u:unknown)=>Promise<void>)=>{mocked.changed=cb;return mocked.stop;},signInWithPopup:vi.fn(),signOut:vi.fn(),createUserWithEmailAndPassword:vi.fn(),signInWithEmailAndPassword:vi.fn(),updateProfile:vi.fn()}));
function Identity(){const {user,role,schoolId,authError}=useAuth();return <p>{JSON.stringify({uid:user?.uid,role,schoolId,authError})}</p>;}
it('loads signed claims, clears membership on signout, handles token errors and removes auth listener',async()=>{
  const {unmount}=render(<AuthProvider><Identity /></AuthProvider>);
  await act(async()=>{await mocked.changed!({uid:'one',getIdTokenResult:async()=>({claims:{role:'teacher',schoolId:'school'}})});});
  expect(screen.getByText(/"role":"teacher"/)).toBeTruthy();
  await act(async()=>{await mocked.changed!(null);});
  expect(screen.getByText(/"schoolId":null/)).toBeTruthy();
  await act(async()=>{await mocked.changed!({uid:'one',getIdTokenResult:async()=>{throw new Error('network');}});});
  expect(screen.getByText(/Unable to load account permissions/)).toBeTruthy();
  unmount();expect(mocked.stop).toHaveBeenCalledTimes(1);
});
