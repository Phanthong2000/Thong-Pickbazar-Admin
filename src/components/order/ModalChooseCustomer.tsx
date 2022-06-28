import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Modal } from "rsuite";
import styled from "styled-components";
import { getAllCustomerByStatus } from "../../apis/user";
import { UserType } from "../../interfaces";
import Avatar from "../Avatar";
import Pagination from "../Pagination";

type Props = {
  open: boolean;
  handleClose: () => void;
  handleChoose: (customer: UserType | any) => void;
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
const countPerRow = 10;
function ModalChooseCustomer({ open, handleClose, handleChoose }: Props) {
  const { isLoading, data } = useQuery("getAllCustomersByStatus", () =>
    getAllCustomerByStatus({}, {}, {}, "active")
  );
  const [customer, setCustomer] = useState<UserType | any>();
  const [users, setUsers] = useState<any[]>([]);
  const [usersByPage, setUsersByPage] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  useEffect(() => {
    if (data) setUsers(data);
  }, [data]);
  useEffect(() => {
    setPage(1);
    setUsersByPage(users.slice(0, countPerRow));
  }, [users]);
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
  const handleChoosePage = (value: any) => {
    setPage(value);
    setUsersByPage(
      users.slice(
        (value - 1) * countPerRow,
        (value - 1) * countPerRow + countPerRow
      )
    );
  };
  const handlePrevPage = (value: any) => {
    if (page > 1) {
      setUsersByPage(
        users.slice(
          (page - 2) * countPerRow,
          (page - 2) * countPerRow + countPerRow
        )
      );
      setPage(page - 1);
    }
  };
  const handleNextPage = (value: any) => {
    if (page < Math.ceil(users.length / countPerRow)) {
      setUsersByPage(
        users.slice(page * countPerRow, page * countPerRow + countPerRow)
      );
      setPage(page + 1);
    }
  };
  const handleGetEndPage = () => {
    return Math.ceil(users.length / countPerRow);
  };
  const handleGetListPageCurrent = () => {
    const end = Math.ceil(users.length / countPerRow);
    if (page < 4 || end <= 4) return [1, 2, 3, 4, end];
    else if (end - page < 4) {
      return [1, end - 3, end - 2, end - 1, end];
    } else return [page - 1, page, page + 1, page + 2];
  };
  const handleFilter = () => {
    if (!name && !phone && !email) {
      setUsers(data);
    } else {
      setUsers(
        data.filter((user: UserType) => {
          if (name && !phone && !email)
            return user.name.toLowerCase().includes(name.toLowerCase());
          else if (!name && phone && !email)
            return user.phone.toLowerCase().includes(phone.toLowerCase());
          else if (!name && !phone && email)
            return user.email.toLowerCase().includes(email.toLowerCase());
          else if (name && phone && !email)
            return (
              user.name.toLowerCase().includes(name) &&
              user.phone.toLowerCase().includes(phone.toLowerCase())
            );
          else if (!name && phone && email)
            return (
              user.phone.toLowerCase().includes(phone) &&
              user.email.toLowerCase().includes(email.toLowerCase())
            );
          else if (name && !phone && email)
            return (
              user.name.toLowerCase().includes(name) &&
              user.email.toLowerCase().includes(email.toLowerCase())
            );
          else
            return (
              user.name.includes(name) &&
              user.phone.includes(phone) &&
              user.email.includes(email)
            );
        })
      );
    }
  };
  // <Icon className='icon30x30' icon="eos-icons:loading" />
  if (isLoading) return null;
  return (
    <Modal size="lg" open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Choose Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal_choose_customer">
        <div className="row m-0 p-0">
          <div className="col-6 px-1">
            <div className="font14 font_family_bold_italic">Customer</div>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") handleFilter();
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 h40_px w100_per"
              placeholder="Type name Customer"
              type="text"
            />
          </div>
          <div className="col-6 px-1">
            <div className="font14 font_family_bold_italic">Contact Number</div>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") handleFilter();
              }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-2 h40_px w100_per"
              placeholder="Type Contact Number"
              type="number"
            />
          </div>
          <div className="col-8 px-1 mt-2">
            <div className="font14 font_family_bold_italic">Email</div>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") handleFilter();
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 h40_px w100_per"
              placeholder="Type Email"
              type="text"
            />
          </div>
          <div className="col-4 px-1 mt-2 d-flex align-items-end justify-content-end">
            <button
              onClick={handleFilter}
              className="btn bg_primary w100_per font14 color_white font_family_bold_italic h40_px"
            >
              Filter
            </button>
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
            {usersByPage.length === 0 ? (
              <tr>
                <td
                  className="font14 font_family_bold text-center py-2"
                  colSpan={5}
                >
                  Not found user
                </td>
              </tr>
            ) : (
              <>
                {usersByPage.map((item: any, index: number) => (
                  <tr
                    onClick={() => setCustomer(item)}
                    className={`border_top_gray_1px cursor_pointer ${
                      customer?.id === item.id && `bg_ddd`
                    }`}
                    key={index}
                  >
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
                      <Avatar shape="rectangle" size={40} url={item.avatar} />
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
              </>
            )}
          </tbody>
        </table>
        <div className="d-flex align-items-center justify-content-end mt-4 pagination">
          <Pagination type="change" click={handlePrevPage} value="prev" />
          {handleGetListPageCurrent().map((item, index) => (
            <Pagination
              value={item}
              type="value"
              key={index}
              page={page}
              click={handleChoosePage}
              pageEnd={handleGetEndPage()}
            />
          ))}
          <Pagination
            status="end"
            type="value"
            page={page}
            click={handleChoosePage}
            value={handleGetEndPage()}
          />
          <Pagination type="change" click={handleNextPage} value="next" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => handleChoose(customer)}
          disabled={Boolean(!customer)}
          className="btn bg_primary font16 font_family_bold_italic color_white mr_10px"
        >
          Choose
        </button>
        <button
          onClick={handleClose}
          className="btn btn-danger font16 font_family_bold_italic color_white"
        >
          Cancel
        </button>
      </Modal.Footer>
    </Modal>
  );
}

export default React.memo(ModalChooseCustomer);
