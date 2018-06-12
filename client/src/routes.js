import MainPage from './pages/main';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import RequireAuth from './components/auth/require_auth';

export default [
  {
    path: '/',
    exact: true,
    component: MainPage
  },
  {
    path: '/signup',
    component: Signup
  },
  {
    path: '/signin',
    component: Signin
  },
  {
    path: '/signout',
    component: Signout
  },
  {
    path: '/feature',
    component: RequireAuth(Feature)
  }
];