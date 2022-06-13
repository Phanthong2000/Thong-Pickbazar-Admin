import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getApiAllCategories } from "../redux/slices/categorySlice";
import { getApiAllGroups } from "../redux/slices/groupSlice";
import { AppDispatch } from "../redux/store";

function Redux() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getApiAllGroups());
    dispatch(getApiAllCategories());
  }, []);
  return null;
}

export default Redux;
