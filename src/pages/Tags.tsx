import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTag } from "../apis/tag";
import BaseTableTag from "../base/BaseTableTag";
import BoxSearch from "../components/tag/BoxSearch";
import { TagType } from "../interfaces";
import tagSlice, { allTagsSelector } from "../redux/slices/tagSlice";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import alert2 from "../utils/Sweetalert2";

function Tags() {
  const allTags = useSelector(allTagsSelector);
  const [tags, setTags] = useState<Array<TagType>>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    if (allTags) setTags(allTags);
  }, [allTags]);
  const handleSearch = (text: string) => {
    console.log(text);
  };
  const handleDelete = (tag: TagType) => {
    const handleConfirm = async () => {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const result = await deleteTag({}, {}, {}, tag.id);
      if (result) {
        dispatch(tagSlice.actions.deleteTag(tag));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            type: "success",
            content: "Successfully delete group",
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
  const handleUpdate = (name: string) => {
    navigate(`/tags/${name}`);
  };
  return (
    <>
      <BoxSearch handleSearch={handleSearch} />
      <BaseTableTag
        data={tags}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default React.memo(Tags);
