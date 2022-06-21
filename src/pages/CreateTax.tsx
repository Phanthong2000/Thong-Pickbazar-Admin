import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { Collapse } from "react-bootstrap";
import location from "../utils/location";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import themeSlice from "../redux/slices/themeSlice";
import { createTax } from "../apis";
import orderSlice from "../redux/slices/orderSlice";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  rate: yup.string().required("Rate is required"),
  city: yup.string().required("City is required").default("ok"),
  district: yup.string(),
  ward: yup.string(),
});
function CreateTax() {
  const [type, setType] = useState<string>("global");
  const [options, setOptions] = useState<any[]>([]);
  const [options2, setOptions2] = useState<any[]>([]);
  const [options3, setOptions3] = useState<any[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    setValue,
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
    const tax = {
      name: data.name,
      rate: data.rate,
      status: "active",
      type,
      city: type === "local" ? data.city : "",
      district: type === "local" ? data.district : "",
      ward: type === "local" ? data.ward : "",
    };
    saveTax(tax);
  };
  const saveTax = async (tax: any) => {
    try {
      const result = await createTax({}, tax, {});
      if (result) {
        dispatch(orderSlice.actions.addTax(result));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            content: "Successfully create Tax",
            type: "success",
          })
        );
        navigate("/taxes");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeType = (type: string) => {
    setType(type);
    if (type === "global") {
      setValue("city", "ok");
      setValue("district", "ok");
      setValue("ward", "ok");
    } else {
      setValue("city", "");
      setValue("district", "");
      setValue("ward", "");
      const data: any[] = [];
      location.forEach((item: any) =>
        data.push({
          value: item,
          label: item.name,
        })
      );
      setOptions(data);
    }
  };
  const handleChooseCity = (value: any) => {
    setValue("city", value.label);
    const data: any[] = [];
    value.value.districts.forEach((district: any) => {
      data.push({
        label: district.name,
        value: district,
      });
    });
    setOptions2(data);
    setOptions3([]);
  };
  const handleChooseDistrict = (value: any) => {
    setValue("district", value.label);
    const data: any[] = [];
    value.value.wards.forEach((ward: any) => {
      data.push({
        label: `${ward.prefix} ${ward.name}`,
        value: ward,
      });
    });
    setOptions3(data);
  };
  const handleChooseWard = (value: any) => {
    setValue("ward", value.label);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font20 font_family_bold mt-2">Create New Tax</div>
      <div className="my-4 divider_vertical_dashed"></div>
      <div className="row p-0 m-0 mt-4">
        <div className="col-12 col-lg-4 mt-2">
          <div className="font18 font_family_bold">Information</div>
          <div className="font14 font_family_regular mt-2 color_888">
            Add your tax information from here
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
          <div className="font_family_bold_italic font14 mt-4">Rate (%)</div>
          <input
            className="mt-2 h40_px w100_per"
            {...register("rate")}
            placeholder="Type rate"
            type="number"
          />
          <div className="mt-2 font12 ml_5px color_red font_family_italic">
            {errors.rate?.message}
          </div>
          <div className="font_family_bold_italic font14 mt-4">Type</div>
          <div className="mt-2 d-flex align-items-center">
            <input
              checked={type === "global"}
              onChange={() => handleChangeType("global")}
              className="icon20x20"
              type="radio"
            />
            <span className="ml_10px font16 font_family_bold_italic">
              Global
            </span>
            <input
              checked={type === "local"}
              onChange={() => handleChangeType("local")}
              className="icon20x20 ml_20px"
              type="radio"
            />
            <span className="ml_10px font16 font_family_bold_italic">
              Local
            </span>
          </div>
          <Collapse in={type === "local"}>
            <div className="mt-4">
              <div className="font_family_bold_italic font14">City</div>
              <Select
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
                placeholder="Choose City"
                onChange={(value) => handleChooseCity(value)}
                options={options}
              />
              <div className="mt-2 font12 ml_5px color_red font_family_italic">
                {errors.city?.message}
              </div>
              <div className="font_family_bold_italic font14 mt-4">
                District
              </div>
              <Select
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
                placeholder="Choose District"
                onChange={(value) => handleChooseDistrict(value)}
                options={options2}
              />
              <div className="font_family_bold_italic font14 mt-4">Ward</div>
              <Select
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
                placeholder="Choose Ward"
                onChange={(value) => handleChooseWard(value)}
                options={options3}
              />
            </div>
          </Collapse>
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-end">
        <button
          type="submit"
          className="btn bg_primary font14 font_family_bold color_white"
        >
          Add Tax
        </button>
      </div>
    </form>
  );
}

export default CreateTax;
