export interface RemoteRoutes {
  elements: Record<string, React.ReactNode>;
  paths: { name: string; path: string; layout: string }[];
  menus: { main: string; items: string[] }[];
}

export async function loadRemoteRoutes(): Promise<RemoteRoutes> {
  const allRoutes: RemoteRoutes = {
    elements: {},
    paths: [],
    menus: []
  };

  try {
    const auth = await import('landing/routes');
    const authRoutes = auth.default?.routes || auth.default;

    if (
      authRoutes?.elements &&
      authRoutes?.paths &&
      authRoutes?.menus
    ) {
      // Merge elements
      Object.assign(allRoutes.elements, authRoutes.elements);

      // Merge paths
      allRoutes.paths.push(...authRoutes.paths);

      // Merge menus
      allRoutes.menus.push(...authRoutes.menus);
    } else {
      console.error('auth.routes format is invalid:', authRoutes);
    }
  } catch (err) {
    console.error('Error loading auth routes:', err);
  }

  // UNCOMMENT FOR ADDITIONAL SERVICES
  // try {
  //   const pdf = await import('pdf/routes');
  //   const pdfRoutes = pdf.default?.routes || pdf.default;

  //   if (
  //     pdfRoutes?.elements &&
  //     pdfRoutes?.paths &&
  //     pdfRoutes?.menus
  //   ) {
  //     Object.assign(allRoutes.elements, pdfRoutes.elements);
  //     allRoutes.paths.push(...pdfRoutes.paths);
  //     allRoutes.menus.push(...pdfRoutes.menus);
  //   } else {
  //     console.error('pdf.routes format is invalid:', pdfRoutes);
  //   }
  // } catch (err) {
  //   console.error('Error loading pdf routes:', err);
  // }

  return allRoutes;
}
