import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { loadRemoteRoutes } from './remoteRoutes';

interface RemoteRoute {
  path: string;
  element: React.ReactNode;
  menu?: {
    main: string;
    sub: string[];
  };
}

export default function App() {
  const [routes, setRoutes] = useState<RemoteRoute[]>([]);

  useEffect(() => {
    loadRemoteRoutes().then(setRoutes);
  }, []);

  const sidebar: Record<string, Set<string>> = {};
  routes.forEach(({ menu }) => {
    const { main, sub } = menu || {};
    if (!main) return;
    if (!sidebar[main]) sidebar[main] = new Set();
    sub?.forEach(s => sidebar[main].add(s));
  });

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        
        <aside style={{ width: '200px', padding: '1rem', borderRight: '1px solid #ccc' }}>
          <nav>
            <ul>
              {Object.entries(sidebar).map(([main, subs]) => (
                <li key={main}>
                  <strong>{main}</strong>
                  <ul>
                    {[...subs].map(sub => (
                      <li key={sub}>
                        <Link to={`/${main.toLowerCase()}/${sub}`}>{sub}</Link>

                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main style={{ padding: '1rem', flex: 1 }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {routes.map((route, idx) => (
                <Route key={idx} path={route.path} element={route.element} />
              ))}
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}
