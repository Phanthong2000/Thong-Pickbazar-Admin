import { Icon } from '@iconify/react';
import React from 'react'
import styled from 'styled-components';
import { ShippingType } from '../interfaces';
import { currencyFormat } from '../utils/format';


type Props = {
    data: Array<ShippingType | any>;
    handleDelete: (shipping: ShippingType) => void;
    handleUpdate: (name: string) => void;
};
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
function BaseTableShipping({ data, handleDelete, handleUpdate }: Props) {
    const textAlign = (value: Type) => value;
    const header = [
        {
            name: "ID",
            width: "10%",
            textAlign: textAlign("left"),
        },
        {
            name: "Name",
            width: "50%",
            textAlign: textAlign("left"),
        },
        {
            name: "Fee ($ per km)",
            width: "20%",
            textAlign: textAlign("center"),
        },
        {
            name: "Actions",
            width: "20%",
            textAlign: textAlign("right"),
        },
    ];
    return (
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
                {data.map((item, index) => (
                    <tr className="border_top_gray_1px" key={index}>
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
                            {item.name}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(2)?.width,
                                textAlign: header.at(2)?.textAlign,
                            }}
                        >
                            {currencyFormat(item.fee)}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(3)?.width,
                                textAlign: header.at(3)?.textAlign,
                            }}
                        >
                            <button
                                onClick={() => handleDelete(item)}
                                className="btn p-0 mr_5px"
                            >
                                <Icon className="icon20x20 color_red" icon="bi:trash3" />
                            </button>
                            <button
                                onClick={() => handleUpdate(item.name)}
                                className="btn p-0 m-0"
                            >
                                <Icon className="icon20x20 color_888" icon="bx:edit" />
                            </button>
                        </TableCell>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default React.memo(BaseTableShipping);