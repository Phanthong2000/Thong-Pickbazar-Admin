import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./layouts";
import Attribute from "./pages/Attribute";
import Category from "./pages/Category";
import Coupon from "./pages/Coupon";
import CreateAttribute from "./pages/CreateAttribute";
import CreateCategory from "./pages/CreateCategory";
import CreateCoupon from "./pages/CreateCoupon";
import CreateGroup from "./pages/CreateGroup";
import CreateOrder from "./pages/CreateOrder";
import CreateOrderStatus from "./pages/CreateOrderStatus";
import CreateProduct from "./pages/CreateProduct";
import CreateShipping from "./pages/CreateShipping";
import CreateTag from "./pages/CreateTag";
import CreateTax from "./pages/CreateTax";
import CreateUser from "./pages/CreateUser";
import Dashboard from "./pages/Dashboard";
import Group from "./pages/Group";
import Login from "./pages/Login";
import OrderStatus from "./pages/OrderStatus";
import Product from "./pages/Product";
import Shipping from "./pages/Shipping";
import Tags from "./pages/Tags";
import Tax from "./pages/Tax";
import UpdateAttribute from "./pages/UpdateAttribute";
import UpdateCategory from "./pages/UpdateCategory";
import UpdateCoupon from "./pages/UpdateCoupon";
import UpdateGroup from "./pages/UpdateGroup";
import UpdateOrderStatus from "./pages/UpdateOrderStatus";
import UpdateShipping from "./pages/UpdateShipping";
import UpdateTag from "./pages/UpdateTag";
import UpdateTax from "./pages/UpdateTax";
import UpdateUser from "./pages/UpdateUser";
import User from "./pages/User";

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
          path: "/users",
          element: <User />,
        },
        {
          path: "/orders/create",
          element: <CreateOrder />,
        },
        {
          path: "/users/create",
          element: <CreateUser />,
        },
        {
          path: "/users/:id",
          element: <UpdateUser />,
        },
        {
          path: "/order-status",
          element: <OrderStatus />,
        },
        {
          path: "/order-status/create",
          element: <CreateOrderStatus />,
        },
        {
          path: "/order-status/:id",
          element: <UpdateOrderStatus />,
        },
        {
          path: "/coupons",
          element: <Coupon />,
        },
        {
          path: "/coupons/create",
          element: <CreateCoupon />,
        },
        {
          path: "/coupons/:code",
          element: <UpdateCoupon />,
        },
        {
          path: "/taxes",
          element: <Tax />,
        },
        {
          path: "/taxes/create",
          element: <CreateTax />,
        },
        {
          path: "/taxes/:name",
          element: <UpdateTax />,
        },
        {
          path: "/shippings",
          element: <Shipping />,
        },
        {
          path: "/shippings/create",
          element: <CreateShipping />,
        },
        {
          path: "/shippings/:name",
          element: <UpdateShipping />,
        },
        {
          path: "",
          element: <Navigate to="/dashboard" />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);
}

export default Router;
