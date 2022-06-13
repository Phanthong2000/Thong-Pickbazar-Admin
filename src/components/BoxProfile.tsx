import React, { useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useClickOutSide from "../hooks/useClickOutside";
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
  useClickOutSide(profileRef, () => {
    close();
  });
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
        <Link className="font16 font_family_italic color_888" to="#">
          Logout
        </Link>
      </div>
    </Container>
  );
}

export default React.memo(BoxProfile);
