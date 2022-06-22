import React, { useEffect, useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Icon } from '@iconify/react';
import BaseFileChosen from '../base/BaseFileChosen';
import { useSelector } from 'react-redux';
import { settingSelector } from '../redux/slices/settingSlice';
import { SettingType } from '../interfaces';
import Select from 'react-select';
import BaseSwitch from '../base/BaseSwitch';

const schema = yup.object({
    title: yup.string().required("Title is required"),
    subTitle: yup.string().required("Sub title English is required"),
    currency: yup.string().required("Currency is required"),
    minimumOrderAmount: yup.number().required("Minimum Order Amount is required"),
    metaTitle: yup.string().required("Meta Title is required").default("test"),
    metaDescription: yup.string().required("Meta Description is required").default("test"),
    metaTags: yup.string().required("Meta Tags is required").default("test"),
    canonicalUrl: yup.string().required("Canonical URL is required").default("test"),
    ogTitle: yup.string().required("OG Title is required").default("test"),
    ogDescription: yup.string().required("OG Description is required").default("test"),
    city: yup.string().required("City is required"),
    district: yup.string().required("District is required"),
    ward: yup.string().required("Ward is required"),
    street: yup.string().required("Street is required"),
    phone: yup.string().required("Phone is required"),
});
const options = [
    {
        value: "vnd",
        label: "Vietnamese Dong"
    },
    {
        value: "usd",
        label: "US Dollar"
    }
]
function Setting() {
    const chooseLogoRef = useRef<HTMLInputElement>(null);
    const settingSelect = useSelector(settingSelector);
    const [setting, setSetting] = useState<SettingType>();
    const [checkout, setCheckout] = useState<boolean>(false)
    const [logo, setLogo] = useState<any[]>([]);
    const [otp, setOtp] = useState<boolean>(false)
    const [errorImage, setErrorImage] = useState<string>('');
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
        } else {
            setSetting(settingSelect);
            setValue("currency", "vnd");
            setValue("minimumOrderAmount", 0)
        }
    }, [settingSelect])
    const onSubmit = (data: any) => console.log(data);
    const handleDeleteLogo = (position: number) => {
        setLogo([])
    }
    const onChooseLogo = (e: any) => {
        setLogo([e.target.files[0]])
    }
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
                        <div className="font_family_bold_italic font14">
                            Site Title
                        </div>
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
                            {...register("title")}
                            placeholder="Type Site Subtitle"
                            type="text"
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.title?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">
                            Currency
                        </div>
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
                            Use OTP at checkout
                            Enable
                        </div>
                        <div className='mt-2'>
                            <BaseSwitch checked={otp} handleOn={() => setOtp(true)} handleOff={() => setOtp(false)} />
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
                        <div className="font_family_bold_italic font14">
                            Meta Title
                        </div>
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
                        <textarea className="mt-2 w100_per"
                            {...register("metaDescription")}
                            rows={5}
                            placeholder="Type  Meta Description">
                        </textarea>
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.metaDescription?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">
                            Meta Tags
                        </div>
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
                        <div className="font_family_bold_italic font14 mt-4">
                            OG Title
                        </div>
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
                        <textarea className="mt-2 w100_per"
                            {...register("ogDescription")}
                            rows={5}
                            placeholder="Type OG Description">
                        </textarea>
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.ogDescription?.message}
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
        </>
    )
}

export default Setting