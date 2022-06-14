import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./layouts";
import Attribute from "./pages/Attribute";
import Category from "./pages/Category";
import CreateAttribute from "./pages/CreateAttribute";
import CreateCategory from "./pages/CreateCategory";
import CreateGroup from "./pages/CreateGroup";
import CreateProduct from "./pages/CreateProduct";
import CreateTag from "./pages/CreateTag";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";
import Product from "./pages/Product";
import Tags from "./pages/Tags";
import UpdateAttribute from "./pages/UpdateAttribute";
import UpdateCategory from "./pages/UpdateCategory";
import UpdateGroup from "./pages/UpdateGroup";
import UpdateTag from "./pages/UpdateTag";

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
          path: "/tags/",
          element: <Tags />,
        },
        {
          path: "/tags/create",
          element: <CreateTag />,
        },
        {
          path: "/tags/:slug",
          element: <UpdateTag />,
        },
        {
          path: "/attributes",
          element: <Attribute />,
        },
        {
          path: "/attributes/create",
          element: <CreateAttribute />,
        },
        {
          path: "/attributes/:name",
          element: <UpdateAttribute />,
        },
        {
          path: "/products",
          element: <Product />,
        },
        {
          path: "/products/create",
          element: <CreateProduct />,
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
