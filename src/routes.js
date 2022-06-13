import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./layouts";
import Category from "./pages/Category";
import CreateCategory from "./pages/CreateCategory";
import CreateGroup from "./pages/CreateGroup";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";
import UpdateCategory from "./pages/UpdateCategory";
import UpdateGroup from "./pages/UpdateGroup";

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
          path: "/groups/:name",
          element: <UpdateGroup />,
        },
        {
          path: "/categories",
          element: <Category />,
        },
        {
          path: "/categories/create",
          element: <CreateCategory />,
        },
        {
          path: "/categories/:id",
          element: <UpdateCategory />,
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
