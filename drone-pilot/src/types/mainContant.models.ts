import type { Feature } from "./features.model";

export interface MainContentHTMLProps {
  features: Feature[];
  error: string | null;
  children?: React.ReactNode; 
  }
  export interface MainContentProps {
    children?: React.ReactNode;
  }
  
 