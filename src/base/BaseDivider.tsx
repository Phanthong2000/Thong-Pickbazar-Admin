import React from "react";
import classNames from "classnames";
import styled from "styled-components";
import { grayColor } from "../theme";

type Props = {
  shape?: string;
  height?: number;
  display?: string;
};
function BaseDivider({ shape = "solid", height = 1, display = "block" }) {
  const Container = styled.div`
    display: ${display};
    border: ${height}px ${shape} ${grayColor};
  `;
  return <Container> </Container>;
}

export default BaseDivider;
