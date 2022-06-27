import React from "react";
import styled from "styled-components";
import MenuItem from "../components/sidebar/MenuItem";
import sidebarConfig from "./sidebarConfig";

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.12) 3px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  width: 300px;
  background-color: #fff;
  max-height: calc(100vh - 80px);
  min-height: calc(100vh - 80px);
  overflow: auto;
  position: fixed;
  top: 80px;
  padding: 30px 15px
`;
function Sidebar() {
  return (
    <Container id="sidebar">
      {sidebarConfig.map((menu, index) => (
        <MenuItem menu={menu} key={index} />
      ))}
    </Container>
  );
}

export default Sidebar;
