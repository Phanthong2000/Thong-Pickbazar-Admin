import { Icon } from "@iconify/react";
import React from "react";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { ProductType } from "../interfaces";
import { currencyFormat } from "../utils/format";

type Props = {
  data: Array<ProductType | any>;
  handleDelete: (product: ProductType) => void;
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
function BaseTableProduct({ data, handleDelete, handleUpdate }: Props) {
  const textAlign = (value: Type) => value;
  const header = [
    {
      name: "Image",
      width: "10%",
      textAlign: textAlign("left"),
    },
    {
      name: "Name",
      width: "20%",
      textAlign: textAlign("left"),
    },
    {
      name: "Group",
      width: "10%",
      textAlign: textAlign("center"),
    },
    {
      name: "Type",
      width: "10%",
      textAlign: textAlign("center"),
    },
    {
      name: "Price",
      width: "10%",
      textAlign: textAlign("center"),
    },
    {
      name: "Sale Price",
      width: "10%",
      textAlign: textAlign("center"),
    },
    {
      name: "Quantity",
      width: "10%",
      textAlign: textAlign("center"),
    },
    {
      name: "Status",
      width: "10%",
      textAlign: textAlign("center"),
    },
    {
      name: "Action",
      width: "10%",
      textAlign: textAlign("center"),
    },
  ];
  return (
    <table className="mt-4 w100_per bg_white box_shadow_card border_radius_3">
      <thead className="bg_ddd">
        <tr>
          {header.map((item, index) => (
            <TableCellHead
              key={index}
              className="font_family_regular font13"
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
              <Avatar size={50} url={item.featureImage} shape="rectangle" />
            </TableCell>
            <TableCell
              style={{
                width: header.at(1)?.width,
                textAlign: header.at(1)?.textAlign,
              }}
              className="font14"
            >
              {item.name_en}
            </TableCell>
            <TableCell
              style={{
                width: header.at(2)?.width,
                textAlign: header.at(2)?.textAlign,
              }}
              className="font14"
            >
              {item.group.name_en}
            </TableCell>
            <TableCell
              style={{
                width: header.at(3)?.width,
                textAlign: header.at(3)?.textAlign,
              }}
              className="font14"
            >
              {item.type}
            </TableCell>
            {item.type === "simple" ? (
              <>
                <TableCell
                  style={{
                    width: header.at(4)?.width,
                    textAlign: header.at(4)?.textAlign,
                  }}
                  className="font14"
                >
                  {currencyFormat(item.simple.price)}
                </TableCell>
                <TableCell
                  style={{
                    width: header.at(5)?.width,
                    textAlign: header.at(5)?.textAlign,
                  }}
                  className="font14"
                >
                  {currencyFormat(item.simple.salePrice)}
                </TableCell>
                <TableCell
                  style={{
                    width: header.at(6)?.width,
                    textAlign: header.at(6)?.textAlign,
                  }}
                  className="font14"
                >
                  {item.simple.quantity}
                </TableCell>
              </>
            ) : (
              <>
                <TableCell
                  style={{
                    width: header.at(4)?.width,
                    textAlign: header.at(4)?.textAlign,
                  }}
                  className="font14"
                >
                  {currencyFormat(item.variable.price)}
                </TableCell>
                <TableCell
                  style={{
                    width: header.at(5)?.width,
                    textAlign: header.at(5)?.textAlign,
                  }}
                  className="font14"
                >
                  {currencyFormat(item.variable.salePrice)}
                </TableCell>
                <TableCell
                  style={{
                    width: header.at(6)?.width,
                    textAlign: header.at(6)?.textAlign,
                  }}
                  className="font14"
                >
                  {item.variable.quantity}
                </TableCell>
              </>
            )}
            <TableCell
              style={{
                width: header.at(7)?.width,
                textAlign: header.at(7)?.textAlign,
              }}
              className="font14"
            >
              <div className="d-inline px-3 py-1 border_radius_10 color_white font_family_bold_italic bg_primary">
                {item.status}
              </div>
            </TableCell>
            <TableCell
              style={{
                width: header.at(8)?.width,
                textAlign: header.at(8)?.textAlign,
              }}
            >
              <button
                onClick={() => handleDelete(item)}
                className="btn p-0 mr_5px"
              >
                <Icon className="icon20x20 color_red" icon="bi:trash3" />
              </button>
              <button
                onClick={() => handleUpdate(item.name_en)}
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

export default React.memo(BaseTableProduct);
