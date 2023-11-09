import { useUser } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export function PrivateProfile({ children }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return children;
}

export function PrivateAuth({ children }) {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/profile" />;
  }

  return children;
}
