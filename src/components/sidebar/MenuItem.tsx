import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { MenuType } from "../../interfaces";
import { primaryHoverColor } from "../../theme";

type Props = {
  menu: MenuType;
};
const Container = styled.div`
  &:hover {
    color: ${primaryHoverColor};
  }
`;
function MenuItem({ menu }: Props) {
  return (
    <Container className="d-flex align-items-center color_888 cursor_pointer menu_item mb-4">
      <Icon className="icon25x25" icon={menu.icon} />
      <div className="ml_10px font_family_regular font18">{menu.name}</div>
    </Container>
  );
}

export default MenuItem;
