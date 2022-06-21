import { Icon } from "@iconify/react";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { CouponType } from "../interfaces";
import { currencyFormat } from "../utils/format";

type Props = {
  data: Array<CouponType>;
  handleDelete: (coupon: CouponType) => void;
  handleUpdate: (code: string) => void;
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
function BaseTableCoupon({ data, handleDelete, handleUpdate }: Props) {
  const textAlign = (value: Type) => value;
  const header = [
    {
      name: "ID",
      width: "5%",
      textAlign: textAlign("left"),
    },
    {
      name: "Banner",
      width: "15%",
      textAlign: textAlign("left"),
    },
    {
      name: "Code",
      width: "15%",
      textAlign: textAlign("left"),
    },
    {
      name: "Type",
      width: "10%",
      textAlign: textAlign("center"),
    },
    {
      name: "Amount",
      width: "10%",
      textAlign: textAlign("center"),
    },
    {
      name: "From active",
      width: "15%",
      textAlign: textAlign("center"),
    },
    {
      name: "Will expire",
      width: "15%",
      textAlign: textAlign("center"),
    },
    {
      name: "Actions",
      width: "15%",
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
              <Avatar shape="rectangle" size={50} url={item.image} />
            </TableCell>
            <TableCell
              style={{
                width: header.at(2)?.width,
                textAlign: header.at(2)?.textAlign,
              }}
            >
              {item.code}
            </TableCell>
            <TableCell
              style={{
                width: header.at(3)?.width,
                textAlign: header.at(3)?.textAlign,
              }}
            >
              {item.type.toUpperCase()}
            </TableCell>
            <TableCell
              style={{
                width: header.at(4)?.width,
                textAlign: header.at(4)?.textAlign,
              }}
            >
              {item.type === "usd"
                ? currencyFormat(item.amount)
                : `${item.amount} %`}
            </TableCell>
            <TableCell
              style={{
                width: header.at(5)?.width,
                textAlign: header.at(5)?.textAlign,
              }}
            >
              {moment(item.from).format(`DD/MM/YYYY`)}
            </TableCell>
            <TableCell
              style={{
                width: header.at(6)?.width,
                textAlign: header.at(6)?.textAlign,
              }}
            >
              {moment(item.to).format(`DD/MM/YYYY`)}
            </TableCell>
            <TableCell
              style={{
                width: header.at(7)?.width,
                textAlign: header.at(7)?.textAlign,
              }}
            >
              <button
                onClick={() => handleDelete(item)}
                className="btn p-0 mr_5px"
              >
                <Icon className="icon20x20 color_red" icon="bi:trash3" />
              </button>
              <button
                onClick={() => handleUpdate(item.code)}
                className="btn p-0 m-0"
              >
                <Icon className="icon20x20 color_888" icon="bx:edit" />
              </button>
            </TableCell>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default BaseTableCoupon;
