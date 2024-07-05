import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Root() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on route change
  }, [pathname]); 

  return (
    <>
      <div className="rootLayout">
        <Outlet />
      </div>
    </>
  );
}