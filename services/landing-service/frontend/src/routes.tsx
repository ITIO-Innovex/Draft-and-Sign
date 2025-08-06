import LandingPage from "./pages/LandingPage";
import About from "./pages/about";

export const routes = {
  elements: {
    'Landing-Page': <LandingPage />,
    'About-Page': <About />,
  },

  paths: [
    { name: 'Landing-Page', path: '/', layout: 'landing' },
    { name: 'About-Page', path: '/about', layout: 'landing' },
  ],

  menus: [
    {
      main: 'Landing-Services',
      items: ['Landing-Page', 'About-Page']
    }
  ]
};
