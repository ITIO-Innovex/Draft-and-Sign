import React from 'react';

export function DefaultLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div>
      <header>Landing Navbar</header>
      <main>{children}</main>
      <footer>Landing Footer</footer>
    </div>
  );
}
