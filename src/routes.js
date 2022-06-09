import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./layouts";
import Dashboard from "./pages/Dashboard";

function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "",
          element: <Navigate to="/dashboard" />,
        },
      ],
    },
  ]);
}

export default Router;
