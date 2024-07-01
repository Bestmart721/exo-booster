import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <div className="rootLayout">
        <Navigate to="/auth/signin" replace />
        <Outlet />
      </div>
    </>
  );
}