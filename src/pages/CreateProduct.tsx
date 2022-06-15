import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icon } from "@iconify/react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { allGroupsSelector } from "../redux/slices/groupSlice";
import { getAllCategoriesByGroup } from "../apis/category";
import { allTagsSelector } from "../redux/slices/tagSlice";
import Option from "../components/product/Option";
import { allAttributesSelector } from "../redux/slices/attributeSlice";
import BaseFileChosen from "../base/BaseFileChosen";
import { saveImage } from "../utils/firebase";
import { AppDispatch } from "../redux/store";
import { createProduct } from "../apis/product";
import themeSlice from "../redux/slices/themeSlice";
import { useNavigate } from "react-router-dom";

const schema = yup.object({
  name_vi: yup.string().required("Name Vietnamese is required"),
  name_en: yup.string().required("Name English is required"),
  unit: yup.string().required("Unit is required"),
  group: yup.string().required("Group is required"),
  category: yup.string().required("Category is required"),
  tag: yup.string().required("Tag is required"),
  description: yup.string(),
});
const options4 = [
  {
    value: "simple",
    label: "Simple Product",
  },
  {
    value: "variable",
    label: "Variable Product",
  },
];

function CreateProduct() {
  const chooseFeatureRef = useRef<HTMLInputElement>(null);
  const chooseGalleryRef = useRef<HTMLInputElement>(null);
  const groups = useSelector(allGroupsSelector);
  const allTags = useSelector(allTagsSelector);
  const allAttributes = useSelector(allAttributesSelector);
  const [options, setOptions] = useState<any[]>([]);
  const [options2, setOptions2] = useState<any[]>([]);
  const [options3, setOptions3] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [status, setStatus] = useState<string>("public");
  const [tags, setTags] = useState<any[]>([]);
  const [type, setType] = useState<string | any>("simple");
  const [feature, setFeature] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  const [price, setPrice] = useState<string | any>();
  const [salePrice, setSalePrice] = useState<string | any>();
  const [quantity, setQuantity] = useState<string | any>();
  const [width, setWidth] = useState<string | any>("");
  const [height, setHeight] = useState<string | any>("");
  const [length, setLength] = useState<string | any>("");
  const [attributes, setAttributes] = useState<any[]>([
    {
      attributeId: "",
      values: [],
    },
  ]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const group = watch("group");
  const [errorImage, setErrorImage] = useState<string>("");
  const navigate = useNavigate();
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
    if (allTags) {
      const data: any[] = [];
      allTags.forEach((tag: any) => {
        data.push({
          value: tag.id,
          label: tag.name,
        });
      });
      setOptions3(data);
    }
  }, [allTags]);
  const onSubmit = (data: any) => {
    if (feature.length === 0) setErrorImage("Must choose Featured Image");
    else if (gallery.length === 0) setErrorImage("Must choose Gallery");
    else if (type === "simple" && (!price || !salePrice || !quantity))
      setErrorImage("Must type Simple product Information");
    else {
      let flag = true;
      attributes.forEach((attribute) => {
        if (attribute.attributeId === "" || attribute.values.length === 0)
          flag = false;
      });
      if ((!flag || !price || !salePrice || !quantity) && type === "variable") {
        setErrorImage("Must type Variable product Information");
      } else {
        setErrorImage("");
        dispatch(
          themeSlice.actions.showBackdrop({
            isShow: true,
            content: "",
          })
        );
        const dataCategories = [] as any[];
        const dataTags = [] as any[];
        categories.forEach((category) => dataCategories.push(category.value));
        tags.forEach((tag) => dataTags.push(tag.value));
        const simple = {
          price: price ? parseFloat(price) : 0,
          salePrice: salePrice ? parseFloat(salePrice) : 0,
          quantity: quantity ? parseInt(quantity) : 0,
          width: width ? parseInt(width) : 0,
          height: height ? parseInt(height) : 0,
          length: length ? parseInt(length) : 0,
        };
        const product = {
          name_en: data.name_en,
          name_vi: data.name_vi,
          unit: data.unit,
          description: data.description,
          status: status,
          groupId: group,
          categories: dataCategories,
          tags: dataTags,
          type: type,
          simple: type === "simple" ? simple : {},
          variable:
            type === "variable"
              ? {
                  price: price ? parseFloat(price) : 0,
                  salePrice: salePrice ? parseFloat(salePrice) : 0,
                  quantity: quantity ? parseInt(quantity) : 0,
                  attributes,
                }
              : {},
        };
        saveProduct(product);
        console.log("product", product);
      }
    }
  };
  const saveProduct = async (product: any) => {
    try {
      const data: any[] = [];
      const featureUrl = await saveImage("products", feature[0]);
      gallery.forEach(async (file) => {
        const url = await saveImage("groups", file);
        data.push(url);
        if (data.length === gallery.length) {
          const body = {
            ...product,
            galleries: data,
            featureImage: featureUrl,
          };
          const result = await createProduct({}, body, {});
          if (result) {
            // dispatch(groupSlice.actions.addGroup(result));
            dispatch(
              themeSlice.actions.hideBackdrop({
                isShow: false,
                content: "",
              })
            );
            dispatch(
              themeSlice.actions.showToast({
                content: "Successfully create product",
                type: "success",
              })
            );
            navigate("/products");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChooseGroup = (value: any) => {
    if (value) {
      setValue("group", `${value.value}`);
      handleGetCategoriesByGroup(value.value);
    } else {
      setValue("group", ``);
      setCategories([]);
      //   setOptions2([]);
    }
  };
  const handleGetCategoriesByGroup = async (id: string) => {
    const result = await getAllCategoriesByGroup({}, {}, {}, id);
    if (result) {
      const options = [] as any[];
      result.forEach((category: any) => {
        options.push({
          value: category.id,
          label: category.name_en,
        });
      });
      setOptions2(options);
    } else {
      console.log("cc");
    }
  };
  const handleChooseCategory = (value: any) => {
    if (value.length > 0) {
      setValue("category", "ok");
      setCategories(value);
    } else {
      setCategories([]);
      setValue(`category`, "");
    }
  };
  const handleChooseTag = (value: any) => {
    if (value.length > 0) {
      setValue("tag", "ok");
      setTags(value);
    } else {
      setTags([]);
      setValue(`tag`, "");
    }
  };
  const handleChooseStatus = (status: string) => {
    setStatus(status);
  };
  const handleChooseType = (value: any) => {
    setType(value.value);
    setErrorImage("");
    if (value.value === "variable") {
      setPrice("");
      setSalePrice("");
      setQuantity("");
      setWidth("");
      setHeight("");
      setLength("");
      setAttributes([
        {
          attributeId: "",
          values: [],
        },
      ]);
    }
  };
  const handleAddOption = () => {
    setAttributes((prevState) => [
      ...prevState,
      {
        attributeId: "",
        values: [],
      },
    ]);
  };
  const handleDeleteOption = (index: number) => {
    const newState = [];
    for (let i = 0; i < attributes.length; i++) {
      if (index !== i) {
        newState.push({
          ...attributes[i],
        });
      }
    }
    setAttributes(newState);
  };
  const handleChooseName = (value: any, index: number) => {
    const newState = [];
    for (let i = 0; i < attributes.length; i++) {
      if (index !== i) {
        newState.push({
          ...attributes[i],
        });
      } else {
        newState.push({
          attributeId: value.value,
          values: [],
        });
      }
    }
    setAttributes(newState);
  };
  const handleChooseValues = (values: any[], index: number) => {
    const newState = [];
    for (let i = 0; i < attributes.length; i++) {
      if (index !== i) {
        newState.push({
          ...attributes[i],
        });
      } else {
        newState.push({
          ...attributes[i],
          values: values,
        });
      }
    }
    setAttributes(newState);
  };
  const onChooseGallery = (e: any) => {
    const data = [];
    for (let i = 0; i < e.target.files.length; i++) {
      data.push(e.target.files[i]);
    }
    setGallery(data);
  };
  const handleDeleteFeature = (position: number) => {
    setFeature([]);
  };
  const onChooseFeature = (e: any) => {
    setFeature([e.target.files[0]]);
  };
  const handleDeleteGallery = (position: number) => {
    setGallery((prevState) =>
      prevState.filter((file, index) => index !== position)
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font20 font_family_bold mt-2">Create New Product</div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row p-0 m-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Featured Image</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Upload your product featured image here
            </div>
          </div>
          <div className="col-12 col-lg-8 box_shadow_card bg_white border_radius_5 p-4 w100_per">
            <div
              onClick={() => chooseFeatureRef.current?.click()}
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
              {feature.map((item: any, index: any) => (
                <BaseFileChosen
                  file={true}
                  close={handleDeleteFeature}
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
            <div className="font18 font_family_bold">Gallery</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Upload your product image gallery here
            </div>
          </div>
          <div className="col-12 col-lg-8 box_shadow_card bg_white border_radius_5 p-4 w100_per">
            <div
              onClick={() => chooseGalleryRef.current?.click()}
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
              {gallery.map((item: any, index: any) => (
                <BaseFileChosen
                  file={true}
                  close={handleDeleteGallery}
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
            <div className="font18 font_family_bold">Group & Categories</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Select product group and categories from here
            </div>
          </div>
          <div className="col-12 col-lg-8 box_shadow_card bg_white border_radius_5 p-4 w100_per">
            <div className="font_family_bold_italic font14">Group</div>
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
              Categories
            </div>
            <Select
              value={categories}
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
              isDisabled={!group}
              placeholder="Choose Categories"
              isMulti
              onChange={(value) => handleChooseCategory(value)}
              options={options2}
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.category?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">Tags</div>
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
              isMulti
              isClearable
              placeholder="Choose Tags"
              onChange={(value) => handleChooseTag(value)}
              options={options3}
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.tag?.message}
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
              placeholder="Type name English"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.name_vi?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">Unit</div>
            <input
              {...register("unit")}
              className="mt-2 h40_px w100_per"
              placeholder="Type Unit"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.unit?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Description
            </div>
            <textarea
              placeholder="Type description"
              {...register("description")}
              className="mt-2 w100_per"
              rows={5}
            />
            <div className="font_family_bold_italic font14 mt-4">Status</div>
            <div className="mt-2 d-flex align-items-center">
              <input
                checked={status === "public"}
                id="test"
                onClick={() => handleChooseStatus("public")}
                className="icon20x20 cursor_pointer"
                type="radio"
              />
              <span className="ml_10px font14 font_family_italic">Public</span>
            </div>
            <div className="mt-2 d-flex align-items-center">
              <input
                checked={status === "draft"}
                id="test"
                onClick={() => handleChooseStatus("draft")}
                className="icon20x20 cursor_pointer"
                type="radio"
              />
              <span className="ml_10px font14 font_family_italic">Draft</span>
            </div>
          </div>
        </div>
        <div className="row p-0 m-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Product Type</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Select product type form here
            </div>
          </div>
          <div className="col-12 col-lg-8 box_shadow_card bg_white border_radius_5 p-4 w100_per">
            <div className="font_family_bold_italic font14 mt-4">Tags</div>
            <Select
              value={options4.filter((option) => option.value === type)}
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
              onChange={(value) => handleChooseType(value)}
              options={options4}
            />
          </div>
        </div>
        <div className="my-4 divider_vertical_dashed"></div>
        {type === "simple" ? (
          <div className="row p-0 m-0 mt-4">
            <div className="col-12 col-lg-4 mt-2">
              <div className="font18 font_family_bold">
                Simple Product Information
              </div>
              <div className="font14 font_family_regular mt-2 color_888">
                Edit your simple product description and necessary information
                from here
              </div>
            </div>
            <div className="col-12 col-lg-8 box_shadow_card bg_white border_radius_5 p-4 w100_per">
              <div className="font_family_bold_italic font14">Price* (USD)</div>
              <input
                onChange={(e) => setPrice(e.target.value)}
                className="mt-2 h40_px w100_per"
                placeholder="Type price"
                type="text"
              />
              <div className="font_family_bold_italic font14 mt-4">
                Sale Price* (USD)
              </div>
              <input
                onChange={(e) => setSalePrice(e.target.value)}
                className="mt-2 h40_px w100_per"
                placeholder="Type sale price"
                type="text"
              />
              <div className="font_family_bold_italic font14 mt-4">
                Quantity*
              </div>
              <input
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-2 h40_px w100_per"
                placeholder="Type quantity"
                type="text"
              />
              <div className="font_family_bold_italic font14 mt-4">Width</div>
              <input
                onChange={(e) => setWidth(e.target.value)}
                className="mt-2 h40_px w100_per"
                placeholder="Type width"
                type="text"
              />
              <div className="font_family_bold_italic font14 mt-4">Height</div>
              <input
                onChange={(e) => setHeight(e.target.value)}
                className="mt-2 h40_px w100_per"
                placeholder="Type height"
                type="text"
              />
              <div className="font_family_bold_italic font14 mt-4">Length</div>
              <input
                onChange={(e) => setLength(e.target.value)}
                className="mt-2 h40_px w100_per"
                placeholder="Type length"
                type="text"
              />
            </div>
          </div>
        ) : (
          <div className="row p-0 m-0 mt-4">
            <div className="col-12 col-lg-4 mt-2">
              <div className="font18 font_family_bold">
                Product Variation Information
              </div>
              <div className="font14 font_family_regular mt-2 color_888">
                Update your product variation and necessary information from
                here
              </div>
            </div>
            <div className="col-12 col-lg-8 box_shadow_card bg_white border_radius_5 p-4 w100_per">
              <div className="text-center font20 font_family_bold_italic">
                OPTION
              </div>
              {attributes.map((item, index) => (
                <Option
                  handleChooseValues={handleChooseValues}
                  handleChooseName={handleChooseName}
                  attributeChosen={attributes}
                  handleDeleteOption={handleDeleteOption}
                  key={index}
                  index={index}
                  option={item}
                />
              ))}
              {attributes.length !== allAttributes.length && (
                <button
                  onClick={handleAddOption}
                  type="button"
                  className="btn bg_primary font14 font_family_bold color_white mt-4"
                >
                  Add a Option
                </button>
              )}
              <div className="font_family_bold_italic font14 mt-4">
                Price* (USD)
              </div>
              <input
                onChange={(e) => setPrice(e.target.value)}
                className="mt-2 h40_px w100_per"
                placeholder="Type price"
                type="text"
              />
              <div className="font_family_bold_italic font14 mt-4">
                Sale Price* (USD)
              </div>
              <input
                onChange={(e) => setSalePrice(e.target.value)}
                className="mt-2 h40_px w100_per"
                placeholder="Type sale price"
                type="text"
              />
              <div className="font_family_bold_italic font14 mt-4">
                Quantity*
              </div>
              <input
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-2 h40_px w100_per"
                placeholder="Type quantity"
                type="text"
              />
            </div>
          </div>
        )}
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
        ref={chooseFeatureRef}
        type="file"
        onClick={(e: any) => {
          e.target.value = null;
        }}
        accept=".png, .jpg"
        onChange={onChooseFeature}
      />
      <input
        hidden
        ref={chooseGalleryRef}
        type="file"
        onClick={(e: any) => {
          e.target.value = null;
        }}
        multiple
        accept=".png, .jpg"
        onChange={onChooseGallery}
      />
    </>
  );
}

export default React.memo(CreateProduct);
