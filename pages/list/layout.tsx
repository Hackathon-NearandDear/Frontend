import React from "react";
import FooterBar from "@/components/FooterBar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-orange-50">
      <div className="flex-grow overflow-auto">{children}</div>
      <FooterBar />
    </div>
  );
};

export default Layout;
