import React from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const ContainerPage = styled.div`
  margin-top: 80px;
  margin-left: 300px;
  background: rgba(243, 244, 246);
  padding: 20px
`;
function Layout() {
  return (
    <>
      <Navbar />
      <Sidebar />
      <ContainerPage>
        <Outlet />
      </ContainerPage>
    </>
  );
}

export default Layout;
