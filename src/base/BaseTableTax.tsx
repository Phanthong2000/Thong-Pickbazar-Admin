import { Icon } from "@iconify/react";
import React from "react";
import styled from "styled-components";
import { TaxType } from "../interfaces";
import Switch from "react-switch";

type Props = {
  data: Array<TaxType | any>;
  handleDelete: (tax: TaxType) => void;
  handleUpdate: (name: string) => void;
  handleChangeStatus: (tax: any) => void;
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
function BaseTableTax({
  data,
  handleUpdate,
  handleDelete,
  handleChangeStatus,
}: Props) {
  const textAlign = (value: Type) => value;
  const header = [
    {
      name: "ID",
      width: "5%",
      textAlign: textAlign("left"),
    },
    {
      name: "Name",
      width: "10%",
      textAlign: textAlign("left"),
    },
    {
      name: "Rate (%)",
      width: "10%",
      textAlign: textAlign("center"),
    },
    {
      name: "Type",
      width: "10%",
      textAlign: textAlign("left"),
    },
    {
      name: "City",
      width: "15%",
      textAlign: textAlign("center"),
    },
    {
      name: "District",
      width: "15%",
      textAlign: textAlign("center"),
    },
    {
      name: "Ward",
      width: "15%",
      textAlign: textAlign("center"),
    },
    {
      name: "Status",
      width: "10%",
      textAlign: textAlign("center"),
    },
    {
      name: "Actions",
      width: "10%",
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
              {item.rate}
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
              {item.city}
            </TableCell>
            <TableCell
              style={{
                width: header.at(5)?.width,
                textAlign: header.at(5)?.textAlign,
              }}
            >
              {item.district}
            </TableCell>
            <TableCell
              style={{
                width: header.at(6)?.width,
                textAlign: header.at(6)?.textAlign,
              }}
            >
              {item.ward}
            </TableCell>
            <TableCell
              style={{
                width: header.at(7)?.width,
                textAlign: header.at(7)?.textAlign,
              }}
            >
              <Switch
                height={20}
                width={48}
                handleDiameter={25}
                onHandleColor="#fff"
                offHandleColor="#ddd"
                checked={item.status === "active"}
                onChange={(value) => {
                  const newTax = {
                    ...item,
                    status: value ? "active" : "inactive",
                  };
                  handleChangeStatus(newTax);
                }}
              />
            </TableCell>
            <TableCell
              style={{
                width: header.at(8)?.width,
                textAlign: header.at(8)?.textAlign,
              }}
            >
              <button onClick={() => handleDelete(item)} className="btn p-0 mr_5px">
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
  );
}

export default React.memo(BaseTableTax);
