import { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  const { user, profile, loading } = useAuth();
  const value = useMemo(() => ({ isAdmin: profile?.role === 'admin', adminProfile: profile, loading, user }), [loading, profile, user]);
  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}
