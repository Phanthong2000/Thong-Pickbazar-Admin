import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import { useNavigate, useParams } from 'react-router-dom'
import { getUserById } from '../apis/user';
import { UserType } from '../interfaces';
import themeSlice from '../redux/slices/themeSlice';
import { AppDispatch } from '../redux/store';
import { Icon } from '@iconify/react';
import moment from 'moment';
import BaseFileChosen from '../base/BaseFileChosen';

const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required"),
    phone: yup.string().required("Phone is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    city: yup.string().required("City is required"),
    district: yup.string().required("District is required"),
    ward: yup.string().required("Ward is required"),
    street: yup.string().required("Street is required"),
});
function UpdateUser() {
    const { id } = useParams();
    const chooseAvatarRef = useRef<HTMLInputElement>(null)
    const [user, setUser] = useState<UserType>();
    const [birthday, setBirthday] = useState<any>();
    const [avatar, setAvatar] = useState<any[]>([]);
    const [newAvatar, setNewAvatar] = useState<any[]>([])
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
    const getUser = async (id: string) => {
        try {
            const result = await getUserById({}, {}, {}, id);
            if (result) {
                setUser(result);
                setValue("name", result.name);
                setValue("email", result.email);
                setValue("phone", result.phone);
                setBirthday(result.birthday);
                setAvatar([result.avatar])
            } else {
                navigate("/users");
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (id) {
            getUser(id)
        }
    }, [id]);
    const onSubmit = (data: any) => {
        console.log(data)
    }
    const handleDeleteAvatar = (position: number) => {
        setAvatar([])
    }
    const handleDeleteNewAvatar = (position: number) => {
        setNewAvatar([])
    }
    const onChooseAvatar = (e: any) => {
        const file = e.target.files[0];
        setNewAvatar([file]);
        setAvatar([])
    };
    if (!user) return null;
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="font20 font_family_bold mt-2">Update User</div>
                <div className="my-4 divider_vertical_dashed"></div>
                <div className="row p-0 m-0 mt-4">
                    <div className="col-12 col-lg-4 mt-2">
                        <div className="font18 font_family_bold">Information</div>
                        <div className="font14 font_family_regular mt-2 color_888">
                            Add user's basic information
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
                        <div className="font_family_bold_italic font14 mt-4">Email</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            {...register("email")}
                            placeholder="Type email"
                            type="text"
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.email?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Phone</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            {...register("phone")}
                            placeholder="Type phone"
                            type="text"
                        />
                        <div className="mt-2 font12 ml_5px color_red font_family_italic">
                            {errors.phone?.message}
                        </div>
                        <div className="font_family_bold_italic font14 mt-4">Date of birth</div>
                        <DatePicker
                            maxDate={new Date()}
                            customInput={<input
                                className="mt-2 h40_px w100_per"
                                placeholder="Type phone"
                                type="text"
                            />}
                            selected={new Date(birthday)}
                            dateFormat="dd/MM/yyyy"
                            onChange={(newValue: Date) => {
                                setBirthday(newValue);
                            }}
                        />
                        <div className="font_family_bold_italic font14 mt-4">Avatar</div>
                        <div
                            onClick={() => chooseAvatarRef.current?.click()}
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
                            {avatar.map((item: any, index: any) => (
                                <BaseFileChosen
                                    file={false}
                                    close={handleDeleteAvatar}
                                    index={index}
                                    key={index}
                                    image={item}
                                />
                            ))}
                            {newAvatar.map((item: any, index: any) => (
                                <BaseFileChosen
                                    file={true}
                                    close={handleDeleteNewAvatar}
                                    index={index}
                                    key={index}
                                    image={item}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </form>
            <input
                hidden
                ref={chooseAvatarRef}
                type="file"
                onClick={(e: any) => {
                    e.target.value = null;
                }}
                accept=".png, .jpg"
                onChange={onChooseAvatar}
            />
        </>
    )
}

export default UpdateUser