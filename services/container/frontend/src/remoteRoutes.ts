export async function loadRemoteRoutes(): Promise<RemoteRoute[]> {
  const routes: RemoteRoute[] = [];
    try {
    const auth = await import('auth/routes');
    const authRoutes = auth.default?.routes || auth.default || [];
    if (Array.isArray(authRoutes)) {
      routes.push(...authRoutes);
    } else {
      console.error('auth.default.routes is not an array:', auth.default);
    }
  } catch (err) {
    console.error('Error loading PDF routes:', err);
  }

  // try {
  //   const pdf = await import('pdf/routes');
  //   const pdfRoutes = pdf.default?.routes || pdf.default || [];
  //   if (Array.isArray(pdfRoutes)) {
  //     routes.push(...pdfRoutes);
  //   } else {
  //     console.error('pdf.default.routes is not an array:', pdf.default);
  //   }
  // } catch (err) {
  //   console.error('Error loading PDF routes:', err);
  // }

  return routes;
}
