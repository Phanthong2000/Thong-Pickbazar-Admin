import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteGroup } from "../apis/group";
import BaseTableGroup from "../base/BaseTableGroup";
import BoxSearch from "../components/group/BoxSearch";
import { GroupType } from "../interfaces";
import groupSlice, {
  allGroupsSelector,
} from "../redux/slices/groupSlice";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import alert2 from "../utils/Sweetalert2";

function Group() {
  const allGroups = useSelector(allGroupsSelector);
  const [groups, setGroups] = useState<any>([]);
  useEffect(() => {
    setGroups(allGroups);
  }, [allGroups])
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
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
  const handleUpdate = (name: string) => {
    navigate(`/groups/${name.toLowerCase()}`)
  }
  const handleSearch = (text: string) => {
    if (text) {
      setGroups(allGroups.filter((group: any) => group.name_en.toLowerCase().includes(text.toLowerCase())))
    } else {
      setGroups(allGroups)
    }
  }
  return (
    <>
      <BoxSearch handleSearch={handleSearch} />
      <BaseTableGroup handleUpdate={handleUpdate} handleDelete={handleDelete} data={groups} />
    </>
  );
}

export default React.memo(Group);
