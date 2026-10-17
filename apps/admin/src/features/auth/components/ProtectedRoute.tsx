import type { UserRole } from "@courtdesk/shared";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { Navigate, Outlet, useLocation } from "react-router-dom";

type Props = {
  allowedRoles?: UserRole[];
};

const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { data: userData, isPending } = useCurrentUser();
  const location = useLocation();

  // TODO add loader UI
  if (isPending) return null;

  const user = userData?.user;

  if (!user) {
    return <Navigate to={"/auth"} replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={"/403"} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
