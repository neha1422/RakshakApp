import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { listen, CloudRecord } from '@/lib/cloud';
export function useCloud(name: string, own = false) {
  const { user, schoolId } = useAuth();
  const uid = user?.uid;
  const [rows, setRows] = useState<CloudRecord[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setRows([]); setError('');
    if (!uid || !schoolId) { setLoading(false); return; }
    setLoading(true);
    return listen(name, schoolId, own ? uid : null, data => { setRows(data); setLoading(false); }, e => { setError(e.message); setLoading(false); });
  }, [name, own, uid, schoolId]);
  return { rows, error, loading };
}
