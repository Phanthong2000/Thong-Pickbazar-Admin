import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import Select from 'react-select';
import { Steps } from 'rsuite';
import styled from 'styled-components';
import { getOrderById } from '../apis';
import Avatar from '../components/Avatar';
import { OrderStatusType, OrderType, ProductType } from '../interfaces';
import { allOrderStatusesSelector } from '../redux/slices/orderSlice';
import { currencyFormat } from '../utils/format';

type Type =
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
const TableCell = styled.td`
  padding: 10px;
`;
const TableCellHead = styled.th`
  padding: 10px;
`;
function UpdateOrder() {
    const { id } = useParams();
    const orderStatuses = useSelector(allOrderStatusesSelector)
    const [order, setOrder] = useState<OrderType>();
    const [options, setOptions] = useState<any[]>([])
    const navigate = useNavigate();
    const getOrder = async (id: string) => {
        try {
            const result = await getOrderById({}, {}, {}, id);
            if (result) {
                setOrder(result)
            } else {
                navigate('/orders')
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        if (id) getOrder(id)
    }, [id])
    useEffect(() => {
        const data: any[] = [];
        orderStatuses.forEach((orderStatus: OrderStatusType) => {
            data.push({
                label: orderStatus?.name,
                value: orderStatus?.serial
            })
        })
        setOptions(data)
    }, []);
    const textAlign = (value: Type) => value;
    const header = [
        {
            name: "Products",
            width: "70%",
            textAlign: textAlign("left"),
        },
        {
            name: "Total",
            width: "30%",
            textAlign: textAlign("right"),
        },
    ];
    const getSubTotal = (): number => {
        let total = 0;
        order?.products.forEach((item: any) => {
            total += item.quantity * item.price
        })
        return total
    }
    if (!order) return null;
    return (
        <div className='p-4 bg_white box_shadow_card'>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-primary h40_px d-flex align-items-center font14 font_family_bold_italic'>
                    <Icon icon="bi:cloud-arrow-down-fill" className='icon20x20 mr_10px' />
                    Download invoice
                </button>
            </div>
            <div className='mt-4'>
                <div className='row m-0 p-0 d-flex align-items-center'>
                    <div className='col-12 col-lg-6 font18 font_family_bold'>
                        Order ID - {id}
                    </div>
                    <div className='col-12 col-lg-6'>
                        <div className='row m-0 p-0'>
                            <div className='col-12 col-lg-8'>
                                <Select
                                    styles={{
                                        control: (provided, state) => ({
                                            ...provided,
                                            height: "40px",
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
                                    placeholder="Choose Order Status"
                                    // onChange={(value) => handleChoosePaymentMethod(value)}
                                    options={options}
                                />
                            </div>
                            <div className='col-12 col-lg-4 d-flex justify-content-end'>
                                <button className='btn h40_px bg_primary color_white font14 font_family_bold_italic'>
                                    Change Status
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <Steps current={order.orderStatusOrder.serial} className='d-flex w100_per justify-content-between align-items-center flex-row step_order_status'>
                    {
                        orderStatuses.map((item: OrderStatusType, index: number) => <Steps.Item style={{ minWidth: '200px' }} className="font_family_bold" description={item.name} />)
                    }
                </Steps>
            </div>
            <div className='mt-4'>
                <table className="mt-4 w100_per bg_white box_shadow_card border_radius_3">
                    <thead className="bg_ddd">
                        <tr>
                            {header.map((item, index) => (
                                <TableCellHead
                                    key={index}
                                    className="font_family_regular font16"
                                    style={{
                                        width: item.width,
                                        textAlign: item.textAlign,
                                    }}
                                >
                                    {item.name}
                                </TableCellHead>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {order?.products.map((item: any, index: number) => (
                            <tr className="border_top_gray_1px" key={index}>
                                <TableCell
                                    style={{
                                        width: header.at(0)?.width,
                                        textAlign: header.at(0)?.textAlign,
                                    }}
                                >
                                    <div className='d-flex align-items-center'>
                                        <Avatar shape='rectangle' size={50} url={item.product.featureImage} />
                                        <div className='ml_10px font14 font_family_bold'>
                                            {item.product.name_en} x {item.quantity}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: header.at(1)?.width,
                                        textAlign: header.at(1)?.textAlign,
                                    }}
                                >
                                    {currencyFormat(item.quantity * item.price)}
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='mt-4'>
                <div className='row m-0 p-0'>
                    <div className='col-12 col-lg-6'>

                    </div>
                    <div className='col-12 col-lg-6 border_top_gray_1px font16 font_family_regular color_888'>
                        <div className='d-flex align-items-center justify-content-between mt-4'>
                            <div>Sub total</div>
                            <div>{currencyFormat(getSubTotal())}</div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between mt-2'>
                            <div>Tax</div>
                            <div>{currencyFormat(getSubTotal())}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateOrder