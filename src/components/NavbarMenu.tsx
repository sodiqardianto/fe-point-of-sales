"use client";
import Link from "next/link";
import {
  Navbar,
  Typography,
  IconButton,
  Breadcrumbs,
  Input,
} from "@material-tailwind/react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { AvatarWithUserDropdown } from "./AvatarWithUserDropdown";
import { setOpenSidenav } from "@/store/slices/configuratorSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Notification from "./Notification";

export function NavbarMenu() {
  const dispatch = useDispatch();
  const { fixedNavbar, openSidenav } = useSelector(
    (state: RootState) => state.openConfigurator
  );

  const pathname = usePathname();
  const [layout, page] = pathname.split("/").filter((el) => el !== "");

  return (
    <Navbar
      color={fixedNavbar ? "white" : "transparent"}
      className={`rounded-xl transition-all ${
        fixedNavbar
          ? "sticky top-4 z-40 py-3 shadow-md shadow-blue-gray-500/5"
          : "px-0 py-1"
      }`}
      fullWidth
      blurred={fixedNavbar}
    >
      <div className="flex flex-col-reverse justify-between gap-6 md:flex-row md:items-center">
        <div className="capitalize">
          <Breadcrumbs
            className={`bg-transparent p-0 transition-all ${
              fixedNavbar ? "mt-1" : ""
            }`}
          >
            <Link href={`/${layout}`}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal opacity-50 transition-all hover:text-blue-500 hover:opacity-100"
              >
                {layout}
              </Typography>
            </Link>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {page}
            </Typography>
          </Breadcrumbs>
          <Typography variant="h6" color="blue-gray">
            {page}
          </Typography>
        </div>
        <div className="flex items-center gap-1">
          <div className="mr-auto md:mr-4 md:w-56">
            <Input label="Search" crossOrigin={undefined} />
          </div>
          <Notification />
          <AvatarWithUserDropdown />
          <IconButton
            variant="text"
            color="blue-gray"
            className="grid xl:hidden"
            onClick={() => dispatch(setOpenSidenav(!openSidenav))}
          >
            <Bars3Icon strokeWidth={3} className="h-6 w-6 text-blue-gray-500" />
          </IconButton>
        </div>
      </div>
    </Navbar>
  );
}

export default NavbarMenu;
