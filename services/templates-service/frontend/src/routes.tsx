import DashboardTemplate from "./pages/Dashboard";
import TemplateDesign from "./pages/templateDesign";

export const routes = [
  {
    path: '/templates/dashboard',
    element: <DashboardTemplate />,
    menu: {
      main: 'templates',
      sub: ['dashboard', 'template-design'],
    }
  },
  {
    path: '/templates/template-design',
    element: <TemplateDesign />
  } 
];
