import { useEffect } from "react";

import { useAuth } from "../hooks/useAuth";

const LogOut = () => {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, []);

  return "Loading...";
};

export default LogOut;
