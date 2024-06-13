import React from "react";
import HeaderComp from "../components/mainComp/HeaderComp";
import { Outlet } from "react-router-dom";
import FooterComp from "../components/mainComp/FooterComp";
import SidebarComp from "../components/mainComp/SidebarComp";

function MainLayout() {
  return (
    <>
      <div className="flex min-h-screen">
        <SidebarComp />
        <div className="w-full ">
          <header>
            <HeaderComp />
          </header>
          <main>
            <Outlet />
          </main>
        </div>
      </div>

      <FooterComp />
    </>
  );
}

export default MainLayout;
