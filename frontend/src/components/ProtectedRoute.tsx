// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

export const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { user, loading, role, schoolId } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-surface">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  if (roles && (!schoolId || !roles.includes(role))) return <div role="alert" className="p-6">Access denied. A trusted school staff assignment is required.</div>;

  return <>{children}</>;
};
