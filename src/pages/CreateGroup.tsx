import { Icon } from "@iconify/react";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import BaseFileChosen from "../base/BaseFileChosen";
import { saveImage } from "../utils/firebase";
import { useDispatch } from "react-redux";
import themeSlice from "../redux/slices/themeSlice";
import { createGroup } from "../apis/group";
import { useNavigate } from "react-router-dom";
import groupSlice from "../redux/slices/groupSlice";

const schema = yup.object({
  name_vi: yup.string().required("Name Vietnamese is required"),
  name_en: yup.string().required("Name English is required"),
  icon: yup.string().required("Icon is required"),
  title_vi: yup.string().required("Title Vietnamese is required"),
  title_en: yup.string().required("Title English is required"),
  description_vi: yup.string().required("Description Vietnamese is required"),
  description_en: yup.string().required("Description English is required"),
});
function CreateGroup() {
  const chooseSliderRef = useRef<HTMLInputElement>(null);
  const chooseGalleryRef = useRef<HTMLInputElement>(null);
  const [sliders, setSliders] = useState<Array<any>>([]);
  const [gallery, setGallery] = useState<Array<any>>([]);
  const [errorImage, setErrorImage] = useState<string>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: any) => {
    if (sliders.length === 0) setErrorImage("Must choose promotional sliders");
    else if (gallery.length === 0) setErrorImage("Must choose gallery banner");
    else {
      setErrorImage("");
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const group = {
        name_vi: data.name_vi,
        name_en: data.name_en,
        icon: data.icon,
        layout: "classic",
        productCard: "Helium",
        banner: {
          title_vi: data.title_vi,
          title_en: data.title_en,
          description_vi: data.description_vi,
          description_en: data.description_en,
        },
      };
      saveGroup(group);
    }
  };
  const onChooseSliders = (e: any) => {
    const data = [];
    for (let i = 0; i < e.target.files.length; i++) {
      data.push(e.target.files[i]);
    }
    setSliders(data);
  };
  const onChooseGallery = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = function (e) {
        const width = img.naturalWidth || img.width;
        const height = img.naturalHeight || img.height;
        if (width !== 1920 && height !== 1080) {
          dispatch(
            themeSlice.actions.showToast({
              content: "Gallery banner must dimension 1920 x 1080",
              type: "error",
            })
          );
        } else {
          setGallery((prevState) => [...prevState, file]);
        }
      };
    }
  };
  const handleDeleteSlider = (position: number) => {
    setSliders((prevState) =>
      prevState.filter((file, index) => index !== position)
    );
  };
  const handleDeleteBanner = (position: number) => {
    setGallery((prevState) =>
      prevState.filter((file, index) => index !== position)
    );
  };
  const saveGroup = async (group: any) => {
    try {
      const data: any[] = [];
      const galleryUrl = await saveImage("groups", gallery[0]);
      sliders.forEach(async (file) => {
        const url = await saveImage("groups", file);
        data.push(url);
        if (data.length === sliders.length) {
          const body = {
            ...group,
            sliders: data,
            banner: {
              ...group.banner,
              gallery: galleryUrl,
            },
          };
          const result = await createGroup({}, body, {});
          if (result) {
            dispatch(groupSlice.actions.addGroup(result));
            dispatch(
              themeSlice.actions.hideBackdrop({
                isShow: false,
                content: "",
              })
            );
            dispatch(
              themeSlice.actions.showToast({
                content: "Successfully create group",
                type: "success",
              })
            );
            navigate("/groups");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font20 font_family_bold mt-2">Create New Group</div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row p-0 m-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Description</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Add type-description-help-text
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
            <div className="font_family_bold_italic font14 mt-4">Icon</div>
            <div className="d-flex">
              <div className="w100_per">
                <input
                  className="mt-2 h40_px w100_per"
                  {...register("icon")}
                  placeholder="Type icon"
                  type="text"
                />
                <div className="mt-2 font12 ml_5px color_red font_family_italic">
                  {errors.icon?.message}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row m-0 p-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Promotional Sliders</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Upload Promotional Sliders
            </div>
          </div>
          <div className="col-12 col-lg-8 box_shadow_card bg_white border_radius_5 p-4 w100_per">
            <div
              onClick={() => chooseSliderRef.current?.click()}
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
              {sliders.map((item: any, index: any) => (
                <BaseFileChosen
                  file={true}
                  close={handleDeleteSlider}
                  index={index}
                  key={index}
                  image={item}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row m-0 p-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Banner</div>
            <div className="font14 font_family_regular mt-2 color_888 mr_10px">
              Add your banner image with title and description from here.
              Dimension of the banner should be 1920 x 1080 px for full screen
            </div>
          </div>
          <div className="col-12 col-lg-8 box_shadow_card bg_white border_radius_5 p-4 w100_per">
            <div className="font_family_bold_italic font14">Title English</div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("title_en")}
              placeholder="Type title Vietnamese"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.title_en?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Title Vietnamese
            </div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("title_vi")}
              placeholder="Type title Vietnamese"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.title_vi?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Description English
            </div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("description_en")}
              placeholder="Type description English"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.description_en?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Description Vietnamese
            </div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("description_vi")}
              placeholder="Type description Vietnamese"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.description_vi?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">Gallery</div>
            <div
              onClick={() => chooseGalleryRef.current?.click()}
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
              {gallery.map((item: any, index: any) => (
                <BaseFileChosen
                  file={true}
                  close={handleDeleteBanner}
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
            className={`col-12 col-lg-8 border_radius_5 py-2 px-4 color_red ${errorImage.length > 0 ? `bg_red` : `d-none`
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
            Add Group
          </button>
        </div>
      </form>
      <input
        hidden
        ref={chooseSliderRef}
        type="file"
        onClick={(e: any) => {
          e.target.value = null;
        }}
        accept=".png, .jpg"
        onChange={onChooseSliders}
        multiple
      />
      <input
        hidden
        ref={chooseGalleryRef}
        type="file"
        onClick={(e: any) => {
          e.target.value = null;
        }}
        accept=".png, .jpg"
        onChange={onChooseGallery}
      />
    </>
  );
}

export default CreateGroup;
