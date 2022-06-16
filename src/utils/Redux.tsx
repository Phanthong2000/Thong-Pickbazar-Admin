import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApiAllAttributes } from "../redux/slices/attributeSlice";
import { getApiAllCategories } from "../redux/slices/categorySlice";
import { getApiAllGroups } from "../redux/slices/groupSlice";
import { getApiAllProducts } from "../redux/slices/productSlice";
import { getApiAllTags } from "../redux/slices/tagSlice";
import { AppDispatch } from "../redux/store";

function Redux() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getApiAllGroups());
    dispatch(getApiAllCategories());
    dispatch(getApiAllTags());
    dispatch(getApiAllAttributes());
    dispatch(getApiAllProducts());
  }, []);
  return null;
}

export default Redux;
