import { getTranslations } from 'next-intl/server';
import HomePage from '@/components/HomePage';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  return {
    title: 'Semecall - ' + t('headline'),
    description: t('subheadline'),
  };
}

export default function Home() {
  return <HomePage />;
}
