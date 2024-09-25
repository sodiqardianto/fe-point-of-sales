"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionBody,
  IconButton,
} from "@material-tailwind/react";
import { HomeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setOpenSidenav, useMaterialTailwindController } from "@/context";

interface Route {
  id: string;
  name: string;
  path: string; // added path for route matching
  title?: string | null;
  icon: React.ReactNode;
  submenus?: SubMenu[];
}

interface SubMenu {
  id: string;
  name: string;
  path: string; // added path for submenu route matching
  icon: React.ReactNode;
}

const icon = {
  className: "w-5 h-5 text-inherit",
};

const routes: Route[] = [
  {
    id: "1ku123",
    name: "dashboard",
    path: "/dashboard",
    title: null,
    icon: <HomeIcon {...icon} />,
    submenus: [],
  },
  {
    id: "1f23f2",
    name: "main",
    path: "/main",
    title: "data main",
    icon: <HomeIcon {...icon} />,
    submenus: [
      {
        id: "11241d13",
        name: "menu",
        path: "/menu",
        icon: <HomeIcon {...icon} />,
      },
      {
        id: "12e128h9",
        name: "table",
        path: "/table",
        icon: <HomeIcon {...icon} />,
      },
    ],
  },
  {
    id: "2c1093j",
    name: "customer",
    path: "/customer",
    title: null,
    icon: <HomeIcon {...icon} />,
    submenus: [],
  },
  {
    id: "312ne12",
    name: "products",
    path: "/products",
    title: null,
    icon: <HomeIcon {...icon} />,
    submenus: [
      {
        id: "1i2u3nd1",
        name: "electronics",
        path: "/electronics",
        icon: <HomeIcon {...icon} />,
      },
      {
        id: "1do2i3d",
        name: "furniture",
        path: "/furniture",
        icon: <HomeIcon {...icon} />,
      },
    ],
  },
];

export function Sidenav() {
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const routeMatch = routes.find(
      (route) =>
        route.submenus?.find((submenu) => submenu.path === pathname) ||
        route.path === pathname
    );

    if (routeMatch) {
      setOpen(routeMatch.submenus?.length ? routeMatch.id : null);
      setSelected(
        routeMatch.submenus
          ?.find((submenu) => submenu.path === pathname)
          ?.id?.toString() || routeMatch.id
      );
    }
  }, [pathname]);

  const handleOpen = (value: string) => {
    setOpen(open === value ? null : value);
  };

  const setSelectedItem = (value: string) => {
    setSelected(value);
  };
  const [controller, dispatch] = useMaterialTailwindController();
  const { openSidenav } = controller;

  return (
    <>
      <IconButton
        variant="text"
        color="white"
        size="sm"
        ripple={false}
        className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
        onClick={() => setOpenSidenav(dispatch, false)}
      >
        <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
      </IconButton>
      <Card
        className={` ${
          openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-2rem)] w-72 max-w-[20rem] rounded-xl p-4 shadow-xl transition-transform duration-300 xl:translate-x-0 shadow-blue-gray-900/5`}
      >
        <div className="mb-2 flex items-center gap-4 p-4">
          <Image
            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
            alt="brand"
            width={32}
            height={32}
          />
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>

        <List>
          {routes.map((menu: Route) => (
            <React.Fragment key={menu.id}>
              {menu.submenus && menu.submenus.length > 0 ? (
                <Accordion open={open === menu.id}>
                  <ListItem
                    onClick={() => handleOpen(menu.id)}
                    data-selected={open === menu.id}
                    selected={open === menu.id}
                    className={` ${
                      open === menu.id
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white hover:text-white focus:text-white"
                        : "select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-red-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900"
                    }`}
                  >
                    <ListItemPrefix>{menu.icon}</ListItemPrefix>
                    <Typography className="mr-auto font-normal text-inherit">
                      {menu.name}
                    </Typography>
                    <ChevronDownIcon
                      strokeWidth={3}
                      className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${
                        open === menu.id ? "rotate-180" : ""
                      }`}
                    />
                  </ListItem>
                  <AccordionBody className="p-0">
                    <List className="p-0">
                      {menu.submenus.map((submenu: SubMenu) => (
                        <Link href={submenu.path} key={submenu.id}>
                          <ListItem
                            className={`px-12 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 ${
                              selected === submenu.id.toString()
                                ? "text-gray-900 bg-gray-300 focus:bg-gray-300"
                                : ""
                            }`}
                          >
                            {submenu.name}
                          </ListItem>
                        </Link>
                      ))}
                    </List>
                  </AccordionBody>
                </Accordion>
              ) : (
                <Link href={menu.path} key={menu.id}>
                  <ListItem
                    selected={selected === menu.id}
                    onClick={() => setSelectedItem(menu.id)}
                    className={`${
                      selected === menu.id
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white hover:text-white focus:text-white"
                        : "select-none hover:bg-gray-200 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900"
                    }`}
                  >
                    <ListItemPrefix>{menu.icon}</ListItemPrefix>
                    <Typography className="mr-auto font-normal text-inherit">
                      {menu.name}
                    </Typography>
                  </ListItem>
                </Link>
              )}
            </React.Fragment>
          ))}
        </List>
      </Card>
    </>
  );
}
