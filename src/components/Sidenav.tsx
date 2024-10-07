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
import {
  RouteInterface,
  SidenavProps,
  Submenu,
} from "@/interface/sidenav.interface";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setOpenSidenav } from "@/store/slices/configuratorSlice";

const iconsMap: Record<string, React.ReactNode> = {
  HomeIcon: <HomeIcon className={`w-5 h-5 text-inherit`} />,
  UserIcon: <UserIcon className={`w-5 h-5 text-inherit`} />,
  CubeIcon: <CubeIcon className={`w-5 h-5 text-inherit`} />,
};

export function Sidenav({ routes }: SidenavProps) {
  const dispatch = useDispatch();
  const { openSidenav, sidenavType, sidenavColor } = useSelector(
    (state: RootState) => state.openConfigurator
  );
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

  const sidenavTypes: Record<string, string> = {
    dark: "bg-gradient-to-br from-gray-800 to-gray-900",
    white: "bg-white shadow-sm",
    transparent: "bg-transparent",
  };

  const sidenavTextColorTypes: Record<string, string> = {
    dark: "text-white",
    white: "text-gray",
    transparent: "text-gray",
  };

  const sidenavColorsTypes: Record<string, string> = {
    white: "from-gray-100 to-gray-100 border-gray-200 shadow-lg",
    dark: "from-black to-black border-gray-200",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };

  return (
    <>
      <IconButton
        variant="text"
        color="white"
        size="sm"
        ripple={false}
        className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
        onClick={() => dispatch(setOpenSidenav(!openSidenav))}
      >
        <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-black" />
      </IconButton>
      <Card
        className={`${sidenavTypes[sidenavType]} ${
          openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-2rem)] w-72 max-w-[20rem] rounded-xl p-4 shadow-xl transition-transform duration-300 xl:translate-x-0 shadow-blue-gray-900/5 border border-blue-gray-100`}
      >
        <div className="mb-2 flex items-center gap-4 p-4">
          <Image
            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
            alt="brand"
            width={32}
            height={32}
          />
          <Typography
            variant="h5"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
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
                        ? `bg-gradient-to-br ${sidenavColorsTypes[sidenavColor]} text-white hover:text-white focus:text-white`
                        : `select-none ${sidenavTextColorTypes[sidenavType]} hover:bg-gray-100 focus:bg-gray-100 active:bg-red-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900`
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
                        ? `bg-gradient-to-br ${
                            sidenavColorsTypes[sidenavColor]
                          } ${
                            sidenavColor === "white"
                              ? "text-black focus:text-black"
                              : "text-white focus:text-white"
                          }`
                        : `select-none ${sidenavTextColorTypes[sidenavType]} hover:bg-gray-200 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900`
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
