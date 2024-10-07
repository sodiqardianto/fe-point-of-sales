import React, { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return <section className="bg-red-500">{children}</section>;
}
