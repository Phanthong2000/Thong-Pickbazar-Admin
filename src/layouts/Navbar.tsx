import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import BoxProfile from "../components/BoxProfile";
import Logo from "../components/navbar/Logo";
import { userSelector } from "../redux/slices/userSlice";
import { primaryColor, primaryHoverColor } from "../theme";

const Container = styled.div`
  height: 80px;
  position: fixed;
  border-bottom: 1px solid #ddd;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  z-index: 100;
  top: 0px;
  background: #fff;
  width: 100%;
`;
const Button = styled.button`
  background: ${primaryColor};
  &:hover {
    background-color: ${primaryHoverColor};
  }
`;
function Navbar() {
  const user = useSelector(userSelector);
  const [isShowProfile, setIsProfile] = useState<boolean>(false);
  const handleShowBoxProfile = () => {
    setIsProfile(!isShowProfile);
  };
  const handleCloseProfile = () => {
    setIsProfile(false);
  };
  return (
    <Container className="d-flex align-items-center justify-content-between px-4">
      <Logo />
      <div className="position-relative">
        <Button className="btn color_white font_family_bold font14 mr_20px">
          Create Shop
        </Button>
        <Avatar
          click={handleShowBoxProfile}
          cursor="pointer"
          shape="circle"
          url={user ? user.avatar : ''}
          size={50}
        />
        <BoxProfile close={handleCloseProfile} show={isShowProfile} />
      </div>
    </Container>
  );
}

export default Navbar;
