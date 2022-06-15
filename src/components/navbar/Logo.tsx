import React from "react";
import styled from "styled-components";
import { primaryColor } from "../../theme";

const Name = styled.a`
  color: ${primaryColor};
  &:hover {
    color: ${primaryColor};
  }
`;
function Logo() {
  return (
    <Name
      href="#"
      className="font_family_bold cursor_pointer font25"
    >
      ThongApp
    </Name>
  );
}

export default React.memo(Logo);
