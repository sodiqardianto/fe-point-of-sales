"use client";
import { setOpenConfigurator, useMaterialTailwindController } from "@/context";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import React from "react";

export default function ButtonConfigurator() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [controller, dispatch] = useMaterialTailwindController();
  return (
    <IconButton
      size="lg"
      color="white"
      className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
      ripple={false}
      onClick={() => setOpenConfigurator(dispatch, true)}
    >
      <Cog6ToothIcon className="h-5 w-5" />
    </IconButton>
  );
}
