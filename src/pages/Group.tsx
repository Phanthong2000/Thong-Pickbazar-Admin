import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteGroup } from "../apis/group";
import BaseTableGroup from "../base/BaseTableGroup";
import BoxSearch from "../components/group/BoxSearch";
import { GroupType } from "../interfaces";
import groupSlice, {
  allGroupsSelector,
  getApiAllGroups,
} from "../redux/slices/groupSlice";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import alert2 from "../utils/Sweetalert2";

function Group() {
  const allGroups = useSelector(allGroupsSelector);
  const dispatch = useDispatch<AppDispatch>();
  const handleDelete = (group: GroupType) => {
    const handleConfirm = async () => {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const result = await deleteGroup({}, {}, {}, group.id);
      if (result) {
        dispatch(groupSlice.actions.deleteGroup(group));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(themeSlice.actions.showToast({
          type: "success",
          content: "Successfully delete group"
        }))
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
  return (
    <>
      <BoxSearch />
      <BaseTableGroup handleDelete={handleDelete} data={allGroups} />
    </>
  );
}

export default React.memo(Group);
