import PDFToWordPage from "./pages/PDFToWordPage";


export const routes = {
  elements: {
    'PDF-to-Word': <PDFToWordPage />
  },

  paths: [
    { name: 'PDF-to-Word', path: '/api/document' }
  ],

  menus: [
    {
      main: 'Landing-Services',
      items: ['PDF-to-Word']
    }
  ]
};
