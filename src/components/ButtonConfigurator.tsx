"use client";
import { setOpenConfigurator } from "@/store/slices/configuratorSlice";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import React from "react";
import { useDispatch } from "react-redux";

export default function ButtonConfigurator() {
  const dispatch = useDispatch();

  return (
    <IconButton
      size="lg"
      color="white"
      className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
      ripple={false}
      onClick={() => dispatch(setOpenConfigurator(true))}
    >
      <Cog6ToothIcon className="h-5 w-5" />
    </IconButton>
  );
}
