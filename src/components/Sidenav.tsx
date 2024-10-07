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
import {
  CubeIcon,
  HomeIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setOpenSidenav, useMaterialTailwindController } from "@/context";
import { RouteInterface, Submenu } from "@/interface/sidenav.interface";

const iconsMap: Record<string, React.ReactNode> = {
  HomeIcon: <HomeIcon className={`w-5 h-5 text-inherit`} />,
  UserIcon: <UserIcon className={`w-5 h-5 text-inherit`} />,
  CubeIcon: <CubeIcon className={`w-5 h-5 text-inherit`} />,
};

interface SidenavProps {
  routes: RouteInterface[];
}

export function Sidenav({ routes }: SidenavProps) {
  const [open, setOpen] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const routeMatch = routes?.find(
      (route) =>
        route.submenus?.find((submenu) => submenu.path === pathname) ||
        route.path === pathname
    );

    if (routeMatch) {
      setOpen(routeMatch.submenus?.length ? routeMatch?.uniq_id : null);
      setSelected(
        routeMatch.submenus
          ?.find((submenu) => submenu.path === pathname)
          ?.uniq_id?.toString() || routeMatch.uniq_id
      );
    }
  }, [pathname, routes]);

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
          {(routes || []).map((menu: RouteInterface) => (
            <React.Fragment key={menu.uniq_id}>
              {menu.submenus && menu.submenus.length > 0 ? (
                <Accordion open={open === menu.uniq_id}>
                  <ListItem
                    onClick={() => handleOpen(menu.uniq_id)}
                    data-selected={open === menu.uniq_id}
                    selected={open === menu.uniq_id}
                    className={` ${
                      open === menu.uniq_id
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white hover:text-white focus:text-white"
                        : "select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-red-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900"
                    }`}
                  >
                    <ListItemPrefix>{iconsMap[menu.icon]}</ListItemPrefix>
                    <Typography className="mr-auto font-normal text-inherit capitalize">
                      {menu.name}
                    </Typography>
                    <ChevronDownIcon
                      strokeWidth={3}
                      className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${
                        open === menu.uniq_id ? "rotate-180" : ""
                      }`}
                    />
                  </ListItem>
                  <AccordionBody className="p-0">
                    <List className="p-0">
                      {menu.submenus.map((submenu: Submenu) => (
                        <Link href={submenu.path} key={submenu.uniq_id}>
                          <ListItem
                            className={`px-12 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 capitalize ${
                              selected === submenu?.uniq_id?.toString()
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
                <Link href={menu.path} key={menu.uniq_id}>
                  <ListItem
                    selected={selected === menu.uniq_id}
                    onClick={() => setSelectedItem(menu.uniq_id)}
                    className={`${
                      selected === menu.uniq_id
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white hover:text-white focus:text-white"
                        : "select-none hover:bg-gray-200 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900"
                    }`}
                  >
                    <ListItemPrefix>{iconsMap[menu?.icon]}</ListItemPrefix>
                    <Typography className="mr-auto font-normal text-inherit capitalize">
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
