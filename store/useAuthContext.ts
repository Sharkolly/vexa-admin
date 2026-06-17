import { useContext } from "react";
import { UserAuthContext } from "./Context";

export const useAuthContextStore = () => {
  const context = useContext(UserAuthContext);
  if (!context) throw new Error("useStore must be used within a Store");
  return context;
};