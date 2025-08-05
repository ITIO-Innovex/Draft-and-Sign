import CreateEnevelop from "./pages/createEnevelop";
import ESignature from "./pages/esign";


export const routes = [
  {
    path: '/esign/e-signature',
    element: <ESignature />,
    menu: {
      main: 'esign',
      sub: ['e-signature', 'create-envelop'],
    }
  },
  {
    path: '/esign/create-envelop',
    element: <CreateEnevelop />
  }
 
];
