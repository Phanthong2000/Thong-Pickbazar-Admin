import { Icon } from '@iconify/react';
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import BaseFileChosen from '../base/BaseFileChosen';
import { OrderType } from '../interfaces';
import orderSlice, { getApiAllOrders, getApiDashboard, stepOrderSelector } from '../redux/slices/orderSlice';
import { AppDispatch } from '../redux/store';
import { currencyFormat } from '../utils/format';
import { saveImage } from '../utils/firebase';
import { createOrder } from '../apis';
import themeSlice from '../redux/slices/themeSlice';
import { getApiAllProducts } from '../redux/slices/productSlice';

function ConfirmPayment() {
    const imageRef = useRef<HTMLInputElement>(null);
    const stepOrder = useSelector(stepOrderSelector);
    const [order, setOrder] = useState<OrderType | any>();
    const [image, setImage] = useState<any[]>([]);
    const [cart, setCart] = useState<any[]>([]);
    const [money, setMoney] = useState<string>('');
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        if (stepOrder !== 2) return navigate('/create-order');
        else {
            setOrder(JSON.parse(localStorage.getItem('order') || "{}"));
            setCart(JSON.parse(localStorage.getItem('cart') || "[]"))
        }
    }, []);
    const handleBackToCheckout = () => {
        dispatch(orderSlice.actions.setStepOrder(1));
        navigate('/create-order/checkout')
    }
    const handleDeleteImage = () => {
        setImage([])
    }
    const onChooseImage = (e: any) => {
        const file = e.target.files[0];
        setImage([file])
    };
    const getSubTotal = (): number => {
        let total = 0;
        cart.forEach((item) => (total += item.product.price * item.quantity));
        return total;
    };
    const getTax = (): number => {
        return (order.tax.rate * getSubTotal()) / 100;
    };
    const getDiscount = (): number => {
        if (order.amount === 0) return 0;
        else if (order.coupon?.type === 'vnd') return order.coupon.amount;
        return getSubTotal() * order.coupon.amount / 100;
    };
    const handleCreateOrder = async () => {
        try {
            dispatch(themeSlice.actions.showBackdrop({
                isShow: true,
                content: ""
            }));
            const products: any[] = [];
            const cart = JSON.parse(localStorage.getItem('cart') || "[]");
            cart.forEach((item: any) => {
                products.push({
                    id: item.product.id,
                    quantity: item.product.quantity - item.quantity,
                    type: item.product.type,
                })
            });
            let internetBankingImage = ''
            if (image.length > 0)
                internetBankingImage = await saveImage("orders", image[0]) as never;
            const body = {
                order: {
                    ...order,
                    internetBankingImage
                },
                products
            }
            const result = await createOrder({}, body, {});
            if (result) {
                dispatch(getApiDashboard())
                dispatch(getApiAllProducts());
                dispatch(getApiAllOrders());
                dispatch(themeSlice.actions.hideBackdrop({
                    isShow: false,
                    content: ""
                }));
                dispatch(themeSlice.actions.showToast({
                    content: "Successfully Create Order",
                    type: "success"
                }));
                localStorage.removeItem("cart");
                localStorage.removeItem("checkout")
                localStorage.removeItem("order")
                navigate("/orders");
            } else {
                console.log('error')
            }
        } catch (error) {
            console.log(error)
        }

    }
    if (!order || !cart) return null
    return (
        <>
            <div className='container'>
                <div className='row m-0 p-0'>
                    <div className='col-12 col-lg-8 px-2'>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='font18 font_family_bold_italic'>Confirm Payment</div>
                            <button onClick={handleBackToCheckout} className='btn color_red font16 font_family_bold m-0 p-0'>{'<'} Back</button>
                        </div>
                        <div className="bg_white box_shadow_card border_radius_3 p-4 mt-4">
                            <div className='d-flex align-items-center'>
                                <div className="icon25x25 border_radius_25 text-center bg_primary color_white font16 font_family_regular">
                                    1
                                </div>
                                <div className='font14 font_family_bold_italic ml_10px'>Type money</div>
                            </div>
                            <NumberFormat thousandSeparator value={money} placeholder="Type Money" onChange={(e: any) => setMoney(e.target.value)} className='w100_per h40_px mt-4' />
                        </div>
                        <div className="bg_white box_shadow_card border_radius_3 p-4 mt-4">
                            <div className='d-flex align-items-center'>
                                <div className="icon25x25 border_radius_25 text-center bg_primary color_white font16 font_family_regular">
                                    2
                                </div>
                                <div className='font14 font_family_bold_italic ml_10px'>Upload Image Payment</div>
                            </div>
                            <div
                                onClick={() => imageRef.current?.click()}
                                className="choose_image_large cursor_pointer py-2 d-flex align-items-center flex-column mt-4"
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
                    <div className='col-12 col-lg-4 px-2'>
                        <div className="text-center font18 font_family_bold mt-4">
                            Your Order
                        </div>
                        <div className="mt-4">
                            {cart.map((item, index) => (
                                <div className="d-flex align-items-center justify-content-between mt-2">
                                    <div>
                                        <span className="font16 font_family_bold">
                                            {item.quantity}
                                        </span>
                                        <span className="font14 font_family_regular color_888">
                                            {"  "}x {item.product.name} | {item.product.unit}
                                        </span>
                                    </div>
                                    <div>
                                        {currencyFormat(item.product.price * item.quantity)}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="divider_vertical_solid my-4"></div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="font14 font_family_regular color_888">
                                Subtotal
                            </div>
                            <div>{currencyFormat(getSubTotal())}</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                            <div className="font14 font_family_regular color_888">
                                Tax
                            </div>
                            <div>{currencyFormat(getTax())}</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                            <div className="font14 font_family_regular color_888">
                                Shipping
                            </div>
                            <div>{currencyFormat(order.shipping.fee)}</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                            <div className="font14 font_family_regular color_888">
                                Discount
                            </div>
                            <div>{currencyFormat(getDiscount())}</div>
                        </div>
                        <div className="divider_vertical_solid my-4"></div>
                        <div className="d-flex align-items-center justify-content-between mb-4">
                            <div className="font16 font_family_bold color_888">
                                Total
                            </div>
                            <div>{currencyFormat(order.total)}</div>
                        </div>
                        <button onClick={handleCreateOrder} type="submit" disabled={Boolean(!money || parseInt(money.replaceAll(',', "")) < order.total)} className='btn bg_primary mt-4 color_white font16 font_family_bold_italic d-block w100_per py-2'>Confirm</button>
                    </div>
                </div>
            </div>
            <input
                hidden
                ref={imageRef}
                type="file"
                onClick={(e: any) => {
                    e.target.value = null;
                }}
                accept=".png, .jpg"
                onChange={onChooseImage}
            />
        </>
    )
}

export default React.memo(ConfirmPayment);