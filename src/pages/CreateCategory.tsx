import { Icon } from "@iconify/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { allGroupsSelector } from "../redux/slices/groupSlice";
import BaseFileChosen from "../base/BaseFileChosen";
import { saveImage } from "../utils/firebase";
import { createCategory } from "../apis/category";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import themeSlice from "../redux/slices/themeSlice";
import categorySlice, {
  allCategoriesSelector,
  getApiAllCategories,
} from "../redux/slices/categorySlice";

const schema = yup.object({
  name_vi: yup.string().required("Name Vietnamese is required"),
  name_en: yup.string().required("Name English is required"),
  icon: yup.string().required("Icon is required"),
  group: yup.string().required("Group is required"),
  detail: yup.string(),
});
function CreateCategory() {
  const chooseImageRef = useRef<HTMLInputElement>(null);
  const groups = useSelector(allGroupsSelector);
  const categories = useSelector(allCategoriesSelector);
  const [options, setOptions] = useState<any[]>([]);
  const [optionsParent, setOptionsParent] = useState<any[]>([]);
  const [parent, setParent] = useState<any>();
  const [image, setImage] = useState<any[]>([]);
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
  useEffect(() => {
    if (groups) {
      const data: any[] = [];
      groups.forEach((group: any) => {
        data.push({
          value: group.id,
          label: group.name_en,
        });
      });
      setOptions(data);
    }
  }, [groups]);
  useEffect(() => {
    if (categories) {
      const data: any[] = [];
      categories.forEach((group: any) => {
        data.push({
          value: group.id,
          label: group.name_en,
        });
      });
      setOptionsParent(data);
    }
  }, [categories]);
  const onSubmit = (data: any) => {
    if (image.length === 0) {
      setErrorImage("Must choose image");
    } else {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const category = {
        name_vi: data.name_vi,
        name_en: data.name_en,
        icon: data.icon,
        groupId: data.group,
        type: !parent ? "parent" : "child",
        parentId: parent ? parent : "",
        detail: "",
      };
      saveCategory(category);
    }
  };
  const saveCategory = async (category: any) => {
    try {
      const imageUrl = await saveImage("categories", image[0]);
      const body = {
        ...category,
        image: imageUrl,
      };
      const result = await createCategory({}, body, {});
      if (result) {
        dispatch(getApiAllCategories());
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            content: "Successfully crate Category",
            type: "success",
          })
        );
        navigate("/categories");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleChooseGroup = (value: any) => {
    if (value) setValue("group", `${value.value}`);
    else setValue("group", ``);
  };
  const handleChooseParent = (value: any) => {
    if (value) setParent(`${value.value}`);
    else setParent(null);
  };
  const onChooseImage = (e: any) => {
    setImage([e.target.files[0]]);
  };
  const handleDeleteImage = (position: number) => {
    setImage((prevState) =>
      prevState.filter((file, index) => index !== position)
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font20 font_family_bold mt-2">Create New Category</div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row p-0 m-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Image</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Upload your category image here
            </div>
          </div>
          <div className="col-12 col-lg-8 box_shadow_card bg_white border_radius_5 p-4 w100_per">
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
                  file={true}
                  close={handleDeleteImage}
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
              Add your category details and necessary information from here
            </div>
          </div>
          <div className="col-12 col-lg-8 box_shadow_card bg_white border_radius_5 p-4 w100_per">
            <div className="font_family_bold_italic font14">Name English</div>
            <input
              {...register("name_en")}
              className="mt-2 h40_px w100_per"
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
              {...register("name_vi")}
              className="mt-2 h40_px w100_per"
              placeholder="Type name Vietnamese"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.name_vi?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">Icon</div>
            <input
              {...register("icon")}
              className="mt-2 h40_px w100_per"
              placeholder="Type icon"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.icon?.message}
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
              {errors.group?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Parent Category
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
              onChange={(value) => handleChooseParent(value)}
              options={optionsParent}
            />
            <div className="font_family_bold_italic font14 mt-4">Detail</div>
            <textarea
              rows={5}
              className="mt-2 w100_per"
              placeholder="Type detail"
            />
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
            Add Category
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

export default React.memo(CreateCategory);
