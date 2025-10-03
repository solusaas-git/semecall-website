import type { Metadata } from 'next';
import '../globals.css';
import AdminLayoutWrapper from '@/components/admin/AdminLayoutWrapper';

export const metadata: Metadata = {
  title: 'Admin Panel - Semecall',
  description: 'Semecall Admin Dashboard',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
      </body>
    </html>
  );
}

