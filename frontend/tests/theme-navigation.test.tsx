// @vitest-environment jsdom
import React from 'react';
import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, cleanup, within } from '@testing-library/react';
import { MemoryRouter, Routes, Route, Link } from 'react-router-dom';
import { useTheme } from 'next-themes';
import { ThemeProvider } from '../src/components/theme-provider';
import { ThemeToggle } from '../src/components/theme-toggle';
import AdminDashboard from '../src/pages/AdminDashboard';
import ChatWidget from '../src/components/chatbot/ChatWidget';

vi.mock('@/context/AuthContext', () => ({ useAuth: () => ({ schoolId: 'demo-school', role: 'administrator' }) }));
vi.mock('@/hooks/useCloud', () => ({ useCloud: () => ({ rows: [], error: null }) }));
vi.mock('@/lib/cloud', () => ({ create: vi.fn(), api: vi.fn(), editRecord: vi.fn(), removeRecord: vi.fn() }));
vi.mock('recharts', () => Object.fromEntries(['XAxis', 'YAxis', 'CartesianGrid', 'Tooltip', 'ResponsiveContainer', 'BarChart', 'Bar'].map(name => [name, () => null])));

beforeEach(() => {
  const stored = new Map<string, string>();
  vi.stubGlobal('localStorage', { getItem: (key: string) => stored.get(key) ?? null, setItem: (key: string, value: string) => stored.set(key, value), removeItem: (key: string) => stored.delete(key), clear: () => stored.clear() });
  document.documentElement.className = '';
  Object.defineProperty(window, 'matchMedia', { configurable: true, value: vi.fn(() => ({ matches: true, addListener: vi.fn(), removeListener: vi.fn() })) });
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); });
function ThemeStatus() {
  const { resolvedTheme } = useTheme();
  return <output aria-label="Current theme">{resolvedTheme}</output>;
}
function mount(theme?: string) {
  if (theme) localStorage.setItem('theme', theme);
  return render(<ThemeProvider attribute="class" defaultTheme="system" enableSystem><MemoryRouter initialEntries={['/dashboard']}>
    <ThemeStatus />
    <Routes>
      <Route path="/dashboard" element={<><ThemeToggle /><Link to="/dashboard/admin">Open administrator dashboard</Link><ChatWidget /></>} />
      <Route path="/dashboard/admin" element={<AdminDashboard alerts={[]} />} />
    </Routes>
  </MemoryRouter></ThemeProvider>);
}
async function expectTheme(theme: string) {
  await waitFor(() => {
    expect(screen.getByLabelText('Current theme').textContent).toBe(theme);
    expect(document.documentElement.classList.contains(theme)).toBe(true);
  });
}
describe('one website theme across navigation', () => {
  it.each(['light', 'dark'])('preserves %s on entering admin, and carries an admin change back to the dashboard', async theme => {
    mount(theme);
    await expectTheme(theme);
    fireEvent.click(screen.getByRole('link', { name: 'Open administrator dashboard' }));
    expect(screen.getByRole('heading', { name: 'Admin Dashboard' })).toBeTruthy();
    await expectTheme(theme);
    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));
    const next = theme === 'dark' ? 'light' : 'dark';
    await expectTheme(next);
    expect(localStorage.getItem('theme')).toBe(next);
    fireEvent.click(screen.getByRole('link', { name: 'Back', exact: true }));
    await expectTheme(next);
    fireEvent.click(screen.getByRole('link', { name: 'Open administrator dashboard' }));
    await expectTheme(next);
    cleanup();
    mount(); // A fresh application mount reads the saved choice, as on refresh.
    await expectTheme(next);
  });
  it('toggles correctly from a system-selected dark theme', async () => {
    mount('system');
    await expectTheme('dark');
    fireEvent.click(screen.getByRole('button', { name: 'Toggle theme' }));
    await expectTheme('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });
  it('opening the guide bot preserves the theme and its toggle updates the same website setting', async () => {
    mount('dark');
    await expectTheme('dark');
    fireEvent.click(screen.getByTitle('Open Rakshak Guide Bot'));
    await expectTheme('dark');
    const bot = screen.getByLabelText('Rakshak Guide Bot');
    fireEvent.click(within(bot).getByRole('button', { name: 'Toggle theme' }));
    await expectTheme('light');
    fireEvent.click(within(bot).getByTitle('Close'));
    fireEvent.click(screen.getByRole('link', { name: 'Open administrator dashboard' }));
    await expectTheme('light');
  });
});
