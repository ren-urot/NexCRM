import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Customers from './pages/Customers';
import Workshops from './pages/Workshops';
import WorkshopDetail from './pages/WorkshopDetail';
import WorkshopRegister from './pages/WorkshopRegister';
import Sales from './pages/Sales';
import PointOfSale from './pages/PointOfSale';
import Inventory from './pages/Inventory';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'customers', Component: Customers },
      { path: 'workshops', Component: Workshops },
      { path: 'workshops/:id', Component: WorkshopDetail },
      { path: 'workshops/:id/register', Component: WorkshopRegister },
      { path: 'sales', Component: Sales },
      { path: 'pos', Component: PointOfSale },
      { path: 'inventory', Component: Inventory },
    ],
  },
]);
