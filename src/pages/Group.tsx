import React from "react";
import { useSelector } from "react-redux";
import BaseTableGroup from "../base/BaseTableGroup";
import BoxSearch from "../components/group/BoxSearch";
import { allGroupsSelector, getApiAllGroups } from "../redux/slices/groupSlice";
import alert2 from "../utils/Sweetalert2";

function Group() {
  const allGroups = useSelector(allGroupsSelector);
  const handleDelete = (position: number) => {
    const handleConfig = () => {
      console.log(position);
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
      handleConfig
    );
  };
  return (
    <>
      <BoxSearch />
      <BaseTableGroup handleDelete={handleDelete} data={allGroups} />
    </>
  );
}

export default React.memo(Group);
