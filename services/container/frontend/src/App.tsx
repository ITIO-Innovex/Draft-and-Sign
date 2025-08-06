import React, { useEffect, useState, Suspense, type ReactNode } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { LandingLayout } from './layouts/landingLayout';
import { UserLayout } from './layouts/userLayout';
import { AdminLayout } from './layouts/adminLayout';

import { loadRemoteRoutes } from './remoteRoutes';

interface RemoteRoutes {
  elements: Record<string, React.ReactNode>;
  paths: { name: string; path: string; layout: string }[];
  menus: { main: string; items: string[] }[];
}

export default function App() {
  const [remoteRoutes, setRemoteRoutes] = useState<RemoteRoutes>({
    elements: {},
    paths: [],
    menus: []
  });

  useEffect(() => {
    loadRemoteRoutes().then(setRemoteRoutes);
  }, []);

  const { elements, paths, menus } = remoteRoutes;

function wrapWithLayout(layout: 'user' | 'admin' | 'landing', element: ReactNode): ReactNode {
  switch (layout) {
    case 'user':
      return <UserLayout>{element}</UserLayout>;
    case 'admin':
      return <AdminLayout>{element}</AdminLayout>;
    case 'landing':
    default:
      return <LandingLayout>{element}</LandingLayout>;
  }
} 
  return (
    <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {paths.map(({ name, path, layout }) => {
                const Element = elements[name];
                if (!Element) return null;
                return (
                  <Route
                    key={path}
                    path={path}
                    element={wrapWithLayout(layout, Element)}
                  />
                );
              })}
            </Routes>
          </Suspense>
    </Router>
  );
}
