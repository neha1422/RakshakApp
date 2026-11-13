import { useCloud } from '@/hooks/useCloud';
import { useAuth } from '@/context/AuthContext';
import { page, CloudRecord } from '@/lib/cloud';
import { QueryDocumentSnapshot } from 'firebase/firestore';
import { useState, useEffect, useRef } from 'react';
export function QuizHistory() {
  const { rows, error, loading } = useCloud('quizResults', true);
  const { user, schoolId } = useAuth();
  const scope = `${user?.uid}:${schoolId}`;
  const activeScope = useRef(scope); activeScope.current = scope;
  const [older, setOlder] = useState<CloudRecord[]>([]);
  const [cursor, setCursor] = useState<QueryDocumentSnapshot>();
  const [busy, setBusy] = useState(false);
  const [pageError, setPageError] = useState('');
  const [more, setMore] = useState(true);
  useEffect(() => { setOlder([]); setCursor(undefined); setMore(true); setPageError(''); }, [user?.uid, schoolId]);
  async function loadMore() {
    if (!user || !schoolId) return;
    setBusy(true); setPageError('');
    try {
      let last = cursor;
      if (!last) { const first = await page('quizResults', schoolId, user.uid); last = first.docs[first.docs.length - 1]; }
      if (activeScope.current !== scope) return;
      if (!last) { setMore(false); return; }
      const next = await page('quizResults', schoolId, user.uid, last);
      if (activeScope.current !== scope) return;
      setCursor(next.docs[next.docs.length - 1] || last); setMore(next.size === 100);
      setOlder(previous => [...previous, ...next.docs.map(d => ({ ...d.data(), id: d.id }))]);
    } catch (e) { if (activeScope.current === scope) setPageError(e.message); } finally { if (activeScope.current === scope) setBusy(false); }
  }
  const allRows = [...new Map([...rows, ...older].map(r => [r.id, r])).values()];
  return <section className="glass-card rounded-xl p-4"><h2 className="font-bold">Quiz history · latest 100 live, older attempts paginated</h2>{loading && <p>Loading…</p>}{error && <p role="alert">{error}</p>}
    {!loading && !error && !rows.length && <p>No saved quiz attempts.</p>}
    {allRows.map(r => <p key={r.id}>Module {r.quizId}: {r.score}/{r.total} ({r.percent}%) · {r.createdAt?.toDate().toLocaleString() || 'Saving…'}</p>)}
    {pageError && <p role="alert">{pageError}</p>}
    {rows.length === 100 && more && <button disabled={busy} onClick={() => void loadMore()}>{busy ? 'Loading…' : 'Load older attempts'}</button>}
  </section>;
}
