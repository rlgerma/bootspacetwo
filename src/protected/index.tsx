/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "../redux/context";

const ProtectedRoute = ({ component: RouteComponent, ...rest }: any = {}): JSX.Element => {
  const { authUser } = useContext(UserContext);

  return (
    <>
      <Route
        {...rest}
        render={(routeProps: JSX.IntrinsicAttributes) =>
          authUser && <RouteComponent {...routeProps} />
        }
      />
    </>
  );
};

export default ProtectedRoute;
