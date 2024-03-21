'use client'

import { useAppSelector } from "../lib/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import React from "react";

const requireAdminAuth = (Component) => {
  const AuthHOC = (props) => {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    useEffect(() => {
      if (!isAuthenticated) {
        redirect("/about");
      }
    }, [isAuthenticated]);

    return <Component {...props} />;
  };

  return AuthHOC;
};

export default requireAdminAuth;
