import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useClickOutSide from "../hooks/useClickOutside";
import userSlice from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store";
import { primaryHoverColor } from "../theme";

type Props = {
  show: boolean;
  close: () => void;
};
const Container = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  background: #fff;
  margin-top: 50px;
  width: 150px;
  .box_profile_item:hover a {
    color: ${primaryHoverColor} !important;
  }
`;
function BoxProfile({ close, show }: Props) {
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useClickOutSide(profileRef, () => {
    close();
  });
  const handleLogout = () => {
    sessionStorage.removeItem("access-token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("isLogin");
    dispatch(userSlice.actions.logout());
    navigate("/login");
  };
  return (
    <Container
      ref={profileRef}
      className={`box_shadow_dropdown border_radius_5 ${
        show ? "show" : ""
      } box_profile`}
    >
      <div className="bg_primary py-2 px-3 border_radius_5">
        <div className="color_white font14 font_family_bold_italic">
          Customer
        </div>
        <div className="font14 mt-1 color_white font_family_italic">
          customer@gmail.com
        </div>
      </div>
      <div className="py-2 px-3 cursor_pointer box_profile_item">
        <Link to="#" className="font16 font_family_italic color_888">
          Profile
        </Link>
      </div>
      <div className="py-2 px-3 cursor_pointer box_profile_item">
        <button
          type="button"
          onClick={handleLogout}
          className="btn m-0 p-0 font16 font_family_italic color_888"
        >
          Logout
        </button>
      </div>
    </Container>
  );
}

export default React.memo(BoxProfile);
