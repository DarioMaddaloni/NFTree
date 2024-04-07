import { useContext } from "react";

import AuthenticationContext from "@/components/AuthenticationContext";

export const useSecret = () => useContext(AuthenticationContext);
export const useActiveActivity = () => useContext(AuthenticationContext);
