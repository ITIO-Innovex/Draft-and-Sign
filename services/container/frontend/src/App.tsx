import React, { useEffect, useState, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import { loadRemoteRoutes } from './remoteRoutes';

interface RemoteRoutes {
  elements: Record<string, React.ReactNode>;
  paths: { name: string; path: string }[];
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

  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <aside
          style={{
            width: '200px',
            padding: '1rem',
            borderRight: '1px solid #ccc'
          }}
        >
          <nav>
            <ul>
              {menus.map((menu) => (
                <li key={menu.main}>
                  <strong>{menu.main}</strong>
                  <ul>
                    {menu.items.map((item) => {
                      const pathObj = paths.find(p => p.name === item);
                      return pathObj ? (
                        <li key={item}>
                          <Link to={pathObj.path}>{item}</Link>
                        </li>
                      ) : null;
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main style={{ padding: '1rem', flex: 1 }}>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {paths.map(({ name, path }) => {
                const Element = elements[name];
                if (!Element) return null;
                return <Route key={path} path={path} element={Element} />;
              })}
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
}
