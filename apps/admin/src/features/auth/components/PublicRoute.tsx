import { useCurrentUser } from "../hooks/useCurrentUser";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { data: user, isPending } = useCurrentUser();

  // TODO add loader
  if (isPending) return null;

  if (user) {
    return <Navigate to={"/"} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
