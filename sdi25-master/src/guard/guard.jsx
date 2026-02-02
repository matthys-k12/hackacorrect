import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import React from "react";

const hasPermission = (userRole, allowedRoles) =>
  allowedRoles.includes(userRole);

export const GuardedRoute = ({
  component: Component,
  allowedRoles,
  required,
}) => {
  const ACCESS_KEY = secureLocalStorage.getItem("session_token");
  const userRole = secureLocalStorage.getItem("user_role");

  if (required) {
    if (ACCESS_KEY !== null && hasPermission(userRole, allowedRoles)) {
      return <Component />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return <Component />;
  }
};
