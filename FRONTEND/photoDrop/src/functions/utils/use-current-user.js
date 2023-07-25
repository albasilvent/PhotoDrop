import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context.jsx";

export function useCurrentUser() {
  const { currentUser } = useContext(AuthContext);
  return currentUser;
}

