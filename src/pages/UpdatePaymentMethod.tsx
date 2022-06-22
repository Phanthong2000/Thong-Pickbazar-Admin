import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import { getPaymentMethodById, updatePaymentMethod } from "../apis";
import { PaymentMethodType } from "../interfaces";
import { AppDispatch } from "../redux/store";
import {
  allPaymentMethodsSelector,
  getApiAllPaymentMethods,
} from "../redux/slices/orderSlice";
import { Icon } from "@iconify/react";
import BaseFileChosen from "../base/BaseFileChosen";
import Select from "react-select";
import themeSlice from "../redux/slices/themeSlice";
import { saveImage } from "../utils/firebase";

const schema = yup.object({
  name: yup.string().required("Name is required"),
});
function UpdatePaymentMethod() {
  const { id } = useParams();
  const chooseImageRef = useRef<HTMLInputElement>(null);
  const allPaymentMethods = useSelector(allPaymentMethodsSelector);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>();
  const [parent, setParent] = useState<string>("");
  const [image, setImage] = useState<any[]>([]);
  const [newImage, setNewImage] = useState<any[]>([]);
  const [options, setOptions] = useState<any[]>([]);
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
  const getPaymentMethod = async (id: string) => {
    try {
      const result = await getPaymentMethodById({}, {}, {}, id);
      if (result) {
        setPaymentMethod(result);
        setParent(result.parentId);
        setValue("name", result.name);
        setImage([result.image]);
      } else {
        navigate("/payment-methods");
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (id) {
      getPaymentMethod(id);
    }
  }, [id]);
  useEffect(() => {
    if (allPaymentMethods) {
      const data: any[] = [];
      allPaymentMethods.forEach((paymentMethod: any) => {
        if (paymentMethod.id !== id)
          data.push({
            value: paymentMethod.id,
            label: paymentMethod.name,
          });
      });
      setOptions(data);
    }
  }, [allPaymentMethods]);
  const onSubmit = (data: any) => {
    if (image.length === 0 && newImage.length === 0)
      setErrorImage("Must choose Image");
    else {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      setErrorImage("");
      const newPaymentMethod = {
        id: paymentMethod?.id,
        name: data.name,
        status: "active",
        type: parent ? "child" : "parent",
        parentId: parent ? parent : "",
      };
      savePaymentMethod(newPaymentMethod);
    }
  };
  const savePaymentMethod = async (paymentMethod: any) => {
    try {
      let imageUrl = image[0];
      if (newImage.length > 0)
        imageUrl = await saveImage("paymentMethods", newImage[0]);
      const body = {
        ...paymentMethod,
        image: imageUrl,
      };
      console.log(body);
      const result = await updatePaymentMethod({}, body, {});
      if (result) {
        dispatch(getApiAllPaymentMethods());
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            content: "Successfully update Payment Method",
            type: "success",
          })
        );
        navigate("/payment-methods");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteImage = (position: number) => {
    setImage([]);
  };
  const handleDeleteNewImage = (position: number) => {
    setNewImage([]);
  };
  const onChooseImage = (e: any) => {
    setNewImage([e.target.files[0]]);
    setImage([]);
  };
  const handleChooseParent = (value: any) => {
    setParent(value ? value.value : "");
  };
  if (!paymentMethod) return null;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font20 font_family_bold mt-2">
          Update Payment Method
        </div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row p-0 m-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Description</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Add your payment method description and necessary information from
              here
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
            <div className="font_family_bold_italic font14 mt-4">Parent</div>
            <Select
              isDisabled={Boolean(
                paymentMethod.type === "parent" &&
                  paymentMethod.child.length > 0
              )}
              value={options.filter((option) => option.value === parent)}
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  height: "40px",
                  marginTop: "8px",
                }),
              }}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary25: "#ddd",
                  primary50: "#ddd",
                  primary: "rgba(0,159,127)",
                },
              })}
              isClearable
              placeholder="Choose parent"
              onChange={(value) => handleChooseParent(value)}
              options={options}
            />
            <div className="font_family_bold_italic font14 mt-4">Image</div>
            <div
              onClick={() => chooseImageRef.current?.click()}
              className="choose_image_large cursor_pointer py-2 d-flex align-items-center flex-column mt-2"
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
            type="submit"
            className="btn bg_primary font14 font_family_bold color_white"
          >
            Update Payment Method
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
        onChange={onChooseImage}
      />
    </>
  );
}

export default React.memo(UpdatePaymentMethod);
