import { Icon } from '@iconify/react';
import React, { useState } from 'react'
import styled from 'styled-components';
import { Collapse } from 'react-bootstrap'
import { CategoryType } from '../interfaces';

type Props = {
    data: Array<CategoryType | any>;
    handleDelete: (category: CategoryType) => void;
    handleUpdate: (id: string) => void;
};
type Type =
    | "start"
    | "end"
    | "left"
    | "right"
    | "center"
    | "justify"
    | "match-parent";
const TableCell = styled.div`
    padding: 10px;
  `;
const TableCellHead = styled.div`
    padding: 10px;
  `;
type TableCellCollapseType = {
    row: any;
    indexParent: number;
    handleDelete: (category: CategoryType) => void;
    handleUpdate: (name: string) => void;
}
function TableCellCollapse({ row, indexParent, handleDelete, handleUpdate }: TableCellCollapseType) {
    const [toggle, setToggle] = useState<boolean>(false);
    const handleToggle = () => {
        setToggle(!toggle)
    }
    return (
        <>
            <div
                className="border_top_gray_1px w100_per d-flex align-items-center justify-content-between">
                <TableCell
                    style={{
                        width: '5%',
                        textAlign: "left",
                    }}
                >
                    {
                        row.child.length > 0 && <button onClick={handleToggle} className='btn p-0 m-0'>
                            {
                                toggle ?
                                    <Icon className='icon20x20 color_888' icon="fa6-regular:square-minus" />
                                    :

                                    <Icon className='icon20x20 color_888' icon="fa6-regular:square-plus" />
                            }
                        </button>
                    }

                </TableCell>
                <TableCell
                    style={{
                        width: '10%',
                        textAlign: "left",
                    }}
                >
                    {indexParent + 1}
                </TableCell>
                <TableCell
                    style={{
                        width: '20%',
                        textAlign: "left",
                    }}
                >
                    {row.name_en}
                </TableCell>
                <TableCell
                    style={{
                        width: '20%',
                        textAlign: "left",
                    }}
                >
                    <Icon className="color_888" icon={row.detail} />
                </TableCell>
                <TableCell
                    style={{
                        width: '10%',
                        textAlign: "center",
                    }}
                >
                    <img className="icon30x30 color_888" src={row.image} alt="category" />
                </TableCell>
                <TableCell
                    style={{
                        width: '10%',
                        textAlign: "center",
                    }}
                >
                    <Icon className="icon30x30 color_888" icon={row.icon} />
                </TableCell>
                <TableCell
                    style={{
                        width: '15%',
                        textAlign: "center",
                    }}
                >
                    {row.group.name_en}
                </TableCell>
                <TableCell
                    style={{
                        width: '10%',
                        textAlign: "right",
                    }}
                >
                    <button
                        onClick={() => handleDelete(row)}
                        className="btn p-0 mr_5px"
                    >
                        <Icon className="icon20x20 color_red" icon="bi:trash3" />
                    </button>
                    <button onClick={() => handleUpdate(row.id)} className="btn p-0 m-0">
                        <Icon className="icon20x20 color_888" icon="bx:edit" />
                    </button>
                </TableCell>
            </div>
            <Collapse in={toggle} className="w100_per">
                <div className='w100_per'>
                    {
                        row.child.map((item: any, index: number) => (
                            <div
                                className="cursor_pointer border_top_gray_1px w100_per d-flex align-items-center bg_gray justify-content-between" key={index}>
                                <TableCell
                                    style={{
                                        width: '5%',
                                        textAlign: "left",
                                    }}
                                >
                                    {' '}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: '10%',
                                        textAlign: "left",
                                    }}
                                >
                                    {indexParent + 1}-{index + 1}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: '20%',
                                        textAlign: "left",
                                    }}
                                >
                                    {item.name_en}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: '20%',
                                        textAlign: "left",
                                    }}
                                >
                                    <Icon className="color_888" icon={item.detail} />
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: '10%',
                                        textAlign: "center",
                                    }}
                                >
                                    <img className="icon30x30 color_888" src={item.image} alt="category" />
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: '10%',
                                        textAlign: "center",
                                    }}
                                >
                                    <Icon className="icon30x30 color_888" icon={item.icon} />
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: '15%',
                                        textAlign: "center",
                                    }}
                                >
                                    {row.group.name_en}
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: '10%',
                                        textAlign: "right",
                                    }}
                                >
                                    <button
                                        onClick={() => handleDelete(item)}
                                        className="btn p-0 mr_5px"
                                    >
                                        <Icon className="icon20x20 color_red" icon="bi:trash3" />
                                    </button>
                                    <button onClick={() => handleUpdate(item._id)} className="btn p-0 m-0">
                                        <Icon className="icon20x20 color_888" icon="bx:edit" />
                                    </button>
                                </TableCell>
                            </div>
                        ))
                    }
                </div>
            </Collapse>
        </>
    )
}
function BaseTableCategory({ data, handleDelete, handleUpdate }: Props) {
    const textAlign = (value: Type) => value;
    const header = [
        {
            name: "",
            width: "5%",
            textAlign: textAlign("left"),
        },
        {
            name: "ID",
            width: "10%",
            textAlign: textAlign("left"),
        },
        {
            name: "Name",
            width: "20%",
            textAlign: textAlign("left"),
        },
        {
            name: "Detail",
            width: "20%",
            textAlign: textAlign("left"),
        },
        {
            name: "Image",
            width: "10%",
            textAlign: textAlign("center"),
        },
        {
            name: "Icon",
            width: "10%",
            textAlign: textAlign("center"),
        },
        {
            name: "Group",
            width: "15%",
            textAlign: textAlign("center"),
        },
        {
            name: "Actions",
            width: "10%",
            textAlign: textAlign("right"),
        },
    ];
    return (
        <div className="mt-4 w100_per bg_white box_shadow_card border_radius_3">
            <div className="bg_ddd">
                <div className='d-flex align-items-center justify-content-between'>
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
                </div>
            </div>
            <div>
                {data.map((item, index) => (
                    <TableCellCollapse handleDelete={handleDelete} handleUpdate={handleUpdate} key={index} indexParent={index} row={item} />
                ))}
            </div>
        </div >
    )
}

export default BaseTableCategory