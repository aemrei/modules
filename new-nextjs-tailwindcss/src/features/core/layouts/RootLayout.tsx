import React from "react";
import { AppBar } from "src/features/core/layouts/AppBar";

interface RootLayoutProps {
  children: React.ReactNode;
}

export const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <AppBar />
      <div className="flex text-slate-100 items-center justify-center py-2">
        {children}
      </div>
    </>
  );
};
