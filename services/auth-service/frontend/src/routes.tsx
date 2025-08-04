import Login from './pages/login';
import Registration from './pages/registration';

export const routes = [
  {
    path: '/auth/login',
    element: <Login />,
    menu: {
      main: 'auth',
      sub: ['login', 'registration'],
    }
  },
  {
    path: '/auth/login',
    element: <Login />
  },
  {
    path: '/auth/registration',
    element: <Registration />
  }
];
