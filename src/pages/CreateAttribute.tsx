import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AttributeValue from "../components/attribute/AttributeValue";
import { createAttribute } from "../apis/attribute";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import themeSlice from "../redux/slices/themeSlice";
import attributeSlice from "../redux/slices/attributeSlice";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name_vi: yup.string().required("Name Vietnamese is required"),
  name_en: yup.string().required("Name English is required"),
});
function CreateAttribute() {
  const [attributesValue, setAttributesValue] = useState<any[]>([
    {
      value: "",
      meta: "",
    },
  ]);
  const [errorImage, setErrorImage] = useState<string>("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    if (attributesValue.filter((value) => value.value === "").length > 0) {
      setErrorImage("Must type all values");
    } else {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      setErrorImage("");
      const attribute = {
        name_en: data.name_en,
        name_vi: data.name_vi,
        values: attributesValue,
      };
      saveAttribute(attribute);
    }
  };
  const saveAttribute = async (attribute: any) => {
    const result = await createAttribute({}, attribute, {});
    if (result) {
      dispatch(attributeSlice.actions.addAttribute(result));
      dispatch(
        themeSlice.actions.hideBackdrop({
          isShow: false,
          content: "",
        })
      );
      dispatch(
        themeSlice.actions.showToast({
          content: "Successfully create Attribute",
          type: "success",
        })
      );
      navigate("/attributes");
    }
  };
  const handleAddValue = () => {
    setAttributesValue((prevState) => [
      ...prevState,
      {
        value: "",
        meta: "",
      },
    ]);
  };
  const handleDeleteValue = (position: number) => {
    const newState = [];
    for (let i = 0; i < attributesValue.length; i++) {
      if (position !== i) {
        newState.push({
          ...attributesValue[i],
        });
      }
    }
    setAttributesValue(newState);
  };
  const handleChangeValue = (text: string, index: number) => {
    const newState = [];
    for (let i = 0; i < attributesValue.length; i++) {
      if (index !== i) {
        newState.push({
          ...attributesValue[i],
        });
      } else {
        newState.push({
          value: text,
          meta: attributesValue[i].meta,
        });
      }
    }
    setAttributesValue(newState);
  };
  const handleChangeMeta = (text: string, index: number) => {
    const newState = [];
    for (let i = 0; i < attributesValue.length; i++) {
      if (index !== i) {
        newState.push({
          ...attributesValue[i],
        });
      } else {
        newState.push({
          value: attributesValue[i].value,
          meta: text,
        });
      }
    }
    setAttributesValue(newState);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font20 font_family_bold mt-2">Create New Attribute</div>
      <div className="my-4 divider_vertical_dashed"></div>
      <div className="row p-0 m-0 mt-4">
        <div className="col-12 col-lg-4 mt-2">
          <div className="font18 font_family_bold">Attribute</div>
          <div className="font14 font_family_regular mt-2 color_888">
            Update your attribute name and necessary information from here
          </div>
        </div>
        <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
          <div className="font_family_bold_italic font14">Name English</div>
          <input
            className="mt-2 h40_px w100_per"
            {...register("name_en")}
            placeholder="Type name English"
            type="text"
          />
          <div className="mt-2 font12 ml_5px color_red font_family_italic">
            {errors.name_en?.message}
          </div>
          <div className="font_family_bold_italic font14 mt-4">
            Name Vietnamese
          </div>
          <input
            className="mt-2 h40_px w100_per"
            {...register("name_vi")}
            placeholder="Type name Vietnamese"
            type="text"
          />
          <div className="mt-2 font12 ml_5px color_red font_family_italic">
            {errors.name_vi?.message}
          </div>
        </div>
      </div>
      <div className="my-4 divider_vertical_dashed"></div>
      <div className="row p-0 m-0 mt-4">
        <div className="col-12 col-lg-4 mt-2">
          <div className="font18 font_family_bold">Attribute Values</div>
          <div className="font14 font_family_regular mt-2 color_888">
            Update your attribute value and necessary information from here
          </div>
        </div>
        <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
          {attributesValue.map((item: any, index: number) => (
            <AttributeValue
              key={index}
              handleChangeValue={handleChangeValue}
              handleDeleteValue={handleDeleteValue}
              index={index}
              value={item}
              handleChangeMeta={handleChangeMeta}
            />
          ))}
          <button
            type="button"
            onClick={handleAddValue}
            className="btn bg_primary font14 font_family_bold color_white mt-4"
          >
            Add Value
          </button>
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
          Add Attribute
        </button>
      </div>
    </form>
  );
}

export default CreateAttribute;
