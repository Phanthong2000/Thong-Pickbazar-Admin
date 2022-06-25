import React from "react";
import { CouponType } from "../../interfaces";
type Props = {
  coupon: CouponType;
};

function CouponItem({ coupon }: Props) {
  return <div>{coupon.id}</div>;
}

export default CouponItem;
