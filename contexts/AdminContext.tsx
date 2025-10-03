'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AdminContextType {
  newMessagesCount: number;
  setNewMessagesCount: (count: number) => void;
  refreshNewMessagesCount: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [newMessagesCount, setNewMessagesCount] = useState(0);

  const refreshNewMessagesCount = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/contacts?status=new');
      if (response.ok) {
        const data = await response.json();
        setNewMessagesCount(data.length);
      }
    } catch (error) {
      console.error('Error fetching new messages count:', error);
    }
  }, []);

  return (
    <AdminContext.Provider value={{ newMessagesCount, setNewMessagesCount, refreshNewMessagesCount }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

