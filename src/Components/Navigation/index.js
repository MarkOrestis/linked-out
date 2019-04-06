import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';
import Dashboard from '../Dashboard';
import SignInForm from '../SignIn';


const Navigation = ({ authUser }) => (
  <div>
   <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <Dashboard /> : <NavigationAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = () => (
  <h1>HALLO</h1>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

export default Navigation;