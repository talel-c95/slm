import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/contexts/authContext';
import { LanguageProvider } from '@/contexts/languageContext';

export const metadata: Metadata = {
  title: 'Doctor Connect',
  description: 'Connect with healthcare professionals worldwide',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
