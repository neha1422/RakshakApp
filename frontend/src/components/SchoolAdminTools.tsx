import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCloud } from '@/hooks/useCloud';
import { api, create, editRecord, removeRecord } from '@/lib/cloud';
export function SchoolAdminTools() {
  const { role, schoolId } = useAuth();
  if (role !== 'administrator') return null;
  return <AdminTools schoolId={schoolId!} />;
}
function AdminTools({ schoolId }: { schoolId: string }) {
  const { rows, error } = useCloud('sosRequests');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  async function run(fn: () => Promise<unknown>) { setBusy(true); try { await fn(); setStatus('Saved.'); } catch (e) { setStatus(e.message); } finally { setBusy(false); } }
  return <section className="space-y-4 p-4"><h2>School administration</h2>
    <form onSubmit={e => { e.preventDefault(); const f = new FormData(e.currentTarget); void run(() => api('assignRole', { uid: f.get('uid'), role: f.get('role') })); }} className="flex gap-2 flex-wrap">
      <label>User UID <input required name="uid" className="border border-input rounded bg-background text-foreground px-3 py-2" /></label><select name="role" className="border border-input rounded bg-background text-foreground px-3 py-2"><option value="student">Student</option><option value="teacher">Teacher</option></select><button disabled={busy}>Assign within school</button>
    </form>
    <form onSubmit={e => { e.preventDefault(); const f = new FormData(e.currentTarget); void run(() => create('riskInformation', schoolId, { district: String(f.get('district')), note: String(f.get('note')) })); }} className="flex gap-2 flex-wrap">
      <label>District <input required maxLength={100} name="district" className="border border-input rounded bg-background text-foreground px-3 py-2" /></label><label>Risk advisory <input required maxLength={1000} name="note" className="border border-input rounded bg-background text-foreground px-3 py-2" /></label><button disabled={busy}>Add map advisory</button>
    </form>
    <p role="status">{status}</p><h3>Private SOS inbox · latest 100</h3>{error && <p role="alert">{error}</p>}
    {rows.map(r => <div key={r.id} className="border p-3"><p>{r.userId}: {r.status}</p><p>{r.latitude}, {r.longitude} (±{r.accuracy}m)</p>
      <button disabled={busy} onClick={() => void run(() => editRecord('sosRequests', r.id, { status: 'acknowledged' }))}>Acknowledge</button>{' · '}
      <button disabled={busy} onClick={() => void run(() => editRecord('sosRequests', r.id, { status: 'resolved' }))}>Resolve</button>{' · '}
      <button disabled={busy} onClick={() => void run(() => removeRecord('sosRequests', r.id))}>Delete private location</button>
    </div>)}
  </section>;
}
