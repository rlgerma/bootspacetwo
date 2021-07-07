import React, { useContext } from "react";
import { UserContext } from "../context";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: RouteComponent, ...rest }) => {
  const { authUser } = useContext(UserContext);

  return (
    <>
      <Route
        {...rest}
        render={(routeProps) =>
          authUser ? (
            <RouteComponent {...routeProps} />
          ) : (
            <Redirect to='/login' />
          )
        }
      />
    </>
  );
};

export default ProtectedRoute;
