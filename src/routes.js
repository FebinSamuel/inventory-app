import { lazy } from 'react';

const Home = lazy(() => import('./page/Home'));
const About = lazy(() => import('./page/About'));
const Contact = lazy(() => import('./page/Contact'));
const Dashboard = lazy(() => import('./page/dashboard/Dashboard'));
const Header = lazy(() => import('./component/Header'));
const HeaderAndSidebar = lazy(() => import('./component/HeaderAndSidebar'));
const Login = lazy(() => import('./page/auth/Login'));
const Signup = lazy(() => import('./page/auth/Signup'));

export const routes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/dashboard',
    component: HeaderAndSidebar,
    children: [
      {
        path: '/',
        component: Dashboard,
      },
      // Add other dashboard routes here
    ],
  },
  // Add other routes here
];