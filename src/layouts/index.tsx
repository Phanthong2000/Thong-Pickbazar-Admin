import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import useShowToast from "../hooks/useShowToast";
import BaseBackdrop from "../base/BaseBackdrop";
import BaseLoading from "../base/BaseLoading";

const ContainerPage = styled.div`
  margin-top: 80px;
  margin-left: 300px;
  background: rgba(243, 244, 246);
  padding: 20px;
  min-height: calc(100vh - 80px);
`;
function Layout() {
  useShowToast();
  return (
    <>
      <Navbar />
      <Sidebar />
      <ToastContainer />
      <BaseBackdrop />
      <BaseLoading />
      <ContainerPage>
        <Outlet />
      </ContainerPage>
    </>
  );
}

export default React.memo(Layout);
