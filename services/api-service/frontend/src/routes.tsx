import ApiExplore from "./pages/ApiExplorer";
import DashboardAPI from "./pages/dashboardAPI";


export const routes = {
  elements: {
    'Api-Explore': <ApiExplore />,
    'Dashboard-Api': <DashboardAPI />,
  },

  paths: [
    { name: 'Api-Explore', path: '/api/api-explore' },
    { name: 'Dashboard-Api', path: '/api/dashbaord-api' },
  ],

  menus: [
    {
      main: 'Api-Services',
      items: ['Api-Explore', 'Dashboard-Api']
    }
  ]
};
