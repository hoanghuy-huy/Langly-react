import type React from 'react';

type DefaultLayoutProps = {
  children?: React.ReactNode | undefined;
};

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div>
      <main className="p-4">{children}</main>
    </div>
  );
}
