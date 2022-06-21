import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom'
import { getShippingByName, updateShipping } from '../apis';
import { ShippingType } from '../interfaces';
import { AppDispatch } from '../redux/store';
import orderSlice from '../redux/slices/orderSlice';
import themeSlice from '../redux/slices/themeSlice';

const schema = yup.object({
    name: yup.string().required("Name is required"),
    fee: yup.string().required("Fee is required"),
});
function UpdateShipping() {
    const { name } = useParams();
    const [shipping, setShipping] = useState<ShippingType>();
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
    const getShipping = async (name: string) => {
        try {
            const result = await getShippingByName({}, {}, {}, name);
            if (result) {
                setShipping(result);
                setValue("name", result.name);
                setValue("fee", result.fee)
            } else {
                navigate('/shippings')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (name) getShipping(name)
    }, [name])
    const onSubmit = (data: any) => {
        dispatch(themeSlice.actions.showBackdrop({
            isShow: true,
            content: ""
        }));
        const newShipping = {
            id: shipping?.id,
            name: data.name,
            fee: data.fee
        }
        saveShipping(newShipping)
    }
    const saveShipping = async (shipping: any) => {
        try {
            const result = await updateShipping({}, shipping, {});
            if (result) {
                dispatch(orderSlice.actions.updateShipping(result));
                dispatch(themeSlice.actions.hideBackdrop({
                    isShow: false,
                    content: ""
                }));
                dispatch(themeSlice.actions.showToast({
                    content: "Successfully create Shipping",
                    type: "success"
                }));
                navigate("/shippings")
            }
        } catch (error) {
            console.log(error)
        }
    }
    if (!shipping) return null;
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="font20 font_family_bold mt-2">Update Shipping</div>
            <div className="my-4 divider_vertical_dashed"></div>
            <div className="row p-0 m-0 mt-4">
                <div className="col-12 col-lg-4 mt-2">
                    <div className="font18 font_family_bold">Description</div>
                    <div className="font14 font_family_regular mt-2 color_888">
                        Add your shipping description and necessary information from here
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
                    <div className="font_family_bold_italic font14 mt-4">Fee ($ per km)</div>
                    <input
                        className="mt-2 h40_px w100_per"
                        {...register("fee")}
                        step="any"
                        placeholder="Type fee"
                        type="number"
                    />
                    <div className="mt-2 font12 ml_5px color_red font_family_italic">
                        {errors.fee?.message}
                    </div>
                </div>
            </div>
            <div className="mt-4 d-flex justify-content-end">
                <button
                    type="submit"
                    className="btn bg_primary font14 font_family_bold color_white"
                >
                    Update Shipping
                </button>
            </div>
        </form>
    )
}

export default UpdateShipping