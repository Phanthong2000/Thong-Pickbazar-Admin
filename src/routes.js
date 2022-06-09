import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./layouts";
import CreateGroup from "./pages/CreateGroup";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";

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
          path: "/groups",
          element: <Group />,
        },
        {
          path: "/groups/create",
          element: <CreateGroup />,
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
