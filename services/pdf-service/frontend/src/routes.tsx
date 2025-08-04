import PdfConversion from './pages/PdfConversion';
import PdfToImage from './pages/PdfToImage';

export const routes = [
  {
    path: '/pdf/pdf-conversion',
    element: <PdfConversion />,
    menu: {
      main: 'PDF',
      sub: ['pdf-conversion', 'pdf-to-image', 'pdf-to-png'],
    }
  },
  {
    path: '/pdf/pdf-to-image',
    element: <PdfToImage />
  },
  {
    path: '/pdf/pdf-to-png',
    element: <PdfToImage />
  },
  {
    path: '/pdf/pdf-conversion',
    element: <PdfConversion />,
    menu: {
      main: 'PDF Settings'
    }
  },
    {
    path: '/pdf/pdf-conversion',
    element: <PdfConversion />,
    menu: {
      main: 'PDF Profile'
    }
  }
];
