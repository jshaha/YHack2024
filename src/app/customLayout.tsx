"use client";
import React, { ReactNode } from "react";
import TopNav from "./components/topNav";
import Footer from "./components/footer";
import { GlobalProvider } from "./context/GlobalProviders";

interface CustomLayoutProps {
  children: ReactNode;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({ children }) => {
  return (
    <main className="min-w-screen flex min-h-screen flex-col items-center justify-start text-center">
      <GlobalProvider>
        <div style={{ width: "100%" }} className="overflow-y-scroll">
          <TopNav />
          <div className="flex-grow" style={{ marginTop: "8vh" }}>
            {children}
          </div>
          <Footer />
        </div>
      </GlobalProvider>
    </main>
  );
};

export default CustomLayout;
