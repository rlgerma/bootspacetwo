import React, { useContext } from "react";
import { UserContext } from "../context";
import { Route, Redirect } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  // gets current user from context
  const { authUser } = useContext(UserContext);

  return (
    <>
      <Route
        {...rest}
        render={(routeProps) =>
          // eslint-disable-next-line no-extra-boolean-cast
          !!authUser ? <RouteComponent {...routeProps} /> : <Redirect to='/' />
        }
      />
    </>
  );
};

export default ProtectedRoute;
