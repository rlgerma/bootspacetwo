/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../redux/context";

const ProtectedRoute = ({ component: RouteComponent, ...rest }: any = {}): JSX.Element => {
  const { authUser } = useContext(UserContext);

  return (
    <>
      <Route
        {...rest}
        render={(routeProps: JSX.IntrinsicAttributes) =>
          authUser ? <RouteComponent {...routeProps} /> : <Redirect to='/login' />
        }
      />
    </>
  );
};

export default ProtectedRoute;
