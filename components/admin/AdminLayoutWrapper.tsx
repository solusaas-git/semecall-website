'use client';

import { SessionProvider } from 'next-auth/react';
import AdminLayoutClient from './AdminLayoutClient';

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminLayoutClient>{children}</AdminLayoutClient>
    </SessionProvider>
  );
}

