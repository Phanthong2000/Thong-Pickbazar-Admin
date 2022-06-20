import classNames from "classnames";
import React, { useState } from "react";
import { ChromePicker } from "react-color";

type Props = {
  isShow: boolean;
  handleChangeColor: (color: any) => void;
  color: string;
};
function ColorPicker({ isShow, color, handleChangeColor }: Props) {
  return (
    <div id="color_picker" className={classNames({ show: isShow })}>
      <ChromePicker onChange={handleChangeColor} color={color} />
    </div>
  );
}

export default React.memo(ColorPicker);
