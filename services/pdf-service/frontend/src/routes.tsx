import PdfConversion from './pages/PdfConversion';
import PdfToImage from './pages/PdfToImage';

export const routes = {
  elements: {
    'PDF-Conversion': <PdfConversion />,
    'PDF-To-Image': <PdfToImage />,
  },

  paths: [
    { name: 'PDF-Conversion', path: '/api/pdf-conversion' },
    { name: 'PDF-To-Image', path: '/api/pdf-to-image' },
  ],

  menus: [
    {
      main: 'PDF-Services',
      items: ['PDF-Conversion', 'PDF-To-Image']
    }
  ]
};
