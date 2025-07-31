import React, { Suspense, lazy } from 'react';

const Module2App = lazy(() => import('phase2/Phase2App'));
const Module3App = lazy(() => import('phase3/Phase3App'));
const Module4App = lazy(() => import('phase4/Phase4App'));
const Module5App = lazy(() => import('phase5/Phase5App'));
const Module6App = lazy(() => import('phase6/Phase6App'));
const Module7App = lazy(() => import('phase7/Phase7App'));

export default function ModuleLoader({ activeModule }: { activeModule: string }) {
  let Component: React.ReactNode = null;

  if (activeModule === 'phase2') Component = <Module2App />;
  if (activeModule === 'phase3') Component = <Module3App />;
  if (activeModule === 'phase4') Component = <Module4App />;
  if (activeModule === 'phase5') Component = <Module5App />;
  if (activeModule === 'phase6') Component = <Module6App />;
  if (activeModule === 'phase7') Component = <Module7App />;

  return (
    <Suspense fallback={<div>Loading module...</div>}>
      {Component}
    </Suspense>
  );
}
