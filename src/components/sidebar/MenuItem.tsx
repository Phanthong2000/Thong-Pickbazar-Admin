import React from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { MenuType } from "../../interfaces";
import { primaryColor, primaryHoverColor } from "../../theme";
import { Link, useLocation } from "react-router-dom";

type Props = {
  menu: MenuType;
};
const Container = styled.div`
  &:hover {
  color: ${primaryHoverColor};
}
`
function MenuItem({ menu }: Props) {
  const { pathname } = useLocation();
  return (
    <Link to={menu.path}>
      <Container className={`d-flex align-items-center ${pathname.includes(menu.path) ? `color_primary` : `color_888`} cursor_pointer menu_item mb-4`}>
        <Icon className="icon25x25" icon={menu.icon} />
        <div className="ml_10px font_family_regular font18">{menu.name}</div>
      </Container>
    </Link>

  );
}

export default MenuItem;
