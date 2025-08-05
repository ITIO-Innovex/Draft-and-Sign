import DashboardTemplate from "./pages/Dashboard";
import TemplateDesign from "./pages/templateDesign";

export const routes = {
  elements: {
    'Dashboard-Template': <DashboardTemplate />,
    'Template-Design': <TemplateDesign />,
  },

  paths: [
    { name: 'Dashboard-Template', path: '/api/dashboard-template' },
    { name: 'Template-Design', path: '/api/template-design' },
  ],

  menus: [
    {
      main: 'Api-Services',
      items: ['Dashboard-Template', 'Template-Design']
    }
  ]
};

