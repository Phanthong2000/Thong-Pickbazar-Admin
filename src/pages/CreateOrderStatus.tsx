import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import ColorPicker from "../base/ColorPicker";
import useClickOutSide from "../hooks/useClickOutside";
import { createOrderStatus } from "../apis";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import themeSlice from "../redux/slices/themeSlice";
import orderSlice from "../redux/slices/orderSlice";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  serial: yup.string().required("You must specify a number"),
});
function CreateOrderStatus() {
  const colorPickerRef = useRef<HTMLDivElement>(null);
  const [isShowColorPicker, setIsShowColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<string>("#d87b64");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    dispatch(
      themeSlice.actions.showBackdrop({
        isShow: true,
        content: "",
      })
    );
    const orderStatus = {
      name: data.name,
      serial: data.serial,
      color: color,
    };
    saveOrderStatus(orderStatus);
  };
  const saveOrderStatus = async (orderStatus: any) => {
    try {
      const result = await createOrderStatus({}, orderStatus, {});
      if (result) {
        dispatch(orderSlice.actions.addOrderStatus(result));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            content: "Successfully create Order Status",
            type: "success",
          })
        );
        navigate("/order-status");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useClickOutSide(colorPickerRef, () => {
    setIsShowColorPicker(false);
  });
  const handleChangeColor = (color: any) => {
    setColor(color.hex);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font20 font_family_bold mt-2">Create Order Status</div>
      <div className="my-4 divider_vertical_dashed"></div>
      <div className="row p-0 m-0 mt-4">
        <div className="col-12 col-lg-4 mt-2">
          <div className="font18 font_family_bold">Description</div>
          <div className="font14 font_family_regular mt-2 color_888">
            Add order status from here
          </div>
        </div>
        <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
          <div className="font_family_bold_italic font14">Name</div>
          <input
            className="mt-2 h40_px w100_per"
            {...register("name")}
            placeholder="Type name"
            type="text"
          />
          <div className="mt-2 font12 ml_5px color_red font_family_italic">
            {errors.name?.message}
          </div>
          <div className="font_family_bold_italic font14 mt-4">Serial</div>
          <input
            className="mt-2 h40_px w100_per"
            {...register("serial")}
            placeholder="Type serial"
            type="number"
          />
          <div className="font12 font_family_regular color_888 mt-2">
            The order status should follow(ex: 1-[9])
          </div>
          <div className="mt-2 font12 ml_5px color_red font_family_italic">
            {errors.serial?.message}
          </div>
          <div className="font_family_bold_italic font14 mt-4">Color</div>
          <div className="d-flex align-items-center">
            <button
              className="btn mt-2"
              type="button"
              onClick={() => setIsShowColorPicker(true)}
              style={{
                backgroundColor: color,
                width: "50px",
                height: "50px",
                borderRadius: "50px",
              }}
            ></button>
            <div className="ml_20px border px-2 py-1 border_radius_10 font14 font_family_bold_italic">
              {color}
            </div>
          </div>

          <div ref={colorPickerRef}>
            <ColorPicker
              handleChangeColor={handleChangeColor}
              color={color}
              isShow={isShowColorPicker}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-end">
        <button
          type="submit"
          className="btn bg_primary font14 font_family_bold color_white"
        >
          Add Order Status
        </button>
      </div>
    </form>
  );
}

export default React.memo(CreateOrderStatus);
