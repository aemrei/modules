import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export const Layout = ({ children }: LayoutProps) => {
  return <div className="bg-slate-900 text-slate-100">{children}</div>;
};
