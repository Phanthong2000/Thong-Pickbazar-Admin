import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { allGroupsSelector } from "../redux/slices/groupSlice";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import themeSlice from "../redux/slices/themeSlice";
import { createTag } from "../apis/tag";
import { Icon } from "@iconify/react";
import tagSlice from "../redux/slices/tagSlice";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  icon: yup.string(),
  groupId: yup.string().required("Group is required"),
  detail: yup.string(),
});
function CreateTag() {
  const groups = useSelector(allGroupsSelector);
  const [options, setOptions] = useState<any[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [group, setGroup] = useState<any>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const icon = watch("icon");
  useEffect(() => {
    if (groups) {
      const data: any[] = [];
      groups.forEach((group: any) => {
        data.push({
          value: group,
          label: group.name_en,
        });
      });
      setOptions(data);
    }
  }, [groups]);
  const onSubmit = (data: any) => {
    dispatch(
      themeSlice.actions.showBackdrop({
        isShow: true,
        content: "",
      })
    );
    const slug = data.name.replace(" ", "-");
    const tag = {
      ...data,
      slug: slug.toLowerCase(),
    };
    saveTag(tag);
  };
  const saveTag = async (tag: any) => {
    const result = await createTag({}, tag, {});
    if (result) {
      dispatch(
        tagSlice.actions.addTag({
          ...result,
          group,
        })
      );
      dispatch(
        themeSlice.actions.hideBackdrop({
          isShow: false,
          content: "",
        })
      );
      dispatch(
        themeSlice.actions.showToast({
          content: "Successfully create Tag",
          type: "success",
        })
      );
      navigate("/tags");
    }
  };
  const handleChooseGroup = (value: any) => {
    if (value) {
      setValue("groupId", `${value.value.id}`);
      setValue("icon", `${value.value.icon}`);
      setGroup(value.value);
    } else {
      setValue("groupId", ``);
      setValue("icon", ``);
      setGroup(null);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font20 font_family_bold mt-2">Create New Tag</div>
      <div className="my-4 divider_vertical_dashed"></div>
      <div className="row p-0 m-0 mt-4">
        <div className="col-12 col-lg-4 mt-2">
          <div className="font18 font_family_bold">Description</div>
          <div className="font14 font_family_regular mt-2 color_888">
            Add your tag details and necessary information from here
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
          <div className="font_family_bold_italic font14 mt-4">Group</div>
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
            placeholder="Choose Group"
            onChange={(value) => handleChooseGroup(value)}
            options={options}
          />
          <div className="mt-2 font12 ml_5px color_red font_family_italic">
            {errors.groupId?.message}
          </div>
          <div className="font_family_bold_italic font14 mt-4">Icon</div>
          <div className="d-flex">
            <div className="w100_per">
              <Icon className="color_888 icon30x30" icon={icon} />
              <div className="mt-2 font12 ml_5px color_red font_family_italic">
                Following by Group
              </div>
            </div>
          </div>
          <div className="font_family_bold_italic font14 mt-4">Detail</div>
          <textarea
            {...register("detail")}
            rows={5}
            className="mt-2 w100_per"
            placeholder="Type detail"
          />
        </div>
      </div>
      <div className="mt-4 d-flex justify-content-end">
        <button
          type="submit"
          className="btn bg_primary font14 font_family_bold color_white"
        >
          Add Tag
        </button>
      </div>
    </form>
  );
}

export default React.memo(CreateTag);
