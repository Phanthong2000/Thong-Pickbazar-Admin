import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAttribute } from "../apis/attribute";
import BaseTableAttribute from "../base/BaseTableAttribute";
import BoxSearch from "../components/attribute/BoxSearch";
import { AttributeType } from "../interfaces";
import attributeSlice, {
  allAttributesSelector,
} from "../redux/slices/attributeSlice";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import alert2 from "../utils/Sweetalert2";

function Attribute() {
  const allAttributes = useSelector(allAttributesSelector);
  const [attributes, setAttributes] = useState<Array<AttributeType>>([]);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    if (allAttributes) setAttributes(allAttributes);
  }, [allAttributes]);
  const handleDelete = (attribute: AttributeType) => {
    const handleConfirm = async () => {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const result = await deleteAttribute({}, {}, {}, attribute.id);
      if (result) {
        dispatch(attributeSlice.actions.deleteAttribute(attribute));
        dispatch(
          themeSlice.actions.hideBackdrop({
            isShow: false,
            content: "",
          })
        );
        dispatch(
          themeSlice.actions.showToast({
            type: "success",
            content: "Successfully delete attribute",
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
    navigate(`/attributes/${name}`);
  };
  return (
    <>
      <BoxSearch />
      <BaseTableAttribute
        data={attributes}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default Attribute;
