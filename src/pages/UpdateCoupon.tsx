import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getCouponByCode, updateCoupon } from "../apis";
import { CouponType } from "../interfaces";
import { Icon } from "@iconify/react";
import moment from "moment";
import DatePicker from "react-datepicker";
import BaseFileChosen from "../base/BaseFileChosen";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import themeSlice from "../redux/slices/themeSlice";
import { saveImage } from "../utils/firebase";
import orderSlice from "../redux/slices/orderSlice";

const schema = yup.object({
  code: yup.string().required("Code is required"),
  amount: yup.string().required("Amount is required"),
  description: yup.string(),
});
function UpdateCoupon() {
  const chooseImageRef = useRef<HTMLInputElement>(null);
  const { code } = useParams();
  const [coupon, setCoupon] = useState<CouponType>();
  const [image, setImage] = useState<any[]>([]);
  const [newImage, setNewImage] = useState<any[]>([]);
  const [type, setType] = useState<string>("");
  const [from, setFrom] = useState<Date>();
  const [to, setTo] = useState<Date>();
  const [errorImage, setErrorImage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const getCoupon = async (code: string) => {
    try {
      const result = await getCouponByCode({}, {}, {}, code);
      if (result) {
        setCoupon(result);
        setValue("code", result.code);
        setImage([result.image]);
        setType(result.type);
        setValue("amount", result.amount);
        setValue("description", result.description);
        setFrom(new Date(moment(result.from).format(`YYYY/MM/DD`)));
        setTo(new Date(moment(result.to).format(`YYYY/MM/DD`)));
      } else {
        navigate("/coupons");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (code) getCoupon(code);
  }, [code]);
  const onSubmit = (data: any) => {
    if (image.length === 0 && newImage.length === 0)
      setErrorImage("Must choose image");
    else {
      setErrorImage("");
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const newCoupon = {
        id: coupon?.id,
        code: data.code,
        type,
        description: data.description ? data.description : "",
        amount: data.amount,
        from,
        to,
      };
      saveCoupon(newCoupon);
    }
  };
  const saveCoupon = async (coupon: any) => {
    try {
      let imageUrl: any = coupon.image;
      if (newImage.length > 0)
        imageUrl = await saveImage("coupons", newImage[0]);
      const body = {
        ...coupon,
        image: imageUrl,
      };
      const result = await updateCoupon({}, body, {});
      if (result) {
        dispatch(orderSlice.actions.updateCoupon(result));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            content: "Successfully update Coupon",
            type: "success",
          })
        );
        navigate("/coupons");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteImage = (e: any) => {
    setImage([]);
  };
  const onChooseNewImage = (e: any) => {
    const file = e.target.files[0];
    setNewImage([file]);
  };
  const handleDeleteNewImage = (e: any) => {
    setNewImage([]);
  };
  if (!coupon) return null;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font20 font_family_bold mt-2">Create New Coupon</div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row p-0 m-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Image</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Upload your coupon image here
            </div>
          </div>
          <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
            <div
              onClick={() => chooseImageRef.current?.click()}
              className="choose_image_large cursor_pointer py-2 d-flex align-items-center flex-column"
            >
              <Icon
                className="color_888 icon30x30"
                icon="bi:cloud-arrow-up-fill"
              />
              <div className="font_family_regular">
                <span className="color_primary">Upload an image</span> or drag
                and drop
              </div>
              <div className="font_family_italic font12 mt-2">PNG, JPG</div>
            </div>
            <div className="d-flex flex-wrap mt-2">
              {image.map((item: any, index: any) => (
                <BaseFileChosen
                  file={false}
                  close={handleDeleteImage}
                  index={index}
                  key={index}
                  image={item}
                />
              ))}
              {newImage.map((item: any, index: any) => (
                <BaseFileChosen
                  file={true}
                  close={handleDeleteNewImage}
                  index={index}
                  key={index}
                  image={item}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row p-0 m-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Description</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Add your coupon description and necessary information from here
            </div>
          </div>
          <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
            <div className="font_family_bold_italic font14">Code</div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("code")}
              placeholder="Type code"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.code?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Description
            </div>
            <textarea
              {...register("description")}
              placeholder="Type description"
              className="w100_per mt-2"
              rows={5}
            ></textarea>
            <div className="font_family_bold_italic font14 mt-4">Type</div>
            <div className="mt-2 d-flex align-items-center">
              <input
                checked={type === "usd"}
                onChange={() => setType("usd")}
                className="icon20x20"
                type="radio"
              />
              <span className="ml_10px font16 font_family_bold_italic">
                USD
              </span>
              <input
                checked={type === "percent"}
                onChange={() => setType("percent")}
                className="icon20x20 ml_20px"
                type="radio"
              />
              <span className="ml_10px font16 font_family_bold_italic">
                Percent
              </span>
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Amount {type === "usd" ? `(USD)` : `(%)`}
            </div>
            <div className="position-relative">
              <input
                className="mt-2 h40_px w100_per"
                {...register("amount")}
                placeholder="Type amount"
                type="number"
              />
              <Icon
                icon={
                  type === "usd" ? `cryptocurrency:usd` : `mdi:ticket-percent`
                }
                className="icon36x36 position-absolute top2 mt-2 mr_5px right0 color_primary"
              />
            </div>
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.amount?.message}
            </div>
            <div className="row m-0 p-0">
              <div className="col-6 mt-4 px-0">
                <div className="font_family_bold_italic font14">
                  Active from
                </div>
                <DatePicker
                  minDate={new Date()}
                  customInput={
                    <input
                      className="mt-2 h40_px w100_per mr_10px"
                      placeholder="Type phone"
                      type="text"
                    />
                  }
                  selected={from}
                  dateFormat="dd/MM/yyyy"
                  onChange={(newValue: Date) => {
                    setFrom(newValue);
                    setTo(
                      new Date(
                        moment(newValue).add(2, "days").format("YYYY/MM/DD")
                      )
                    );
                  }}
                />
              </div>
              <div className="col-6 mt-4 px-0">
                <div className="font_family_bold_italic font14">
                  Will Expire
                </div>
                <DatePicker
                  minDate={
                    new Date(moment(from).add(2, "days").format("YYYY/MM/DD"))
                  }
                  customInput={
                    <input
                      className="mt-2 h40_px w100_per ml_10px"
                      placeholder="Type phone"
                      type="text"
                    />
                  }
                  selected={to}
                  dateFormat="dd/MM/yyyy"
                  onChange={(newValue: Date) => {
                    setTo(newValue);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 col-lg-4"></div>
          <div
            className={`col-12 col-lg-8 border_radius_5 py-2 px-4 color_red ${
              errorImage.length > 0 ? `bg_red` : `d-none`
            }`}
          >
            {errorImage}
          </div>
        </div>
        <div className="mt-4 d-flex justify-content-end">
          <button
            // onClick={() => alert("dsadsa")}
            type="submit"
            className="btn bg_primary font14 font_family_bold color_white"
          >
            Add Coupon
          </button>
        </div>
      </form>
      <input
        hidden
        ref={chooseImageRef}
        type="file"
        onClick={(e: any) => {
          e.target.value = null;
        }}
        accept=".png, .jpg"
        onChange={onChooseNewImage}
      />
    </>
  );
}

export default UpdateCoupon;
