import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Modal } from "rsuite";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import location from "../../utils/location";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleChoose: (type: string, address: string) => void;
};
const schema = yup.object({
  city: yup.string().required("City is required"),
  district: yup.string().required("District is required"),
  ward: yup.string().required("Ward is required"),
  street: yup.string().required("Street is required"),
});
function ModalChooseAddress({ open, handleChoose, handleClose }: Props) {
  const [options, setOptions] = useState<any[]>([]);
  const [options2, setOptions2] = useState<any[]>([]);
  const [options3, setOptions3] = useState<any[]>([]);
  const [type, setType] = useState<string>("billing");
  const {
    handleSubmit,
    setValue,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    setValue("street", "");
    const data: any[] = [];
    location.forEach((item: any) =>
      data.push({
        value: item,
        label: item.name,
      })
    );
    setOptions(data);
  }, [open]);
  const onSubmit = (data: any) => {
    handleChoose(
      type,
      `${data.street}, ${data.ward}, ${data.district}, ${data.city}`
    );
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
    <Modal open={open} onClose={handleClose}>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-center font20 font_family_bold mb-4">
            Update address
          </div>
          <div className="mt-4">
            <div className="color_888 font16 font_family_bold_italic">Type</div>
            <div className="d-flex align-items-center mt-2">
              <input
                type="radio"
                checked={Boolean(type === "billing")}
                onChange={() => setType("billing")}
                className="icon20x20"
              />
              <div className="ml_10px color_888 font18 font_family_regular">
                Billing
              </div>
              <input
                type="radio"
                checked={Boolean(type === "shipping")}
                onChange={() => setType("shipping")}
                className="icon20x20 ml_10px"
              />
              <div className="ml_10px color_888 font18 font_family_regular">
                Shipping
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="color_888 font16 font_family_bold_italic">City</div>
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
              isClearable
              placeholder="Choose parent"
              onChange={(value) => handleChooseCity(value)}
              options={options}
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.city?.message}
            </div>
          </div>
          <div className="mt-4">
            <div className="color_888 font16 font_family_bold_italic">
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
              isClearable
              placeholder="Choose parent"
              onChange={(value) => handleChooseDistrict(value)}
              options={options2}
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.district?.message}
            </div>
          </div>
          <div className="mt-4">
            <div className="color_888 font16 font_family_bold_italic">Ward</div>
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
              isClearable
              placeholder="Choose parent"
              onChange={(value) => handleChooseWard(value)}
              options={options3}
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.ward?.message}
            </div>
          </div>
          <div className="mt-4">
            <div className="color_888 font16 font_family_bold_italic">
              Street
            </div>
            <textarea
              {...register("street")}
              placeholder="Type Street"
              rows={5}
              className="w100_per mt-2"
            ></textarea>
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.street?.message}
            </div>
          </div>
          <div className="mt-4 text-center">
            <button
              type="submit"
              className="btn bg_primary color_white font16 font_family_bold_italic"
            >
              Save Address
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default React.memo(ModalChooseAddress);
