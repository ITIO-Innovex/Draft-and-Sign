import Documents from "./pages/document";
import NewDocuments from "./pages/newDocument";

export const routes = {
  elements: {
    'Documents': <Documents />,
    'New-Document': <NewDocuments />,
  },

  paths: [
    { name: 'Documents', path: '/api/document' },
    { name: 'New-Documents', path: '/api/new-document' },
  ],

  menus: [
    {
      main: 'Document-Services',
      items: ['Documents', 'New-Document']
    }
  ]
};