import { Icon } from "@iconify/react";
import React from "react";
import styled from "styled-components";
import { OrderStatusType } from "../interfaces";

type Props = {
  data: Array<OrderStatusType | any>;
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
const TableCell = styled.td`
  padding: 10px;
`;
const TableCellHead = styled.th`
  padding: 10px;
`;
function BaseTableOrderStatus({ data, handleUpdate }: Props) {
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
      name: "Serial",
      width: "30%",
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
              <div
                className="font16 font_family_bold"
                style={{ color: item.color }}
              >
                {item.name}
              </div>
            </TableCell>
            <TableCell
              style={{
                width: header.at(2)?.width,
                textAlign: header.at(2)?.textAlign,
              }}
            >
              {item.serial}
            </TableCell>
            <TableCell
              style={{
                width: header.at(3)?.width,
                textAlign: header.at(3)?.textAlign,
              }}
            >
              <button
                onClick={() => handleUpdate(item.id)}
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

export default React.memo(BaseTableOrderStatus);
