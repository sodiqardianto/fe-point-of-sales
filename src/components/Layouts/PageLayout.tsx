import React from "react";
import { Sidenav } from "../Sidenav";
import NavbarMenu from "../NavbarMenu";
import Configurator from "../Configurator";
import ButtonConfigurator from "../ButtonConfigurator";
import Footer from "../Footer";
import { RouteInterface } from "@/interface/sidenav.interface";
import { fetchDataApi } from "@/utils/api";

export default async function PageLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const response = await fetchDataApi("/menus", "");
  const routes: RouteInterface[] = response?.data || [];

  return (
    <>
      <Sidenav routes={routes} />
      <div className="p-4 xl:ml-80">
        <NavbarMenu />
        {children}
        <Configurator />
        <ButtonConfigurator />
        <div className="text-blue-gray-600 relative">
          <Footer />
        </div>
      </div>
    </>
  );
}
