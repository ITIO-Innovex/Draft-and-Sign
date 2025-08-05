import CreateEnevelop from "./pages/createEnevelop";
import ESignature from "./pages/esign";


export const routes = {
  elements: {
    'Create-Enevelop': <CreateEnevelop />,
    'E-Signature': <ESignature />,
  },

  paths: [
    { name: 'Create-Enevelop', path: '/api/create-enevelop' },
    { name: 'E-Signature', path: '/api/e-signature' },
  ],

  menus: [
    {
      main: 'E-Sign-Services',
      items: ['Create-Enevelop', 'E-Signature']
    }
  ]
};
