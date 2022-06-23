import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query';
import { Modal } from 'rsuite';
import styled from 'styled-components';
import { getAllCustomerByStatus } from '../../apis/user';
import { UserType } from '../../interfaces';
import Avatar from '../Avatar';

type Props = {
    open: boolean;
    handleClose: () => void;
    handleChoose: (customer: UserType | any) => void
}
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
function ModalChooseCustomer({ open, handleClose, handleChoose }: Props) {
    const { isLoading, data } = useQuery('getAllCustomersByStatus', () => getAllCustomerByStatus({}, {}, {}, 'active'));
    const [customer, setCustomer] = useState<UserType | any>();
    const textAlign = (value: Type) => value;
    const header = [
        {
            name: "ID",
            width: "10%",
            textAlign: textAlign("left"),
        },
        {
            name: "Image",
            width: "20%",
            textAlign: textAlign("left"),
        },
        {
            name: "Name",
            width: "30%",
            textAlign: textAlign("left"),
        },
        {
            name: "Contact Number",
            width: "20%",
            textAlign: textAlign("left"),
        },
        {
            name: "Email",
            width: "20%",
            textAlign: textAlign("left"),
        },
    ];
    // <Icon className='icon30x30' icon="eos-icons:loading" />
    if (isLoading) return null;
    return (
        <Modal size='lg' open={open} onClose={handleClose}>
            <Modal.Header>
                <Modal.Title>Choose Customer</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal_choose_customer'>
                <div className='row m-0 p-0'>
                    <div className='col-6 px-1'>
                        <div className="font14 font_family_bold_italic">Customer</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            placeholder="Type name Customer"
                            type="text"
                        />
                    </div>
                    <div className='col-6 px-1'>
                        <div className="font14 font_family_bold_italic">Contact Number</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            placeholder="Type Contact Number"
                            type="text"
                        />
                    </div>
                    <div className='col-8 px-1 mt-2'>
                        <div className="font14 font_family_bold_italic">Email</div>
                        <input
                            className="mt-2 h40_px w100_per"
                            placeholder="Type Email"
                            type="text"
                        />
                    </div>
                    <div className='col-4 px-1 mt-2 d-flex align-items-end justify-content-end'>
                        <button className='btn bg_primary w100_per font14 color_white font_family_bold_italic h40_px'>Filter</button>
                    </div>
                </div>
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
                        {data.map((item: any, index: number) => (
                            <tr onClick={() => setCustomer(item)} className={`border_top_gray_1px cursor_pointer ${customer?.id === item.id && `bg_ddd`}`} key={index}>
                                <TableCell
                                    style={{
                                        width: header.at(0)?.width,
                                        textAlign: header.at(0)?.textAlign,
                                    }}
                                >
                                    {index + 1}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: header.at(1)?.width,
                                        textAlign: header.at(1)?.textAlign,
                                    }}
                                >
                                    <Avatar shape='rectangle' size={40} url={item.avatar} />
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: header.at(2)?.width,
                                        textAlign: header.at(2)?.textAlign,
                                    }}
                                >
                                    {item?.name}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: header.at(3)?.width,
                                        textAlign: header.at(3)?.textAlign,
                                    }}
                                >
                                    {item?.phone}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: header.at(4)?.width,
                                        textAlign: header.at(4)?.textAlign,
                                    }}
                                >
                                    {item?.email}
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={() => handleChoose(customer)} disabled={Boolean(!customer)} className='btn bg_primary font16 font_family_bold_italic color_white mr_10px'>Choose</button>
                <button onClick={handleClose} className='btn btn-danger font16 font_family_bold_italic color_white'>Cancel</button>
            </Modal.Footer>
        </Modal>
    )
}

export default React.memo(ModalChooseCustomer);