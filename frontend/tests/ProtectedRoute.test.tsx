/* eslint-disable @typescript-eslint/no-explicit-any -- SDK mocks intentionally accept synthetic records. */
// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '../src/components/ProtectedRoute';
const state = vi.hoisted(() => ({ user:null as any, loading:false, role:'student', schoolId:'a' as string | null }));
vi.mock('@/context/AuthContext', () => ({ useAuth: () => state }));
afterEach(cleanup);
function mount(roles?: string[]) { render(<MemoryRouter initialEntries={['/private']}><Routes><Route path="/private" element={<ProtectedRoute roles={roles}><p>Private</p></ProtectedRoute>} /><Route path="/auth" element={<p>Sign in</p>} /></Routes></MemoryRouter>); }
describe('protected routes', () => {
  it('redirects signed out visitors', () => { state.user=null; mount(); expect(screen.getByText('Sign in')).toBeTruthy(); });
  it('waits for authentication', () => { state.loading=true; mount(); expect(screen.getByText('Loading...')).toBeTruthy(); state.loading=false; });
  it('denies student staff access', () => { state.user={uid:'x'}; state.role='student'; mount(['teacher','administrator']); expect(screen.getByRole('alert')).toBeTruthy(); });
  it('allows authorized staff', () => { state.user={uid:'x'};state.role='teacher';mount(['teacher']);expect(screen.getByText('Private')).toBeTruthy(); });
  it('denies staff with no school assignment', () => { state.schoolId=null;mount(['teacher']);expect(screen.getByRole('alert')).toBeTruthy();state.schoolId='a'; });
});
