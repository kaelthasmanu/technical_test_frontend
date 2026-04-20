import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import { ROUTES } from '../../constants/routes';

function PrivateRoute({ component: Component, ...rest }) {
  const { authState } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authState?.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
