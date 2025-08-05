import PDFToWordPage from "./pages/PDFToWordPage";

export const routes = [
  {
    path: '/landing/login',
    element: <PDFToWordPage />,
    menu: {
      main: 'landing',
      sub: ['login', 'register'],
    }
  },
 
  
];
