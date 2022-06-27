import classNames from "classnames";
import React from "react";

type Props = {
  top?: string;
  display?: string;
  align?: string;
  justify?: string;
  url?: string;
  size?: string;
  flex?: string;
};
function BaseLoading2({
  top = "",
  url = require("../assets/images/rolling.gif"),
  align = "",
  display = "",
  justify = "",
  size = "",
  flex = "flex-column",
}: Props) {
  return (
    <>
      <div className={classNames(top, align, justify, display, flex)}>
        <img className={classNames(size)} src={url} />
        <div className="font20 font_family_bold">Loading</div>
      </div>
    </>
  );
}

export default BaseLoading2;
