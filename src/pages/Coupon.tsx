import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCoupon } from "../apis";
import BaseTableCoupon from "../base/BaseTableCoupon";
import BoxSearchCoupon from "../components/order/BoxSearchCoupon";
import { CouponType } from "../interfaces";
import orderSlice, { allCouponsSelector } from "../redux/slices/orderSlice";
import themeSlice from "../redux/slices/themeSlice";
import { AppDispatch } from "../redux/store";
import alert2 from "../utils/Sweetalert2";

function Coupon() {
  const allCoupons = useSelector(allCouponsSelector);
  const [coupons, setCoupons] = useState<Array<CouponType>>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (allCoupons) setCoupons(allCoupons);
  }, [allCoupons]);
  const handleDelete = (coupon: CouponType) => {
    const handleConfirm = async () => {
      dispatch(
        themeSlice.actions.showBackdrop({
          isShow: true,
          content: "",
        })
      );
      const result = await deleteCoupon({}, {}, {}, coupon.id);
      if (result) {
        dispatch(orderSlice.actions.deleteCoupon(coupon));
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
  const handleUpdate = (code: string) => {
    navigate(`/coupons/${code}`);
  };
  const handleFilter = (text: string) => {
    if (!text) {
      setCoupons(allCoupons);
    } else {
      setCoupons(
        allCoupons.filter((coupon: any) =>
          coupon.code.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };
  return (
    <>
      <BoxSearchCoupon handleFilter={handleFilter} />
      <BaseTableCoupon
        data={coupons}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </>
  );
}

export default React.memo(Coupon);
