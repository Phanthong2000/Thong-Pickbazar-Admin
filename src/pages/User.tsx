import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, updateStatusUser } from "../apis/user";
import BaseTableUser from "../base/BaseTableUser";
import Pagination from "../components/Pagination";
import BoxSearch from "../components/user/BoxSearch";
import { UserType } from "../interfaces";
import themeSlice from "../redux/slices/themeSlice";
import userSlice, { allUserSelector } from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store";
import alert2 from "../utils/Sweetalert2";

const countPerRow = 10;
function User() {
  const allUsers = useSelector(allUserSelector);
  const [users, setUsers] = useState<Array<UserType>>([]);
  const dispatch = useDispatch<AppDispatch>();
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [usersByPage, setUsersByPage] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  useEffect(() => {
    if (allUsers && !isSearching) {
      setUsers(allUsers);
    }
  }, [allUsers]);
  useEffect(() => {
    setPage(1);
    setUsersByPage(users.slice(0, countPerRow));
  }, [users]);
  const handleDelete = (user: UserType, position: number) => {
    const handleConfirm = async () => {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const result = await deleteUser({}, {}, {}, user.id);
      if (result) {
        setUsers((prevState) => {
          return prevState
            .slice(0, position)
            .concat(prevState.slice(position + 1, prevState.length));
        });
        const data: any[] = [];
        allUsers.forEach((item: any) => {
          if (item.id !== user.id) data.push(item);
        });
        dispatch(userSlice.actions.setAllUsers(data));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            type: "success",
            content: "Successfully delete user",
          })
        );
      }
    };
    alert2(
      "Delete",
      "question",
      true,
      "Delete",
      "#f55858",
      true,
      "Cancel",
      "#000",
      "Delete",
      "Are you sure, you want to delete?",
      handleConfirm
    );
  };
  const handleUpdate = (id: string) => {
    navigate(`/users/${id}`);
  };
  const handleBanUser = (user: UserType, position: number) => {
    const handleConfirm = async () => {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const result = await updateStatusUser(
        {},
        {
          status: "inactive",
        },
        {},
        user.id
      );
      if (result) {
        setUsers((prevState) => {
          return prevState
            .slice(0, position)
            .concat([
              {
                ...user,
                status: "inactive",
              },
            ])
            .concat(prevState.slice(position + 1, prevState.length));
        });
        const data: any[] = [];
        allUsers.forEach((item: any) => {
          if (item.id === user.id) {
            data.push({
              ...user,
              status: "inactive",
            });
          } else {
            data.push(item);
          }
        });
        dispatch(userSlice.actions.setAllUsers(data));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            content: "Successfully Ban User",
            type: "success",
          })
        );
      }
    };
    alert2(
      "Ban User",
      "question",
      true,
      "Ban User",
      "#f55858",
      true,
      "Cancel",
      "#000",
      "Ban User",
      "Are you sure, you want to ban user?",
      handleConfirm
    );
  };
  const handleUnBanUser = (user: UserType, position: number) => {
    const handleConfirm = async () => {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const result = await updateStatusUser(
        {},
        {
          status: "active",
        },
        {},
        user.id
      );
      if (result) {
        setUsers((prevState) => {
          return prevState
            .slice(0, position)
            .concat([
              {
                ...user,
                status: "active",
              },
            ])
            .concat(prevState.slice(position + 1, prevState.length));
        });
        const data: any[] = [];
        allUsers.forEach((item: any) => {
          if (item.id === user.id) {
            data.push({
              ...user,
              status: "active",
            });
          } else {
            data.push(item);
          }
        });
        dispatch(userSlice.actions.setAllUsers(data));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            content: "Successfully UnBan User",
            type: "success",
          })
        );
      }
    };
    alert2(
      "UnBan User",
      "question",
      true,
      "UnBan User",
      "rgba(0,159,127)",
      true,
      "Cancel",
      "#000",
      "UnBan User",
      "Are you sure, you want to unban user?",
      handleConfirm
    );
  };
  const handleFilter = (text: string) => {
    if (text && !isSearching) {
      setIsSearching(true);
    } else if (!text) {
      setIsSearching(false);
    }
    setUsers(
      allUsers.filter(
        (user: any) =>
          user.name.toLowerCase().includes(text.toLowerCase()) ||
          user.email.toLowerCase().includes(text.toLowerCase()) ||
          user.phone.toLowerCase().includes(text.toLowerCase())
      )
    );
  };
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
  return (
    <>
      <BoxSearch handleFilter={handleFilter} />
      <BaseTableUser
        handleBanUser={handleBanUser}
        handleUnBanUser={handleUnBanUser}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        data={usersByPage}
      />
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
    </>
  );
}

export default React.memo(User);
