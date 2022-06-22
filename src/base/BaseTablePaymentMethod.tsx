import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import styled from "styled-components";
import Avatar from "../components/Avatar";
import { PaymentMethodType } from "../interfaces";
import BaseSwitch from "./BaseSwitch";

type Props = {
  data: Array<PaymentMethodType | any>;
  handleDelete: (id: string) => void;
  handleUpdate: (id: string) => void;
  handleChangeStatus: (id: string, status: string) => void;
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
  handleDelete: (id: string) => void;
  handleUpdate: (name: string) => void;
  handleChangeStatus: (id: string, status: string) => void;
};
function TableCellCollapse({
  row,
  indexParent,
  handleDelete,
  handleUpdate,
  handleChangeStatus,
}: TableCellCollapseType) {
  const [toggle, setToggle] = useState<boolean>(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };
  return (
    <>
      <div className="border_top_gray_1px w100_per d-flex align-items-center justify-content-between">
        <TableCell
          style={{
            width: "5%",
            textAlign: "center",
          }}
        >
          {row.child.length > 0 && (
            <button onClick={handleToggle} className="btn p-0 m-0">
              {toggle ? (
                <Icon
                  className="icon20x20 color_888"
                  icon="fa6-regular:square-minus"
                />
              ) : (
                <Icon
                  className="icon20x20 color_888"
                  icon="fa6-regular:square-plus"
                />
              )}
            </button>
          )}
        </TableCell>
        <TableCell
          style={{
            width: "15%",
            textAlign: "left",
          }}
        >
          <Avatar shape="rectangle" size={50} url={row.image} />
        </TableCell>
        <TableCell
          style={{
            width: "40%",
            textAlign: "left",
          }}
        >
          {row.name}
        </TableCell>
        <TableCell
          style={{
            width: "20%",
            textAlign: "center",
          }}
        >
          <BaseSwitch
            checked={row.status === "active"}
            handleOff={() => handleChangeStatus(row.id, "inactive")}
            handleOn={() => handleChangeStatus(row.id, "active")}
          />
        </TableCell>
        <TableCell
          style={{
            width: "20%",
            textAlign: "right",
          }}
        >
          <button
            onClick={() => handleDelete(row.id)}
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
        <div className="w100_per">
          {row.child.map((item: any, index: number) => (
            <div
              className="cursor_pointer border_top_gray_1px w100_per d-flex align-items-center bg_gray justify-content-between"
              key={index}
            >
              <TableCell
                style={{
                  width: "5%",
                  textAlign: "left",
                }}
              >
                {" "}
              </TableCell>
              <TableCell
                style={{
                  width: "15%",
                  textAlign: "left",
                }}
              >
                <Avatar shape="rectangle" size={50} url={item.image} />
              </TableCell>
              <TableCell
                style={{
                  width: "40%",
                  textAlign: "left",
                }}
              >
                {item.name}
              </TableCell>
              <TableCell
                style={{
                  width: "20%",
                  textAlign: "center",
                }}
              >
                <BaseSwitch
                  checked={item.status === "active"}
                  handleOff={() => handleChangeStatus(item._id, "inactive")}
                  handleOn={() => handleChangeStatus(item._id, "active")}
                />
              </TableCell>
              <TableCell
                style={{
                  width: "20%",
                  textAlign: "right",
                }}
              >
                <button
                  onClick={() => handleDelete(item._id)}
                  className="btn p-0 mr_5px"
                >
                  <Icon className="icon20x20 color_red" icon="bi:trash3" />
                </button>
                <button
                  onClick={() => handleUpdate(item._id)}
                  className="btn p-0 m-0"
                >
                  <Icon className="icon20x20 color_888" icon="bx:edit" />
                </button>
              </TableCell>
            </div>
          ))}
        </div>
      </Collapse>
    </>
  );
}
function BaseTablePaymentMethod({
  data,
  handleDelete,
  handleUpdate,
  handleChangeStatus,
}: Props) {
  const textAlign = (value: Type) => value;
  const header = [
    {
      name: "",
      width: "5%",
      textAlign: textAlign("left"),
    },
    {
      name: "Image",
      width: "15%",
      textAlign: textAlign("left"),
    },
    {
      name: "Name",
      width: "40%",
      textAlign: textAlign("left"),
    },
    {
      name: "Status",
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
    <div className="mt-4 w100_per bg_white box_shadow_card border_radius_3">
      <div className="bg_ddd">
        <div className="d-flex align-items-center justify-content-between">
          {header.map((item, index) => (
            <TableCellHead
              key={index}
              className="font_family_bold font16"
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
          <TableCellCollapse
            handleChangeStatus={handleChangeStatus}
            handleDelete={handleDelete}
            handleUpdate={handleUpdate}
            key={index}
            indexParent={index}
            row={item}
          />
        ))}
      </div>
    </div>
  );
}

export default BaseTablePaymentMethod;
