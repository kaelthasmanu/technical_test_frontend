import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../features/auth/context/AuthContext';
import { ROUTES } from '../../constants/routes';

/**
 * Wraps a <Route> so it redirects to /login when the user is not authenticated.
 */
function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        true ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: ROUTES.LOGIN, state: { from: props.location } }} />
        )
      }
    />
  );
}

export default PrivateRoute;
