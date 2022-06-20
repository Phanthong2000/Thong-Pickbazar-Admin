import { Icon } from '@iconify/react';
import React from 'react'
import styled from 'styled-components';
import Avatar from '../components/Avatar';
import { UserType } from '../interfaces';

type Props = {
    data: Array<UserType | any>;
    handleDelete: (user: UserType, position: number) => void;
    handleUpdate: (id: string) => void;
    handleBanUser: (user: UserType, position: number) => void;
    handleUnBanUser: (user: UserType, position: number) => void;
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
function BaseTableUser({ data, handleDelete, handleUpdate, handleBanUser, handleUnBanUser }: Props) {
    const textAlign = (value: Type) => value;
    const header = [
        {
            name: "Avatar",
            width: "10%",
            textAlign: textAlign("left"),
        },
        {
            name: "Name",
            width: "20%",
            textAlign: textAlign("left"),
        },
        {
            name: "Email",
            width: "20%",
            textAlign: textAlign("left"),
        },
        {
            name: "Permission",
            width: "20%",
            textAlign: textAlign("left"),
        },
        {
            name: "Status",
            width: "10%",
            textAlign: textAlign("left"),
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
                            <Avatar size={50} url={item.avatar} shape="rectangle" />
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
                            {item.email}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(3)?.width,
                                textAlign: header.at(3)?.textAlign,
                            }}
                        >
                            {item.role.name}
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(4)?.width,
                                textAlign: header.at(4)?.textAlign,
                            }}
                        >
                            <div className={`d-inline py-1 px-2 border_radius_10 font14 font_family_bold_italic ${item.status === 'active' ? `bg_primary color_white` : `bg_red color_black`}`}>
                                {item.status}
                            </div>
                        </TableCell>
                        <TableCell
                            style={{
                                width: header.at(5)?.width,
                                textAlign: header.at(5)?.textAlign,
                            }}
                        >
                            <button
                                onClick={() => handleDelete(item, index)}
                                className="btn p-0 mr_5px"
                            >
                                <Icon className="icon20x20 color_red" icon="bi:trash3" />
                            </button>
                            <button onClick={() => handleUpdate(item.id)} className="btn p-0 m-0">
                                <Icon className="icon20x20 color_888" icon="bx:edit" />
                            </button>
                            {
                                item.status === 'active'
                                    ?
                                    <button onClick={() => handleBanUser(item, index)} data-toggle="tooltip" data-placement="bottom" title="Ban user" className="btn p-0 m-0">
                                        <Icon className="icon25x25 color_orange" icon="bxs:lock" />
                                    </button>
                                    :
                                    <button onClick={() => handleUnBanUser(item, index)} data-toggle="tooltip" data-placement="bottom" title="UnBan user" className="btn p-0 m-0">
                                        <Icon className="icon25x25 color_primary bxs:lock-open" icon="bxs:lock-open" />
                                    </button>
                            }
                        </TableCell>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default React.memo(BaseTableUser);