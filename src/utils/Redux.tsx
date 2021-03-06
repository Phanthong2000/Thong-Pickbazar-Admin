import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getApiAllAttributes } from "../redux/slices/attributeSlice";
import { getApiAllCategories } from "../redux/slices/categorySlice";
import { getApiAllGroups } from "../redux/slices/groupSlice";
import {
  getApiAllCoupons,
  getApiAllOrders,
  getApiAllOrderStatuses,
  getApiAllPaymentMethods,
  getApiAllShippings,
  getApiAllTaxes,
  getApiDashboard,
} from "../redux/slices/orderSlice";
import { getApiAllProducts } from "../redux/slices/productSlice";
import { getApiSetting } from "../redux/slices/settingSlice";
import { getApiAllTags } from "../redux/slices/tagSlice";
import { getApiAllUser, isLoginSelector } from "../redux/slices/userSlice";
import { AppDispatch } from "../redux/store";

function Redux() {
  const isLogin = useSelector(isLoginSelector);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getApiSetting());
  }, []);
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else {
      dispatch(getApiDashboard());
      dispatch(getApiAllGroups());
      dispatch(getApiAllCategories());
      dispatch(getApiAllTags());
      dispatch(getApiAllAttributes());
      dispatch(getApiAllProducts());
      dispatch(getApiAllUser());
      dispatch(getApiAllOrderStatuses());
      dispatch(getApiAllCoupons());
      dispatch(getApiAllTaxes());
      dispatch(getApiAllShippings());
      dispatch(getApiAllPaymentMethods());
      dispatch(getApiAllOrders());
    }
  }, [isLogin]);
  return null;
}

export default Redux;
