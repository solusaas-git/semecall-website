'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Mail, Users, Settings, LogOut } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

export default function AdminSidebar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { newMessagesCount, refreshNewMessagesCount } = useAdmin();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      refreshNewMessagesCount();
      
      // Refresh count every 30 seconds
      const interval = setInterval(refreshNewMessagesCount, 30000);
      return () => clearInterval(interval);
    }
  }, [status, refreshNewMessagesCount]);

  const menuItems = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: LayoutDashboard
    },
    {
      name: 'Messages',
      href: '/admin/contacts',
      icon: Mail
    },
    {
      name: 'Users',
      href: '/admin/users',
      icon: Users
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings
    }
  ];

  const handleLogout = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  if (status === 'loading') {
    return (
      <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800">
        <div className="flex items-center justify-center h-full">
          <div className="text-white">Loading...</div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gray-900 border-r border-gray-800 flex flex-col">
      {/* Logo/Header */}
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-white">SEMECALL</h1>
        <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          const showBadge = item.href === '/admin/contacts' && newMessagesCount > 0;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </div>
              {showBadge && (
                <span className="flex items-center justify-center min-w-[1.5rem] h-6 px-2 bg-red-500 text-white text-xs font-bold rounded-full">
                  {newMessagesCount > 99 ? '99+' : newMessagesCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile & Logout */}
      <div className="p-4 border-t border-gray-800 space-y-2">
        {/* My Profile */}
        {session?.user && (
          <Link
            href="/admin/profile"
            className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              {session.user.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <span className="font-medium">My Profile</span>
          </Link>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-red-600 hover:text-white rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

