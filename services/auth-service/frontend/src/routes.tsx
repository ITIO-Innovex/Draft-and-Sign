import Login from './pages/login';
import Registration from './pages/registration';


export const routes = {
  elements: {
    login: <Login />,
    signup: <Registration />,
    forgot: <Registration />,
    dashboard: <Registration />,
    settings: <Registration />,
    profile: <Registration />
  },

  paths: [
    { name: 'login', path: '/auth/login' },
    { name: 'signup', path: '/auth/signup' },
    { name: 'forgot', path: '/auth/forgot-password' },
    { name: 'dashboard', path: '/user/dashboard' },
    { name: 'settings', path: '/user/settings' },
    { name: 'profile', path: '/user/profile' }
  ],

  menus: [
    {
      main: 'auth',
      items: ['login', 'signup', 'forgot']
    },
    {
      main: 'user',
      items: ['dashboard', 'settings', 'profile']
    }
  ]
};
