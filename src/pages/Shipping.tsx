import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteShipping } from '../apis'
import BaseTableShipping from '../base/BaseTableShipping'
import BoxSearchShipping from '../components/order/BoxSearchShipping'
import { ShippingType } from '../interfaces'
import orderSlice, { allShippingsSelector } from '../redux/slices/orderSlice'
import themeSlice from '../redux/slices/themeSlice'
import { AppDispatch } from '../redux/store'
import alert2 from '../utils/Sweetalert2'

function Shipping() {
    const allShippings = useSelector(allShippingsSelector);
    const [shippings, setShippings] = useState<Array<ShippingType>>([]);
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    useEffect(() => {
        if (allShippings) setShippings(allShippings)
    }, [allShippings]);
    const handleDelete = (shipping: ShippingType) => {
        const handleConfirm = async () => {
            dispatch(
                themeSlice.actions.showBackdrop({
                    isShow: true,
                    content: "",
                })
            );
            const result = await deleteShipping({}, {}, {}, shipping.id);
            if (result) {
                dispatch(orderSlice.actions.deleteShipping(shipping));
                dispatch(
                    themeSlice.actions.hideBackdrop({
                        isShow: false,
                        content: "",
                    })
                );
                dispatch(themeSlice.actions.showToast({
                    type: "success",
                    content: "Successfully delete shipping"
                }))
            }
        };
        alert2(
            "Delete",
            "question",
            true,
            "Delete",
            "#f55858",
            true,
            "Cancel",
            "#000",
            "Delete",
            "Are you sure, you want to delete?",
            handleConfirm
        );
    }
    const handleUpdate = (name: string) => {
        navigate(`/shippings/${name}`)
    }
    const handleFilter = (text: string) => {
        if (text) {
            setShippings(allShippings.filter((shipping: any) => shipping.name.toLowerCase().includes(text.toLowerCase())))
        } else {
            setShippings(allShippings)
        }
    }
    return (
        <>
            <BoxSearchShipping handleFilter={handleFilter} />
            <BaseTableShipping data={shippings} handleDelete={handleDelete} handleUpdate={handleUpdate} />
        </>
    )
}

export default Shipping