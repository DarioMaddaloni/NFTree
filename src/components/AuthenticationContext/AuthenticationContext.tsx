import { createContext, useState } from "react";

import {
  UseTokenReturn,
  ProviderProps,
} from "./AuthenticationContext.types.ts";

type UseAuthenticationValues = UseTokenReturn;

const AuthenticationContext = createContext<UseAuthenticationValues>({
  secret: "",
  setSecret: () => {},
  activeActivity: "",
  setActiveActivity: () => {},
});

export default AuthenticationContext;

export const AuthenticationProvider = ({ children }: ProviderProps) => {
  const [secret, setSecret] = useState<string>(
    localStorage.getItem("secret") ?? ""
  );

  const [activeActivity, setActiveActivity] = useState<string>(
    localStorage.getItem("activeActivity") ?? ""
  );

  return (
    <AuthenticationContext.Provider
      value={{
        secret,
        setSecret: (secret) => {
          setSecret(secret);
          localStorage.setItem("secret", secret);
        },
        activeActivity,
        setActiveActivity: (activeActivity) => {
          setActiveActivity(activeActivity);
          localStorage.setItem("activeActivity", activeActivity);
        },
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
