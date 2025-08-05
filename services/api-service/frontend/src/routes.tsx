import ApiExplore from "./pages/ApiExplorer";
import DashboardAPI from "./pages/dashboardAPI";


export const routes = [
  {
    path: '/api/dashboard',
    element: <DashboardAPI />,
    menu: {
      main: 'api',
      sub: ['dashboard', 'api-explore'],
    }
  },
  {
    path: '/api/api-explore',
    element: <ApiExplore />
  } 
];
