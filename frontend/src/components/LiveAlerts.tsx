import { useCloud } from '@/hooks/useCloud';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
export function LiveAlerts() {
  const { rows, error, loading } = useCloud('alerts');
  return <Card className="glass-card"><CardHeader><CardTitle>School alerts · Live</CardTitle></CardHeader><CardContent aria-live="polite">
    {error && <p role="alert">{error}</p>}{loading && <p>Loading alerts…</p>}
    {!loading && !error && !rows.some(r => r.active) && <p>No active school alerts.</p>}
    {rows.filter(r => r.active).map(r => <div key={r.id} className="border-b py-3"><strong>{r.emergency}</strong><p>{r.message}</p></div>)}
  </CardContent></Card>;
}
