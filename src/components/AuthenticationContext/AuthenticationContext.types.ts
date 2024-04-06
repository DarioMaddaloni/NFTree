import { ReactNode } from "react";

export interface UseTokenReturn {
  secret: string;
  setSecret: (token: string) => void;
  activeActivity: string;
  setActiveActivity: (token: string) => void;
}

export interface ProviderProps {
    children: ReactNode;
}