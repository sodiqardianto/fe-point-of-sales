"use client";
import React from "react";

// @components
import {
  Card,
  Input,
  Button,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Link from "next/link";

export default function LoginForm() {
  return (
    <section className="px-8 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-300 to-blue-900">
      <div className="container mx-auto h-screen grid place-items-center">
        <Card
          shadow={true}
          className="md:px-24 md:py-14 py-8 border border-gray-300"
        >
          <CardHeader shadow={false} floated={false} className="text-center">
            <Typography
              variant="h1"
              color="blue-gray"
              className="mb-4 !text-3xl lg:text-4xl"
            >
              Login
            </Typography>
            <Typography className="!text-gray-600 text-base font-normal md:max-w-sm">
              Enter your email and password to Login.
            </Typography>
          </CardHeader>
          <CardBody>
            <form action="#" className="flex flex-col gap-4">
              <div className="mb-1 flex flex-col gap-6">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Email
                </Typography>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "hidden",
                  }}
                  containerProps={{ className: "min-w-[100px]" }}
                  crossOrigin={""}
                  size="md"
                />
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="-mb-3 font-medium"
                >
                  Password
                </Typography>
                <Input
                  type="password"
                  size="md"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900 placeholder:text-gray-500 placeholder:opacity-100"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={""}
                />
              </div>
              <Typography variant="small">
                <Link href="/forgot-password">Forgot Password?</Link>
              </Typography>
              <Button size="md" color="gray" fullWidth>
                Login
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
