import { Icon } from '@iconify/react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function CreateGroup() {
    const [icon, setIcon] = useState<string>('')
    const {
        register,
        handleSubmit,
        watch,
        getFieldState,

        formState: { errors }
    } = useForm();
    const onSubmit = (data: any) => {
        console.log(data);
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='font20 font_family_bold mt-2'>Create New Group</div>
                <div className='my-4 divider_vertical_dashed'>
                </div>
                <div className='row p-0 m-0 mt-4'>
                    <div className='col-12 col-lg-4 mt-2'>
                        <div className='font18 font_family_bold'>Description</div>
                        <div className='font14 font_family_regular mt-2 color_888'>Add type-description-help-text</div>
                    </div>
                    <div className='col-12 col-lg-8 bg_white box_shadow_card border_radius_5 p-4'>
                        <div className='font_family_bold_italic font14'>Name</div>
                        <input className='mt-2 h40_px w100_per' {...register("name", { required: true })} placeholder='Type name' type="text" />
                        {errors.name && <div className='mt-2 font12 ml_5px color_red'>Name is required</div>}
                        <div className='font_family_bold_italic font14 mt-4 font_family_italic'>Icon</div>
                        <div className='d-flex'>
                            <div className='w100_per'>
                                <input className='mt-2 h40_px w100_per' {...register("icon", { required: true })} placeholder='Type icon' type="text" />
                                {errors.icon && <div className='mt-2 font12 ml_5px color_red font_family_italic'>Icon is required</div>}
                            </div>
                            <Icon icon={icon} />
                        </div>
                    </div>
                </div>
                <div className='my-4 divider_vertical_dashed'>
                </div>
                <div className='row m-0 p-0 mt-4'>
                    <div className='col-12 col-lg-4 mt-2'>
                        <div className='font18 font_family_bold'>Promotional Sliders</div>
                        <div className='font14 font_family_regular mt-2 color_888'>Upload Promotional Sliders</div>
                    </div>
                    <div className='col-12 col-lg-8 box_shadow_card bg_white border_radius_5 p-4 w100_per'>
                        <div className='choose_image_large py-2 d-flex align-items-center flex-column'>
                            <Icon className='color_888 icon30x30' icon="bi:cloud-arrow-up-fill" />
                            <div className='font_family_regular'><span className='color_primary'>Upload an image</span> or drag and drop</div>
                        </div>
                    </div>
                </div>
                <div className='mt-4 d-flex justify-content-end'>
                    <button type='submit' className='btn bg_primary font14 font_family_bold color_white'>Add Group</button>
                </div>
            </form>

        </>
    )
}

export default CreateGroup