import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import ClientLayout from '@/components/ClientLayout';
import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Semecall - Expert en Performance Commerciale à Distance',
  description: 'Transformez chaque interaction en opportunité commerciale',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!routing.locales.includes(locale as 'fr' | 'en' | 'nl')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <ClientLayout>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ClientLayout>
      </body>
    </html>
  );
}

