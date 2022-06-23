import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icon } from "@iconify/react";
import BaseFileChosen from "../base/BaseFileChosen";
import { useDispatch, useSelector } from "react-redux";
import { settingSelector } from "../redux/slices/settingSlice";
import { SettingType } from "../interfaces";
import Select from "react-select";
import BaseSwitch from "../base/BaseSwitch";
import ScheduleInput from "../components/setting/ScheduleInput";
import SocialInput from "../components/setting/SocialInput";
import { saveImage } from "../utils/firebase";
import { createSetting, updateSettingApi } from "../apis/setting";
import { AppDispatch } from "../redux/store";
import themeSlice from "../redux/slices/themeSlice";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  subTitle: yup.string().required("Sub title English is required"),
  currency: yup.string().required("Currency is required"),
  minimumOrderAmount: yup.number().required("Minimum Order Amount is required"),
  metaTitle: yup.string().required("Meta Title is required").default("test"),
  metaDescription: yup
    .string()
    .required("Meta Description is required")
    .default("test"),
  metaTags: yup.string().required("Meta Tags is required").default("test"),
  canonicalUrl: yup
    .string()
    .required("Canonical URL is required")
    .default("test"),
  ogTitle: yup.string().required("OG Title is required").default("test"),
  ogDescription: yup
    .string()
    .required("OG Description is required")
    .default("test"),
  twitterHandle: yup
    .string()
    .required("Twitter Handle is required")
    .default("test"),
  twitterCardType: yup
    .string()
    .required("Twitter Card Type is required")
    .default("test"),
  address: yup.string().required("Address is required"),
  website: yup.string().required("Website is required"),
  phone: yup.string().required("Phone is required"),
});
const options = [
  {
    value: "vnd",
    label: "Vietnamese Dong",
  },
  {
    value: "usd",
    label: "US Dollar",
  },
];
type SocialType = {
  value: {
    icon: string;
    name: string;
  };
  label: any;
  url?: string;
};
function Setting() {
  const chooseLogoRef = useRef<HTMLInputElement>(null);
  const chooseOGImageRef = useRef<HTMLInputElement>(null);
  const settingSelect = useSelector(settingSelector);
  const [setting, setSetting] = useState<SettingType | any>();
  const [checkout, setCheckout] = useState<boolean>(false);
  const [logo, setLogo] = useState<any[]>([]);
  const [ogImage, setOGImage] = useState<any[]>([]);
  const [otp, setOtp] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [socials, setSocials] = useState<Array<SocialType>>([]);
  const [errorImage, setErrorImage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const currency = watch("currency");
  useEffect(() => {
    if (settingSelect) {
      setSetting(settingSelect);
      setLogo([settingSelect.logo]);
      setOGImage([settingSelect.seo.ogImage]);
      setValue("title", settingSelect.title);
      setValue("subTitle", settingSelect.subTitle);
      setValue("currency", settingSelect.currency);
      setValue("minimumOrderAmount", settingSelect.minimumOrderAmount);
      setOtp(settingSelect.otpCheckOut);
      setValue("metaTitle", settingSelect.seo.metaTitle);
      setValue("metaDescription", settingSelect.seo.metaDescription);
      setValue("metaTags", settingSelect.seo.metaTags);
      setValue("canonicalUrl", settingSelect.seo.canonicalUrl);
      setValue("ogTitle", settingSelect.seo.ogTitle);
      setValue("ogDescription", settingSelect.seo.metaTitle);
      setValue("twitterHandle", settingSelect.seo.twitterHandle);
      setValue("twitterCardType", settingSelect.seo.twitterCardType);
      setSchedule(settingSelect.deliverySchedule);
      setValue("address", settingSelect.shop.address);
      setValue("phone", settingSelect.shop.phone);
      setValue("website", settingSelect.shop.website);
      const data: any[] = [];
      settingSelect.shop.social.forEach((item: any) => {
        data.push({
          label: "",
          value: {
            icon: item.icon,
            name: item.name,
          },
          url: item.url,
        });
      });
      setSocials(data);
    } else {
      setSetting(settingSelect);
      setValue("currency", "vnd");
      setValue("minimumOrderAmount", 0);
      setSchedule([
        {
          title: "",
          description: "",
        },
      ]);
      setSocials([
        {
          label: "",
          value: {
            icon: "",
            name: "",
          },
          url: "https://",
        },
      ]);
    }
  }, [settingSelect]);
  const onSubmit = (data: any) => {
    let flagSchedule = true;
    let flagSocial = true;
    schedule.forEach((item) => {
      if (item.title === "" || item.description === "") flagSchedule = false;
    });
    socials.forEach((item) => {
      if (item.value.icon === "" || item.url?.replace("https://", "") === "")
        flagSocial = false;
    });
    if (logo.length === 0) setErrorImage("Must choose Logo");
    else if (ogImage.length === 0) setErrorImage("Must choose OG Image");
    else if (!flagSchedule) setErrorImage("Must type Delivery Schedule");
    else if (!flagSocial) setErrorImage("Select social platform");
    else {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const newSocials: any = [];
      socials.forEach((item) => {
        newSocials.push({
          icon: item.value.icon,
          name: item.value.name,
          url: item.url,
        });
      });
      const newSetting = {
        logo: "",
        title: data.title,
        subTitle: data.subTitle,
        currency: data.currency,
        minimumOrderAmount: data.minimumOrderAmount,
        otpCheckOut: otp,
        seo: {
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          metaTags: data.metaTags,
          canonicalUrl: data.canonicalUrl,
          ogTitle: data.ogTitle,
          ogDescription: data.ogDescription,
          twitterHandle: data.twitterHandle,
          twitterCardType: data.twitterCardType,
        },
        deliverySchedule: schedule,
        shop: {
          address: data.address,
          phone: data.phone,
          website: data.website,
          social: newSocials,
        },
      };
      if (setting) {
        updateSetting(newSetting);
      } else {
        saveSetting(newSetting);
      }
    }
  };
  const saveSetting = async (setting: any) => {
    try {
      const logoUrl = await saveImage("setting", logo[0]);
      const ogImageUrl = await saveImage("setting", ogImage[0]);
      const body = {
        ...setting,
        logo: logoUrl,
        seo: {
          ...setting.seo,
          ogImage: ogImageUrl,
        },
      };
      const result = await createSetting({}, body, {});
      if (result) {
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            content: "Successfully update Setting",
            type: "success",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateSetting = async (newSetting: any) => {
    try {
      let logoUrl = logo[0];
      if (logoUrl !== setting?.logo)
        logoUrl = await saveImage("setting", logo[0]);
      let ogImageUrl = ogImage[0];
      if (ogImageUrl !== setting?.seo?.ogImage)
        ogImageUrl = await saveImage("setting", ogImage[0]);
      console.log("logoUrl", logoUrl);
      console.log("newSetting.logo", setting?.logo);
      console.log("ogImageUrl", ogImageUrl);
      console.log("setting.shop.ogImage", setting?.seo?.ogImage);
      const body = {
        ...newSetting,
        logo: logoUrl,
        seo: {
          ...newSetting.seo,
          ogImage: ogImageUrl,
        },
      };
      const result = await updateSettingApi({}, body, {});
      if (result) {
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            content: "Successfully update Setting",
            type: "success",
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteLogo = (position: number) => {
    setLogo([]);
  };
  const onChooseLogo = (e: any) => {
    setLogo([e.target.files[0]]);
  };
  const handleDeleteOGImage = (position: number) => {
    setOGImage([]);
  };
  const onChooseOGImage = (e: any) => {
    setOGImage([e.target.files[0]]);
  };
  const handleChangeSchedule = (
    title: string,
    description: string,
    position: number
  ) => {
    const newData: any[] = [];
    schedule.forEach((item, index) => {
      if (index === position) {
        newData.push({
          title,
          description,
        });
      } else {
        newData.push({
          ...schedule.at(index),
        });
      }
    });
    setSchedule(newData);
  };
  const handleDeleteSchedule = (position: number) => {
    setSchedule((prevState) =>
      prevState.filter((item, index) => index !== position)
    );
  };
  const handleAddSchedule = () => {
    setSchedule((prevState) => [
      ...prevState,
      {
        title: "",
        description: "",
      },
    ]);
  };
  const handleChooseSocial = (value: any, position: number) => {
    const newData: Array<SocialType | any> = [];
    socials.forEach((item, index) => {
      if (index === position) {
        newData.push({
          ...socials.at(index),
          value: value.value,
        });
      } else {
        newData.push(socials.at(index));
      }
    });
    setSocials(newData);
  };
  const handleDeleteSocial = (position: number) => {
    setSocials((prevState) =>
      prevState.filter((item, index) => index !== position)
    );
  };
  const handleAddSocial = () => {
    console.log(socials);
    setSocials((prevState) => [
      ...prevState,
      {
        label: "",
        value: {
          icon: "",
          name: "",
        },
        url: "https://",
      },
    ]);
  };
  const handleChangeSocialUrl = (url: string, position: number) => {
    const newData: Array<SocialType | any> = [];
    socials.forEach((item, index) => {
      if (index === position) {
        newData.push({
          ...socials.at(index),
          url,
        });
      } else {
        newData.push(socials.at(index));
      }
    });
    setSocials(newData);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="font20 font_family_bold mt-2">Setting</div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row p-0 m-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Logo</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Upload your site logo from here.
            </div>
          </div>
          <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
            <div
              onClick={() => chooseLogoRef.current?.click()}
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
              {logo.map((item: any, index: any) => (
                <BaseFileChosen
                  file={true}
                  close={handleDeleteLogo}
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
            <div className="font18 font_family_bold">Information</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Change your site information from here
            </div>
          </div>
          <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
            <div className="font_family_bold_italic font14">Site Title</div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("title")}
              placeholder="Type Site Title"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.title?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Site Subtitle
            </div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("subTitle")}
              placeholder="Type Site Subtitle"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.subTitle?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">Currency</div>
            <Select
              value={options.filter((option: any) => option.value === currency)}
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
              placeholder="Choose Group"
              onChange={(value) => setValue("currency", value?.value)}
              options={options}
            />
            <div className="font_family_bold_italic font14 mt-4">
              Minimum Order Amount
            </div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("minimumOrderAmount")}
              placeholder="Type Minimum Order Amount"
              type="number"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.minimumOrderAmount?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Use OTP at checkout Enable
            </div>
            <div className="mt-2">
              <BaseSwitch
                checked={otp}
                handleOn={() => setOtp(true)}
                handleOff={() => setOtp(false)}
              />
            </div>
          </div>
        </div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row p-0 m-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">SEO</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Change your site SEO from here
            </div>
          </div>
          <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
            <div className="font_family_bold_italic font14">Meta Title</div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("metaTitle")}
              placeholder="Type  Meta Title"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.metaTitle?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Meta Description
            </div>
            <textarea
              className="mt-2 w100_per"
              {...register("metaDescription")}
              rows={5}
              placeholder="Type  Meta Description"
            ></textarea>
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.metaDescription?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">Meta Tags</div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("metaTags")}
              placeholder="Type  Meta Tags"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.metaTags?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Canonical URL
            </div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("canonicalUrl")}
              placeholder="Type Canonical URL"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.canonicalUrl?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">OG Title</div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("ogTitle")}
              placeholder="Type  OG Title"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.ogTitle?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              OG Description
            </div>
            <textarea
              className="mt-2 w100_per"
              {...register("ogDescription")}
              rows={5}
              placeholder="Type OG Description"
            ></textarea>
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.ogDescription?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">OG Image</div>
            <div
              onClick={() => chooseOGImageRef.current?.click()}
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
              {ogImage.map((item: any, index: any) => (
                <BaseFileChosen
                  file={true}
                  close={handleDeleteOGImage}
                  index={index}
                  key={index}
                  image={item}
                />
              ))}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Twitter Handle
            </div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("twitterHandle")}
              placeholder="Type Twitter Handle"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.twitterHandle?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Twitter Card Type
            </div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("twitterCardType")}
              placeholder="Type Twitter Card Type"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.twitterCardType?.message}
            </div>
          </div>
        </div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row p-0 m-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Delivery Schedule</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Add your delivery schedule time with proper description from here
            </div>
          </div>
          <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
            {schedule.map((item, index) => (
              <ScheduleInput
                description={item.description}
                title={item.title}
                index={index}
                key={index}
                handleChange={handleChangeSchedule}
                handleDelete={handleDeleteSchedule}
              />
            ))}
            <button
              onClick={handleAddSchedule}
              type="button"
              className="btn bg_primary font14 font_family_bold color_white mt-4"
            >
              Add Delivery Time
            </button>
          </div>
        </div>
        <div className="my-4 divider_vertical_dashed"></div>
        <div className="row p-0 m-0 mt-4">
          <div className="col-12 col-lg-4 mt-2">
            <div className="font18 font_family_bold">Shop Settings</div>
            <div className="font14 font_family_regular mt-2 color_888">
              Add your shop settings information from here
            </div>
          </div>
          <div className="col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4">
            <div className="font_family_bold_italic font14 mt-4">Address</div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("address")}
              placeholder="Type Address"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.address?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">
              Contact Number
            </div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("phone")}
              placeholder="Type Contact Number"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.phone?.message}
            </div>
            <div className="font_family_bold_italic font14 mt-4">Website</div>
            <input
              className="mt-2 h40_px w100_per"
              {...register("website")}
              placeholder="Type Website"
              type="text"
            />
            <div className="mt-2 font12 ml_5px color_red font_family_italic">
              {errors.website?.message}
            </div>
            {socials.map((item, index) => (
              <SocialInput
                index={index}
                url={item.url}
                value={item.value}
                handleChange={handleChangeSocialUrl}
                handleDelete={handleDeleteSocial}
                handleChooseSocial={handleChooseSocial}
                key={index}
              />
            ))}
            <button
              onClick={handleAddSocial}
              type="button"
              className="btn bg_primary font14 font_family_bold color_white mt-4"
            >
              Add Social
            </button>
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
            type="submit"
            className="btn bg_primary font14 font_family_bold color_white"
          >
            Save Setting
          </button>
        </div>
      </form>
      <input
        hidden
        ref={chooseLogoRef}
        type="file"
        onClick={(e: any) => {
          e.target.value = null;
        }}
        accept=".png, .jpg"
        onChange={onChooseLogo}
      />
      <input
        hidden
        ref={chooseOGImageRef}
        type="file"
        onClick={(e: any) => {
          e.target.value = null;
        }}
        accept=".png, .jpg"
        onChange={onChooseOGImage}
      />
    </>
  );
}

export default React.memo(Setting);
