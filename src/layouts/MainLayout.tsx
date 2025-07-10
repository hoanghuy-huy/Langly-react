import Header from '@/components/coreUI/Header';
import type React from 'react';

type MainLayoutProps = {
  children?: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main>{children}</main>
      <footer></footer>
    </div>
  );
}
