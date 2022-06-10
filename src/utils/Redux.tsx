import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroups } from "../apis/group";
import groupSlice, { getApiAllGroups } from "../redux/slices/groupSlice";
import { allUserSelector, userSelector } from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store";

function Redux() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getApiAllGroups());
  }, []);
  return null;
}

export default Redux;
