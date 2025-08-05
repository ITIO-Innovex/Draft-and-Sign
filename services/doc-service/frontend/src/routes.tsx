import Documents from "./pages/document";
import NewDocuments from "./pages/newDocument";



export const routes = [
  {
    path: '/doc/documents',
    element: <Documents />,
    menu: {
      main: 'doc',
      sub: ['documents', 'document-management'],
    }
  },
  {
    path: '/doc/documents',
    element: <Documents />
  },
  {
    path: '/doc/document-management',
    element: <NewDocuments />
  }
  
];
