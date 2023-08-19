import { useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);
  const [user, setUser] = useState({});
  return {
    user,
    isAuthenticated,
    setAuthenticated() {
      setIsAuthenticated(true);
    },
  };
}
