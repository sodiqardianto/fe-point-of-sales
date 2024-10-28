import ButtonConfigurator from "@/components/ButtonConfigurator";
import Configurator from "@/components/Configurator";
import Footer from "@/components/Footer";
import NavbarMenu from "@/components/NavbarMenu";
import { ReactNode } from "react";
import { RouteInterface } from "@/interface/sidenav.interface";
import { fetchDataApi } from "@/utils/api";
import { Sidenav } from "@/components/Sidenav";

export default async function MainLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const response = await fetchDataApi("/menus", "");
  const routes: RouteInterface[] = response?.data || [];

  return (
    <>
      <div className="min-h-screen bg-blue-gray-50/50">
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
      </div>
    </>
  );
}
