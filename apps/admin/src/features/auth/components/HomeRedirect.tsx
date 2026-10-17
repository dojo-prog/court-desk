import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

const HomeRedirect = () => {
  const { data: user, isPending } = useCurrentUser();

  // TODO add loader
  if (isPending) return null;

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Admin's default page
  if (user.role === "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  // Staff's default page
  if (user.role === "staff") {
    return <Navigate to="/calendar" replace />;
  }

  return <Navigate to="/403" replace />;
};

export default HomeRedirect;
