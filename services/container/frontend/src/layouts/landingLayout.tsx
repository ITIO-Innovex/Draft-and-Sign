import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export function LandingLayout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div>
      <Header/>
        <main>{children}</main>
      <Footer/>
    </div>
  );
}
